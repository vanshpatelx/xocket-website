import { Section, TextPage } from "@/components/text-page"
import { CONTACT_EMAIL } from "@/lib/site"

export default function Privacy() {
  return (
    <TextPage
      title="Privacy"
      documentTitle="Privacy | Xocket"
      intro="This site is a static marketing site. It sets no cookies, runs no analytics or advertising scripts, and has no accounts, forms or payment flows."
    >
      <Section heading="What this site collects">
        <p>
          Nothing is collected by the site itself. There is no analytics tag, no advertising or tracking pixel, no
          session cookie and no login. Pages are static files, so browsing the site does not create a profile of you
          anywhere in our systems. The only data stored in your browser is what you would expect from a normal page
          load: the browser's own cache of the files it downloaded.
        </p>
      </Section>

      <Section heading="What our host records">
        <p>
          The site is served through Cloudflare. Like any web host or content delivery network, Cloudflare processes
          the technical details of each request in order to deliver the page and protect the service, which can include
          IP address, user agent, the URL requested and a timestamp. That processing is carried out by Cloudflare as
          our hosting provider under its own terms and privacy documentation, and we do not use those logs to identify
          or profile individual visitors.
        </p>
      </Section>

      <Section heading="If you email us">
        <p>
          When you write to us, we hold your message and your email address so we can reply and keep a record of the
          conversation. We use that information for correspondence about your enquiry or project, and we do not sell it
          or pass it to third parties for their own marketing. Email is handled through our email provider, which
          processes messages on our behalf in order to deliver them.
        </p>
      </Section>

      <Section heading="Your choices">
        <p>
          You can ask us what correspondence we hold about you, ask for a copy of it, ask us to correct it, or ask us
          to delete it. Write to{' '}
          <a className="text-foreground underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
          and we will act on the request. Depending on where you live, local law may give you further rights over your
          personal data, and nothing here limits them.
        </p>
      </Section>

      <Section heading="Changes">
        <p>
          If this site starts collecting anything, for example if we add analytics or a contact form, this page will be
          updated before that change goes live. Questions about privacy can go to the same address above.
        </p>
      </Section>
    </TextPage>
  )
}
