import { CONTACT_EMAIL } from "@/lib/site"
import { Mail } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

function XocketMark({ className }: { className?: string }) {
  return <img className={className} src="/favicon.svg" alt="" aria-hidden="true" />
}

type SplitLayoutProps = {
  /** Content of the fixed left panel */
  panel: ReactNode
  panelLabel: string
  /** Scrollable showcase on the right (stacked under the panel on mobile) */
  showcase: ReactNode
  showcaseLabel: string
  /** Centre the showcase in its column, for pages with only a screenshot or two */
  centerShowcase?: boolean
}

export function SplitLayout({ panel, panelLabel, showcase, showcaseLabel, centerShowcase }: SplitLayoutProps) {
  return (
    <main className="relative z-[1] flex min-h-screen bg-background md:h-screen md:overflow-hidden">
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background px-5 py-8 sm:px-8 md:h-full md:w-100 md:shrink-0 md:overflow-y-auto md:py-10" aria-label={panelLabel}>
        <div className="grid-rules pointer-events-none fixed inset-y-0 left-0 z-0 w-full md:w-100" aria-hidden="true" />
        <div className="relative flex flex-1 flex-col">
          <div>
            <Link className="mb-5 flex items-center gap-2.5 md:hidden" to="/" aria-label="Xocket home">
              <XocketMark className="size-5" />
              <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
            </Link>
            <div className="stagger">{panel}</div>

            <div className="mt-12 md:hidden" aria-label={showcaseLabel}>
              {showcase}
            </div>
          </div>
        </div>
        <div className="relative flex shrink-0 flex-col items-start gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-0 md:pt-6">
          <Link className="flex items-center gap-3" to="/" aria-label="Xocket home">
            <XocketMark className="size-7" />
            <span className="text-lg leading-6 font-bold text-foreground">Xocket</span>
          </Link>
          <div className="flex gap-2" aria-label="Contact links">
            <a
              className="inline-flex size-9 items-center justify-center border bg-card text-muted-foreground transition-colors hover:text-foreground"
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email Xocket"
            >
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section
        className={`hidden h-full flex-1 overflow-y-auto overscroll-contain bg-background md:block ${
          centerShowcase ? 'p-4' : ''
        }`}
        aria-label={showcaseLabel}
      >
        <div className="grid-rules pointer-events-none fixed inset-y-0 right-0 z-[1] hidden w-[calc(100%-25rem)] md:block" aria-hidden="true" />
        <div className={centerShowcase ? 'relative flex min-h-full flex-col justify-center' : 'relative'}>{showcase}</div>
      </section>
    </main>
  )
}
