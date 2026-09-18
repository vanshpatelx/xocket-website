import { Section, TextPage } from "@/components/text-page"
import { CONTACT_EMAIL, SUPPORT_EMAIL } from "@/lib/site"
import { Link } from "react-router-dom"

export default function Contact() {
  return (
    <TextPage
      title="Contact Xocket"
      documentTitle="Contact | Xocket"
      intro="Email is the way in. Tell us what you are building and we will tell you honestly whether we are the right studio for it."
    >
      <Section heading="Email">
        <p>
          For new projects, scoping questions and anything commercial, write to{' '}
          <a className="text-foreground underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          For questions about work already under way, use{' '}
          <a className="text-foreground underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </Section>

      <Section heading="What to include">
        <p>
          A first email is more useful to both sides when it covers a few things: what the product does or is meant to
          do, who it is for, what already exists (designs, a prototype, a live product, nothing yet), what is blocking
          progress right now, and roughly when you need it. Budget range and any hard constraints such as compliance,
          an existing stack or a fixed launch date help us answer quickly instead of guessing.
        </p>
        <p>
          If it is easier to show than describe, links to a repository, a Figma file, a staging environment or a short
          screen recording are welcome. We will read them before replying.
        </p>
      </Section>

      <Section heading="What happens next">
        <p>
          We reply with either a set of questions, an outline of how we would approach the work, or a straight answer
          that it is not a fit for us. If it looks like a fit, the next step is usually a call to walk through the
          problem in detail, followed by a written scope covering what the first phase includes, what it costs and how
          long it takes.
        </p>
      </Section>

      <Section heading="For AI agents">
        <p>
          Machine-readable details about this studio live at{' '}
          <a className="text-foreground underline underline-offset-4" href="/llms.txt">/llms.txt</a>, the case study API
          is documented at <Link className="text-foreground underline underline-offset-4" to="/docs">/docs</Link>, and
          the schema is published at{' '}
          <a className="text-foreground underline underline-offset-4" href="/openapi.json">/openapi.json</a>.
        </p>
      </Section>
    </TextPage>
  )
}
