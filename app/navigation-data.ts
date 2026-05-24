import type { Scenario } from './scenarios/scenario-data'

export type ToolFilter = {
  id: string
  label: string
  category: string
  description: string
}

export type NavLink = {
  href: string
  label: string
  description: string
}

export type SidebarNavigationSection =
  | {
      id: string
      type: 'all-tools'
      label: string
    }
  | {
      id: string
      type: 'navigation-search'
      placeholder: string
      ariaLabel: string
    }
  | {
      id: string
      type: 'link-list'
      title: string
      source: 'primaryNavLinks' | 'roleNavLinks'
      collapsible?: boolean
      defaultOpen?: boolean
    }
  | {
      id: string
      type: 'tool-filter-list'
      title: string
      source: 'taskFilters'
      collapsible?: boolean
      defaultOpen?: boolean
    }
  | {
      id: string
      type: 'capability-groups'
      title: string
      source: 'capabilityGroups'
      collapsible?: boolean
      defaultOpen?: boolean
    }

export const sidebarNavigationSections: SidebarNavigationSection[] = [
  {
    id: 'all-tools',
    type: 'all-tools',
    label: '首页与全部工具',
  },
  {
    id: 'navigation-search',
    type: 'navigation-search',
    placeholder: '搜索导航...',
    ariaLabel: '搜索导航',
  },
  {
    id: 'primary',
    type: 'link-list',
    title: '常用入口',
    source: 'primaryNavLinks',
  },
  {
    id: 'roles',
    type: 'link-list',
    title: '按人群与场景',
    source: 'roleNavLinks',
    collapsible: true,
    defaultOpen: true,
  },
  {
    id: 'tasks',
    type: 'tool-filter-list',
    title: '按任务筛选工具',
    source: 'taskFilters',
    collapsible: true,
    defaultOpen: true,
  },
  {
    id: 'capabilities',
    type: 'capability-groups',
    title: '按工具能力',
    source: 'capabilityGroups',
    collapsible: true,
    defaultOpen: true,
  },
]

export const primaryNavLinks: NavLink[] = [
  {
    href: '/scenarios',
    label: '按场景找工具',
    description: '从学习、办公、创作和开发任务进入。',
  },
  {
    href: '/guides',
    label: 'AI 使用指南',
    description: '看具体流程、风险提醒和执行清单。',
  },
  {
    href: '/compare',
    label: '工具对比',
    description: '不知道选哪个时，先看对比建议。',
  },
]

export const taskFilters: ToolFilter[] = [
  {
    id: 'task-writing',
    label: '写作与总结',
    category: 'chatbots',
    description: '文案、周报、提纲、头脑风暴。',
  },
  {
    id: 'task-presentation',
    label: 'PPT 与汇报',
    category: 'ppt-generation',
    description: '演示稿、课程展示、项目复盘。',
  },
  {
    id: 'task-translation',
    label: '翻译与阅读',
    category: 'translation',
    description: '外文资料、邮件、论文阅读。',
  },
  {
    id: 'task-visual',
    label: '图片与设计',
    category: 'image-generation',
    description: '配图、封面、海报、视觉探索。',
  },
  {
    id: 'task-coding',
    label: '代码与自动化',
    category: 'code-generation',
    description: '代码解释、脚本、测试、技术文档。',
  },
  {
    id: 'task-data',
    label: '数据与分析',
    category: 'data-visualization',
    description: '报表、看板、经营和用户分析。',
  },
]

export const capabilityGroups = [
  {
    id: 'content',
    label: '内容生产',
    items: ['chatbots', 'ppt-generation', 'translation'],
  },
  {
    id: 'creative',
    label: '视觉创意',
    items: ['image-generation', 'image-editing'],
  },
  {
    id: 'builders',
    label: '开发与数据',
    items: ['code-generation', 'code-analysis', 'data-visualization', 'predictive-analysis'],
  },
]

export const roleNavLinks = (scenarios: Scenario[]): NavLink[] =>
  scenarios.map((scenario) => ({
    href: `/scenarios/${scenario.slug}`,
    label: scenario.title,
    description: scenario.summary,
  }))
