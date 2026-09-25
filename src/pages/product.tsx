import { SplitLayout } from "@/components/split-layout"
import { buttonVariants } from "@/components/ui/button"
import { products, type CaseStudyStep, type Product as ProductData } from "@/data/products"
import { CONTACT_EMAIL } from "@/lib/site"
import { CopyEmailButton } from "@/components/copy-email-button"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { useEffect, type ReactNode } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function Block({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <section className="-mx-2.5 border-t border-border/80 px-2.5 py-8 sm:-mx-4 sm:px-4">
      {label && <h2 className="mb-5 font-mono text-xs leading-4 tracking-wide text-muted-foreground uppercase">{label}</h2>}
      <div className="space-y-4 text-sm leading-6 text-muted-foreground">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4 marker:text-muted-foreground/60">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function Steps({ items }: { items: CaseStudyStep[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="text-sm leading-6 font-medium text-foreground">{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

function Facts({ product }: { product: ProductData }) {
  const rows: { label: string; value: ReactNode }[] = [
    { label: 'Client', value: product.client },
    { label: 'Industry', value: product.category },
    { label: 'Year', value: product.year },
    { label: 'Stage', value: product.stage },
    { label: 'Engagement', value: product.engagement },
    { label: 'Services', value: product.services.join(', ') },
    { label: 'Stack', value: product.stack.join(', ') },
  ]
  if (product.results) rows.push({ label: 'Results', value: product.results })
  if (product.url) {
    rows.push({
      label: 'Website',
      value: (
        <a className="inline-flex items-center gap-1 underline-offset-4 hover:underline" href={product.url} target="_blank" rel="noreferrer">
          {displayUrl(product.url)}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      ),
    })
  }

  return (
    <dl className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-4 gap-y-3 text-sm leading-6">
      {rows.map((row) => (
        <div className="contents" key={row.label}>
          <dt className="text-muted-foreground">{row.label}</dt>
          <dd className="text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ProductGallery({ product }: { product: ProductData }) {
  const images = [product.image, ...(product.gallery ?? [])]
  return (
    <div className="grid gap-4">
      {images.map((image, imageIndex) => (
        <div className="border border-border/80" key={`${image}-${imageIndex}`}>
          <img
            className="block h-auto w-full rounded-none"
            src={image}
            alt={`${product.name} screen ${imageIndex + 1}`}
          />
        </div>
      ))}
    </div>
  )
}

function CaseStudyPanel({ product }: { product: ProductData }) {
  const study = product.caseStudy ?? {}
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <div className="pb-8">
        <div className="mb-6 flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex size-7 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <h1 className="text-base leading-6 font-semibold text-foreground">{product.name}</h1>
        </div>
        <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
          {product.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="-mx-2.5 border-t border-border/80 px-2.5 py-8 sm:-mx-4 sm:px-4 md:hidden" aria-label={`${product.name} gallery`}>
        <ProductGallery product={product} />
      </div>

      <Block>
        <Facts product={product} />
      </Block>

      {study.challenge && (
        <Block label="The challenge">
          <p>{study.challenge.intro}</p>
          {study.challenge.points && <Bullets items={study.challenge.points} />}
          {study.challenge.closing && <p>{study.challenge.closing}</p>}
        </Block>
      )}

      {study.approach && (
        <Block label="How we structured it">
          <p>{study.approach.intro}</p>
          <p className="font-mono text-xs text-foreground">{study.approach.steps.map((step) => step.title).join(' → ')}</p>
          <Steps items={study.approach.steps} />
        </Block>
      )}

      {study.features && (
        <Block label="What we built">
          <Steps items={study.features} />
        </Block>
      )}

      {study.outcome && (
        <Block label="The outcome">
          {study.outcome.intro && <p>{study.outcome.intro}</p>}
          {study.outcome.metrics && (
            <dl className="grid grid-cols-3 gap-4">
              {study.outcome.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd className="text-xl leading-7 font-semibold tracking-tight text-foreground">{metric.value}</dd>
                  <dd className="text-xs leading-5">{metric.label}</dd>
                </div>
              ))}
            </dl>
          )}
          {study.outcome.points && <Bullets items={study.outcome.points} />}
        </Block>
      )}

      {study.testimonial && (
        <Block>
          <figure>
            <blockquote className="text-sm leading-6 text-foreground">“{study.testimonial.quote}”</blockquote>
            <figcaption className="mt-4 text-sm leading-6">
              <div className="text-foreground">{study.testimonial.name}</div>
              <div>{study.testimonial.role}</div>
            </figcaption>
          </figure>
        </Block>
      )}

      <Block label="Work with us">
        <p>Have a complex product to build? Tell us what you’re building. Book a call, or email us whenever it suits.</p>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <a className={buttonVariants({ variant: 'default' })} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Build something like ${product.name}`)}`}>
            Book a call
          </a>
          <div className="inline-flex items-center gap-1.5">
            <a className="text-sm text-foreground underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <CopyEmailButton email={CONTACT_EMAIL} />
          </div>
        </div>
      </Block>
    </>
  )
}

export default function Product() {
  const { slug } = useParams()
  const index = products.findIndex((item) => item.slug === slug)
  const product = products[index]

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = product ? `${product.name} Case Study | Xocket` : 'Product not found | Xocket'
  }, [product])

  if (!product) {
    return (
      <main className="page-grid relative z-[1] flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
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
      hideMobileShowcase={true}
      panelLabel={`${product.name} case study`}
      panel={<CaseStudyPanel product={product} />}
      showcaseLabel={`${product.name} screenshots`}
      showcase={
        <div className="grid gap-4">
          {[product.image, ...(product.gallery ?? [])].map((image, imageIndex) => (
            <div className="border border-border/80" key={`${image}-${imageIndex}`}>
              <img
                className="block h-auto w-full rounded-none"
                src={image}
                alt={`${product.name} screen ${imageIndex + 1}`}
              />
            </div>
          ))}
        </div>
      }
    />
  )
}
