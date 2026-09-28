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
  /** 2-3 concise highlight badges shown alongside product name */
  badges: string[]
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


export const products: Product[] = [
  {
    slug: 'medesk',
    name: 'Medesk',
    category: 'Healthcare SaaS',
    type: 'Dashboard',
    badges: ['Healthcare SaaS', 'Dashboard', 'OpenAI'],
    intro: [
      'Medesk is a hospital operations platform that gives care teams one live view of appointments, wait times, bed occupancy and staff performance.',
      'We partnered with the founding team from first prototype to production, designing and engineering the core dashboard and an AI assistant that answers questions across operational data.',
    ],
    image: 'https://assets.xocket.sh/product-designs/medesk-01.png',
    gallery: [
      'https://assets.xocket.sh/product-designs/medesk-02.png',
      'https://assets.xocket.sh/product-designs/medesk-03.png',
      'https://assets.xocket.sh/product-designs/medesk-04.png',
      'https://assets.xocket.sh/product-designs/medesk-05.png',
      'https://assets.xocket.sh/product-designs/medesk-06.png',
      'https://assets.xocket.sh/product-designs/medesk-07.png',
      'https://assets.xocket.sh/product-designs/medesk-08.png',
      'https://assets.xocket.sh/product-designs/medesk-09.png',
    ],
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
    badges: ['Health & Wellness', 'Dashboard', 'LLM Agents'],
    intro: [
      'Bionis turns sleep, activity and recovery signals into a single daily wellness score, with AI insights that explain what changed and what to do next.',
      'We designed and built the product end to end, from the scoring model to the dashboard experience.',
    ],
    image: 'https://assets.xocket.sh/product-designs/bionis-06.png',
    gallery: [
      'https://assets.xocket.sh/product-designs/bionis-01.png',
      'https://assets.xocket.sh/product-designs/bionis-02.png',
      'https://assets.xocket.sh/product-designs/bionis-03.png',
      'https://assets.xocket.sh/product-designs/bionis-04.png',
      'https://assets.xocket.sh/product-designs/bionis-05.png',
      'https://assets.xocket.sh/product-designs/bionis-07.png',
      'https://assets.xocket.sh/product-designs/bionis-08.png',
      'https://assets.xocket.sh/product-designs/bionis-09.png',
      'https://assets.xocket.sh/product-designs/bionis-10.png',
    ],
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
    slug: 'capitalio',
    name: 'Capitalio',
    category: 'Wealth & FinTech',
    type: 'Dashboard',
    badges: ['Wealth & FinTech', 'Dashboard', 'Portfolio Analytics'],
    intro: [
      'Capitalio is a modern wealth intelligence platform giving private wealth managers and investors a consolidated view of net worth, asset allocation, and real-time performance.',
      'We designed and engineered the product from scratch, featuring live asset pricing, benchmark comparisons against the S&P 500, and multi-asset class allocation modeling.',
    ],
    image: 'https://assets.xocket.sh/product-designs/capitalio-01.png',
    gallery: [
      'https://assets.xocket.sh/product-designs/capitalio-02.png',
      'https://assets.xocket.sh/product-designs/capitalio-03.png',
      'https://assets.xocket.sh/product-designs/capitalio-04.png',
      'https://assets.xocket.sh/product-designs/capitalio-05.png',
      'https://assets.xocket.sh/product-designs/capitalio-06.png',
      'https://assets.xocket.sh/product-designs/capitalio-07.png',
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    services: ['Product Strategy', 'UX/UI Design', 'Full-Stack Engineering'],
    year: '2026',
    client: 'Capitalio Finance',
    stage: 'MVP → Production',
    engagement: '5 months',
    results: 'Multi-asset tracking across stocks, crypto, and real estate with sub-second portfolio rebalancing',
    caseStudy: {
      challenge: {
        intro:
          'High-net-worth investors were juggling fragmented brokerages, crypto wallets, and illiquid real estate valuations across disconnected portals.',
        points: [
          'Unify public equities, private equity, crypto, and real estate into one reliable net worth calculation',
          'Benchmark performance accurately against indices like the S&P 500 in real time',
          'Provide automated risk analysis and allocation rebalancing triggers',
        ],
      },
      approach: {
        intro: 'We structured the experience around immediate clarity and deep portfolio intelligence:',
        steps: [
          { title: 'Aggregate', description: 'Connect institutional brokerages, custodial APIs, and crypto exchanges into one unified ledger.' },
          { title: 'Analyze', description: 'Calculate historical returns, risk exposures, and sector-level performance metrics.' },
          { title: 'Forecast', description: 'Model target distributions, liquidity scenarios, and tax-loss harvesting opportunities.' },
        ],
      },
      features: [
        { title: 'Consolidated Net Worth View', description: 'Real-time multi-asset aggregation across global markets and alternative investments.' },
        { title: 'Interactive Performance Benchmarks', description: 'Dynamic time-series tracking against major market benchmarks with dividend adjustments.' },
        { title: 'Automated Asset Class Rebalancing', description: 'Instant alerts and target allocation drift tracking across equity and fixed income holdings.' },
      ],
      outcome: {
        metrics: [
          { value: 'sub-sec', label: 'Portfolio sync latency' },
          { value: '4+', label: 'Asset classes unified' },
        ],
        points: [
          'High-fidelity financial charts and dark mode interface engineered for rapid analysis',
          'Enterprise-grade security and read-only financial data aggregation pipelines',
        ],
      },
    },
  },
  {
    slug: 'lexigent',
    name: 'Lexigent',
    category: 'LegalTech',
    type: 'AI Assistant',
    badges: ['LegalTech', 'AI Assistant', 'Contract Intelligence'],
    intro: [
      'Lexigent is an AI-powered contract intelligence and risk analysis workspace that helps legal teams review agreements, audit high-risk clauses, and enforce playbooks at speed.',
      'We architected and built the smart contract analysis pipeline, version comparison engine, and conversational assistant to surface non-standard terms instantly.',
    ],
    image: 'https://assets.xocket.sh/product-designs/lexigent-01.png',
    gallery: [
      'https://assets.xocket.sh/product-designs/lexigent-02.png',
      'https://assets.xocket.sh/product-designs/lexigent-03.png',
      'https://assets.xocket.sh/product-designs/lexigent-04.png',
      'https://assets.xocket.sh/product-designs/lexigent-05.png',
      'https://assets.xocket.sh/product-designs/lexigent-06.png',
      'https://assets.xocket.sh/product-designs/lexigent-07.png',
      'https://assets.xocket.sh/product-designs/lexigent-08.png',
      'https://assets.xocket.sh/product-designs/lexigent-09.png',
      'https://assets.xocket.sh/product-designs/lexigent-10.png',
      'https://assets.xocket.sh/product-designs/lexigent-11.png',
      'https://assets.xocket.sh/product-designs/lexigent-12.png',
    ],
    stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Claude API', 'Vector Search'],
    services: ['AI Engineering', 'UX/UI Design', 'Full-Stack Engineering'],
    year: '2026',
    client: 'Lexigent Legal',
    stage: 'MVP → Production',
    engagement: '4 months',
    results: 'Automated 80% of routine contract review workflows and reduced clause audit time from hours to minutes',
    caseStudy: {
      challenge: {
        intro:
          'In-house counsel spent hours manually parsing 50+ page commercial agreements to flag redline deviations and non-compliant indemnification clauses.',
        points: [
          'Detect high-risk clauses and non-standard liability caps instantly',
          'Cross-reference negotiated agreements against firm playbooks and approved language',
          'Provide side-by-side diffing and AI-assisted counter-clause generation',
        ],
      },
      approach: {
        intro: 'We built a purpose-specific AI contract review flow designed for precision:',
        steps: [
          { title: 'Ingest', description: 'Extract clean structural tokens and clauses from PDFs and Word documents.' },
          { title: 'Audit', description: 'Evaluate language against playbook standards using custom LLM verification chains.' },
          { title: 'Remediate', description: 'Suggest redline adjustments and generate defensible fallback clauses.' },
        ],
      },
      features: [
        { title: 'Smart Review & Risk Scoring', description: 'Color-coded clause risk evaluation highlighting deviations from standard agreements.' },
        { title: 'Playbook Library & Policy Enforcement', description: 'Central repository of pre-approved fallback clauses and unacceptable terms.' },
        { title: 'AI Assistant & Semantic Search', description: 'Direct natural-language queries across historical agreements and active negotiations.' },
      ],
      outcome: {
        metrics: [
          { value: '80%', label: 'Routine review automated' },
          { value: '10x', label: 'Faster clause auditing' },
        ],
        points: [
          'Auditable LLM citations grounded in exact document coordinates',
          'Seamless collaborative workspace for legal and commercial stakeholders',
        ],
      },
    },
  },
  {
    slug: 'revtrack',
    name: 'Revtrack',
    category: 'Sales & RevOps',
    type: 'Analytics',
    badges: ['Sales & RevOps', 'Analytics', 'Pipeline Forecasting'],
    intro: [
      'Revtrack is a revenue operations and pipeline analytics platform that unifies deal progress, stage conversion funnels, and revenue forecasting for modern B2B sales teams.',
      'We designed the CRM intelligence workspace, built real-time funnel velocity metrics, and engineered high-speed analytics for enterprise deal tracking.',
    ],
    image: 'https://assets.xocket.sh/product-designs/revtrack-08.png',
    gallery: [
      'https://assets.xocket.sh/product-designs/revtrack-01.png',
      'https://assets.xocket.sh/product-designs/revtrack-02.png',
      'https://assets.xocket.sh/product-designs/revtrack-03.png',
      'https://assets.xocket.sh/product-designs/revtrack-04.png',
      'https://assets.xocket.sh/product-designs/revtrack-05.png',
      'https://assets.xocket.sh/product-designs/revtrack-06.png',
      'https://assets.xocket.sh/product-designs/revtrack-07.png',
      'https://assets.xocket.sh/product-designs/revtrack-09.png',
      'https://assets.xocket.sh/product-designs/revtrack-10.png',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'ClickHouse'],
    services: ['Product Strategy', 'UX/UI Design', 'Data Engineering'],
    year: '2026',
    client: 'Revtrack Systems',
    stage: 'Growth',
    engagement: '5 months',
    results: 'Consolidated pipeline visibility with automated stage velocity and monthly revenue forecasting',
    caseStudy: {
      challenge: {
        intro:
          'Sales leaders lacked accurate forward visibility into pipeline health and stage drop-offs, relying on stale weekly updates.',
        points: [
          'Track real-time conversion rates across leads, qualifications, proposals, and negotiations',
          'Pinpoint stalled deals before quarter-end targets slip',
          'Deliver automated revenue forecasts based on historical close velocities',
        ],
      },
      approach: {
        intro: 'We built a data pipeline and interface tailored for revenue leaders:',
        steps: [
          { title: 'Aggregate', description: 'Ingest live deal and interaction data across CRM and communication tools.' },
          { title: 'Model', description: 'Calculate weighted pipeline values and stage progression speeds.' },
          { title: 'Forecast', description: 'Generate rolling quarterly projections with confidence intervals.' },
        ],
      },
      features: [
        { title: 'CRM Pipeline Overview', description: 'Real-time pipeline valuation, deals won, and average close time metrics.' },
        { title: 'Conversion Funnel Analytics', description: 'Visual stage-by-stage drop-off tracking from initial lead to closed won.' },
        { title: 'Monthly Revenue Closed Tracking', description: 'Historical closed revenue pacing compared to quarterly quota targets.' },
      ],
      outcome: {
        metrics: [
          { value: '24d', label: 'Average deal close time' },
          { value: '$2.4M', label: 'Active pipeline tracked' },
        ],
        points: [
          'Real-time data synchronization with zero manual report collation',
          'Instant drill-down from executive summaries to individual account records',
        ],
      },
    },
  },
  {
    slug: 'tallie',
    name: 'Tallie',
    category: 'FinTech & Accounting',
    type: 'Web App',
    badges: ['FinTech', 'Web App', 'Automated Audit'],
    intro: [
      'Tallie is an automated financial audit and three-way matching platform that reconciles purchase orders, invoices, and payments in real time across enterprise ERPs.',
      'We built high-throughput transaction processing pipelines, real-time exception alerting, and audit workflow controls to streamline enterprise accounts payable.',
    ],
    image: 'https://assets.xocket.sh/product-designs/tallie-01.png',
    gallery: [
      'https://assets.xocket.sh/product-designs/tallie-02.png',
      'https://assets.xocket.sh/product-designs/tallie-03.png',
      'https://assets.xocket.sh/product-designs/tallie-04.png',
      'https://assets.xocket.sh/product-designs/tallie-05.png',
      'https://assets.xocket.sh/product-designs/tallie-06.png',
      'https://assets.xocket.sh/product-designs/tallie-07.png',
      'https://assets.xocket.sh/product-designs/tallie-08.png',
      'https://assets.xocket.sh/product-designs/tallie-09.png',
      'https://assets.xocket.sh/product-designs/tallie-10.png',
    ],
    stack: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Temporal'],
    services: ['Full-Stack Engineering', 'UX/UI Design', 'Integrations'],
    year: '2025',
    client: 'Tallie Labs',
    stage: 'Production',
    engagement: '6 months',
    results: 'Processed 140k+ live transactions with 97.8% automated matching rate and instant ERP reconciliation',
    caseStudy: {
      challenge: {
        intro:
          'Finance teams manually cross-checked thousands of purchase orders, packing slips, and supplier invoices each month, creating massive invoice bottlenecks and human errors.',
        points: [
          'Automate three-way matching at enterprise scale with line-item precision',
          'Isolate pricing variances and quantity discrepancies before payment release',
          'Integrate cleanly with legacy ERP systems like Oracle and SAP',
        ],
      },
      approach: {
        intro: 'We designed an automated audit pipeline with human-in-the-loop exception handling:',
        steps: [
          { title: 'Sync', description: 'Stream purchase orders and invoices from ERPs and billing platforms.' },
          { title: 'Match', description: 'Execute deterministic multi-variable validation rules across line items.' },
          { title: 'Resolve', description: 'Route exceptions to accounting specialists with contextual root-cause data.' },
        ],
      },
      features: [
        { title: 'Three-Way Match Automation', description: 'Continuous automated validation of invoices against purchase orders and receipts.' },
        { title: 'Real-Time Exception Queue', description: 'Prioritized dispute resolution queue with automated supplier communication workflows.' },
        { title: 'ERP Synchronization Engine', description: 'Bi-directional synchronization with enterprise ledger and procurement infrastructure.' },
      ],
      outcome: {
        metrics: [
          { value: '147k+', label: 'Transactions audited' },
          { value: '97.8%', label: 'Automated match rate' },
        ],
        points: [
          'Drastic reduction in manual payment delays and audit preparation overhead',
          'Granular audit trails providing complete compliance assurance',
        ],
      },
    },
  },
  {
    slug: 'vertics',
    name: 'Vertics',
    category: 'Workforce Management',
    type: 'Analytics',
    badges: ['Workforce', 'Analytics', 'Operations'],
    intro: [
      'Vertics is an operational intelligence and team performance analytics workspace that tracks cross-department productivity, SLA compliance, and goal progression.',
      'We designed and engineered the multi-team workspace, department workload breakdowns, and automated health score reporting for executive leadership.',
    ],
    image: 'https://assets.xocket.sh/product-designs/vertics-06.png',
    gallery: [
      'https://assets.xocket.sh/product-designs/vertics-01.png',
      'https://assets.xocket.sh/product-designs/vertics-02.png',
      'https://assets.xocket.sh/product-designs/vertics-03.png',
      'https://assets.xocket.sh/product-designs/vertics-04.png',
      'https://assets.xocket.sh/product-designs/vertics-05.png',
      'https://assets.xocket.sh/product-designs/vertics-07.png',
      'https://assets.xocket.sh/product-designs/vertics-08.png',
      'https://assets.xocket.sh/product-designs/vertics-09.png',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'ClickHouse', 'Tailwind CSS'],
    services: ['Product Strategy', 'UX/UI Design', 'Full-Stack Engineering'],
    year: '2025',
    client: 'Vertics Operations',
    stage: 'MVP → Growth',
    engagement: '4 months',
    results: 'Unified cross-department task output, team health scores, and response time SLAs for fast-scaling orgs',
    caseStudy: {
      challenge: {
        intro:
          'Distributed engineering, design, and operations teams lacked an objective, shared view of capacity, blocker resolution times, and department throughput.',
        points: [
          'Consolidate output metrics across Jira, GitHub, Linear, and customer support desks',
          'Establish balanced team health indicators that avoid vanity metrics',
          'Surface team burnout patterns and unbalanced workload distribution early',
        ],
      },
      approach: {
        intro: 'We built a balanced team operational score and drill-down reporting system:',
        steps: [
          { title: 'Collect', description: 'Stream activity signals and delivery milestones from work tools.' },
          { title: 'Normalize', description: 'Adjust metrics for team size, project complexity, and historical baselines.' },
          { title: 'Guide', description: 'Provide actionable feedback to team leads to unblock stalled initiatives.' },
        ],
      },
      features: [
        { title: 'Department Output Benchmarking', description: 'Comparative monthly task completion breakdown across engineering, design, and ops.' },
        { title: 'Team Health Index', description: 'Composite health score monitoring response times, workload balance, and goal pacing.' },
        { title: 'Goal Progression Tracking', description: 'Objective key results tracking mapped directly to team commits and shipped tickets.' },
      ],
      outcome: {
        metrics: [
          { value: '84/100', label: 'Team health score' },
          { value: '2.4h', label: 'Avg response time' },
        ],
        points: [
          'Clear executive visibility into engineering and operations delivery cadence',
          'Eliminated subjective status reporting meetings in favor of continuous telemetry',
        ],
      },
    },
  },
  {
    slug: 'watchman',
    name: 'Watchman',
    category: 'Cybersecurity',
    type: 'Dashboard',
    badges: ['Cybersecurity', 'Dashboard', 'Threat Intelligence'],
    intro: [
      'Watchman is a next-generation security operations (SecOps) platform delivering real-time threat detection, event stream telemetry, and automated incident triage for enterprise defense teams.',
      'We engineered the high-velocity event monitoring dashboard, live alert triage flows, and rapid response playbook execution engine.',
    ],
    image: 'https://assets.xocket.sh/product-designs/watchman-07.png',
    gallery: [
      'https://assets.xocket.sh/product-designs/watchman-01.png',
      'https://assets.xocket.sh/product-designs/watchman-02.png',
      'https://assets.xocket.sh/product-designs/watchman-03.png',
      'https://assets.xocket.sh/product-designs/watchman-04.png',
      'https://assets.xocket.sh/product-designs/watchman-05.png',
      'https://assets.xocket.sh/product-designs/watchman-06.png',
      'https://assets.xocket.sh/product-designs/watchman-08.png',
    ],
    stack: ['React', 'TypeScript', 'Rust', 'Kafka', 'TimescaleDB'],
    services: ['UX/UI Design', 'Full-Stack Engineering', 'Security Architecture'],
    year: '2026',
    client: 'Watchman Security',
    stage: 'MVP → Production',
    engagement: '6 months',
    results: 'Sub-5-minute mean time to detect (MTTD) across 2,500+ events per minute with automated triage playbooks',
    caseStudy: {
      challenge: {
        intro:
          'Security analysts were flooded by tens of thousands of alert notifications per day, causing alert fatigue and delayed responses to critical security incidents.',
        points: [
          'Ingest and correlate high-velocity telemetry across endpoints, clouds, and identity providers',
          'Distinguish active security compromises from benign anomalies in seconds',
          'Automate containment actions like credential revocation and endpoint isolation',
        ],
      },
      approach: {
        intro: 'We designed the interface and event architecture around rapid triage and mitigation:',
        steps: [
          { title: 'Detect', description: 'Ingest and evaluate 2,500+ events per minute against threat detection baselines.' },
          { title: 'Correlate', description: 'Group related indicators into unified security incident timelines.' },
          { title: 'Contain', description: 'Trigger one-click automated response playbooks to isolate compromised hosts.' },
        ],
      },
      features: [
        { title: 'Real-Time Threat Telemetry', description: 'Sub-second event volume monitoring comparing live alerts against operational baselines.' },
        { title: 'Threat Category Breakdown', description: 'Instant threat distribution across malware, brute force, exfiltration, and privilege escalation.' },
        { title: 'Automated Response Playbooks', description: 'Automated endpoint isolation, memory dump analysis, and credential reset workflows.' },
      ],
      outcome: {
        metrics: [
          { value: '4.2m', label: 'Mean time to detect' },
          { value: '2.5k/m', label: 'Events processed' },
        ],
        points: [
          'Immediate analyst actionability with dark-mode, high-density SOC interface',
          'Automated isolation of compromised infrastructure within seconds of detection',
        ],
      },
    },
  },
]
