import { StaticRouter } from 'react-router'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { AppRoutes } from './App'
import { products } from './data/products'
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from './lib/site'

export type RouteMeta = {
  path: string
  title: string
  description: string
  /** schema.org type used for the page's JSON-LD */
  schema: 'home' | 'page' | 'work'
  changefreq: string
  priority: string
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    title: `${SITE_NAME}: AI-Native End-to-End Product Engineering Studio`,
    description: SITE_DESCRIPTION,
    schema: 'home',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/work',
    title: `Work | ${SITE_NAME}`,
    description:
      'Products Xocket has designed and engineered end to end, from first prototype to production, filterable by product type.',
    schema: 'page',
    changefreq: 'weekly',
    priority: '0.9',
  },
  ...products.map((product): RouteMeta => ({
    path: `/work/${product.slug}`,
    title: `${product.name} Case Study | ${SITE_NAME}`,
    description: product.intro[0],
    schema: 'work',
    changefreq: 'monthly',
    priority: '0.8',
  })),
  {
    path: '/about',
    title: `About | ${SITE_NAME}`,
    description:
      'Xocket is an AI-native, end-to-end product engineering studio: what we do, how we work, and how engagements start.',
    schema: 'page',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/contact',
    title: `Contact | ${SITE_NAME}`,
    description: 'How to reach Xocket, what to include in a first email, and what happens after you send it.',
    schema: 'page',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/docs',
    title: `API docs | ${SITE_NAME}`,
    description:
      "Documentation for Xocket's public read-only JSON API: endpoints, error format, and Markdown content negotiation.",
    schema: 'page',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/privacy',
    title: `Privacy | ${SITE_NAME}`,
    description: 'What this site collects, what our host records, and how email correspondence is handled.',
    schema: 'page',
    changefreq: 'yearly',
    priority: '0.4',
  },
]

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}

export { products }
export const siteConstants = { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, SUPPORT_EMAIL }
