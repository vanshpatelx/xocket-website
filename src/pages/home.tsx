import { buttonVariants } from "@/components/ui/button"
import { SplitLayout } from "@/components/split-layout"
import { CONTACT_EMAIL } from "@/lib/site"
import { Link } from "react-router-dom"
import { products } from "@/data/products"
import { stats } from "@/data/studio"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"
import { ProductGrid } from "@/components/product-grid"

const partnerLogos = [
  { name: 'A16z', src: '/logos/a16z.svg', className: 'h-6 max-w-20' },
  { name: 'Antler', src: '/logos/antler.svg', className: 'h-5 max-w-22' },
  { name: 'Y Combinator', src: '/logos/y-combinator.svg', className: 'h-5 max-w-24' },
  { name: 'Sequoia Capital', src: '/logos/sequoia.svg', className: 'h-4 max-w-24' },
  { name: 'Accel', src: '/logos/accel.svg', className: 'h-5 max-w-20' },
  { name: 'Solana', src: '/logos/solana.svg', className: 'h-4 sm:h-4.5 max-w-22 sm:max-w-24' },
]




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
      panelLabel="Studio panel"
      panel={
        <>
          <Link className="mb-6 inline-flex items-center gap-2.5" to="/" aria-label="Xocket home">
            <img className="size-5" src="/logo.svg" alt="" aria-hidden="true" />
            <span className="leading-5 font-bold text-foreground">Xocket</span>
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
      showcase={<ProductGrid products={products} maxMobileItems={3} />}
    />
  )
}
