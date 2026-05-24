import { NextResponse } from 'next/server'
import { corePages, siteConfig } from '../site-config'
import { comparisons } from '../compare/compare-data'
import { guides } from '../guides/guide-data'
import { scenarios } from '../scenarios/scenario-data'
import { toolDetails } from '../tools/tool-data'

export function GET() {
  const urls = [
    ...corePages,
    ...toolDetails.map((tool) => `/tools/${tool.slug}`),
    ...guides.map((guide) => `/guides/${guide.slug}`),
    ...comparisons.map((comparison) => `/compare/${comparison.slug}`),
    ...scenarios.map((scenario) => `/scenarios/${scenario.slug}`),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteConfig.url}${path}</loc>
    <lastmod>2026-05-22</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
