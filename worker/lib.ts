/** Pure helpers behind the Worker, kept separate so they can be unit tested. */
import { products, type Product } from '../src/data/products'
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from '../src/lib/site'

export type AcceptEntry = { type: string; q: number }

/** Media types that mean "give me Markdown". */
const MARKDOWN_TYPES = new Set(['text/markdown', 'text/x-markdown', 'application/markdown'])

/** Current REST API version. Unversioned /api/* paths are aliases of the newest version. */
export const API_VERSION = 'v1'

/** Documented request budget, enforced per edge location (see /docs). */
export const RATE_LIMIT = { limit: 600, windowSeconds: 60 }

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
  const markdown = entries.find((entry) => MARKDOWN_TYPES.has(entry.type))
  if (!markdown) return false
  const html = entries.find((entry) => entry.type === 'text/html' || entry.type === 'application/xhtml+xml')
  return !html || markdown.q >= html.q
}

/**
 * Looser test used for error responses: any mention of Markdown wins, even at a lower
 * quality than HTML. A client that names Markdown at all can read a Markdown error.
 */
export function acceptsMarkdown(header: string | null): boolean {
  return parseAccept(header).some((entry) => MARKDOWN_TYPES.has(entry.type))
}

/** Strips the trailing slash and any explicit .md suffix, so both spellings resolve alike. */
export function normalizePath(pathname: string): string {
  let path = pathname.replace(/\/+$/, '')
  if (path.endsWith('.md')) path = path.slice(0, -3)
  if (path === '' || path === '/index') path = '/'
  return path
}

/** Strips the /api/v1 prefix so versioned and unversioned API paths share one router. */
export function stripApiVersion(path: string): { path: string; versioned: boolean } {
  const match = path.match(/^\/api\/v(\d+)(\/.*)?$/)
  if (!match) return { path, versioned: false }
  return { path: `/api${match[2] ?? ''}`.replace(/\/$/, '') || '/api', versioned: true }
}

/**
 * Fixed-window request counter. Workers isolates are per edge location and short lived,
 * so this is an approximate budget rather than a global one; /docs says so plainly.
 */
const hits = new Map<string, { count: number; resetAt: number }>()

export type RateLimitState = { allowed: boolean; limit: number; remaining: number; resetSeconds: number }

export function checkRateLimit(key: string, now = Date.now()): RateLimitState {
  const windowMs = RATE_LIMIT.windowSeconds * 1000
  const existing = hits.get(key)
  const entry = existing && existing.resetAt > now ? existing : { count: 0, resetAt: now + windowMs }
  entry.count += 1
  hits.set(key, entry)

  if (hits.size > 10_000) {
    for (const [mapKey, value] of hits) if (value.resetAt <= now) hits.delete(mapKey)
  }

  return {
    allowed: entry.count <= RATE_LIMIT.limit,
    limit: RATE_LIMIT.limit,
    remaining: Math.max(0, RATE_LIMIT.limit - entry.count),
    resetSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
  }
}

export function rateLimitHeaders(state: RateLimitState): Record<string, string> {
  return {
    'RateLimit-Policy': `${state.limit};w=${RATE_LIMIT.windowSeconds}`,
    'RateLimit-Limit': String(state.limit),
    'RateLimit-Remaining': String(state.remaining),
    'RateLimit-Reset': String(state.resetSeconds),
    RateLimit: `limit=${state.limit}, remaining=${state.remaining}, reset=${state.resetSeconds}`,
  }
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
  'Access-Control-Allow-Headers': 'Accept, Content-Type, MCP-Protocol-Version',
  'Access-Control-Expose-Headers':
    'RateLimit, RateLimit-Policy, RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, Retry-After, X-API-Version, Deprecation, Sunset',
  'Access-Control-Max-Age': '86400',
}

export function jsonResponse(body: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store',
      'X-API-Version': API_VERSION,
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
    products: `${SITE_URL}/api/${API_VERSION}/products`,
    mcp: `${SITE_URL}/mcp`,
  },
}

/** Handles every /api/* route. Returns null when the path is not an API route. */
export function handleApi(request: Request, url: URL, clientKey = 'anonymous'): Response | null {
  const raw = normalizePath(url.pathname)
  if (raw !== '/api' && !raw.startsWith('/api/')) return null

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS })
  }

  const { path, versioned } = stripApiVersion(raw)

  // An unknown version is an error rather than a silent fallback to the newest one.
  const versionMatch = raw.match(/^\/api\/v(\d+)/)
  if (versionMatch && versionMatch[1] !== API_VERSION.slice(1)) {
    return jsonResponse(
      apiError(
        'unsupported_version',
        `API version v${versionMatch[1]} does not exist.`,
        `The current version is ${API_VERSION}: use ${SITE_URL}/api/${API_VERSION}${path.replace('/api', '')} or the unversioned alias.`,
        404,
      ),
      404,
    )
  }

  const rate = checkRateLimit(clientKey)
  const rateHeaders = rateLimitHeaders(rate)
  if (!rate.allowed) {
    return jsonResponse(
      apiError(
        'rate_limited',
        `Too many requests: the limit is ${RATE_LIMIT.limit} per ${RATE_LIMIT.windowSeconds} seconds.`,
        `Wait ${rate.resetSeconds} seconds and retry. See ${SITE_URL}/docs for the documented budget.`,
        429,
      ),
      429,
      { ...rateHeaders, 'Retry-After': String(rate.resetSeconds) },
    )
  }

  const withRate = (response: Response) => {
    for (const [key, value] of Object.entries(rateHeaders)) response.headers.set(key, value)
    if (versioned) response.headers.set('X-API-Version', API_VERSION)
    return response
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

  const route = (): Response => {
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

  return withRate(route())
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
