import { useEffect, useRef, type ReactNode } from "react"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

type SplitLayoutProps = {
  /** Content of the fixed left panel */
  panel: ReactNode
  panelLabel: string
  /** Scrollable showcase on the right (stacked under the panel on mobile) */
  showcase: ReactNode
  showcaseLabel: string
  /** Initial vertical scroll offset for the showcase panel */
  initialShowcaseScroll?: number
  showcaseClassName?: string
  /** Whether to suppress rendering the showcase at the bottom of the panel on mobile */
  hideMobileShowcase?: boolean
}

export function SplitLayout({
  panel,
  panelLabel,
  showcase,
  showcaseLabel,
  initialShowcaseScroll = 0,
  showcaseClassName,
  hideMobileShowcase = false,
}: SplitLayoutProps) {
  const showcaseRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (showcaseRef.current && initialShowcaseScroll > 0) {
      showcaseRef.current.scrollTop = initialShowcaseScroll
    }
  }, [initialShowcaseScroll])
  return (
    <main className="relative z-[1] flex min-h-screen bg-background md:h-screen md:overflow-hidden">
      <section
        className="relative block min-h-screen w-full bg-background md:h-full md:w-100 md:shrink-0 md:overflow-y-auto"
        aria-label={panelLabel}
      >
        <div className="left-panel-grid relative flex min-h-full w-full flex-col px-5 py-8 sm:px-8 md:py-10">
          <div className="relative z-10 flex flex-1 flex-col">
            <div>
              <div className="stagger">{panel}</div>

              {!hideMobileShowcase && (
                <div className="mt-12 md:hidden" aria-label={showcaseLabel}>
                  {showcase}
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <Footer />
          </div>
        </div>
      </section>

      <section
        ref={showcaseRef}
        className={cn(
          "hidden h-full flex-1 overflow-y-auto overscroll-contain bg-background md:block md:border-l md:border-border/80",
          showcaseClassName
        )}
        aria-label={showcaseLabel}
      >
        <div className="relative">{showcase}</div>
      </section>
    </main>
  )
}

