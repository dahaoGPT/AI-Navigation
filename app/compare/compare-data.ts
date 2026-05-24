export type ComparisonOption = {
  name: string
  bestFor: string
  strength: string
  limitation: string
}

export type Comparison = {
  slug: string
  title: string
  summary: string
  audience: string
  readingTime: string
  options: ComparisonOption[]
  criteria: string[]
  recommendation: string
  details: {
    title: string
    body: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
}

export const comparisons: Comparison[] = [
  {
    slug: 'chatgpt-vs-jasper',
    title: 'ChatGPT 和 Jasper 怎么选：通用助手还是营销写作平台',
    summary: '如果你主要做学习、办公和头脑风暴，ChatGPT 更通用；如果团队长期产出营销内容，Jasper 的流程和模板更有价值。',
    audience: '写作与营销',
    readingTime: '7 分钟',
    options: [
      {
        name: 'ChatGPT',
        bestFor: '学习、办公、总结、问答、头脑风暴',
        strength: '适用范围广，适合从零开始探索问题',
        limitation: '需要自己设计提示词和内容流程',
      },
      {
        name: 'Jasper',
        bestFor: '营销文案、品牌内容、团队内容流程',
        strength: '模板和品牌语气管理更偏商业写作',
        limitation: '个人轻量使用时成本和复杂度可能偏高',
      },
    ],
    criteria: ['使用场景', '团队协作', '中文体验', '预算', '是否需要品牌语气管理'],
    recommendation: '个人用户、学生和普通办公场景优先试 ChatGPT；营销团队、品牌方和内容运营可以评估 Jasper 是否能融入现有流程。',
    details: [
      {
        title: '先看任务是否稳定重复',
        body: '如果你每天都在写相似类型的广告语、邮件和社媒文案，模板化平台能减少重复配置。如果任务变化很大，比如今天做总结、明天解释概念、后天写代码，通用助手更灵活。',
      },
      {
        title: '再看团队是否需要统一语气',
        body: '营销团队通常在意品牌语气、审批流程和多人协作。Jasper 的价值更多体现在流程管理，而不只是单次生成文案。',
      },
      {
        title: '最后看成本是否能被产出抵消',
        body: '付费工具不是越专业越适合。只有当它稳定节省时间、提升转化或减少返工时，才值得长期订阅。',
      },
    ],
    faq: [
      {
        question: '只写公众号和小红书，应该选哪一个？',
        answer: '刚开始建议先用 ChatGPT 打磨选题、结构和初稿。等内容生产变成团队流程，再考虑 Jasper 这类更偏营销管理的平台。',
      },
      {
        question: 'Jasper 是否比 ChatGPT 写得更好？',
        answer: '不能简单这样判断。Jasper 更偏特定营销流程，ChatGPT 更通用。真正差异取决于任务、提示词、素材质量和人工编辑。',
      },
    ],
  },
  {
    slug: 'dalle-vs-midjourney',
    title: 'DALL-E 和 Midjourney 怎么选：快速配图还是高质感视觉探索',
    summary: 'DALL-E 更适合快速生成可用配图和概念草图；Midjourney 更适合追求风格、氛围和视觉质感的创意探索。',
    audience: '图片生成',
    readingTime: '8 分钟',
    options: [
      {
        name: 'DALL-E',
        bestFor: '文章配图、概念图、创意草稿',
        strength: '上手快，适合和文本助手配合迭代',
        limitation: '复杂风格控制和极致质感需要反复调整',
      },
      {
        name: 'Midjourney',
        bestFor: '品牌视觉、海报灵感、艺术风格探索',
        strength: '画面质感和风格表现通常更突出',
        limitation: '需要学习提示词、参数和工作流',
      },
    ],
    criteria: ['画面质感', '可控性', '上手难度', '商用授权', '是否需要批量产图'],
    recommendation: '需要快速完成文章配图和创意草稿时先试 DALL-E；需要做视觉方向、海报风格和高质感氛围图时再试 Midjourney。',
    details: [
      {
        title: '配图任务优先考虑效率',
        body: '文章封面、社媒配图和内部概念图通常不需要极致风格，重点是主题准确、速度快、修改方便。这类任务适合先用 DALL-E 做第一版。',
      },
      {
        title: '品牌视觉更看重风格一致性',
        body: '如果你在做品牌视觉、空间氛围或系列海报，需要更稳定的审美方向。Midjourney 的学习成本更高，但在风格探索上更值得投入。',
      },
      {
        title: '商用前必须核对授权',
        body: '图片生成工具的商用条款会随套餐和地区变化。不要只看别人经验，正式用于广告、商品包装或客户项目时，要查看官方条款。',
      },
    ],
    faq: [
      {
        question: '哪一个更适合新手？',
        answer: '多数新手可以先从 DALL-E 或 Canva 这类更直观的工具开始。Midjourney 更适合愿意学习提示词和视觉参数的人。',
      },
      {
        question: 'AI 图片能直接当商品图吗？',
        answer: '不建议直接使用。商品图涉及真实性、平台规则和消费者判断，AI 图更适合做背景、创意草图或辅助素材。',
      },
    ],
  },
  {
    slug: 'canva-vs-ai-ppt',
    title: 'Canva 和 AI-powered PPT 怎么选：设计平台还是快速生成演示稿',
    summary: 'Canva 更适合长期做海报、社媒图和多种设计物料；AI-powered PPT 更适合快速把主题或大纲变成演示文稿草稿。',
    audience: '设计与演示',
    readingTime: '6 分钟',
    options: [
      {
        name: 'Canva',
        bestFor: '海报、封面、PPT、美观版式和团队协作',
        strength: '模板丰富，设计场景覆盖广',
        limitation: '复杂汇报结构仍需要自己梳理',
      },
      {
        name: 'AI-powered PPT',
        bestFor: '课程汇报、项目复盘、培训课件草稿',
        strength: '从主题到 PPT 初稿的速度快',
        limitation: '内容深度和数据证据需要人工补充',
      },
    ],
    criteria: ['最终产物类型', '是否需要设计模板', '是否已有大纲', '是否团队协作', '是否需要快速交稿'],
    recommendation: '如果你经常做多种视觉物料，优先用 Canva；如果只是要快速生成演示文稿草稿，AI-powered PPT 更直接。',
    details: [
      {
        title: '先判断最终要交付什么',
        body: '如果最终是海报、封面、长图和社媒图，Canva 的模板库更有优势。如果最终就是一份演示稿，PPT 生成工具能更快搭出页码和结构。',
      },
      {
        title: '已有大纲时，PPT 工具更省时间',
        body: '当你已经有汇报主题、章节和关键点时，把大纲交给 PPT 工具生成草稿，再人工替换案例和数据，效率会很高。',
      },
      {
        title: '没有审美基础时，Canva 更稳',
        body: 'Canva 的价值在于降低设计门槛。即使不用 AI 功能，模板、素材和排版也能让非设计用户更容易做出可用成品。',
      },
    ],
    faq: [
      {
        question: '用 AI 生成的 PPT 可以直接汇报吗？',
        answer: '不建议。AI 生成的内容通常缺少真实数据、公司背景和个人判断，适合作为草稿，不适合作为最终稿。',
      },
      {
        question: 'Canva 是否能替代专业设计软件？',
        answer: '轻量设计可以，但复杂品牌系统、印刷文件和精细动效仍然更适合专业设计工具。',
      },
    ],
  },
]
