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
    <section className="border-t border-border/80 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="max-w-2xl">
        <div className="text-xs leading-4 font-semibold tracking-widest text-primary uppercase">
          {String(index).padStart(2, '0')}
        </div>
        <h2 className="mt-3 text-2xl leading-8 font-bold tracking-tight text-foreground sm:text-3xl sm:leading-9">{title}</h2>
        <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">{children}</div>
      </div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li className="flex gap-3 text-foreground/90" key={item}>
          <span className="mt-2.5 size-1.5 shrink-0 bg-primary" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Screenshot({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null
  return <img className="block h-auto w-full rounded-none" src={src} alt={alt} />
}

function CaseStudyStory({ product }: { product: ProductData }) {
  const study = product.caseStudy ?? {}
  const [hero, ...gallery] = [product.image, ...(product.gallery ?? [])]
  let sectionIndex = 0

  return (
    <article className="bg-background">
      <Screenshot src={hero} alt={`${product.name} main screen`} />

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
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
            {study.approach.steps.map((step, stepIndex) => (
              <span className="flex items-center gap-2" key={step.title}>
                {stepIndex > 0 && <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />}
                <span className="border border-border bg-card px-3 py-1.5">{step.title}</span>
              </span>
            ))}
          </div>
          <div className="grid gap-px border border-border/80 bg-border/80 sm:grid-cols-2">
            {study.approach.steps.map((step) => (
              <div className="bg-background p-5" key={step.title}>
                <h3 className="text-base leading-6 font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6">{step.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {gallery[0] && <Screenshot src={gallery[0]} alt={`${product.name} screen 2`} />}

      {study.features && (
        <Section index={++sectionIndex} title="What we built">
          <div className="divide-y divide-border/80 border-y border-border/80">
            {study.features.map((feature) => (
              <div className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6" key={feature.title}>
                <h3 className="text-base leading-6 font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-6">{feature.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {gallery.slice(1).map((src, galleryIndex) => (
        <Screenshot src={src} alt={`${product.name} screen ${galleryIndex + 3}`} key={`${src}-${galleryIndex}`} />
      ))}

      {study.outcome && (
        <Section index={++sectionIndex} title="The outcome">
          {study.outcome.intro && <p>{study.outcome.intro}</p>}
          {study.outcome.metrics && (
            <div className="grid grid-cols-2 divide-x divide-border/80 border border-border/80 sm:grid-cols-3">
              {study.outcome.metrics.map((metric) => (
                <div className="px-4 py-5" key={metric.label}>
                  <div className="text-3xl leading-9 font-bold tracking-tight text-foreground">{metric.value}</div>
                  <div className="mt-1 text-xs leading-4 font-medium text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
          {study.outcome.points && <Bullets items={study.outcome.points} />}
        </Section>
      )}

      {study.testimonial && (
        <section className="border-t border-border/80 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <figure className="max-w-2xl">
            <blockquote className="text-xl leading-8 font-medium text-foreground sm:text-2xl sm:leading-9">
              “{study.testimonial.quote}”
            </blockquote>
            <figcaption className="mt-6">
              <div className="text-sm font-bold text-foreground">{study.testimonial.name}</div>
              <div className="text-sm text-muted-foreground">{study.testimonial.role}</div>
            </figcaption>
          </figure>
        </section>
      )}

      <section className="border-t border-border/80 bg-card px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <h2 className="max-w-xl text-2xl leading-8 font-bold tracking-tight text-foreground sm:text-3xl sm:leading-9">
          Have a complex product to build?
        </h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
          Tell us what you’re building. Book a call, or email us whenever it suits.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a className={buttonVariants({ variant: 'default' })} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's talk")}`}>
            Book a call
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>
    </article>
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
          <div className="mt-8 flex flex-wrap gap-2">
            <a className={buttonVariants({ variant: 'default' })} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Build something like ${product.name}`)}`}>
              Book a call
              <ArrowUpRight aria-hidden="true" />
            </a>
            <Link className={buttonVariants({ variant: 'secondary' })} to={`/work/${next.slug}`}>
              Next: {next.name}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </>
      }
      showcaseLabel={`${product.name} case study`}
      showcase={<CaseStudyStory product={product} />}
    />
  )
}
