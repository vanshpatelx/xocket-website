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
}

export function SplitLayout({ panel, panelLabel, showcase, showcaseLabel }: SplitLayoutProps) {
  return (
    <main className="relative z-[1] flex min-h-screen bg-background md:h-screen md:overflow-hidden">
      <section className="left-panel-grid relative flex min-h-screen w-full flex-col overflow-hidden bg-background px-5 py-8 sm:px-8 md:h-full md:w-120 md:shrink-0 md:overflow-y-auto md:py-10" aria-label={panelLabel}>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/90 via-foreground/25 to-transparent blur-lg md:-bottom-6 md:h-20" aria-hidden="true" />
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
        className="hidden h-full flex-1 overflow-y-auto overscroll-contain bg-background md:block"
        aria-label={showcaseLabel}
      >
        {showcase}
      </section>
    </main>
  )
}
