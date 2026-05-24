import { InfoPage } from '../info-page'

export const metadata = {
  title: '使用条款 | 小熊AI导航',
  description: '小熊AI导航的使用条款，说明内容用途、用户责任和第三方链接。',
}

export default function TermsPage() {
  return (
    <InfoPage
      title="使用条款"
      intro="访问和使用本站，即表示你理解并同意以下条款。本站内容用于信息参考，不构成专业建议或商业承诺。"
      sections={[
        {
          title: '内容用途',
          body: '本站提供 AI 工具介绍、使用建议、场景指南和外部链接。内容会尽量保持准确，但不保证所有信息在任何时间都完整、最新或适合你的具体需求。',
        },
        {
          title: '用户责任',
          body: '你在使用 AI 工具时，应自行判断输出内容的准确性、版权风险、隐私风险和合规要求。涉及法律、医疗、金融等重要场景时，请咨询专业人士。',
        },
        {
          title: '第三方服务',
          body: '本站收录的工具由第三方提供。工具的可用性、价格、功能、账号政策和服务条款由第三方决定，本站不对第三方服务结果承担责任。',
        },
      ]}
    />
  )
}
