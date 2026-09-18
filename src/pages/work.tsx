import { products } from "@/data/products"
import { CONTACT_EMAIL } from "@/lib/site"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

/** Every screenshot we have, one card each, in product order */
const shots = products.flatMap((product) =>
  [product.image, ...(product.gallery ?? [])].map((image, imageIndex) => ({
    image,
    product,
    key: `${product.slug}-${imageIndex}`,
  })),
)

export default function Work() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Work | Xocket'
  }, [])

  return (
    <main className="relative z-[1] min-h-screen bg-background px-2 py-8 md:py-10">
      <div className="w-full">
        <header className="flex items-center justify-between gap-4 px-3">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
          <Link className="flex items-center gap-2.5" to="/" aria-label="Xocket home">
            <img className="size-5" src="/favicon.svg" alt="" aria-hidden="true" />
            <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
          </Link>
        </header>

        <div className="px-3 py-16 text-center sm:py-24">
          <h1 className="text-4xl leading-none font-bold tracking-tighter text-balance text-foreground uppercase sm:text-6xl lg:text-7xl">
            World class <span className="block text-muted-foreground">product engineering</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-6 font-medium text-muted-foreground">
            Products we have designed and shipped end to end, from first prototype to production.
          </p>
        </div>

        {/* Masonry wall: tiles vary in height so it reads as a gallery, not a list */}
        <div className="columns-2 gap-2 md:columns-3 [column-fill:_balance]">
          {shots.map(({ image, product, key }) => (
            <Link
              className="group relative mb-2 block break-inside-avoid overflow-hidden bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              key={key}
              to={`/work/${product.slug}`}
              aria-label={`Open ${product.name}`}
            >
              <img
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                src={image}
                alt={`${product.name} preview`}
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-3 pt-8 pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="size-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                <span className="truncate text-xs leading-5 font-medium text-white">
                  {product.name} <span className="text-white/60">{product.type}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16 border-t border-border/80 px-3 py-12 text-center sm:mt-24">
          <h2 className="text-2xl leading-8 font-bold tracking-tight text-foreground sm:text-3xl">
            Have a complex product to build?
          </h2>
          <a className="mt-4 inline-flex items-center gap-2 text-base font-medium text-foreground underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </section>
      </div>
    </main>
  )
}
