import { buttonVariants } from "@/components/ui/button"
import { Mail } from "lucide-react"

const CONTACT_EMAIL = 'hello@xocket.studio'

const stats = [
  { value: '50+', label: 'Products built' },
  { value: '5d', label: 'To first prototype' },
  { value: '100%', label: 'Senior engineers' },
]

const products = [
  { name: 'Studio Site 1', image: '/showcase/site-1.png' },
  { name: 'Studio Site 2', image: '/showcase/site-2.png' },
  { name: 'Studio Site 1 Variation', image: '/showcase/site-1.png' },
  { name: 'Studio Site 2 Variation', image: '/showcase/site-2.png' },
  { name: 'Studio Site 1 Concept', image: '/showcase/site-1.png' },
  { name: 'Studio Site 2 Concept', image: '/showcase/site-2.png' },
]

function scrollToVisible(anchor: string) {
  const target = Array.from(document.querySelectorAll<HTMLElement>(`[data-anchor="${anchor}"]`))
    .find((el) => el.offsetParent !== null)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function XocketMark({ className }: { className?: string }) {
  return <img className={className} src="/favicon.svg" alt="" aria-hidden="true" />
}

function ProductShowcase() {
  return (
    <div className="grid gap-4" data-anchor="work">
      {products.map((product) => (
        <div className="overflow-hidden rounded-none" key={product.name}>
          <img
            className="block h-auto w-full rounded-none"
            src={product.image}
            alt={`${product.name} preview`}
          />
        </div>
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
    <main className="relative z-[1] flex min-h-screen bg-background md:h-screen md:overflow-hidden">
      <section className="left-panel-grid relative flex min-h-screen w-full flex-col overflow-hidden bg-background px-5 py-8 sm:px-8 md:h-full md:w-120 md:shrink-0 md:py-10" aria-label="Studio panel">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/90 via-foreground/25 to-transparent blur-lg md:-bottom-6 md:h-20" aria-hidden="true" />
        <div className="relative flex flex-1 flex-col">
          <div>
            <a className="mb-5 flex items-center gap-2.5 md:hidden" href="/" aria-label="Xocket home">
              <XocketMark className="size-5" />
              <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
            </a>
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 text-[10px] leading-4 font-semibold tracking-widest text-emerald-400 uppercase">
                <span className="size-2 bg-emerald-500" aria-hidden="true" />
                Open for projects
              </div>
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

            <div className="mt-12 md:hidden" aria-label="Studio showcase">
              <ProductShowcase />
            </div>
          </div>
        </div>
        <div className="relative flex shrink-0 flex-col items-start gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-0 md:pt-6">
          <a className="flex items-center gap-3" href="/" aria-label="Xocket home">
            <XocketMark className="size-7" />
            <span className="text-lg leading-6 font-bold text-foreground">Xocket</span>
          </a>
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
        aria-label="Studio showcase"
      >
        <ProductShowcase />
      </section>
    </main>
  )
}
