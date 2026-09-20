import type { ReactNode } from "react"
import { Footer } from "@/components/footer"

type SplitLayoutProps = {
  /** Content of the fixed left panel */
  panel: ReactNode
  panelLabel: string
  /** Scrollable showcase on the right (stacked under the panel on mobile) */
  showcase: ReactNode
  showcaseLabel: string
  centerShowcase?: boolean
}

export function SplitLayout({ panel, panelLabel, showcase, showcaseLabel }: SplitLayoutProps) {
  return (
    <main className="relative z-[1] flex min-h-screen bg-background md:h-screen md:overflow-hidden">
      <section className="isolate relative flex min-h-screen w-full flex-col overflow-hidden bg-background px-5 py-8 sm:px-8 md:h-full md:w-100 md:shrink-0 md:overflow-y-auto md:py-10" aria-label={panelLabel}>
        <div className="grid-rules pointer-events-none fixed inset-y-0 left-0 z-0 w-full md:w-100" aria-hidden="true" />

        <div className="relative z-10 flex flex-1 flex-col">
          <div>
            <div className="stagger">{panel}</div>

            <div className="mt-12 md:hidden" aria-label={showcaseLabel}>
              {showcase}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto">
          <Footer />
        </div>
      </section>

      <section
        className="hidden h-full flex-1 overflow-y-auto overscroll-contain bg-background md:block"
        aria-label={showcaseLabel}
      >
        <div className="relative">{showcase}</div>
      </section>
    </main>
  )
}
