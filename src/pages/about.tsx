import { Section, TextPage } from "@/components/text-page"
import { backersLine, sectors, services, stats } from "@/data/studio"
import { CONTACT_EMAIL } from "@/lib/site"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <TextPage
      title="About Xocket"
      documentTitle="About | Xocket"
      intro="Xocket is an AI-native, end-to-end product engineering studio. We take products from an idea to something running in production, and we stay with them afterwards."
    >
      <Section heading="What we do">
        <p>
          Xocket designs and builds software products end to end. That covers product strategy, interface design,
          full-stack engineering, AI engineering, and the launch and operations work that follows. Teams come to us
          either to get a first version of a product into the world, or to take on the engineering problems inside an
          existing product that other teams have avoided: data-heavy systems, complex workflows and AI features that
          need to be dependable rather than impressive in a demo.
        </p>
        <p>
          We work in four ways, listed below. Three of them build new products; the fourth takes an established company
          that already runs on people and spreadsheets and automates the repetitive parts of how it works.
        </p>
        <div className="space-y-5 border-y border-border/80 py-5">
          {services.map((service) => (
            <div key={service.name}>
              <h3 className="text-sm leading-6 font-medium text-foreground">{service.name}</h3>
              <p className="mt-1">{service.summary}</p>
              {service.steps && (
                <ol className="mt-3 space-y-2">
                  {service.steps.map((step, index) => (
                    <li key={step.title}>
                      <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                        {index + 1}. {step.title}
                      </span>{' '}
                      <span className="text-foreground/90">{step.description}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section heading="By the numbers">
        <p>
          {backersLine}. Across the products we have built, clients have raised{' '}
          <strong className="font-medium text-foreground">{stats[0].value.replace('+', '')} or more</strong> and reached
          a combined valuation of <strong className="font-medium text-foreground">{stats[1].value}</strong>.
        </p>
        <p>
          The work spans {sectors.slice(0, -1).join(', ')} and {sectors[sectors.length - 1]},
          which keeps us close to the parts of each field that are actually shipping rather than the parts that are
          being announced.
        </p>
      </Section>

      <Section heading="How we work">
        <p>
          Every engagement starts by agreeing on what is being built and why, so the work is scoped against a real
          problem rather than a feature list. From there we aim for a working prototype in about five days: something
          clickable that makes the idea concrete before production code is written.
        </p>
        <p>
          The people who scope your product are the people who build it. There are no account managers in between and
          no handoff to a different team once the contract is signed. Work is reviewed, tested and built to keep
          running: security, CI/CD and monitoring are part of the build, not a later phase.
        </p>
      </Section>

      <Section heading="AI, specifically">
        <p>
          AI-native means the product is designed with AI in it from the start, rather than having a chat box attached
          at the end. In practice that is retrieval over a customer's own data, agents that take real actions in a
          workflow, and automation of steps that used to be manual. It also means being clear about where AI does not
          belong, because an unreliable answer in the wrong place costs more than it saves.
        </p>
      </Section>

      <Section heading="Working with us">
        <p>
          The clearest way to start is an email describing what you are building, where it is now and what is in the
          way. Write to <a className="text-foreground underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
          or read through <Link className="text-foreground underline underline-offset-4" to="/work">our work</Link> first.
        </p>
      </Section>
    </TextPage>
  )
}
