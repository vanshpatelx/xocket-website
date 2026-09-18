import { buttonVariants } from "@/components/ui/button"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | Xocket'
  }, [])

  return (
    <main className="page-grid relative z-[1] flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <div>
        <p className="font-mono text-xs leading-4 tracking-wide text-muted-foreground uppercase">Error 404</p>
        <h1 className="mt-3 text-3xl leading-none font-bold tracking-tighter text-foreground uppercase sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted-foreground">
          That page does not exist on this site. The work gallery lists everything we have published, and
          machine-readable summaries live at /llms.txt and /sitemap.xml.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link className={buttonVariants({ variant: 'default' })} to="/">Home</Link>
        <Link className={buttonVariants({ variant: 'secondary' })} to="/work">View work</Link>
      </div>
    </main>
  )
}
