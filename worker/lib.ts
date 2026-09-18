/** Pure helpers behind the Worker, kept separate so they can be unit tested. */
import { products, type Product } from '../src/data/products'
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from '../src/lib/site'

export type AcceptEntry = { type: string; q: number }

/** Parses an Accept header into media types with their quality values, best first. */
export function parseAccept(header: string | null): AcceptEntry[] {
  if (!header) return []
  return header
    .split(',')
    .map((part) => {
      const [type, ...params] = part.split(';').map((value) => value.trim().toLowerCase())
      const qParam = params.find((param) => param.startsWith('q='))
      const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1
      return { type, q: Number.isFinite(q) ? q : 1 }
    })
    .filter((entry) => entry.type && entry.q > 0)
    .sort((a, b) => b.q - a.q)
}

/**
 * True when the client asked for Markdown at least as strongly as HTML.
 * Browsers send `text/html,...` so they keep getting HTML; agents sending
 * `Accept: text/markdown` get Markdown.
 */
export function prefersMarkdown(header: string | null): boolean {
  const entries = parseAccept(header)
  const markdown = entries.find((entry) => entry.type === 'text/markdown' || entry.type === 'text/x-markdown')
  if (!markdown) return false
  const html = entries.find((entry) => entry.type === 'text/html' || entry.type === 'application/xhtml+xml')
  return !html || markdown.q >= html.q
}

/** Strips the trailing slash and any explicit .md suffix, so both spellings resolve alike. */
export function normalizePath(pathname: string): string {
  let path = pathname.replace(/\/+$/, '')
  if (path.endsWith('.md')) path = path.slice(0, -3)
  if (path === '' || path === '/index') path = '/'
  return path
}

/** Where the prerendered Markdown twin of a page lives in the asset bundle. */
export function markdownAssetPath(pathname: string): string {
  const path = normalizePath(pathname)
  return path === '/' ? '/_md/index.md' : `/_md${path}.md`
}

export type ApiError = {
  error: { code: string; message: string; hint: string; status: number }
}

export function apiError(code: string, message: string, hint: string, status: number): ApiError {
  return { error: { code, message, hint, status } }
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Accept, Content-Type',
  'Access-Control-Max-Age': '86400',
}

export function jsonResponse(body: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store',
      ...CORS,
      ...extraHeaders,
    },
  })
}

function publicProduct(product: Product) {
  return {
    slug: product.slug,
    name: product.name,
    type: product.type,
    industry: product.category,
    year: product.year,
    client: product.client,
    stage: product.stage,
    engagement: product.engagement,
    results: product.results ?? null,
    website: product.url ?? null,
    stack: product.stack,
    services: product.services,
    summary: product.intro[0],
    url: `${SITE_URL}/work/${product.slug}`,
    markdownUrl: `${SITE_URL}/work/${product.slug}.md`,
  }
}

function fullProduct(product: Product) {
  return {
    ...publicProduct(product),
    description: product.intro,
    images: [product.image, ...(product.gallery ?? [])].map((path) => `${SITE_URL}${path}`),
    caseStudy: product.caseStudy ?? null,
  }
}

const studio = {
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  services: [
    {
      name: 'AI Product Studio',
      summary: 'Idea to production-grade first release: strategy, design, full-stack and AI engineering, launch.',
    },
    {
      name: 'AI Engineering Lab',
      summary: 'Hard systems inside an existing product: data-heavy platforms, AI automation, performance work.',
    },
    {
      name: 'Dedicated AI Engineers',
      summary: 'Senior engineers embedded in your team, starting around $50/hour.',
    },
  ],
  contact: { sales: CONTACT_EMAIL, support: SUPPORT_EMAIL },
  resources: {
    openapi: `${SITE_URL}/openapi.json`,
    llmsTxt: `${SITE_URL}/llms.txt`,
    sitemap: `${SITE_URL}/sitemap.xml`,
    docs: `${SITE_URL}/docs`,
    products: `${SITE_URL}/api/products`,
  },
}

/** Handles every /api/* route. Returns null when the path is not an API route. */
export function handleApi(request: Request, url: URL): Response | null {
  const path = normalizePath(url.pathname)
  if (path !== '/api' && !path.startsWith('/api/')) return null

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS })
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return jsonResponse(
      apiError(
        'method_not_allowed',
        `This API is read-only; ${request.method} is not supported.`,
        'Use GET. See /openapi.json for the available operations.',
        405,
      ),
      405,
      { Allow: 'GET, HEAD, OPTIONS' },
    )
  }

  if (path === '/api' || path === '/api/') {
    return jsonResponse({
      name: `${SITE_NAME} public API`,
      description: 'Read-only JSON API describing this studio and its case studies.',
      endpoints: {
        studio: `${SITE_URL}/api/studio`,
        products: `${SITE_URL}/api/products`,
        product: `${SITE_URL}/api/products/{slug}`,
      },
      openapi: `${SITE_URL}/openapi.json`,
      documentation: `${SITE_URL}/docs`,
    })
  }

  if (path === '/api/studio') return jsonResponse(studio)

  if (path === '/api/products') {
    const type = url.searchParams.get('type')
    const matches = type
      ? products.filter((product) => product.type.toLowerCase() === type.toLowerCase())
      : products
    if (type && matches.length === 0) {
      return jsonResponse(
        apiError(
          'unknown_type',
          `No products have the type '${type}'.`,
          `Available types: ${[...new Set(products.map((product) => product.type))].join(', ')}`,
          404,
        ),
        404,
      )
    }
    return jsonResponse({
      count: matches.length,
      type: type ?? null,
      types: [...new Set(products.map((product) => product.type))],
      products: matches.map(publicProduct),
    })
  }

  const productMatch = path.match(/^\/api\/products\/([^/]+)$/)
  if (productMatch) {
    const slug = decodeURIComponent(productMatch[1])
    const product = products.find((item) => item.slug === slug)
    if (!product) {
      return jsonResponse(
        apiError(
          'not_found',
          `No product exists with the slug '${slug}'.`,
          `List available products at ${SITE_URL}/api/products`,
          404,
        ),
        404,
      )
    }
    return jsonResponse(fullProduct(product))
  }

  return jsonResponse(
    apiError(
      'unknown_endpoint',
      `No API endpoint exists at ${url.pathname}.`,
      `Available endpoints are listed at ${SITE_URL}/api and described in ${SITE_URL}/openapi.json`,
      404,
    ),
    404,
  )
}

export function markdownResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export const notFoundMarkdown = [
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
].join('\n')
