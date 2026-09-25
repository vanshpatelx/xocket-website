import { SplitLayout } from "@/components/split-layout"
import { ArrowLeft } from "lucide-react"
import { useEffect, type ReactNode } from "react"
import { Link } from "react-router-dom"

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
    <SplitLayout
      panelLabel={`${title} panel`}
      panel={
        <>
          <Link
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            to="/"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
          <h1 className="text-2xl leading-8 font-bold tracking-normal text-balance text-foreground">
            {title}
          </h1>
          <p className="mt-4 text-base leading-6 font-medium text-muted-foreground">
            {intro}
          </p>
        </>
      }
      showcaseLabel={`${title} content`}
      showcase={
        <article className="p-6 sm:p-10">
          <div className="space-y-10 text-sm leading-6 text-muted-foreground">{children}</div>
        </article>
      }
    />
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
