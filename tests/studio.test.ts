import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { backers, backersLine, sectors, services, stats } from '../src/data/studio'
import { handleApi } from '../worker/lib'
import { callTool } from '../worker/mcp'

const dist = join(import.meta.dirname, '..', 'dist')
const read = (file: string) => readFileSync(join(dist, file), 'utf8')

const studioJson = async () => {
  const url = new URL('https://dev.xocket.sh/api/v1/studio')
  return handleApi(new Request(url), url, `studio-${Math.random()}`)!.json()
}

describe('studio facts', () => {
  it('names the automation service with its four steps', () => {
    const automation = services.find((service) => service.name.includes('Automation'))
    expect(automation).toBeDefined()
    expect(automation!.steps?.map((step) => step.title)).toEqual(['Audit', 'Visit', 'Prototype', 'Launch'])
  })

  it('states the client outcome figures once', () => {
    expect(stats.map((stat) => stat.value)).toContain('$310M+')
    expect(stats.map((stat) => stat.value)).toContain('$5B+')
  })

  it('keeps the backers line built from the named funds', () => {
    for (const fund of backers) expect(backersLine).toContain(fund)
    expect(backersLine).toContain('other leading funds')
  })
})

describe('studio facts reach every surface', () => {
  it('appears in the prerendered homepage', () => {
    const html = read('index.html')
    expect(html).toContain('$310M+')
    expect(html).toContain('$5B+')
    expect(html).toContain('a16z')
    for (const sector of sectors) expect(html).toContain(sector)
  })

  it('appears on the about page', () => {
    const html = read('about/index.html')
    expect(html).toContain('Automation for Established Companies')
    for (const step of ['Audit', 'Visit', 'Prototype', 'Launch']) expect(html).toContain(step)
  })

  it('is served by the json api', async () => {
    const body = await studioJson()
    expect(body.services).toHaveLength(services.length)
    const automation = body.services.find((service: { name: string }) => service.name.includes('Automation'))
    expect(automation.process).toHaveLength(4)
    expect(body.backers).toEqual(backers)
    expect(body.sectors).toEqual(sectors)
    expect(body.stats.map((stat: { value: string }) => stat.value)).toContain('$310M+')
  })

  it('is served by the mcp get_studio tool', () => {
    const value = callTool('get_studio').structuredContent
    expect(value.services).toHaveLength(services.length)
    expect(value.backers).toEqual(backers)
    expect(value.stats.join(' ')).toContain('$310M+')
  })

  it('is written into llms.txt, including when to use the automation service', () => {
    const llms = read('llms.txt')
    expect(llms).toContain('$310M+')
    expect(llms).toContain('$5B+')
    expect(llms).toContain('a16z')
    expect(llms).toContain('## Services')
    expect(llms).toContain('Audit -> Visit -> Prototype -> Launch')
    expect(llms).toMatch(/established or traditional company/i)
  })
})
