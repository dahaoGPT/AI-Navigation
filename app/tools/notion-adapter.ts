import type { ToolDetail } from './tool-data'

export type ToolListing = {
  id: number
  name: string
  url: string
  category: string
  description: string
  slug?: string
}

type NotionRichTextValue = {
  plain_text?: unknown
}

type NotionToolPage = {
  properties?: {
    ID?: { unique_id?: { number?: unknown } }
    name?: { title?: NotionRichTextValue[] }
    url?: { rich_text?: NotionRichTextValue[] }
    category?: { rich_text?: NotionRichTextValue[] }
    description?: { rich_text?: NotionRichTextValue[] }
  }
}

type NotionDatabaseResponse = {
  results?: unknown
}

const readText = (value: NotionRichTextValue[] | undefined) => {
  const text = value?.[0]?.plain_text
  return typeof text === 'string' ? text.trim() : ''
}

const readId = (page: NotionToolPage, fallback: number) => {
  const id = page.properties?.ID?.unique_id?.number
  return typeof id === 'number' ? id : fallback
}

export function adaptNotionTools(
  payload: NotionDatabaseResponse | null | undefined,
  knownTools: ToolDetail[],
): ToolListing[] {
  const results = payload && Array.isArray(payload.results) ? payload.results : []
  const slugByName = new Map(knownTools.map((tool) => [tool.name.toLowerCase(), tool.slug]))

  return results.flatMap((item, index) => {
    const page = item as NotionToolPage
    const name = readText(page.properties?.name?.title)
    const url = readText(page.properties?.url?.rich_text)
    const category = readText(page.properties?.category?.rich_text)
    const description = readText(page.properties?.description?.rich_text)

    if (!name || !url || !category || !description) {
      return []
    }

    return {
      id: readId(page, index + 1),
      name,
      url,
      category,
      description,
      slug: slugByName.get(name.toLowerCase()),
    }
  })
}
