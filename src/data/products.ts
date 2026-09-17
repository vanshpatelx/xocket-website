export type Product = {
  slug: string
  name: string
  category: string
  /** What kind of product it is, shown as the first chip (e.g. Dashboard, Mobile App) */
  type: string
  summary: string
  description: string
  image: string
  stack: string[]
  services: string[]
  year: string
  /** Extra screenshots shown on the product page after the main image */
  gallery?: string[]
  /** Live product URL, shown as "Visit live product" when set */
  url?: string
}

// Placeholder portfolio entries: replace names, copy, stack and images with real Xocket work.
export const products: Product[] = [
  {
    slug: 'medesk',
    name: 'Medesk',
    category: 'Healthcare SaaS',
    type: 'Dashboard',
    summary: 'Hospital operations dashboard for appointments, staff and department load.',
    description:
      'Medesk gives hospital teams one live view of appointments, wait times, bed occupancy and staff performance, with an AI assistant for smart queries across operational data.',
    image: '/showcase/site-1.png',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI'],
    services: ['Product Strategy', 'UX/UI Design', 'Full-Stack Engineering'],
    year: '2026',
  },
  {
    slug: 'bionis',
    name: 'Bionis',
    category: 'Health & Wellness',
    type: 'Dashboard',
    summary: 'Personal wellness tracker scoring sleep, activity and recovery.',
    description:
      'Bionis turns sleep, activity and recovery signals into a daily wellness score, with AI insights that explain what changed and what to do next.',
    image: '/showcase/site-2.png',
    stack: ['Next.js', 'TypeScript', 'Python', 'Supabase', 'LLM Agents'],
    services: ['Prototype in 5 Days', 'MVP Build', 'AI Engineering'],
    year: '2026',
  },
  {
    slug: 'medesk-analytics',
    name: 'Medesk Analytics',
    category: 'Healthcare Data',
    type: 'Analytics',
    summary: 'Reporting and trend analysis layer for clinical operations.',
    description:
      'An analytics module for Medesk that surfaces trends in appointment volume, no-shows and department load, with scheduled reports for hospital leadership.',
    image: '/showcase/site-1.png',
    stack: ['React', 'TypeScript', 'ClickHouse', 'Python'],
    services: ['Data Engineering', 'Dashboard Design'],
    year: '2026',
  },
  {
    slug: 'bionis-coach',
    name: 'Bionis Coach',
    category: 'AI Assistant',
    type: 'AI Assistant',
    summary: 'Conversational AI coach built on top of Bionis wellness data.',
    description:
      'An AI coach that reads Bionis health records and goals to give personalised, context-aware guidance on sleep, training and recovery.',
    image: '/showcase/site-2.png',
    stack: ['Next.js', 'RAG', 'Vector DB', 'Claude API'],
    services: ['AI Engineering', 'Product Design'],
    year: '2026',
  },
  {
    slug: 'medesk-staff',
    name: 'Medesk Staff',
    category: 'Workforce Management',
    type: 'Web App',
    summary: 'Scheduling and performance tooling for clinical staff.',
    description:
      'Shift scheduling, patient load balancing and performance tracking for doctors and nurses, integrated with the core Medesk platform.',
    image: '/showcase/site-1.png',
    stack: ['React', 'Go', 'PostgreSQL', 'Redis'],
    services: ['Full-Stack Engineering', 'Integrations'],
    year: '2025',
  },
  {
    slug: 'bionis-sleep',
    name: 'Bionis Sleep',
    category: 'Consumer Health',
    type: 'Mobile App',
    summary: 'Sleep debt detection and recovery planning.',
    description:
      'Detects sleep debt from wearable data and builds recovery plans, with nightly summaries and weekly trends.',
    image: '/showcase/site-2.png',
    stack: ['React Native', 'TypeScript', 'Python', 'AWS'],
    services: ['Mobile Engineering', 'AI Automation'],
    year: '2025',
  },
]
