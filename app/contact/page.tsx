import { InfoPage } from '../info-page'
import { siteConfig } from '../site-config'

export const metadata = {
  title: '联系我们 | 小熊AI导航',
  description: '联系小熊AI导航，反馈工具信息、内容错误或合作建议。',
}

export default function ContactPage() {
  return (
    <InfoPage
      title="联系我们"
      intro="如果你发现工具信息有误、希望推荐新的 AI 工具，或对本站内容有建议，可以通过邮箱联系我们。"
      sections={[
        {
          title: '联系邮箱',
          body: `请发送邮件到 ${siteConfig.email}。为了更快处理，请在邮件标题中说明是工具推荐、内容纠错、商务合作还是隐私相关请求。`,
        },
        {
          title: '工具推荐',
          body: '推荐工具时，请尽量附上官网链接、主要用途、适合人群、价格信息和你认为值得收录的理由。我们会根据本站收录原则进行评估。',
        },
        {
          title: '内容纠错',
          body: '如果页面中的价格、功能、链接或描述已经过期，欢迎指出具体页面和错误位置。我们会优先处理影响用户判断的信息。',
        },
      ]}
    />
  )
}
