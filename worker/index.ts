/**
 * Serves the prerendered site, plus the machine-readable surface agents need:
 * a read-only JSON API, an MCP server, Markdown content negotiation on every page,
 * and real HTTP 404s (HTML or Markdown) instead of the app shell.
 */
import {
  acceptsMarkdown,
  handleApi,
  markdownAssetPath,
  markdownResponse,
  normalizePath,
  notFoundMarkdown,
  prefersMarkdown,
} from './lib'
import { handleMcp, manifest } from './mcp'

type Env = {
  ASSETS: { fetch: (request: Request | string) => Promise<Response> }
}

function withHeaders(response: Response, headers: Record<string, string>): Response {
  const next = new Response(response.body, response)
  for (const [key, value] of Object.entries(headers)) next.headers.set(key, value)
  return next
}

async function notFound(request: Request, env: Env, wantsMarkdown: boolean): Promise<Response> {
  if (wantsMarkdown) {
    const asset = await env.ASSETS.fetch(new URL('/_md/404.md', request.url).toString())
    const body = asset.ok ? await asset.text() : notFoundMarkdown
    return markdownResponse(body, 404)
  }

  const page = await env.ASSETS.fetch(new URL('/404.html', request.url).toString())
  const body = page.ok
    ? await page.text()
    : '<!doctype html><title>404 — Page not found</title><h1>404 — Page not found</h1>'
  return new Response(body, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'no-store',
      Link: '</_md/404.md>; rel="alternate"; type="text/markdown"',
    },
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = normalizePath(url.pathname)

    if (path === '/mcp') return handleMcp(request)

    if (path === '/.well-known/mcp' || path === '/.well-known/mcp.json') {
      return new Response(`${JSON.stringify(manifest, null, 2)}\n`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // Rate limiting is per client IP, falling back to a shared bucket when absent.
    const clientKey = request.headers.get('cf-connecting-ip') ?? 'anonymous'
    const api = handleApi(request, url, clientKey)
    if (api) return api

    const accept = request.headers.get('accept')

    if (prefersMarkdown(accept)) {
      const asset = await env.ASSETS.fetch(new URL(markdownAssetPath(url.pathname), url.origin).toString())
      if (asset.ok) return markdownResponse(await asset.text())
      return notFound(request, env, true)
    }

    const asset = await env.ASSETS.fetch(request)
    if (asset.status === 404) {
      // On an error any mention of Markdown is enough: an agent that named it can read it.
      return notFound(request, env, acceptsMarkdown(accept))
    }

    const markdownUrl = path === '/' ? '/index.md' : `${path}.md`
    return withHeaders(asset, {
      Vary: 'Accept',
      Link: `<${markdownUrl}>; rel="alternate"; type="text/markdown"`,
    })
  },
}
