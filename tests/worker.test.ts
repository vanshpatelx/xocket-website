import { describe, expect, it } from 'vitest'
import {
  apiError,
  handleApi,
  markdownAssetPath,
  markdownResponse,
  normalizePath,
  parseAccept,
  prefersMarkdown,
} from '../worker/lib'
import { products } from '../src/data/products'

const get = (path: string) => {
  const url = new URL(`https://dev.xocket.sh${path}`)
  return { request: new Request(url, { method: 'GET' }), url }
}

describe('accept negotiation', () => {
  it('sorts media types by quality', () => {
    expect(parseAccept('text/html;q=0.8, text/markdown;q=0.9')).toEqual([
      { type: 'text/markdown', q: 0.9 },
      { type: 'text/html', q: 0.8 },
    ])
  })

  it('serves markdown when it is asked for', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true)
    expect(prefersMarkdown('text/x-markdown')).toBe(true)
    expect(prefersMarkdown('text/markdown, text/html;q=0.5')).toBe(true)
  })

  it('keeps html for browsers and unspecific clients', () => {
    expect(prefersMarkdown('text/html,application/xhtml+xml,*/*;q=0.8')).toBe(false)
    expect(prefersMarkdown('*/*')).toBe(false)
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown('text/html;q=1.0, text/markdown;q=0.1')).toBe(false)
  })

  it('maps page paths to their markdown twin', () => {
    expect(markdownAssetPath('/')).toBe('/_md/index.md')
    expect(markdownAssetPath('/work')).toBe('/_md/work.md')
    expect(markdownAssetPath('/work/')).toBe('/_md/work.md')
    expect(markdownAssetPath('/work/medesk')).toBe('/_md/work/medesk.md')
    expect(markdownAssetPath('/work/medesk.md')).toBe('/_md/work/medesk.md')
  })

  it('normalises trailing slashes and .md suffixes', () => {
    expect(normalizePath('/about/')).toBe('/about')
    expect(normalizePath('/about.md')).toBe('/about')
    expect(normalizePath('/')).toBe('/')
  })

  it('marks markdown responses as varying on accept', () => {
    const response = markdownResponse('# hi')
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8')
    expect(response.headers.get('vary')).toBe('Accept')
  })
})

describe('api', () => {
  it('ignores non-api paths', () => {
    const { request, url } = get('/work/medesk')
    expect(handleApi(request, url)).toBeNull()
  })

  it('lists products', async () => {
    const { request, url } = get('/api/products')
    const response = handleApi(request, url)!
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/json; charset=utf-8')
    expect(response.headers.get('access-control-allow-origin')).toBe('*')
    const body = await response.json()
    expect(body.count).toBe(products.length)
    expect(body.products[0]).toMatchObject({ slug: products[0].slug, name: products[0].name })
    expect(body.types.length).toBeGreaterThan(0)
  })

  it('filters products by type, case-insensitively', async () => {
    const { request, url } = get('/api/products?type=dashboard')
    const body = await handleApi(request, url)!.json()
    expect(body.count).toBeGreaterThan(0)
    expect(body.products.every((product: { type: string }) => product.type === 'Dashboard')).toBe(true)
  })

  it('returns a single product in full', async () => {
    const { request, url } = get('/api/products/medesk')
    const response = handleApi(request, url)!
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.slug).toBe('medesk')
    expect(body.caseStudy).not.toBeNull()
    expect(body.images[0]).toMatch(/^https:\/\//)
  })

  it('returns a json error for an unknown slug', async () => {
    const { request, url } = get('/api/products/nope')
    const response = handleApi(request, url)!
    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body.error.code).toBe('not_found')
    expect(body.error.status).toBe(404)
    expect(body.error.hint).toContain('/api/products')
  })

  it('returns a json error for an unknown type', async () => {
    const { request, url } = get('/api/products?type=Spaceship')
    const response = handleApi(request, url)!
    expect(response.status).toBe(404)
    expect((await response.json()).error.code).toBe('unknown_type')
  })

  it('returns a json error for an unknown endpoint', async () => {
    const { request, url } = get('/api/nope')
    const response = handleApi(request, url)!
    expect(response.status).toBe(404)
    expect((await response.json()).error.code).toBe('unknown_endpoint')
  })

  it('rejects writes with a json error and an Allow header', async () => {
    const url = new URL('https://dev.xocket.sh/api/products')
    const response = handleApi(new Request(url, { method: 'POST' }), url)!
    expect(response.status).toBe(405)
    expect(response.headers.get('allow')).toBe('GET, HEAD, OPTIONS')
    expect((await response.json()).error.code).toBe('method_not_allowed')
  })

  it('answers CORS preflight', () => {
    const url = new URL('https://dev.xocket.sh/api/products')
    const response = handleApi(new Request(url, { method: 'OPTIONS' }), url)!
    expect(response.status).toBe(204)
    expect(response.headers.get('access-control-allow-methods')).toContain('GET')
  })

  it('describes the studio', async () => {
    const { request, url } = get('/api/studio')
    const body = await handleApi(request, url)!.json()
    expect(body.contact.sales).toContain('@')
    expect(body.resources.openapi).toContain('/openapi.json')
    expect(body.services.length).toBeGreaterThan(0)
  })

  it('builds errors with every field agents branch on', () => {
    const { error } = apiError('code', 'message', 'hint', 400)
    expect(error).toEqual({ code: 'code', message: 'message', hint: 'hint', status: 400 })
  })
})
