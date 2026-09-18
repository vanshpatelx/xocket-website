/**
 * Serves the prerendered site, plus the machine-readable surface agents need:
 * a read-only JSON API, Markdown content negotiation on every page, and real
 * HTTP 404s (HTML or Markdown) instead of the app shell.
 */
import { handleApi, markdownAssetPath, markdownResponse, notFoundMarkdown, prefersMarkdown } from './lib'

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
  const body = page.ok ? await page.text() : '<!doctype html><title>404 — Page not found</title><h1>404 — Page not found</h1>'
  return new Response(body, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'no-store',
    },
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    const api = handleApi(request, url)
    if (api) return api

    const wantsMarkdown = prefersMarkdown(request.headers.get('accept'))

    if (wantsMarkdown) {
      const asset = await env.ASSETS.fetch(new URL(markdownAssetPath(url.pathname), url.origin).toString())
      if (asset.ok) return markdownResponse(await asset.text())
      return notFound(request, env, true)
    }

    const asset = await env.ASSETS.fetch(request)
    if (asset.status === 404) return notFound(request, env, false)

    // Tell caches that this URL varies on Accept, since the same path can answer in Markdown.
    return withHeaders(asset, { Vary: 'Accept' })
  },
}
