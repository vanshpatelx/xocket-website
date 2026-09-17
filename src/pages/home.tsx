import { buttonVariants } from "@/components/ui/button"
import { SplitLayout } from "@/components/split-layout"
import { CONTACT_EMAIL } from "@/lib/site"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { products } from "@/data/products"

const stats = [
  { value: '50+', label: 'Products built' },
  { value: '5d', label: 'To first prototype' },
  { value: '100%', label: 'Senior engineers' },
]

function scrollToVisible(anchor: string) {
  const target = Array.from(document.querySelectorAll<HTMLElement>(`[data-anchor="${anchor}"]`))
    .find((el) => el.offsetParent !== null)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ProductShowcase() {
  return (
    <div className="grid gap-4" data-anchor="work">
      {products.map((product) => (
        <Link
          className="group relative block overflow-hidden rounded-none border border-border/80 bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          key={product.slug}
          to={`/work/${product.slug}`}
          aria-label={`Open ${product.name}`}
        >
          <img
            className="block h-auto w-full rounded-none transition-transform duration-500 group-hover:scale-[1.01]"
            src={product.image}
            alt={`${product.name} preview`}
          />
          <div className="flex flex-col gap-3 border-t border-border/80 bg-card px-4 py-3 sm:absolute sm:inset-x-5 sm:bottom-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:border sm:bg-background/85 sm:py-2.5 sm:backdrop-blur-md">
            <div className="flex min-w-0 items-center gap-3 sm:shrink-0">
              <span className="shrink-0 text-sm leading-5 font-bold text-foreground">{product.name}</span>
              <span className="truncate text-xs leading-5 font-medium text-muted-foreground">{product.category}</span>
              <span className="inline-flex shrink-0 items-center gap-1 text-xs leading-5 font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                Open
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </div>
            <div className="flex min-w-0 flex-wrap gap-1.5 sm:flex-nowrap sm:overflow-hidden">
              {[product.type, ...product.stack].map((tag, tagIndex) => (
                <span
                  className={`shrink-0 border px-2 py-0.5 text-[11px] leading-4 font-medium ${
                    tagIndex === 0 ? 'border-foreground/25 bg-foreground/10 text-foreground' : 'border-border bg-card/80 text-muted-foreground'
                  } ${tagIndex >= 3 ? 'sm:hidden xl:inline-block' : ''}`}
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

// Shipping counters shown in the badge at the top of the page
const shipped = [
  { value: 87, label: 'products shipped in 2026' },
  { value: 27, label: 'in Q3' },
]

function useCountUp(target: number, duration = 1400) {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [count, setCount] = useState(reducedMotion ? target : 0)

  useEffect(() => {
    if (reducedMotion) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, reducedMotion])

  return count
}

function ShippedCount({ value, label }: { value: number; label: string }) {
  const count = useCountUp(value)
  return (
    <span>
      <span className="font-bold text-foreground tabular-nums">{count}+</span> {label}
    </span>
  )
}

function ShippedBadge() {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-border/80 bg-card/60 px-3 py-1.5 text-xs leading-4 font-medium text-muted-foreground"
      aria-label={shipped.map((item) => `${item.value}+ ${item.label}`).join(', ')}
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping bg-foreground opacity-40" />
        <span className="relative inline-flex size-2 bg-foreground" />
      </span>
      {shipped.map((item, index) => (
        <span className="flex items-center gap-3" key={item.label} aria-hidden="true">
          {index > 0 && <span className="h-3 w-px bg-border" />}
          <ShippedCount value={item.value} label={item.label} />
        </span>
      ))}
    </div>
  )
}

function Stats() {
  return (
    <div className="mt-12" aria-label="Xocket by the numbers">
      <div className="text-xs leading-4 font-semibold tracking-widest text-muted-foreground uppercase">
        By the numbers
      </div>
      <div className="mt-4 grid grid-cols-3 divide-x divide-border/80 overflow-hidden border border-border/80">
        {stats.map((stat) => (
          <div className="flex h-20 flex-col items-center justify-center px-2 text-center" key={stat.label}>
            <div className="text-xl leading-7 font-bold text-foreground">{stat.value}</div>
            <div className="text-[11px] leading-4 font-medium text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <SplitLayout
      panelLabel="Studio panel"
      panel={
        <>
          <div className="mb-5">
            <ShippedBadge />
          </div>
          <h1 className="text-2xl leading-8 font-bold tracking-normal text-balance text-foreground">
            AI-native, end-to-end product engineering
          </h1>
          <p className="mt-4 text-base leading-6 font-medium text-muted-foreground">
            Xocket is an AI-native product engineering studio. Senior engineers take your product end to end, from strategy and design to AI-powered engineering and launch, with a working prototype in five days.
          </p>
          <div className="mt-8 flex gap-2">
            <button className={buttonVariants({ variant: 'secondary' })} type="button" onClick={() => scrollToVisible('work')}>
              View work
            </button>
            <a className={buttonVariants({ variant: 'default' })} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's talk")}`}>
              Book a call
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </div>
          <Stats />
        </>
      }
      showcaseLabel="Studio showcase"
      showcase={<ProductShowcase />}
    />
  )
}
