import { describe, expect, it } from 'vitest'
import { MCP_PROTOCOL_VERSION, callTool, handleMcp, handleRpc, manifest, tools } from '../worker/mcp'
import { products } from '../src/data/products'

const rpc = (method: string, params?: object, id: number | string | null = 1) =>
  handleRpc({ jsonrpc: '2.0', id, method, params }) as { result?: any; error?: any }

describe('mcp protocol', () => {
  it('answers initialize with a protocol version and tool capability', () => {
    const { result } = rpc('initialize')
    expect(result.protocolVersion).toBe(MCP_PROTOCOL_VERSION)
    expect(result.capabilities.tools).toBeDefined()
    expect(result.serverInfo.name).toBe('xocket')
    expect(result.instructions.length).toBeGreaterThan(20)
  })

  it('returns no response for notifications', () => {
    expect(handleRpc({ jsonrpc: '2.0', method: 'notifications/initialized' })).toBeNull()
  })

  it('answers ping', () => {
    expect(rpc('ping').result).toEqual({})
  })

  it('lists tools with unique names, descriptions and typed schemas', () => {
    const { result } = rpc('tools/list')
    expect(result.tools).toHaveLength(tools.length)
    const names = result.tools.map((tool: { name: string }) => tool.name)
    expect(new Set(names).size).toBe(names.length)
    for (const tool of result.tools) {
      expect(tool.description.length).toBeGreaterThan(20)
      expect(tool.inputSchema.type).toBe('object')
      expect(tool.inputSchema).toHaveProperty('properties')
    }
  })

  it('rejects unknown methods and unknown tools', () => {
    expect(rpc('nope').error.code).toBe(-32601)
    expect(rpc('tools/call', { name: 'nope', arguments: {} }).error.code).toBe(-32602)
  })
})

describe('mcp tools', () => {
  it('lists products and filters by type', () => {
    expect(callTool('list_products').structuredContent.count).toBe(products.length)
    const filtered = callTool('list_products', { type: 'dashboard' }).structuredContent
    expect(filtered.count).toBeGreaterThan(0)
    expect(filtered.products.every((p: { type: string }) => p.type === 'Dashboard')).toBe(true)
  })

  it('returns one product with its case study', () => {
    const value = callTool('get_product', { slug: 'medesk' })
    expect(value.isError).toBe(false)
    expect(value.structuredContent.slug).toBe('medesk')
    expect(value.structuredContent.caseStudy).not.toBeNull()
  })

  it('flags an unknown slug as a tool error rather than throwing', () => {
    const value = callTool('get_product', { slug: 'nope' })
    expect(value.isError).toBe(true)
    expect(value.content[0].text).toContain('list_products')
  })

  it('describes the studio', () => {
    const value = callTool('get_studio')
    expect(value.structuredContent.contact.sales).toContain('@')
    expect(value.structuredContent.services.length).toBeGreaterThan(0)
  })
})

describe('mcp transport', () => {
  const post = (body: unknown) =>
    handleMcp(new Request('https://dev.xocket.sh/mcp', { method: 'POST', body: JSON.stringify(body) }))

  it('answers a json-rpc post', async () => {
    const response = await post({ jsonrpc: '2.0', id: 7, method: 'tools/list' })
    expect(response.status).toBe(200)
    expect(response.headers.get('mcp-protocol-version')).toBe(MCP_PROTOCOL_VERSION)
    const body = await response.json()
    expect(body.id).toBe(7)
    expect(body.result.tools.length).toBe(tools.length)
  })

  it('handles batches and returns 202 when they are all notifications', async () => {
    const batch = await post([
      { jsonrpc: '2.0', id: 1, method: 'ping' },
      { jsonrpc: '2.0', id: 2, method: 'ping' },
    ])
    expect((await batch.json()).length).toBe(2)
    const notifications = await post([{ jsonrpc: '2.0', method: 'notifications/initialized' }])
    expect(notifications.status).toBe(202)
  })

  it('reports a parse error for invalid json', async () => {
    const response = await handleMcp(new Request('https://dev.xocket.sh/mcp', { method: 'POST', body: 'not json' }))
    expect(response.status).toBe(400)
    expect((await response.json()).error.code).toBe(-32700)
  })

  it('describes itself on GET', async () => {
    const response = await handleMcp(new Request('https://dev.xocket.sh/mcp'))
    expect(response.status).toBe(200)
    expect((await response.json()).transport.type).toBe('streamable-http')
  })

  it('publishes a manifest naming the transport and tools', () => {
    expect(manifest.transport.url).toBe('https://dev.xocket.sh/mcp')
    expect(manifest.protocolVersion).toBe(MCP_PROTOCOL_VERSION)
    expect(manifest.tools.map((tool) => tool.name)).toEqual(tools.map((tool) => tool.name))
  })
})
