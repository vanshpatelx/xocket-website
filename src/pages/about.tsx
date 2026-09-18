import { Section, TextPage } from "@/components/text-page"
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
          We work in three ways. The product studio takes an idea to a production-grade first release. The engineering
          lab takes on hard, specific systems inside a product that already exists. And we place senior engineers
          directly inside a client team for longer stretches of work.
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
