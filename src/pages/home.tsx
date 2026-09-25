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
  { name: 'A16z', src: '/logos/a16z.svg', className: 'h-8 max-w-32' },
  { name: 'Antler', src: '/logos/antler.svg', className: 'h-6 max-w-32' },
  { name: 'Y Combinator', src: '/logos/y-combinator.svg', className: 'h-6 max-w-36' },
  { name: 'Sequoia Capital', src: '/logos/sequoia.svg', className: 'h-5 max-w-36' },
  { name: 'Accel', src: '/logos/accel.svg', className: 'h-6 max-w-32' },
  { name: 'Founders Fund', src: '/logos/founders-fund.svg', className: 'h-5 max-w-40' },
]


function ProductShowcase() {
  return (
    <div className="grid gap-4">
      {products.map((product, idx) => (
        <div
          className={cn(
            "group relative block overflow-hidden rounded-none border border-border/80 bg-card",
            idx >= 3 && "hidden md:block"
          )}
          key={product.slug}
        >
          {/* Phones crop into the top-left 25% of the screenshot so the UI stays readable */}
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
          <div className="flex h-16 flex-col items-center justify-center px-2 text-center" key={stat.label}>
            <div className="text-lg leading-6 font-bold text-foreground">{stat.value}</div>
            <div className="text-[10.5px] leading-3.5 font-medium text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-xs leading-4 font-semibold tracking-widest text-muted-foreground uppercase">
        Worked with
      </div>
      <div className="relative mt-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <Marquee pauseOnHover className="[--duration:25s] [--gap:1.25rem] py-1.5">
          {partnerLogos.map((logo) => (
            <div className="flex shrink-0 items-center justify-center px-1" key={logo.name}>
              <img
                src={logo.src}
                alt={logo.name}
                className={cn("w-auto object-contain opacity-70 transition-opacity hover:opacity-100", logo.className)}
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
      initialShowcaseScroll={240}
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
