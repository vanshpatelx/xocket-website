import { SplitLayout } from "@/components/split-layout"
import { buttonVariants } from "@/components/ui/button"
import { products } from "@/data/products"
import { CONTACT_EMAIL } from "@/lib/site"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

function TagGroup({ label, items }: { label: string; items: string[] }) {
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

  const images = [product.image, ...(product.gallery ?? [])]

  return (
    <SplitLayout
      // Remount per product so the showcase scroll position resets
      key={product.slug}
      panelLabel={`${product.name} details`}
      panel={
        <>
          <Link className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All work
          </Link>
          <div className="text-xs leading-4 font-semibold tracking-widest text-primary uppercase">
            {product.category} · {product.year}
          </div>
          <h1 className="mt-3 text-2xl leading-8 font-bold tracking-normal text-balance text-foreground">
            {product.name}
          </h1>
          <p className="mt-4 text-base leading-6 font-medium text-muted-foreground">{product.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {product.url && (
              <a className={buttonVariants({ variant: 'secondary' })} href={product.url} target="_blank" rel="noreferrer">
                Visit live product
              </a>
            )}
            <a
              className={buttonVariants({ variant: 'default' })}
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Build something like ${product.name}`)}`}
            >
              Build something similar
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <div className="mt-12 grid gap-6 border border-border/80 p-5">
            <TagGroup label="Tech stack" items={product.stack} />
            <TagGroup label="What we did" items={product.services} />
          </div>

          <Link
            className="group mt-4 flex items-center justify-between gap-4 border border-border/80 bg-card px-5 py-4"
            to={`/work/${next.slug}`}
          >
            <div>
              <div className="text-xs leading-4 font-semibold tracking-widest text-muted-foreground uppercase">Next product</div>
              <div className="mt-1 text-base leading-6 font-bold text-foreground">{next.name}</div>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
          </Link>
        </>
      }
      showcaseLabel={`${product.name} screenshots`}
      showcase={
        <div className="grid gap-4">
          {images.map((image, imageIndex) => (
            <div className="overflow-hidden rounded-none" key={`${image}-${imageIndex}`}>
              <img
                className="block h-auto w-full rounded-none"
                src={image}
                alt={`${product.name} screenshot ${imageIndex + 1}`}
              />
            </div>
          ))}
        </div>
      }
    />
  )
}
