import { SplitLayout } from "@/components/split-layout"
import { buttonVariants } from "@/components/ui/button"
import { products } from "@/data/products"
import { CONTACT_EMAIL } from "@/lib/site"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { useEffect, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"

/** Filter tabs: "All" plus every product type in use */
const filters = ['All', ...Array.from(new Set(products.map((product) => product.type)))]

export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('type')
  const activeFilter = requested && filters.includes(requested) ? requested : 'All'

  const setActiveFilter = (filter: string) => {
    setSearchParams(filter === 'All' ? {} : { type: filter }, { replace: true })
  }

  const visible = useMemo(
    () => (activeFilter === 'All' ? products : products.filter((product) => product.type === activeFilter)),
    [activeFilter],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Work | Xocket'
  }, [])

  return (
    <SplitLayout
      initialShowcaseScroll={240}
      panelLabel="Work panel"
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
            World class product engineering
          </h1>
          <p className="mt-4 text-base leading-6 font-medium text-muted-foreground">
            Products we have designed and shipped end to end, from first prototype to production.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Filter by product type below, or open any case study to read the problem, architecture, what we built, and the outcomes.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                className={`border px-2.5 py-1 font-mono text-xs uppercase tracking-wide transition-colors ${
                  filter === activeFilter
                    ? 'border-foreground/40 bg-foreground/10 font-semibold text-foreground'
                    : 'border-border/80 bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                }`}
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={filter === activeFilter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-border/80 pt-6">
            <div className="font-mono text-xs leading-4 tracking-wide text-muted-foreground uppercase">
              Work with us
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Have a complex product to build? Tell us what you’re building.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                className={buttonVariants({ variant: 'default' })}
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Build something with Xocket")}`}
              >
                Book a call
              </a>
              <a
                className="text-sm text-foreground underline-offset-4 hover:underline"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </>
      }
      showcaseLabel="Work showcase"
      showcase={
        <div className="grid gap-4">
          {visible.map((product) => (
            <div
              className="group relative block overflow-hidden rounded-none border border-border/80 bg-card"
              key={product.slug}
            >
              <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
                <img
                  className="block h-auto w-[200%] max-w-none origin-top-left rounded-none sm:w-full"
                  src={product.image}
                  alt={`${product.name} preview`}
                />
              </div>

              {/* Mobile: bottom section with title & Open in same line, badges in bottom line */}
              <div className="flex flex-col gap-2.5 border-t border-border/80 px-4 py-3 sm:hidden">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-base font-bold text-foreground">{product.name}</div>
                  <Link
                    to={`/work/${product.slug}`}
                    className="group/open inline-flex shrink-0 items-center gap-1.5 border border-foreground/30 bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background shadow-xs transition-all hover:bg-foreground/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Open ${product.name}`}
                  >
                    <span>Open</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/open:translate-x-0.5 group-hover/open:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.badges.map((badge) => (
                    <span
                      className="border border-border/80 bg-background/85 px-2 py-0.5 text-[11px] leading-4 font-medium text-muted-foreground backdrop-blur-md"
                      key={badge}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Desktop: clean uniform badges inside the image + dedicated Open button */}
              <div className="absolute inset-x-5 bottom-3 hidden flex-wrap items-center gap-1.5 sm:flex">
                {product.badges.map((badge) => (
                  <span
                    className="border border-border/80 bg-background/85 px-2.5 py-1 text-xs leading-5 font-medium text-muted-foreground backdrop-blur-md"
                    key={badge}
                  >
                    {badge}
                  </span>
                ))}
                <Link
                  to={`/work/${product.slug}`}
                  className="group/open ml-auto inline-flex items-center gap-1.5 border border-foreground/30 bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background shadow-xs transition-all hover:bg-foreground/90 hover:gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Open ${product.name}`}
                >
                  <span>Open</span>
                  <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/open:translate-x-0.5 group-hover/open:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}
