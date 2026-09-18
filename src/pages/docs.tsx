import { Section, TextPage } from "@/components/text-page"
import { SITE_URL } from "@/lib/site"

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border border-border/80 bg-card p-4 font-mono text-xs leading-5 text-foreground/90">
      <code>{children}</code>
    </pre>
  )
}

export default function Docs() {
  return (
    <TextPage
      title="API docs"
      documentTitle="API docs | Xocket"
      intro="A small public read-only API describing Xocket's case studies, so agents and scripts can read our work without scraping the pages."
    >
      <Section heading="Basics">
        <p>
          The base URL is <code className="text-foreground">{SITE_URL}</code>. No authentication, no API keys and no
          rate limit beyond ordinary edge protection. Every endpoint returns JSON with{' '}
          <code className="text-foreground">Content-Type: application/json</code> and permissive CORS, so it can be
          called from a browser. The machine-readable schema is at{' '}
          <a className="text-foreground underline underline-offset-4" href="/openapi.json">/openapi.json</a>.
        </p>
      </Section>

      <Section heading="GET /api/v1/products">
        <p>Lists every case study. Accepts an optional <code className="text-foreground">type</code> query parameter, matching the type shown on the work gallery, such as Dashboard or Mobile App.</p>
        <Code>{`curl ${SITE_URL}/api/v1/products
curl "${SITE_URL}/api/v1/products?type=Dashboard"`}</Code>
      </Section>

      <Section heading="GET /api/v1/products/{slug}">
        <p>Returns one case study in full, including its challenge, approach, features, outcome and tech stack.</p>
        <Code>{`curl ${SITE_URL}/api/v1/products/medesk`}</Code>
      </Section>

      <Section heading="GET /api/v1/studio">
        <p>Returns studio-level facts: what Xocket does, the services offered, contact addresses and the canonical URLs of the machine-readable files.</p>
        <Code>{`curl ${SITE_URL}/api/v1/studio`}</Code>
      </Section>

      <Section heading="Errors">
        <p>
          Errors are JSON, never HTML, and carry a stable <code className="text-foreground">error.code</code>, a human
          readable message and a hint describing what to do next.
        </p>
        <Code>{`{
  "error": {
    "code": "not_found",
    "message": "No product exists with the slug 'nope'.",
    "hint": "List available products at /api/products",
    "status": 404
  }
}`}</Code>
      </Section>

      <Section heading="Versioning">
        <p>
          The current version is <code className="text-foreground">v1</code>, addressed at{' '}
          <code className="text-foreground">/api/v1/*</code>. The unversioned{' '}
          <code className="text-foreground">/api/*</code> paths are aliases of the newest version, so integrate against
          the versioned paths if you want stability. Every response carries an{' '}
          <code className="text-foreground">X-API-Version</code> header, and asking for a version that does not exist
          returns 404 with <code className="text-foreground">error.code = unsupported_version</code>.
        </p>
        <p>
          A version stays available for at least six months after its successor ships. Breaking changes never land
          inside a version: they arrive as a new one. Once a version is deprecated its responses carry{' '}
          <code className="text-foreground">Deprecation: true</code> and a <code className="text-foreground">Sunset</code>{' '}
          date, and the replacement is named in the response.
        </p>
      </Section>

      <Section heading="Rate limits">
        <p>
          Around 600 requests per 60 seconds per client IP. The counter runs at each Cloudflare edge location rather
          than globally, so treat the budget as approximate. Every API response carries{' '}
          <code className="text-foreground">RateLimit-Limit</code>,{' '}
          <code className="text-foreground">RateLimit-Remaining</code>,{' '}
          <code className="text-foreground">RateLimit-Reset</code> and{' '}
          <code className="text-foreground">RateLimit-Policy</code>, so you can self-throttle. Going over returns 429
          with <code className="text-foreground">Retry-After</code> and{' '}
          <code className="text-foreground">error.code = rate_limited</code>.
        </p>
      </Section>

      <Section heading="MCP server">
        <p>
          The same data is exposed as MCP tools over Streamable HTTP at{' '}
          <code className="text-foreground">{SITE_URL}/mcp</code>, described at{' '}
          <a className="text-foreground underline underline-offset-4" href="/.well-known/mcp">/.well-known/mcp</a>. The
          tools are <code className="text-foreground">list_products</code>,{' '}
          <code className="text-foreground">get_product</code> and{' '}
          <code className="text-foreground">get_studio</code>. No authentication.
        </p>
        <Code>{`curl -X POST ${SITE_URL}/mcp \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`}</Code>
      </Section>

      <Section heading="Markdown instead of HTML">
        <p>
          Every page on this site also answers in Markdown. Send{' '}
          <code className="text-foreground">Accept: text/markdown</code> and you get a Markdown version of the page
          rather than the HTML one.
        </p>
        <Code>{`curl -H 'Accept: text/markdown' ${SITE_URL}/work/medesk`}</Code>
      </Section>
    </TextPage>
  )
}
