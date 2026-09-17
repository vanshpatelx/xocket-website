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
      {products.map((product, index) => (
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
          <div
            className={`flex items-center gap-3 border-t border-border/80 bg-card px-4 py-2.5 sm:absolute sm:bottom-5 sm:max-w-[calc(100%-2.5rem)] sm:border sm:bg-background/85 sm:backdrop-blur-md ${
              index % 2 === 0 ? 'sm:left-5' : 'sm:right-5'
            }`}
          >
            <span className="shrink-0 text-sm leading-5 font-bold text-foreground">{product.name}</span>
            <span className="truncate text-xs leading-5 font-medium text-muted-foreground">
              {[product.category, ...product.stack].join(' · ')}
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
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
        <span className="absolute inline-flex size-full animate-ping bg-primary opacity-60" />
        <span className="relative inline-flex size-2 bg-primary" />
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
