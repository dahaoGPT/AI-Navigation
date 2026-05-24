import { InfoPage } from '../info-page'

export const metadata = {
  title: '关于我们 | 小熊AI导航',
  description: '了解小熊AI导航的内容定位、收录原则和编辑方式。',
}

export default function AboutPage() {
  return (
    <InfoPage
      title="关于我们"
      intro="小熊AI导航是一个面向普通人的 AI 工具指南。我们希望把复杂、分散、更新很快的 AI 产品，整理成更容易理解和选择的使用建议。"
      sections={[
        {
          title: '我们解决什么问题',
          body: '很多人不是缺少 AI 工具列表，而是不知道在学习、办公、创作、编程或经营生意时应该先试哪一个工具。本站会优先从真实任务出发，解释工具适合谁、能做什么、有什么限制。',
        },
        {
          title: '收录原则',
          body: '我们优先收录访问稳定、用途清晰、对普通用户有实际帮助的工具。每个工具页面会尽量补充适用人群、典型场景、优缺点、价格信息和替代选择。',
        },
        {
          title: '内容更新',
          body: 'AI 产品变化很快，本站内容会持续更新。页面中的价格、功能和可用地区可能随官方调整而变化，重要决策前请以工具官网信息为准。',
        },
      ]}
    />
  )
}
