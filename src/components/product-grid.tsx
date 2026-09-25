import type { Product } from "@/data/products"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative block overflow-hidden rounded-none border border-border/80 bg-card",
        className
      )}
    >
      {/* Phones crop into the top-left of the screenshot so the UI stays readable */}
      <div className="block aspect-[4/3] overflow-hidden sm:aspect-auto">
        <img
          className="block h-auto w-[200%] max-w-none origin-top-left -translate-x-[4%] -translate-y-[3%] rounded-none sm:w-full sm:translate-x-0 sm:translate-y-0"
          src={product.image}
          alt=""
        />
      </div>

      {/* Mobile: just name on left and open button on right */}
      <div className="flex items-center justify-between gap-3 border-t border-border/80 bg-white/[0.03] px-4 py-3 sm:hidden">
        <div className="text-base font-bold text-foreground">
          {product.name}
        </div>
        <Link
          to={`/work/${product.slug}`}
          className="inline-flex shrink-0 items-center gap-1.5 border border-foreground/30 bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background shadow-xs transition-colors hover:bg-foreground/90"
          aria-label={`Open ${product.name}`}
        >
          <span>Open</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
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
          className="ml-auto inline-flex items-center gap-1.5 border border-foreground/30 bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background shadow-xs transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Open ${product.name}`}
        >
          <span>Open</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export function ProductGrid({
  products,
  maxMobileItems,
}: {
  products: Product[]
  maxMobileItems?: number
}) {
  return (
    <div className="grid gap-4">
      {products.map((product, idx) => (
        <ProductCard
          key={product.slug}
          product={product}
          className={cn(
            maxMobileItems !== undefined && idx >= maxMobileItems && "hidden md:block"
          )}
        />
      ))}
    </div>
  )
}
