import { CONTACT_EMAIL } from "@/lib/site"
import { ArrowLeft } from "lucide-react"
import { useEffect, type ReactNode } from "react"
import { Link } from "react-router-dom"

const footerLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'API docs', to: '/docs' },
  { label: 'Privacy', to: '/privacy' },
]

type TextPageProps = {
  title: string
  /** Shown under the title and used as the page meta description when prerendered */
  intro: string
  documentTitle: string
  children: ReactNode
}

/** Shared shell for the written pages: about, contact, privacy and API docs. */
export function TextPage({ title, intro, documentTitle, children }: TextPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = documentTitle
  }, [documentTitle])

  return (
    <main className="page-grid relative z-[1] min-h-screen bg-background px-5 py-8 sm:px-8 md:py-10">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex items-center justify-between gap-4 border-b border-border/80 pb-6">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
          <Link className="flex items-center gap-2.5" to="/" aria-label="Xocket home">
            <img className="size-5" src="/favicon.svg" alt="" aria-hidden="true" />
            <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
          </Link>
        </header>

        <article className="py-12 sm:py-16">
          <h1 className="text-3xl leading-none font-bold tracking-tighter text-balance text-foreground uppercase sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-7 font-medium text-muted-foreground">{intro}</p>
          <div className="mt-10 space-y-10 text-sm leading-6 text-muted-foreground">{children}</div>
        </article>

        <footer className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/80 py-8">
          {footerLinks.map((link) => (
            <Link
              className="font-mono text-xs leading-4 tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="font-mono text-xs leading-4 tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </footer>
      </div>
    </main>
  )
}

/** Section heading used inside a TextPage. */
export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-xs leading-4 tracking-wide text-muted-foreground uppercase">{heading}</h2>
      <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">{children}</div>
    </section>
  )
}
