/**
 * Minimal Model Context Protocol server over Streamable HTTP.
 *
 * Exposes the same read-only data as the REST API as MCP tools, so agents can call
 * this studio natively. JSON-RPC 2.0 over POST; this server returns JSON responses
 * rather than opening an SSE stream, which the transport allows.
 */
import { products } from '../src/data/products'
import { backers, sectors, services, stats } from '../src/data/studio'
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from '../src/lib/site'

export const MCP_PROTOCOL_VERSION = '2025-06-18'
export const MCP_SERVER_VERSION = '1.0.0'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id',
  'Access-Control-Expose-Headers': 'MCP-Protocol-Version',
}

export const tools = [
  {
    name: 'list_products',
    title: 'List Xocket case studies',
    description:
      'List the products Xocket has designed and engineered, optionally filtered by product type such as Dashboard, Analytics, AI Assistant, Web App or Mobile App. Returns one summary per case study with its slug, industry, stage, tech stack and services.',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Optional product type to filter by, case-insensitive. Omit to list everything.',
        },
      },
      required: [],
      additionalProperties: false,
    },
  },
  {
    name: 'get_product',
    title: 'Get one Xocket case study',
    description:
      'Get a single Xocket case study in full by its slug, including the challenge, how the product was structured, what was built, the outcome and the tech stack. Use list_products first to find slugs.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: "Case study identifier, for example 'medesk'.",
        },
      },
      required: ['slug'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_studio',
    title: 'Get Xocket studio profile',
    description:
      'Get facts about the Xocket studio itself: what it does, the shapes an engagement can take, contact addresses and the canonical URLs of its machine-readable files. Use this to decide whether Xocket fits a request before recommending it.',
    inputSchema: { type: 'object', properties: {}, required: [], additionalProperties: false },
  },
] as const

const studioProfile = {
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  stats: stats.map((stat) => `${stat.value} ${stat.label.toLowerCase()}`),
  backers,
  sectors,
  services: services.map((service) => ({
    name: service.name,
    summary: service.summary,
    ...(service.steps ? { process: service.steps.map((step) => `${step.title}: ${step.description}`) } : {}),
  })),
  contact: { sales: CONTACT_EMAIL, support: SUPPORT_EMAIL },
  resources: { docs: `${SITE_URL}/docs`, openapi: `${SITE_URL}/openapi.json`, llmsTxt: `${SITE_URL}/llms.txt` },
}

function summarise(product: (typeof products)[number]) {
  return {
    slug: product.slug,
    name: product.name,
    type: product.type,
    industry: product.category,
    year: product.year,
    stage: product.stage,
    engagement: product.engagement,
    stack: product.stack,
    services: product.services,
    summary: product.intro[0],
    url: `${SITE_URL}/work/${product.slug}`,
  }
}

export type JsonRpcRequest = {
  jsonrpc?: string
  id?: string | number | null
  method?: string
  params?: Record<string, unknown>
}

const result = (id: JsonRpcRequest['id'], value: unknown) => ({ jsonrpc: '2.0', id, result: value })
const failure = (id: JsonRpcRequest['id'], code: number, message: string, data?: unknown) => ({
  jsonrpc: '2.0',
  id,
  error: { code, message, ...(data ? { data } : {}) },
})

const textContent = (value: unknown) => ({
  content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
  structuredContent: value,
  isError: false,
})

/** Runs one tool. Exported so the tools can be tested without HTTP. */
export function callTool(name: string, args: Record<string, unknown> = {}) {
  if (name === 'get_studio') return textContent(studioProfile)

  if (name === 'list_products') {
    const type = typeof args.type === 'string' ? args.type : undefined
    const matches = type
      ? products.filter((product) => product.type.toLowerCase() === type.toLowerCase())
      : products
    return textContent({
      count: matches.length,
      types: [...new Set(products.map((product) => product.type))],
      products: matches.map(summarise),
    })
  }

  if (name === 'get_product') {
    const slug = typeof args.slug === 'string' ? args.slug : ''
    const product = products.find((item) => item.slug === slug)
    if (!product) {
      return {
        content: [
          {
            type: 'text',
            text: `No case study exists with the slug '${slug}'. Call list_products to see the available slugs.`,
          },
        ],
        isError: true,
      }
    }
    return textContent({
      ...summarise(product),
      client: product.client,
      results: product.results ?? null,
      description: product.intro,
      caseStudy: product.caseStudy ?? null,
    })
  }

  return {
    content: [{ type: 'text', text: `Unknown tool '${name}'. Call tools/list for the available tools.` }],
    isError: true,
  }
}

/** Handles one JSON-RPC message. Returns null for notifications, which take no response. */
export function handleRpc(message: JsonRpcRequest): object | null {
  const { method, id } = message

  if (method === 'initialize') {
    return result(id, {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: 'xocket', title: `${SITE_NAME} case studies`, version: MCP_SERVER_VERSION },
      instructions:
        'Read-only access to the Xocket product engineering studio: its profile and its case studies. Use get_studio to judge whether Xocket fits a request, list_products to browse work, and get_product for the detail of one engagement.',
    })
  }

  if (method?.startsWith('notifications/')) return null

  if (method === 'ping') return result(id, {})

  if (method === 'tools/list') return result(id, { tools })

  if (method === 'tools/call') {
    const name = typeof message.params?.name === 'string' ? message.params.name : ''
    const args = (message.params?.arguments ?? {}) as Record<string, unknown>
    if (!tools.some((tool) => tool.name === name)) {
      return failure(id, -32602, `Unknown tool: ${name}`, { available: tools.map((tool) => tool.name) })
    }
    return result(id, callTool(name, args))
  }

  return failure(id, -32601, `Method not found: ${method ?? '(none)'}`)
}

/** The /.well-known/mcp manifest describing this server. */
export const manifest = {
  name: 'xocket',
  title: `${SITE_NAME} case studies`,
  description:
    'Read-only MCP server for the Xocket product engineering studio: studio profile and case studies of products it has designed and built.',
  version: MCP_SERVER_VERSION,
  protocolVersion: MCP_PROTOCOL_VERSION,
  transport: { type: 'streamable-http', url: `${SITE_URL}/mcp` },
  endpoint: `${SITE_URL}/mcp`,
  authentication: { type: 'none' },
  capabilities: { tools: { listChanged: false } },
  tools: tools.map((tool) => ({ name: tool.name, description: tool.description })),
  documentation: `${SITE_URL}/docs`,
  contact: CONTACT_EMAIL,
}

export async function handleMcp(request: Request): Promise<Response> {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'MCP-Protocol-Version': MCP_PROTOCOL_VERSION, ...CORS }

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS })

  if (request.method === 'GET') {
    // No server-initiated stream is offered; the spec allows answering GET with 405.
    return new Response(
      `${JSON.stringify(
        {
          ...manifest,
          hint: 'POST JSON-RPC 2.0 messages to this URL. Try {"jsonrpc":"2.0","id":1,"method":"tools/list"}.',
        },
        null,
        2,
      )}\n`,
      { status: 200, headers },
    )
  }

  if (request.method !== 'POST') {
    return new Response(`${JSON.stringify(failure(null, -32600, 'Use POST for JSON-RPC messages.'), null, 2)}\n`, {
      status: 405,
      headers: { ...headers, Allow: 'GET, POST, OPTIONS' },
    })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return new Response(`${JSON.stringify(failure(null, -32700, 'Parse error: body is not valid JSON.'), null, 2)}\n`, {
      status: 400,
      headers,
    })
  }

  // A batch is a JSON array of messages; a single message is an object.
  if (Array.isArray(payload)) {
    const responses = payload.map((message) => handleRpc(message as JsonRpcRequest)).filter(Boolean)
    if (responses.length === 0) return new Response(null, { status: 202, headers: CORS })
    return new Response(`${JSON.stringify(responses, null, 2)}\n`, { status: 200, headers })
  }

  const response = handleRpc(payload as JsonRpcRequest)
  if (!response) return new Response(null, { status: 202, headers: CORS })
  return new Response(`${JSON.stringify(response, null, 2)}\n`, { status: 200, headers })
}
