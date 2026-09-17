import { buttonVariants } from "@/components/ui/button"
import { ArrowUpRight, Mail } from "lucide-react"

const CONTACT_EMAIL = 'hello@xocket.studio'

const capabilities = [
  'AI Product Studio',
  'Engineering Lab',
  'AI Native',
  'Prototype in 5 Days',
  'Enterprise Ready',
]

const stats = [
  { value: '50+', label: 'Products built' },
  { value: '5d', label: 'To first prototype' },
  { value: '100%', label: 'Senior engineers' },
]

const services = [
  {
    title: 'AI Product Studio',
    description: 'Launch your startup faster, from prototype to production-grade MVP in weeks, not months.',
    features: ['Prototype in 5 Days', 'MVP in 30–90 Days', 'Product Strategy', 'UX/UI Design', 'Full-Stack Engineering', 'Launch Support'],
    cta: 'Build my MVP',
  },
  {
    title: 'AI Engineering Lab',
    description: 'We solve the engineering problems others avoid: complex, data-heavy systems built to last.',
    features: ['AI Automation', 'Supply Chain', 'Financial Platforms', 'Internal AI Tools', 'Enterprise Software', 'Performance Optimization'],
    cta: 'Talk to an engineer',
  },
  {
    title: 'Dedicated AI Engineers',
    description: 'Senior engineers embedded inside your team. No middlemen, no account managers.',
    features: ['Daily Standups', 'Long-term Collaboration', 'Starting from $50/hour'],
    cta: 'Hire engineers',
  },
]

const process = [
  {
    title: 'Discovery',
    description: "We map the problem, the users and the constraints, then agree on exactly what we're building and why.",
  },
  {
    title: 'Prototype',
    description: 'A working prototype in five days. You click through the real thing before a line of production code is written.',
  },
  {
    title: 'Engineering',
    description: 'Senior engineers ship production-grade code that is reviewed, tested and built to scale from day one.',
  },
  {
    title: 'Launch & Scale',
    description: 'We deploy, monitor and keep optimizing, with security, CI/CD and observability baked in.',
  },
]

const principles = [
  {
    title: 'Speed',
    description: 'A working prototype in five days. Months of discovery compressed into a single week so you validate fast.',
  },
  {
    title: 'Senior only',
    description: 'No middlemen. The people who scope your product are the people who build it.',
  },
  {
    title: 'AI Native',
    description: 'Every product designed with AI from day one: agents, RAG and automation woven into the core.',
  },
  {
    title: 'Enterprise Ready',
    description: 'Scalable architecture, security, CI/CD and monitoring, built to hold up under real production load.',
  },
]

function scrollToVisible(anchor: string) {
  const target = Array.from(document.querySelectorAll<HTMLElement>(`[data-anchor="${anchor}"]`))
    .find((el) => el.offsetParent !== null)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function XocketMark({ className }: { className?: string }) {
  return <img className={className} src="/favicon.svg" alt="" aria-hidden="true" />
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs leading-4 font-semibold tracking-widest text-muted-foreground uppercase">
      <span className="text-primary">{index}</span>
      <span className="h-px w-6 bg-border" aria-hidden="true" />
      {children}
    </div>
  )
}

function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative overflow-hidden border border-border/80 bg-card p-6 sm:p-10 ${className ?? ''}`}>
      {children}
    </div>
  )
}

function Showcase() {
  return (
    <div className="grid gap-4">
      <Panel className="flex min-h-[26rem] flex-col justify-between bg-gradient-to-br from-primary/40 via-card to-card">
        <SectionLabel index="00">Xocket</SectionLabel>
        <div>
          <h2 className="text-4xl leading-none font-bold tracking-tighter text-balance text-foreground uppercase sm:text-6xl xl:text-7xl">
            From idea <span className="text-muted-foreground">to production.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {capabilities.map((item) => (
              <span className="border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 scroll-mt-4" data-anchor="services">
        {services.map((service, index) => (
          <Panel key={service.title}>
            <SectionLabel index={String(index + 1).padStart(2, '0')}>Service</SectionLabel>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <h3 className="text-3xl leading-none font-bold tracking-tighter text-foreground uppercase sm:text-5xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-6 font-medium text-muted-foreground">
                  {service.description}
                </p>
                <a className={`${buttonVariants({ variant: 'secondary' })} mt-6`} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(service.title)}`}>
                  {service.cta}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <ul className="grid grid-cols-1 divide-y divide-border/80 border-y border-border/80 sm:grid-cols-2 sm:divide-y-0">
                {service.features.map((feature) => (
                  <li className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground/90" key={feature}>
                    <span className="size-1.5 shrink-0 bg-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        ))}
      </div>

      <Panel>
        <SectionLabel index="04">How we work</SectionLabel>
        <div className="mt-8 grid border-t border-l border-border/80 sm:grid-cols-2">
          {process.map((step, index) => (
            <div className="border-r border-b border-border/80 p-5 sm:p-6" key={step.title}>
              <div className="text-sm font-semibold text-primary">Step {index + 1}</div>
              <h3 className="mt-2 text-xl leading-7 font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="bg-background">
        <SectionLabel index="05">Why Xocket</SectionLabel>
        <h2 className="mt-8 text-4xl leading-none font-bold tracking-tighter text-foreground uppercase sm:text-6xl">
          Built <span className="text-muted-foreground">different</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <div className="border border-border/80 bg-card p-5 sm:p-6" key={principle.title}>
              <h3 className="text-lg leading-6 font-bold tracking-tight text-foreground uppercase">{principle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{principle.description}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="bg-primary text-primary-foreground">
        <div className="text-xs leading-4 font-semibold tracking-widest text-primary-foreground/60 uppercase">Start a project</div>
        <h2 className="mt-8 text-4xl leading-none font-bold tracking-tighter uppercase sm:text-6xl">
          Let's build <span className="text-primary-foreground/50">something.</span>
        </h2>
        <a
          className="mt-8 inline-flex items-center gap-2 text-lg font-semibold underline-offset-4 hover:underline sm:text-2xl"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </a>
      </Panel>
    </div>
  )
}

function Stats() {
  return (
    <div className="mt-12" aria-label="Xocket by the numbers">
      <div className="text-xs leading-4 font-semibold tracking-widest text-muted-foreground uppercase">
        By the numbers
      </div>
      <div className="mt-4 grid grid-cols-3 divide-x divide-border/80 overflow-hidden border border-border/80">
        {stats.map((stat) => (
          <div className="flex h-20 flex-col items-center justify-center px-2 text-center" key={stat.label}>
            <div className="text-xl leading-7 font-bold text-foreground">{stat.value}</div>
            <div className="text-[11px] leading-4 font-medium text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="relative z-[1] flex min-h-screen bg-background md:h-screen md:overflow-hidden">
      <section className="left-panel-grid relative flex min-h-screen w-full flex-col overflow-hidden bg-background px-5 py-8 sm:px-8 md:h-full md:w-120 md:shrink-0 md:py-10" aria-label="Studio panel">
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent md:h-48" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/90 via-foreground/25 to-transparent blur-lg md:-bottom-6 md:h-20" aria-hidden="true" />
        <div className="relative flex flex-1 flex-col">
          <div>
            <a className="mb-5 flex items-center gap-2.5 md:hidden" href="/" aria-label="Xocket home">
              <XocketMark className="size-5" />
              <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
            </a>
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 text-[10px] leading-4 font-semibold tracking-widest text-emerald-400 uppercase">
                <span className="size-2 bg-emerald-500" aria-hidden="true" />
                Open for projects
              </div>
            </div>
            <h1 className="text-2xl leading-8 font-bold tracking-normal text-balance text-foreground">
              End-to-end product engineering, from idea to production
            </h1>
            <p className="mt-4 text-base leading-6 font-medium text-muted-foreground">
              Xocket is a product engineering studio. Senior engineers take your product through strategy, design, AI-native engineering and launch, with a working prototype in five days.
            </p>
            <div className="mt-8 flex gap-2">
              <button className={buttonVariants({ variant: 'secondary' })} type="button" onClick={() => scrollToVisible('services')}>
                Our services
              </button>
              <a className={buttonVariants({ variant: 'default' })} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's talk")}`}>
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

            <div className="mt-12 md:hidden" aria-label="Studio showcase">
              <Showcase />
            </div>
          </div>
        </div>
        <div className="relative flex shrink-0 flex-col items-start gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-0 md:pt-6">
          <a className="flex items-center gap-3" href="/" aria-label="Xocket home">
            <XocketMark className="size-7" />
            <span className="text-lg leading-6 font-bold text-foreground">Xocket</span>
          </a>
          <div className="flex gap-2" aria-label="Contact links">
            <a
              className="inline-flex size-9 items-center justify-center border bg-card text-muted-foreground transition-colors hover:text-foreground"
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email Xocket"
            >
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section
        className="hidden h-full flex-1 overflow-y-auto overscroll-contain bg-background p-4 md:block"
        aria-label="Studio showcase"
      >
        <Showcase />
      </section>
    </main>
  )
}
