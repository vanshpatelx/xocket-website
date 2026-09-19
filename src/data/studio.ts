/**
 * Single source of truth for studio-level facts: the numbers, the sectors we work in,
 * who backs our clients, and the shapes an engagement can take. The website, the JSON
 * API, the MCP server and llms.txt all read from here so they cannot drift apart.
 *
 * The figures below are client outcomes reported by Xocket. Update them here only.
 */

export const stats = [
  { value: '$310M+', label: 'Raised by our clients' },
  { value: '$5B+', label: 'Combined valuation' },
  { value: '50+', label: 'Products built' },
  { value: '5d', label: 'To first prototype' },
]

/** Named investors behind clients we have built for. Only add funds that are actually true. */
export const backers = ['a16z', 'Y Combinator']

export const backersLine = `Founders backed by ${backers.join(', ')} and other leading funds`

export const sectors = ['AI', 'Crypto', 'Dev tools', 'Consumer brands']

export type Service = {
  name: string
  summary: string
  /** Ordered steps, for services where the process is the point */
  steps?: { title: string; description: string }[]
}

export const services: Service[] = [
  {
    name: 'AI Product Studio',
    summary:
      'Idea to production-grade first release: strategy, design, full-stack and AI engineering, launch. Working prototype in five days, MVP in 30 to 90 days.',
  },
  {
    name: 'AI Engineering Lab',
    summary:
      'The engineering problems others avoid, inside a product that already exists: data-heavy systems, AI automation, retrieval over your own data, agents in a workflow, performance work.',
  },
  {
    name: 'Dedicated AI Engineers',
    summary:
      'Senior engineers embedded in your team, with daily standups and no account managers in between. From around $50/hour.',
  },
  {
    name: 'Automation for Established Companies',
    summary:
      'For companies that already run on people and spreadsheets and want the repetitive work automated. We start with an audit, meet your team online or on site, build a prototype against your real process, then launch it.',
    steps: [
      {
        title: 'Audit',
        description:
          'We map how the work actually happens today, which steps are repetitive, what they cost in hours, and where automation would pay for itself first.',
      },
      {
        title: 'Visit',
        description:
          'We meet the people doing the work, online or in person at your site, so the system is designed around the real process rather than a diagram of it.',
      },
      {
        title: 'Prototype',
        description:
          'We build the automation against your real data and workflow, so you can see it running on your own process before committing to a full rollout.',
      },
      {
        title: 'Launch',
        description:
          'We deploy it, train the team that will use it, and keep monitoring and refining once it is carrying real load.',
      },
    ],
  },
]
