import { InfoPage } from '../info-page'

export const metadata = {
  title: '免责声明 | 小熊AI导航',
  description: '小熊AI导航关于工具信息、价格变动、外部链接和广告展示的免责声明。',
}

export default function DisclaimerPage() {
  return (
    <InfoPage
      title="免责声明"
      intro="本站内容主要帮助用户发现和理解 AI 工具，但 AI 产品变化很快，所有信息都需要结合官网和实际体验进行确认。"
      sections={[
        {
          title: '工具信息',
          body: '工具介绍、价格、功能、适用场景和替代选择均基于公开信息与编辑整理，可能存在滞后或遗漏。购买、订阅或商用前，请以工具官网公布的信息为准。',
        },
        {
          title: '广告与合作',
          body: '本站未来可能展示广告或包含合作内容。广告展示不代表本站对广告主产品作出保证。我们会尽量保持广告与正文内容的清晰区分。',
        },
        {
          title: 'AI 输出风险',
          body: 'AI 工具可能生成错误、不完整或带有偏见的内容。请不要在未经核实的情况下，将 AI 输出直接用于高风险决策。',
        },
      ]}
    />
  )
}
