export type Scenario = {
  slug: string
  title: string
  summary: string
  audience: string
  painPoints: string[]
  recommendedTools: {
    name: string
    href: string
    reason: string
  }[]
  workflow: {
    title: string
    body: string
  }[]
  relatedGuides: {
    title: string
    href: string
  }[]
  relatedComparisons: {
    title: string
    href: string
  }[]
}

export const scenarios: Scenario[] = [
  {
    slug: 'student-study-writing',
    title: '学生写作与学习',
    summary: '适合论文阅读、知识点解释、PPT 草稿、翻译和复习计划。',
    audience: '学生',
    painPoints: ['资料太长读不完', '外文论文理解慢', 'PPT 结构难搭', '复习计划容易不现实'],
    recommendedTools: [
      { name: 'ChatGPT', href: '/tools/chatgpt', reason: '解释概念、生成复习计划、帮你追问知识盲点。' },
      { name: 'DeepL', href: '/tools/deepl', reason: '处理外文资料、邮件和论文初译。' },
      { name: 'AI-powered PPT', href: '/tools/ai-powered-ppt', reason: '把课堂展示主题快速变成演示稿草稿。' },
      { name: 'Canva', href: '/tools/canva', reason: '美化展示页、封面和学习笔记图。' },
    ],
    workflow: [
      {
        title: '先整理材料，再让 AI 解释',
        body: '把文章标题、摘要、目录或你不懂的段落交给 AI，让它先说明研究问题、核心观点和限制。不要直接要求它替你写作业。',
      },
      {
        title: '把复习计划拆成每天能完成的动作',
        body: '输入考试时间、章节范围和每天可用时长，让 AI 生成计划后再自己删减。一个可执行计划应包含复习、练习、错题和回顾。',
      },
      {
        title: '提交前核对引用和学校规则',
        body: 'AI 可能编造文献或给出过度自信的解释。论文引用、数据和最终结论必须回到真实来源核查。',
      },
    ],
    relatedGuides: [
      { title: '学生用 AI 学习的安全做法', href: '/guides/student-ai-study' },
    ],
    relatedComparisons: [
      { title: 'Canva 和 AI-powered PPT 怎么选', href: '/compare/canva-vs-ai-ppt' },
    ],
  },
  {
    slug: 'office-productivity',
    title: '上班族办公提效',
    summary: '适合会议纪要、日报周报、邮件、翻译、汇报和数据整理。',
    audience: '上班族',
    painPoints: ['重复写汇报耗时', '会议行动项容易漏', '外文邮件语气难把握', 'PPT 初稿搭得慢'],
    recommendedTools: [
      { name: 'ChatGPT', href: '/tools/chatgpt', reason: '整理会议纪要、周报、邮件和项目说明。' },
      { name: 'DeepL', href: '/tools/deepl', reason: '翻译邮件、资料和跨语言沟通内容。' },
      { name: 'AI-powered PPT', href: '/tools/ai-powered-ppt', reason: '快速生成汇报结构和演示稿草稿。' },
      { name: 'Tableau', href: '/tools/tableau', reason: '面向更专业的数据看板和企业分析。' },
    ],
    workflow: [
      {
        title: '固定日报和周报模板',
        body: '先记录事实要点，再让 AI 根据固定结构归纳。这样能减少空话，也更容易让主管看到真实进展和阻塞。',
      },
      {
        title: '会议纪要先提取行动项',
        body: '让 AI 先列出责任人、截止时间、待确认事项和风险，再生成正式纪要。责任人和日期必须人工复核。',
      },
      {
        title: '汇报材料先搭结构再补证据',
        body: 'AI 适合帮你搭汇报框架，但真实数据、业务背景、截图和结论依据仍然要自己补充。',
      },
    ],
    relatedGuides: [
      { title: '上班族如何用 AI 处理日报、周报和会议纪要', href: '/guides/office-ai-workflow' },
    ],
    relatedComparisons: [
      { title: 'Canva 和 AI-powered PPT 怎么选', href: '/compare/canva-vs-ai-ppt' },
    ],
  },
  {
    slug: 'creator-content',
    title: '自媒体内容创作',
    summary: '适合选题、脚本、标题、封面图、社媒配图和多平台改写。',
    audience: '创作者',
    painPoints: ['选题容易重复', '脚本缺结构', '封面图不稳定', '标题容易夸张失真'],
    recommendedTools: [
      { name: 'ChatGPT', href: '/tools/chatgpt', reason: '做选题发散、脚本结构和标题候选。' },
      { name: 'Midjourney', href: '/tools/midjourney', reason: '做高质感视觉探索和封面灵感。' },
      { name: 'DALL-E', href: '/tools/dall-e', reason: '快速生成文章配图和创意草图。' },
      { name: 'Canva', href: '/tools/canva', reason: '完成封面、海报和社媒版式。' },
    ],
    workflow: [
      {
        title: '先给 AI 账号定位',
        body: '告诉 AI 目标读者、账号风格、禁用话题和内容形式，再让它生成选题。这样比直接要标题更稳定。',
      },
      {
        title: '脚本要保留真实经验',
        body: 'AI 可以写结构和多个版本，但案例、数据和观点要由创作者自己确认。不要编造亲身体验。',
      },
      {
        title: '图片商用前查授权',
        body: 'AI 图片适合做创意草稿和辅助素材。用于广告、商品或客户项目时，必须核对工具官方授权条款。',
      },
    ],
    relatedGuides: [
      { title: '自媒体创作者的 AI 内容生产流程', href: '/guides/creator-ai-content' },
    ],
    relatedComparisons: [
      { title: 'DALL-E 和 Midjourney 怎么选', href: '/compare/dalle-vs-midjourney' },
      { title: 'ChatGPT 和 Jasper 怎么选', href: '/compare/chatgpt-vs-jasper' },
    ],
  },
  {
    slug: 'developer-automation',
    title: '开发与自动化',
    summary: '适合代码解释、脚本生成、测试补全、技术文档和自动化小工具。',
    audience: '开发者',
    painPoints: ['读旧代码慢', '重复脚本多', '测试补得不完整', '文档容易过期'],
    recommendedTools: [
      { name: 'GitHub Copilot', href: '/tools/github-copilot', reason: '在编辑器中辅助补全代码、解释代码和生成测试。' },
      { name: 'ChatGPT', href: '/tools/chatgpt', reason: '解释架构、拆解问题、生成脚本草稿和文档初稿。' },
      { name: 'DeepL', href: '/tools/deepl', reason: '阅读英文技术资料和写跨语言文档。' },
      { name: 'Tableau', href: '/tools/tableau', reason: '需要可视化和数据看板时可作为专业工具选择。' },
    ],
    workflow: [
      {
        title: '先让 AI 解释上下文',
        body: '把函数、错误堆栈或接口约定交给 AI，让它说明输入输出、边界条件和潜在风险，再决定怎么改。',
      },
      {
        title: '生成代码后必须审查',
        body: 'AI 生成的代码不能直接合并。要检查安全、性能、错误处理、依赖版本和项目已有风格。',
      },
      {
        title: '让 AI 补测试而不是替代测试',
        body: '可以让 AI 根据边界条件生成测试用例，但测试是否覆盖真实风险，需要开发者自己判断。',
      },
    ],
    relatedGuides: [],
    relatedComparisons: [],
  },
]
