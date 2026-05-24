import { InfoPage } from '../info-page'
import { siteConfig } from '../site-config'

export const metadata = {
  title: '广告说明 | 小熊AI导航',
  description: '小熊AI导航关于广告展示、合作内容、广告区分和用户体验的说明。',
}

export default function AdvertisingPage() {
  return (
    <InfoPage
      title="广告说明"
      intro="本站未来可能通过 Google AdSense 或其他广告服务展示广告。我们会尽量保持广告、合作内容和编辑内容之间的清晰区分。"
      sections={[
        {
          title: '广告与正文区分',
          body: '广告位不会伪装成工具卡片、下载按钮、导航菜单或系统提示。用户点击工具链接和广告内容前，应能明确判断自己正在访问什么内容。',
        },
        {
          title: '编辑独立性',
          body: '工具收录、教程和推荐说明会优先基于普通用户的实际使用场景整理。广告展示不代表本站对广告产品作出保证，也不代表广告主影响本站编辑结论。',
        },
        {
          title: 'Cookie 和个性化广告',
          body: '第三方广告服务可能使用 Cookie 或类似技术展示广告、衡量效果或限制重复展示。更多信息请查看本站隐私政策以及对应广告服务商的隐私说明。',
        },
        {
          title: '联系反馈',
          body: `如果你认为某个广告影响体验、存在误导，或希望咨询合作事项，可以通过 ${siteConfig.email} 联系我们。`,
        },
      ]}
    />
  )
}
