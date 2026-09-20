// Renders every route to static HTML (so crawlers and agents get real content without
// running JavaScript), writes a Markdown twin of each page for content negotiation, and
// emits sitemap.xml, robots.txt and llms.txt.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parse } from 'node-html-parser'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'dist')

const bundle = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href)
const { render, routes, products, siteConstants, studio } = bundle
const { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, SUPPORT_EMAIL } = siteConstants

const template = await readFile(join(dist, 'index.html'), 'utf8')

/** Turns the rendered page body into Markdown, so both formats come from one source. */
function htmlToMarkdown(html) {
  const doc = parse(html)
  const main = doc.querySelector('main') ?? doc
  const lines = []

  const inline = (node) => {
    if (node.nodeType === 3) return node.rawText.replace(/\s+/g, ' ')
    if (node.getAttribute?.('aria-hidden') === 'true') return ''
    const tag = node.rawTagName?.toLowerCase()
    if (tag === 'img' || tag === 'svg' || tag === 'script' || tag === 'style') return ''
    const inner = node.childNodes.map(inline).join('')
    if (tag === 'a') {
      const href = node.getAttribute('href') ?? ''
      const text = inner.trim()
      if (!text) return ''
      return href.startsWith('#') || !href ? text : `[${text}](${href})`
    }
    if (tag === 'strong' || tag === 'b') return inner.trim() ? `**${inner.trim()}**` : ''
    if (tag === 'em' || tag === 'i') return inner.trim() ? `_${inner.trim()}_` : ''
    if (tag === 'code') return inner.trim() ? `\`${inner.trim()}\`` : ''
    return inner
  }

  const push = (text) => {
    const value = text.replace(/[ \t]+/g, ' ').trim()
    if (value) lines.push(value, '')
  }

  const walk = (node) => {
    if (node.nodeType === 3) return
    if (node.getAttribute?.('aria-hidden') === 'true') return
    const tag = node.rawTagName?.toLowerCase()
    if (!tag || tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'img') return

    if (/^h[1-6]$/.test(tag)) {
      push(`${'#'.repeat(Number(tag[1]))} ${inline(node)}`)
      return
    }
    if (tag === 'p' || tag === 'blockquote' || tag === 'figcaption') {
      const text = inline(node)
      push(tag === 'blockquote' ? `> ${text}` : text)
      return
    }
    if (tag === 'li') {
      push(`- ${inline(node)}`)
      return
    }
    if (tag === 'pre') {
      const code = node.text.trim()
      if (code) lines.push('```', code, '```', '')
      return
    }
    if (tag === 'dt') {
      const value = inline(node)
      if (value) lines.push(`- **${value.trim()}**:`)
      return
    }
    if (tag === 'dd') {
      const value = inline(node).trim()
      if (value) {
        const previous = lines[lines.length - 1]
        if (previous?.endsWith(':')) lines[lines.length - 1] = `${previous} ${value}`
        else lines.push(`- ${value}`)
      }
      return
    }
    if (tag === 'button' || tag === 'a') {
      // Standalone controls and links become their own line when they carry text.
      if (!node.querySelector('p, h1, h2, h3, li, dl')) {
        push(inline(node))
        return
      }
    }
    node.childNodes.forEach(walk)
  }

  main.childNodes.forEach(walk)
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

function jsonLd(route) {
  const url = `${SITE_URL}${route.path === '/' ? '' : route.path}`
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    logo: `${SITE_URL}/favicon.svg`,
    image: `${SITE_URL}/og.png`,
    knowsAbout: [
      'AI product engineering',
      'Full-stack engineering',
      'Product strategy',
      'UX/UI design',
      'Retrieval-augmented generation',
      'AI agents',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT_EMAIL,
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        availableLanguage: ['English'],
      },
    ],
  }

  if (route.schema === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          publisher: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en',
        },
        {
          '@type': 'ProfessionalService',
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          email: CONTACT_EMAIL,
          parentOrganization: { '@id': `${SITE_URL}/#organization` },
          serviceType: [
            'AI product studio',
            'AI engineering lab',
            'Dedicated engineering teams',
          ],
        },
      ],
    }
  }

  if (route.schema === 'work') {
    const product = products.find((item) => `/work/${item.slug}` === route.path)
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: product?.name ?? route.title,
      headline: route.title,
      description: route.description,
      url,
      dateCreated: product?.year,
      creator: { '@id': `${SITE_URL}/#organization` },
      about: product?.category,
      keywords: product ? [product.type, ...product.stack].join(', ') : undefined,
      publisher: { '@id': `${SITE_URL}/#organization` },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

function buildHead(route) {
  const url = `${SITE_URL}${route.path === '/' ? '/' : route.path}`
  const escape = (value) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  return [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.schema === 'work' ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escape(route.title)}" />`,
    `<meta property="og:description" content="${escape(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}/og.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(SITE_NAME)} — ${escape('AI-native, end-to-end product engineering studio')}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(route.title)}" />`,
    `<meta name="twitter:description" content="${escape(route.description)}" />`,
    `<meta name="twitter:image" content="${SITE_URL}/og.png" />`,
    `<link rel="alternate" type="text/markdown" href="${url === `${SITE_URL}/` ? `${SITE_URL}/index.md` : `${url}.md`}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(route))}</script>`,
  ].join('\n    ')
}

function markdownPath(routePath) {
  return routePath === '/' ? '_md/index.md' : `_md${routePath}.md`
}

async function write(relativePath, contents) {
  const target = join(dist, relativePath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, contents)
}

const markdownFooter = (route) => {
  const url = `${SITE_URL}${route.path === '/' ? '' : route.path}`
  return [
    '',
    '---',
    '',
    `Source: ${url}`,
    `Site index: ${SITE_URL}/llms.txt · Sitemap: ${SITE_URL}/sitemap.xml · API: ${SITE_URL}/openapi.json`,
    `Contact: ${CONTACT_EMAIL}`,
    '',
  ].join('\n')
}

const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const today = new Date().toISOString().slice(0, 10)

// --- pages -------------------------------------------------------------------------
for (const route of routes) {
  const appHtml = render(route.path)
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${route.description}" />`)
    .replace('</head>', `  ${buildHead(route)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`
  await write(file, html)

  const markdown = `# ${route.title.replace(` | ${SITE_NAME}`, '')}\n\n${route.description}\n\n${htmlToMarkdown(appHtml)}${markdownFooter(route)}`
  await write(markdownPath(route.path), markdown)
}

// --- 404 ---------------------------------------------------------------------------
const notFoundApp = render('/__not_found__')
const notFoundRoute = {
  path: '/404',
  title: `Page not found | ${SITE_NAME}`,
  description: 'That page does not exist on this site.',
  schema: 'page',
}
await write(
  '404.html',
  template
    .replace(/<title>[^<]*<\/title>/, `<title>${notFoundRoute.title}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${notFoundRoute.description}" />`)
    .replace('</head>', `  <meta name="robots" content="noindex" />\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${notFoundApp}</div>`),
)
await write(
  '_md/404.md',
  [
    '# 404 — Page not found',
    '',
    'The requested URL does not exist on this site. Nothing was found at this path.',
    '',
    '## Where to look instead',
    '',
    `- Site index for agents: ${SITE_URL}/llms.txt`,
    `- All pages: ${SITE_URL}/sitemap.xml`,
    `- Case study API: ${SITE_URL}/api/products`,
    `- API schema: ${SITE_URL}/openapi.json`,
    `- Human contact: ${CONTACT_EMAIL}`,
    '',
  ].join('\n'),
)

// --- sitemap -----------------------------------------------------------------------
await write(
  'sitemap.xml',
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) =>
      [
        '  <url>',
        `    <loc>${escapeXml(`${SITE_URL}${route.path === '/' ? '/' : route.path}`)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n'),
    ),
    '</urlset>',
    '',
  ].join('\n'),
)

// --- robots ------------------------------------------------------------------------
const agents = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'DeepSeekBot',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'ora-agent',
]
await write(
  'robots.txt',
  [
    '# All crawlers, including AI agents, are welcome on this site.',
    'User-agent: *',
    'Allow: /',
    '',
    ...agents.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n'),
)

// --- llms.txt ----------------------------------------------------------------------
await write(
  'llms.txt',
  [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'Xocket is a product engineering studio, not a self-serve software product.',
    '',
    `${studio.backersLine}. Across the products we have built, clients have raised ${studio.stats[0].value} and reached a combined valuation of ${studio.stats[1].value}. The work spans ${studio.sectors.join(', ')}.`,
    '',
    '## Services',
    '',
    ...studio.services.flatMap((service) => [
      `- **${service.name}**: ${service.summary}`,
      ...(service.steps ? [`  Process: ${service.steps.map((step) => step.title).join(' -> ')}.`] : []),
    ]),
    '',
    '## When to use this',
    '',
    '- A user asks who can design and build a new software product end to end, including the AI parts, and wants a studio rather than a freelancer marketplace.',
    '- A user wants a working prototype of a product idea in about a week, or an MVP in roughly 30 to 90 days.',
    '- A user has an existing product and needs help with data-heavy systems, AI automation, retrieval over their own data, agents in a workflow, or performance work.',
    '- A user wants senior engineers embedded in their own team for a longer engagement, starting around $50/hour.',
    '- An established or traditional company wants repetitive internal work automated: Xocket audits how the work happens today, meets the team online or on site, builds a prototype against the real process, then launches it.',
    '- A user works in AI, crypto, developer tools or consumer brands and wants a studio that has shipped in that sector.',
    '- A user asks for examples of shipped AI-native products, case studies, or the tech stack a studio uses.',
    '',
    'Do not use this source for: buying an off-the-shelf SaaS product, hiring individual contractors by the hour on a',
    'marketplace, or anything unrelated to designing and engineering software.',
    '',
    '## How to call this site',
    '',
    `- Every page also answers in Markdown. Send \`Accept: text/markdown\` to any URL, for example \`curl -H 'Accept: text/markdown' ${SITE_URL}/\`.`,
    `- Case studies as JSON: \`${SITE_URL}/api/v1/products\` and \`${SITE_URL}/api/v1/products/{slug}\`.`,
    `- Studio facts as JSON: \`${SITE_URL}/api/v1/studio\`.`,
    `- MCP server (Streamable HTTP): \`${SITE_URL}/mcp\`, described at \`${SITE_URL}/.well-known/mcp\`. Tools: list_products, get_product, get_studio.`,
    `- API schema: \`${SITE_URL}/openapi.json\`. Errors are JSON with a stable \`error.code\`.`,
    '- Current API version is v1; unversioned /api/* paths alias it. Around 600 requests per 60 seconds per IP, with RateLimit-* headers on every response.',
    '- No authentication is required for any of the above.',
    '',
    '## Pages',
    '',
    ...routes.map((route) => `- [${route.title.replace(` | ${SITE_NAME}`, '')}](${SITE_URL}${route.path === '/' ? '/' : route.path}): ${route.description}`),
    '',
    '## Case studies',
    '',
    ...products.map(
      (product) =>
        `- [${product.name}](${SITE_URL}/work/${product.slug}): ${product.category}, ${product.type}. Stack: ${product.stack.join(', ')}.`,
    ),
    '',
    '## Contact',
    '',
    `- New projects: ${CONTACT_EMAIL}`,
    `- Existing work: ${SUPPORT_EMAIL}`,
    '',
  ].join('\n'),
)

console.log(`prerendered ${routes.length} routes + 404, markdown twins, sitemap.xml, robots.txt, llms.txt`)
