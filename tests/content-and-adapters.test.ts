import assert from 'assert'
import { adaptNotionTools } from '../app/tools/notion-adapter'
import { createToolMetadata, toolDetails } from '../app/tools/tool-data'

const notionPayload = {
  results: [
    {
      properties: {
        ID: { unique_id: { number: 42 } },
        name: { title: [{ plain_text: 'ChatGPT' }] },
        url: { rich_text: [{ plain_text: 'https://chat.openai.com' }] },
        category: { rich_text: [{ plain_text: 'chatbots' }] },
        description: { rich_text: [{ plain_text: 'General AI assistant' }] },
      },
    },
    {
      properties: {
        ID: { unique_id: { number: 43 } },
        name: { title: [] },
        url: { rich_text: [{ plain_text: 'https://example.com' }] },
        category: { rich_text: [{ plain_text: 'chatbots' }] },
        description: { rich_text: [{ plain_text: 'Missing title should be ignored' }] },
      },
    },
  ],
}

const adaptedTools = adaptNotionTools(notionPayload, toolDetails)

assert.equal(adaptedTools.length, 1)
assert.deepEqual(adaptedTools[0], {
  id: 42,
  name: 'ChatGPT',
  url: 'https://chat.openai.com',
  category: 'chatbots',
  description: 'General AI assistant',
  slug: 'chatgpt',
})

const metadata = createToolMetadata(toolDetails[0])

assert.equal(metadata.title, 'ChatGPT 怎么用 | 小熊AI导航')
assert.match(String(metadata.description), /写作/)
assert.match(String(metadata.description), /最后更新/)

console.log('content-and-adapters tests passed')
