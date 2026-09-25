import { CONTACT_EMAIL } from "@/lib/site"
import { Mail } from "lucide-react"
import { Link } from "react-router-dom"

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

const siteLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Docs', to: '/docs' },
  { label: 'Contact', to: '/contact' },
]

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={`relative z-10 flex shrink-0 flex-col gap-3.5 pt-10 md:pt-8 ${className ?? ''}`} aria-label="Footer">
      {/* Brand gradient glow anchored at bottom-most place behind footer, balanced opacity */}
      <div
        className="pointer-events-none absolute -inset-x-5 -bottom-8 h-32 -z-10 overflow-hidden sm:-inset-x-8 md:-bottom-10"
        style={{
          WebkitMaskImage:
            'linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 100%)',
          maskImage:
            'linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 100%)',
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 bottom-0 h-full opacity-90 blur-3xl"
          style={{
            background:
              'linear-gradient(90deg, #7a00ff 0%, #00bbff 20%, #00f5a0 42%, #ffe600 62%, #ff7a00 82%, #ff005d 100%)',
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <Link className="flex items-center gap-2.5" to="/" aria-label="Xocket home">
          <img className="size-5" src="/logo.svg" alt="" aria-hidden="true" />
          <span className="text-sm leading-5 font-bold text-foreground">Xocket</span>
        </Link>
        <div className="flex items-center gap-2" aria-label="Social and contact links">
          <a
            className="inline-flex size-7 items-center justify-center border border-border/80 bg-card text-muted-foreground transition-colors hover:text-foreground"
            href="https://x.com/xocket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Xocket on X"
          >
            <XIcon className="size-3.5" />
          </a>
          <a
            className="inline-flex size-7 items-center justify-center border border-border/80 bg-card text-muted-foreground transition-colors hover:text-foreground"
            href="https://github.com/xocket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Xocket on GitHub"
          >
            <GithubIcon className="size-3.5" />
          </a>
          <a
            className="inline-flex size-7 items-center justify-center border border-border/80 bg-card text-muted-foreground transition-colors hover:text-foreground"
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Email Xocket"
          >
            <Mail className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] leading-4 text-muted-foreground">
          &copy; {new Date().getFullYear()} Xocket
        </span>
        <nav className="flex items-center gap-3.5" aria-label="Site">
          {siteLinks.map((link) => (
            <Link
              className="font-mono text-[11px] leading-4 tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
          <a className="sr-only" href="/llms.txt">
            llms.txt
          </a>
        </nav>
      </div>
    </footer>
  )
}
