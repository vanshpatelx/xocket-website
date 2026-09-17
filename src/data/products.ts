export type CaseStudyStep = {
  title: string
  description: string
}

export type CaseStudy = {
  challenge?: {
    intro: string
    points?: string[]
    closing?: string
  }
  /** How the product was structured, shown as a flow (e.g. Discover → Prototype → Build) */
  approach?: {
    intro: string
    steps: CaseStudyStep[]
  }
  /** Key features that were built */
  features?: CaseStudyStep[]
  outcome?: {
    intro?: string
    metrics?: { value: string; label: string }[]
    points?: string[]
  }
  testimonial?: {
    quote: string
    name: string
    role: string
  }
}

export type Product = {
  slug: string
  name: string
  /** Industry, shown on the showcase tag and product page */
  category: string
  /** What kind of product it is, shown as the first chip (e.g. Dashboard, Mobile App) */
  type: string
  /** Short intro paragraphs at the top of the product page */
  intro: string[]
  image: string
  /** Extra screenshots, placed between the case study sections */
  gallery?: string[]
  stack: string[]
  services: string[]
  year: string
  client: string
  stage: string
  engagement: string
  /** One-line headline result shown in the facts table */
  results?: string
  /** Live product URL; the Website row and link only appear when set */
  url?: string
  caseStudy?: CaseStudy
}

// PLACEHOLDER CONTENT: every client, metric, result and quote below is sample copy for layout.
// Replace it with real Xocket case studies before the site goes live.
export const products: Product[] = [
  {
    slug: 'medesk',
    name: 'Medesk',
    category: 'Healthcare SaaS',
    type: 'Dashboard',
    intro: [
      'Medesk is a hospital operations platform that gives care teams one live view of appointments, wait times, bed occupancy and staff performance.',
      'We partnered with the founding team from first prototype to production, designing and engineering the core dashboard and an AI assistant that answers questions across operational data.',
    ],
    image: '/showcase/site-1.png',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI'],
    services: ['Product Strategy', 'UX/UI Design', 'Full-Stack Engineering', 'AI Engineering'],
    year: '2026',
    client: 'Medesk Health',
    stage: 'MVP → Production',
    engagement: '6 months, ongoing',
    results: 'Live across 3 hospital pilots within 90 days of kickoff',
    caseStudy: {
      challenge: {
        intro:
          'Hospital operations data lived in five different systems. Coordinators were exporting spreadsheets every morning just to answer basic questions.',
        points: [
          'How many appointments are running late right now?',
          'Which departments are over capacity today?',
          'Which staff are carrying the heaviest patient load?',
          'Where are no-shows costing the most time?',
        ],
        closing:
          'The product had to bring all of this into one place without becoming another overwhelming enterprise dashboard.',
      },
      approach: {
        intro: 'Before designing screens, we organised the product around how a hospital day actually runs:',
        steps: [
          { title: 'Monitor', description: 'A live overview of appointments, wait times, occupancy and satisfaction, readable at a glance.' },
          { title: 'Understand', description: 'Department load and appointment volume broken down so teams see why numbers moved, not just that they did.' },
          { title: 'Act', description: 'Staff performance and scheduling views that turn insight into a decision for the next shift.' },
          { title: 'Ask', description: 'An AI assistant that answers plain-language questions across all operational data.' },
        ],
      },
      features: [
        { title: 'Live operations overview', description: 'Real-time KPIs for appointments, wait time, bed occupancy and patient satisfaction.' },
        { title: 'Department load', description: 'Case distribution across departments to rebalance capacity before bottlenecks form.' },
        { title: 'Staff performance', description: 'Per-clinician load and ratings to support fair, informed scheduling.' },
        { title: 'AI assistant & smart queries', description: 'Ask questions like “which department had the most no-shows this week?” and get sourced answers.' },
      ],
      outcome: {
        intro: 'Medesk replaced the morning spreadsheet ritual with a single, trusted view of the hospital.',
        metrics: [
          { value: '90d', label: 'Kickoff to live pilot' },
          { value: '5 → 1', label: 'Systems consolidated' },
          { value: '3', label: 'Hospital pilots' },
        ],
        points: [
          'A clear product architecture built around the hospital day',
          'A reusable design system for future modules',
          'Production-grade infrastructure with monitoring and CI/CD',
        ],
      },
      testimonial: {
        quote:
          'Xocket took us from a rough idea to a product hospitals actually use. They thought like product owners, not contractors, and shipped faster than any team we have worked with.',
        name: 'Client Name',
        role: 'Founder, Medesk',
      },
    },
  },
  {
    slug: 'bionis',
    name: 'Bionis',
    category: 'Health & Wellness',
    type: 'Dashboard',
    intro: [
      'Bionis turns sleep, activity and recovery signals into a single daily wellness score, with AI insights that explain what changed and what to do next.',
      'We designed and built the product end to end, from the scoring model to the dashboard experience.',
    ],
    image: '/showcase/site-2.png',
    stack: ['Next.js', 'TypeScript', 'Python', 'Supabase', 'LLM Agents'],
    services: ['Prototype in 5 Days', 'MVP Build', 'AI Engineering'],
    year: '2026',
    client: 'Bionis Labs',
    stage: 'Prototype → MVP',
    engagement: '4 months',
    results: 'Working prototype in 5 days, MVP launched in 10 weeks',
    caseStudy: {
      challenge: {
        intro:
          'Wearables produce a flood of numbers, but users could not tell whether they were actually recovering or what to change.',
        points: [
          'Combine sleep, heart rate, steps and HRV into one score people trust',
          'Explain every change in plain language',
          'Flag problems like sleep debt before they compound',
        ],
      },
      approach: {
        intro: 'We shaped the product around a simple daily loop:',
        steps: [
          { title: 'Measure', description: 'Collect sleep, activity and recovery data from connected devices.' },
          { title: 'Score', description: 'Blend the signals into an overall wellness score with clear drivers.' },
          { title: 'Explain', description: 'AI insights describe what changed and why it matters.' },
          { title: 'Coach', description: 'Personalised, actionable tips for the day ahead.' },
        ],
      },
      features: [
        { title: 'Overall wellness score', description: 'One number with its drivers, instead of a wall of charts.' },
        { title: 'Key metrics vs weekly average', description: 'Resting heart rate, steps, sleep and recovery in context.' },
        { title: 'Sleep breakdown', description: 'Nightly sleep with automatic sleep-debt flags.' },
        { title: 'AI health coach', description: 'Personalised guidance generated from the user’s own data.' },
      ],
      outcome: {
        metrics: [
          { value: '5d', label: 'To working prototype' },
          { value: '10w', label: 'To MVP launch' },
        ],
        points: [
          'A scoring model users understand at a glance',
          'An AI layer that explains instead of just predicting',
        ],
      },
    },
  },
  {
    slug: 'medesk-analytics',
    name: 'Medesk Analytics',
    category: 'Healthcare Data',
    type: 'Analytics',
    intro: [
      'An analytics module for Medesk that surfaces trends in appointment volume, no-shows and department load, with scheduled reports for hospital leadership.',
    ],
    image: '/showcase/site-1.png',
    stack: ['React', 'TypeScript', 'ClickHouse', 'Python'],
    services: ['Data Engineering', 'Dashboard Design'],
    year: '2026',
    client: 'Medesk Health',
    stage: 'Growth',
    engagement: '3 months',
    caseStudy: {
      challenge: {
        intro:
          'Leadership needed monthly and quarterly trends, but the operational database was built for live queries, not history.',
      },
      features: [
        { title: 'Trend analysis', description: 'Appointment volume, completion and no-show rates over time.' },
        { title: 'Scheduled reports', description: 'Automatic weekly summaries delivered to hospital leadership.' },
        { title: 'Analytics warehouse', description: 'A ClickHouse pipeline that keeps reports fast as data grows.' },
      ],
    },
  },
  {
    slug: 'bionis-coach',
    name: 'Bionis Coach',
    category: 'AI Assistant',
    type: 'AI Assistant',
    intro: [
      'A conversational AI coach that reads Bionis health data and goals to give personalised, context-aware guidance on sleep, training and recovery.',
    ],
    image: '/showcase/site-2.png',
    stack: ['Next.js', 'RAG', 'Vector DB', 'Claude API'],
    services: ['AI Engineering', 'Product Design'],
    year: '2026',
    client: 'Bionis Labs',
    stage: 'MVP',
    engagement: '2 months, ongoing',
    caseStudy: {
      challenge: {
        intro: 'Generic chatbot advice ignored the user’s real data and felt untrustworthy.',
        points: [
          'Ground every answer in the user’s own metrics',
          'Stay safe and clearly non-medical',
          'Keep responses short and actionable',
        ],
      },
      features: [
        { title: 'Retrieval over personal data', description: 'RAG pipeline over sleep, activity and recovery history.' },
        { title: 'Goal-aware guidance', description: 'Advice adapts to what the user is training for.' },
      ],
    },
  },
  {
    slug: 'medesk-staff',
    name: 'Medesk Staff',
    category: 'Workforce Management',
    type: 'Web App',
    intro: [
      'Shift scheduling, patient load balancing and performance tracking for doctors and nurses, integrated with the core Medesk platform.',
    ],
    image: '/showcase/site-1.png',
    stack: ['React', 'Go', 'PostgreSQL', 'Redis'],
    services: ['Full-Stack Engineering', 'Integrations'],
    year: '2025',
    client: 'Medesk Health',
    stage: 'Production',
    engagement: '4 months',
    caseStudy: {
      features: [
        { title: 'Shift scheduling', description: 'Drag-and-drop rotas with conflict detection.' },
        { title: 'Load balancing', description: 'Patient assignments weighted by current clinician load.' },
        { title: 'HR integrations', description: 'Sync with existing hospital HR and payroll systems.' },
      ],
    },
  },
  {
    slug: 'bionis-sleep',
    name: 'Bionis Sleep',
    category: 'Consumer Health',
    type: 'Mobile App',
    intro: [
      'A mobile app that detects sleep debt from wearable data and builds recovery plans, with nightly summaries and weekly trends.',
    ],
    image: '/showcase/site-2.png',
    stack: ['React Native', 'TypeScript', 'Python', 'AWS'],
    services: ['Mobile Engineering', 'AI Automation'],
    year: '2025',
    client: 'Bionis Labs',
    stage: 'MVP',
    engagement: '3 months',
  },
]
