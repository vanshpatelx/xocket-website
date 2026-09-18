import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { products } from '../src/data/products'
import { routes } from '../src/entry-server'

const dist = join(import.meta.dirname, '..', 'dist')
const read = (file: string) => readFileSync(join(dist, file), 'utf8')

/** Visible text of a prerendered page, the way a crawler without JavaScript sees it. */
function visibleText(html: string) {
  return html
    .replace(/<head>[\s\S]*?<\/head>/, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const pageFile = (path: string) => (path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)

describe('prerendered pages', () => {
  it('renders every route to static html', () => {
    for (const route of routes) {
      expect(existsSync(join(dist, pageFile(route.path))), `${route.path} is missing`).toBe(true)
    }
  })

  it('serves meaningful content without javascript', () => {
    // The agent audit fails a homepage under 500 characters of raw text.
    expect(visibleText(read('index.html')).length).toBeGreaterThan(500)
    for (const route of routes) {
      expect(visibleText(read(pageFile(route.path))).length, `${route.path} is thin`).toBeGreaterThan(500)
    }
  })

  it('gives every page exactly one h1', () => {
    for (const route of routes) {
      const headings = read(pageFile(route.path)).match(/<h1[\s>]/g) ?? []
      expect(headings.length, `${route.path} has ${headings.length} h1s`).toBe(1)
    }
  })

  it('carries canonical, language and open graph metadata', () => {
    for (const route of routes) {
      const html = read(pageFile(route.path))
      expect(html).toContain('<html lang="en">')
      expect(html, `${route.path} canonical`).toMatch(/<link rel="canonical" href="https:\/\/dev\.xocket\.sh/)
      expect(html, `${route.path} og:type`).toMatch(/<meta property="og:type"/)
      expect(html, `${route.path} og:image`).toMatch(/<meta property="og:image" content="https:\/\/dev\.xocket\.sh\/og\.png"/)
      expect(html, `${route.path} og:title`).toMatch(/<meta property="og:title"/)
    }
  })

  it('embeds json-ld with organization details on the homepage', () => {
    const match = read('index.html').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    expect(match).not.toBeNull()
    const data = JSON.parse(match![1])
    const organization = data['@graph'].find((node: { '@type': string }) => node['@type'] === 'Organization')
    expect(organization.name).toBe('Xocket')
    expect(organization.contactPoint.length).toBeGreaterThan(0)
    expect(organization.contactPoint[0].email).toContain('@')
    expect(organization.url).toBe('https://dev.xocket.sh')
  })

  it('embeds json-ld on case study pages', () => {
    const match = read(pageFile(`/work/${products[0].slug}`)).match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )
    const data = JSON.parse(match![1])
    expect(data['@type']).toBe('CreativeWork')
    expect(data.name).toBe(products[0].name)
  })

  it('links the docs and machine-readable files from the homepage', () => {
    const html = read('index.html')
    expect(html).toContain('href="/docs"')
    expect(html).toContain('href="/llms.txt"')
    expect(html).toContain('href="/about"')
    expect(html).toContain('href="/contact"')
  })
})

describe('machine-readable files', () => {
  it('writes a markdown twin of every route', () => {
    for (const route of routes) {
      const file = route.path === '/' ? '_md/index.md' : `_md${route.path}.md`
      expect(existsSync(join(dist, file)), `${file} is missing`).toBe(true)
      expect(read(file).length).toBeGreaterThan(200)
    }
    expect(read('_md/404.md')).toContain('404')
  })

  it('lists every route in the sitemap', () => {
    const sitemap = read('sitemap.xml')
    expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    for (const route of routes) {
      const url = `https://dev.xocket.sh${route.path === '/' ? '/' : route.path}`
      expect(sitemap, `${url} missing from sitemap`).toContain(`<loc>${url}</loc>`)
    }
    expect(sitemap).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/)
  })

  it('allows ai crawlers in robots.txt and points at the sitemap', () => {
    const robots = read('robots.txt')
    for (const agent of ['GPTBot', 'ClaudeBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot']) {
      expect(robots, `${agent} missing`).toContain(`User-agent: ${agent}`)
    }
    expect(robots).toContain('Sitemap: https://dev.xocket.sh/sitemap.xml')
    expect(robots).not.toContain('Disallow: /')
  })

  it('tells agents when to use this studio in llms.txt', () => {
    const llms = read('llms.txt')
    expect(llms.startsWith('# Xocket')).toBe(true)
    expect(llms).toContain('## When to use this')
    expect(llms).toContain('## How to call this site')
    expect(llms).toContain('/openapi.json')
    for (const product of products) {
      expect(llms).toContain(`/work/${product.slug}`)
    }
  })

  it('publishes an openapi spec covering every endpoint', () => {
    const spec = JSON.parse(read('openapi.json'))
    expect(spec.openapi).toMatch(/^3\./)
    expect(spec.servers[0].url).toBe('https://dev.xocket.sh')
    const operations = Object.values(spec.paths).flatMap((path) => Object.values(path as object))
    expect(operations.length).toBe(3)
    const ids = operations.map((operation) => (operation as { operationId: string }).operationId)
    expect(new Set(ids).size).toBe(ids.length)
    for (const operation of operations as { description: string; responses: object }[]) {
      expect(operation.description.length).toBeGreaterThan(20)
      expect(Object.keys(operation.responses)).toContain('200')
    }
  })
})
