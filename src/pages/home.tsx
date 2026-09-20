import { buttonVariants } from "@/components/ui/button"
import { SplitLayout } from "@/components/split-layout"
import { CONTACT_EMAIL } from "@/lib/site"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { products } from "@/data/products"
import { stats } from "@/data/studio"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

const partnerLogos = [
  { name: 'A16z', src: '/logos/a16z.svg', className: 'h-5 max-w-20' },
  { name: 'Antler', src: '/logos/antler.svg', className: 'h-4 max-w-20' },
  { name: 'Y Combinator', src: '/logos/y-combinator.svg', className: 'h-4 max-w-24' },
  { name: 'Sequoia Capital', src: '/logos/sequoia.svg', className: 'h-3.5 max-w-24' },
  { name: 'Accel', src: '/logos/accel.svg', className: 'h-4 max-w-20' },
  { name: 'Founders Fund', src: '/logos/founders-fund.svg', className: 'h-3.5 max-w-24' },
]


function ProductShowcase() {
  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <Link
          className="group relative block overflow-hidden rounded-none border border-border/80 bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          key={product.slug}
          to={`/work/${product.slug}`}
          aria-label={`Open ${product.name}`}
        >
          {/* Phones crop into the top-left of the screenshot so the UI stays readable */}
          <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
            <img
              className="block h-auto w-[180%] max-w-none rounded-none sm:w-full"
              src={product.image}
              alt={`${product.name} preview`}
            />
          </div>
          {/* Mobile: plain text, no boxes */}
          <div className="flex items-start justify-between gap-4 border-t border-border/80 px-4 py-3 sm:hidden">
            <div className="min-w-0">
              <div className="text-sm leading-5 font-semibold text-foreground">{product.name}</div>
              <div className="mt-1 text-xs leading-5 text-muted-foreground">
                {product.badges.join(' · ')}
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 pt-0.5 text-xs leading-5 font-medium text-foreground">
              Open
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>

          {/* Desktop: 3-4 clean badges inside the image */}
          <div className="absolute inset-x-5 bottom-3 hidden flex-wrap items-center gap-1.5 sm:flex">
            <span className="border border-foreground/25 bg-background/85 px-2.5 py-1 text-xs leading-5 font-semibold text-foreground backdrop-blur-md">
              {product.name}
            </span>
            {product.badges.map((badge) => (
              <span
                className="border border-border bg-background/85 px-2.5 py-1 text-xs leading-5 font-medium text-muted-foreground backdrop-blur-md"
                key={badge}
              >
                {badge}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-1 border border-border bg-background/85 px-2.5 py-1 text-xs leading-5 font-medium text-foreground backdrop-blur-md">
              Open
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
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
      <div className="mt-4 grid grid-cols-2 divide-x divide-y divide-border/80 overflow-hidden border border-border/80">
        {stats.map((stat) => (
          <div className="flex h-20 flex-col items-center justify-center px-2 text-center" key={stat.label}>
            <div className="text-xl leading-7 font-bold text-foreground">{stat.value}</div>
            <div className="text-[11px] leading-4 font-medium text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <Marquee pauseOnHover className="[--duration:25s] [--gap:2rem] py-1">
          {partnerLogos.map((logo) => (
            <div className="flex shrink-0 items-center justify-center px-2" key={logo.name}>
              <img
                src={logo.src}
                alt={logo.name}
                className={cn("w-auto object-contain opacity-60 transition-opacity hover:opacity-100", logo.className)}
              />
            </div>
          ))}
        </Marquee>
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
          <Link className="mb-6 inline-flex items-center gap-2.5" to="/" aria-label="Xocket home">
            <img className="size-5" src="/logo.svg" alt="" aria-hidden="true" />
            <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
          </Link>
          <h1 className="text-2xl leading-8 font-bold tracking-normal text-balance text-foreground">
            AI-native, end-to-end product engineering
          </h1>
          <p className="mt-4 text-base leading-6 font-medium text-muted-foreground">
            Senior engineers take your product from idea to launch, with a working prototype in five days.
          </p>
          <div className="mt-8 flex gap-2">
            <Link className={buttonVariants({ variant: 'secondary' })} to="/work">
              View work
            </Link>
            <a
              className={buttonVariants({ variant: 'default' })}
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's talk")}`}
            >
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
