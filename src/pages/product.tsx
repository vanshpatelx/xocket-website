import { buttonVariants } from "@/components/ui/button"
import { products } from "@/data/products"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const CONTACT_EMAIL = 'hello@xocket.studio'

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs leading-4 font-semibold tracking-widest text-muted-foreground uppercase">{label}</div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span className="border border-border bg-card px-2.5 py-1 text-xs leading-4 font-medium text-foreground/90" key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Product() {
  const { slug } = useParams()
  const index = products.findIndex((item) => item.slug === slug)
  const product = products[index]
  const next = products[(index + 1) % products.length]

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = product ? `${product.name} | Xocket` : 'Product not found | Xocket'
  }, [product])

  if (!product) {
    return (
      <main className="relative z-[1] flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link className={buttonVariants({ variant: 'secondary' })} to="/">
          <ArrowLeft aria-hidden="true" />
          Back to work
        </Link>
      </main>
    )
  }

  return (
    <main className="relative z-[1] min-h-screen px-5 py-8 sm:px-8 md:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex items-center justify-between gap-4">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All work
          </Link>
          <Link className="flex items-center gap-2.5" to="/" aria-label="Xocket home">
            <img className="size-5" src="/favicon.svg" alt="" aria-hidden="true" />
            <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
          </Link>
        </header>

        <section className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <div className="text-xs leading-4 font-semibold tracking-widest text-primary uppercase">
              {product.category} · {product.year}
            </div>
            <h1 className="mt-4 text-4xl leading-none font-bold tracking-tighter text-foreground uppercase sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 font-medium text-muted-foreground">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {product.url && (
                <a className={buttonVariants({ variant: 'default' })} href={product.url} target="_blank" rel="noreferrer">
                  Visit live product
                  <ArrowUpRight aria-hidden="true" />
                </a>
              )}
              <a
                className={buttonVariants({ variant: product.url ? 'secondary' : 'default' })}
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Build something like ${product.name}`)}`}
              >
                Build something similar
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="grid gap-6 border border-border/80 bg-background/60 p-5 sm:p-6">
            <DetailList label="Tech stack" items={product.stack} />
            <DetailList label="What we did" items={product.services} />
          </div>
        </section>

        <div className="mt-12 overflow-hidden border border-border/80">
          <img className="block h-auto w-full" src={product.image} alt={`${product.name} full preview`} />
        </div>

        <Link
          className="group mt-4 flex items-center justify-between gap-4 border border-border/80 bg-card px-5 py-5 sm:px-6"
          to={`/work/${next.slug}`}
        >
          <div>
            <div className="text-xs leading-4 font-semibold tracking-widest text-muted-foreground uppercase">Next product</div>
            <div className="mt-1 text-lg leading-6 font-bold text-foreground">{next.name}</div>
          </div>
          <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}
