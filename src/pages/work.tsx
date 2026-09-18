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
    <main className="relative z-[1] min-h-screen bg-background px-5 py-8 sm:px-8 md:py-10">
      <div className="mx-auto w-full max-w-[100rem]">
        <header className="flex items-center justify-between gap-4">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
          <Link className="flex items-center gap-2.5" to="/" aria-label="Xocket home">
            <img className="size-5" src="/favicon.svg" alt="" aria-hidden="true" />
            <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
          </Link>
        </header>

        <div className="py-16 text-center sm:py-24">
          <h1 className="text-4xl leading-none font-bold tracking-tighter text-balance text-foreground uppercase sm:text-6xl lg:text-7xl">
            World class <span className="block text-muted-foreground">product engineering</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-6 font-medium text-muted-foreground">
            Products we have designed and shipped end to end, from first prototype to production.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {shots.map(({ image, product, key }) => (
            <Link
              className="group block border border-border/80 bg-card transition-colors hover:border-foreground/25"
              key={key}
              to={`/work/${product.slug}`}
              aria-label={`Open ${product.name}`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  className="block size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  src={image}
                  alt={`${product.name} preview`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex items-center gap-3 border-t border-border/80 px-4 py-3">
                <span className="size-2 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
                <span className="text-sm leading-5 font-semibold text-foreground">{product.name}</span>
                <span className="truncate text-xs leading-5 text-muted-foreground">{product.type}</span>
                <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16 border-t border-border/80 py-12 text-center sm:mt-24">
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
