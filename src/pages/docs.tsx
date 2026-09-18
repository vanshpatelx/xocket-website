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

      <Section heading="GET /api/products">
        <p>Lists every case study. Accepts an optional <code className="text-foreground">type</code> query parameter, matching the type shown on the work gallery, such as Dashboard or Mobile App.</p>
        <Code>{`curl ${SITE_URL}/api/products
curl "${SITE_URL}/api/products?type=Dashboard"`}</Code>
      </Section>

      <Section heading="GET /api/products/{slug}">
        <p>Returns one case study in full, including its challenge, approach, features, outcome and tech stack.</p>
        <Code>{`curl ${SITE_URL}/api/products/medesk`}</Code>
      </Section>

      <Section heading="GET /api/studio">
        <p>Returns studio-level facts: what Xocket does, the services offered, contact addresses and the canonical URLs of the machine-readable files.</p>
        <Code>{`curl ${SITE_URL}/api/studio`}</Code>
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
