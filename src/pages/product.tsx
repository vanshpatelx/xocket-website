import { SplitLayout } from "@/components/split-layout"
import { buttonVariants } from "@/components/ui/button"
import { products, type Product as ProductData } from "@/data/products"
import { CONTACT_EMAIL } from "@/lib/site"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { useEffect, type ReactNode } from "react"
import { Link, useParams } from "react-router-dom"

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function Facts({ product }: { product: ProductData }) {
  const rows: { label: string; value: ReactNode }[] = [
    { label: 'Client', value: product.client },
    { label: 'Product', value: product.name },
    { label: 'Industry', value: product.category },
    { label: 'Stage', value: product.stage },
    { label: 'Engagement', value: product.engagement },
    { label: 'Services', value: product.services.join(', ') },
    { label: 'Tech stack', value: product.stack.join(' · ') },
  ]
  if (product.results) rows.push({ label: 'Results', value: product.results })
  if (product.url) {
    rows.push({
      label: 'Website',
      value: (
        <a className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline" href={product.url} target="_blank" rel="noreferrer">
          {displayUrl(product.url)}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      ),
    })
  }

  return (
    <dl className="mt-10 divide-y divide-border/80 border-y border-border/80">
      {rows.map((row) => (
        <div className="grid grid-cols-[7rem_1fr] gap-4 py-3" key={row.label}>
          <dt className="text-xs leading-5 font-semibold tracking-widest text-muted-foreground uppercase">{row.label}</dt>
          <dd className="text-sm leading-5 font-medium text-foreground/90">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Section({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <section className="mt-12 border-t border-border/80 pt-8">
      <div className="text-xs leading-4 font-semibold tracking-widest text-primary uppercase">
        {String(index).padStart(2, '0')}
      </div>
      <h2 className="mt-2 text-xl leading-7 font-bold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li className="flex gap-3 text-foreground/90" key={item}>
          <span className="mt-2 size-1.5 shrink-0 bg-primary" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function CaseStudyDetails({ product }: { product: ProductData }) {
  const study = product.caseStudy ?? {}
  let sectionIndex = 0

  return (
    <>
      {study.challenge && (
        <Section index={++sectionIndex} title="The challenge">
          <p>{study.challenge.intro}</p>
          {study.challenge.points && <Bullets items={study.challenge.points} />}
          {study.challenge.closing && <p>{study.challenge.closing}</p>}
        </Section>
      )}

      {study.approach && (
        <Section index={++sectionIndex} title="How we structured it">
          <p>{study.approach.intro}</p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-foreground">
            {study.approach.steps.map((step, stepIndex) => (
              <span className="flex items-center gap-1.5" key={step.title}>
                {stepIndex > 0 && <ArrowRight className="size-3.5 text-muted-foreground" aria-hidden="true" />}
                <span className="border border-border bg-card px-2.5 py-1">{step.title}</span>
              </span>
            ))}
          </div>
          <div className="divide-y divide-border/80 border-y border-border/80">
            {study.approach.steps.map((step) => (
              <div className="py-3" key={step.title}>
                <h3 className="text-sm leading-6 font-bold text-foreground">{step.title}</h3>
                <p className="mt-0.5">{step.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {study.features && (
        <Section index={++sectionIndex} title="What we built">
          <div className="divide-y divide-border/80 border-y border-border/80">
            {study.features.map((feature) => (
              <div className="py-3" key={feature.title}>
                <h3 className="text-sm leading-6 font-bold text-foreground">{feature.title}</h3>
                <p className="mt-0.5">{feature.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {study.outcome && (
        <Section index={++sectionIndex} title="The outcome">
          {study.outcome.intro && <p>{study.outcome.intro}</p>}
          {study.outcome.metrics && (
            <div className="grid grid-cols-3 divide-x divide-border/80 border border-border/80">
              {study.outcome.metrics.map((metric) => (
                <div className="px-3 py-4 text-center" key={metric.label}>
                  <div className="text-xl leading-7 font-bold text-foreground">{metric.value}</div>
                  <div className="mt-0.5 text-[11px] leading-4 font-medium text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
          {study.outcome.points && <Bullets items={study.outcome.points} />}
        </Section>
      )}

      {study.testimonial && (
        <figure className="mt-12 border-t border-border/80 pt-8">
          <blockquote className="text-base leading-7 font-medium text-foreground">“{study.testimonial.quote}”</blockquote>
          <figcaption className="mt-4">
            <div className="text-sm font-bold text-foreground">{study.testimonial.name}</div>
            <div className="text-sm text-muted-foreground">{study.testimonial.role}</div>
          </figcaption>
        </figure>
      )}

      <section className="mt-12 border border-border/80 bg-card p-5">
        <h2 className="text-lg leading-7 font-bold tracking-tight text-foreground">Have a complex product to build?</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Tell us what you’re building. Book a call, or email us whenever it suits.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a className={buttonVariants({ variant: 'default' })} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Build something like ${product.name}`)}`}>
            Book a call
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className={buttonVariants({ variant: 'ghost' })} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>
    </>
  )
}

export default function Product() {
  const { slug } = useParams()
  const index = products.findIndex((item) => item.slug === slug)
  const product = products[index]
  const next = products[(index + 1) % products.length]

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = product ? `${product.name} Case Study | Xocket` : 'Product not found | Xocket'
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
    <SplitLayout
      // Remount per product so the showcase scroll position resets
      key={product.slug}
      panelLabel={`${product.name} case study summary`}
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
          <div className="mt-4 space-y-3 text-base leading-6 font-medium text-muted-foreground">
            {product.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Facts product={product} />
          <CaseStudyDetails product={product} />
          <Link
            className="group mt-4 flex items-center justify-between gap-4 border border-border/80 px-5 py-4"
            to={`/work/${next.slug}`}
          >
            <div>
              <div className="text-xs leading-4 font-semibold tracking-widest text-muted-foreground uppercase">Next product</div>
              <div className="mt-1 text-base leading-6 font-bold text-foreground">{next.name}</div>
            </div>
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
          </Link>
        </>
      }
      showcaseLabel={`${product.name} case study`}
      showcase={
        <div className="grid gap-4">
          {[product.image, ...(product.gallery ?? [])].map((image, imageIndex) => (
            <img
              className="block h-auto w-full rounded-none"
              key={`${image}-${imageIndex}`}
              src={image}
              alt={`${product.name} screen ${imageIndex + 1}`}
            />
          ))}
        </div>
      }
    />
  )
}
