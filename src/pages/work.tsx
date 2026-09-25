import { Footer } from "@/components/footer"
import { products } from "@/data/products"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowUpRight, Check, ChevronDown } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

/** Filter tabs: "All" plus every unique product type */
const filters = ['All', ...Array.from(new Set(products.map((product) => product.type)))]

export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('type')
  const activeFilter = requested && filters.includes(requested) ? requested : 'All'
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="work-page-grid relative flex min-h-screen flex-col bg-background text-foreground">
      {/* Header with back button and filters */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-3.5 sm:px-10 sm:py-4 lg:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>Home</span>
          </Link>

          {/* Mobile Filter Dropdown */}
          <div className="relative sm:hidden" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 border border-border/80 bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-foreground transition-colors hover:border-foreground/30"
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
            >
              <span className="font-semibold text-foreground">{activeFilter}</span>
              <ChevronDown
                className={cn("size-3.5 text-muted-foreground transition-transform duration-200", dropdownOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 border border-border/80 bg-card/95 p-1 backdrop-blur-md shadow-xl z-50"
                role="listbox"
              >
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    role="option"
                    aria-selected={filter === activeFilter}
                    onClick={() => {
                      setActiveFilter(filter)
                      setDropdownOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 text-left font-mono text-xs uppercase tracking-wide transition-colors",
                      filter === activeFilter
                        ? "bg-foreground/10 font-semibold text-foreground"
                        : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                    )}
                  >
                    <span>{filter}</span>
                    {filter === activeFilter && <Check className="size-3.5 text-foreground" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Filter Pills */}
          <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-1.5">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`border px-2.5 py-1 font-mono text-xs uppercase tracking-wide transition-colors ${
                  filter === activeFilter
                    ? 'border-foreground/40 bg-foreground/10 font-semibold text-foreground'
                    : 'border-border/80 bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                }`}
                aria-pressed={filter === activeFilter}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="relative z-10 w-full flex-1 px-6 py-8 pb-12 sm:px-10 sm:py-10 sm:pb-16 lg:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <div
              key={product.slug}
              className="group relative flex flex-col justify-between overflow-hidden border border-border/80 bg-card"
            >
              {/* Card Screenshot Preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/80 bg-black/40">
                <img
                  className="h-full w-full object-cover object-center"
                  src={product.image}
                  alt=""
                />
              </div>

              {/* Card Bottom Area */}
              <div className="flex items-center justify-between gap-3 bg-white/[0.03] px-4 py-3">
                <div className="text-base font-bold text-foreground">
                  {product.name}
                </div>
                <Link
                  to={`/work/${product.slug}`}
                  className="inline-flex shrink-0 items-center gap-1.5 border border-foreground/30 bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background shadow-xs transition-colors hover:bg-foreground/90"
                  aria-label={`Open ${product.name}`}
                >
                  <span>Open</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-sm text-muted-foreground">No projects found for this filter.</p>
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="mt-3 font-mono text-xs text-foreground underline underline-offset-4"
            >
              Reset filter
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <div className="relative mt-auto w-full overflow-hidden">
        {/* Brand gradient glow anchored at bottom, edge-to-edge with soft upward atmospheric fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-0 overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 100%)',
            maskImage:
              'linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-x-0 bottom-0 h-full opacity-90 blur-3xl"
            style={{
              background:
                'linear-gradient(90deg, #7a00ff 0%, #00bbff 20%, #00f5a0 42%, #ffe600 62%, #ff7a00 82%, #ff005d 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 pb-8 sm:px-10 sm:pb-10 lg:px-12">
          <Footer hideGlow />
        </div>
      </div>
    </div>
  )
}
