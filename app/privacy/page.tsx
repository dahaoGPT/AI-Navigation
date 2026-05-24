import { InfoPage } from '../info-page'
import { siteConfig } from '../site-config'

export const metadata = {
  title: '隐私政策 | 小熊AI导航',
  description: '小熊AI导航的隐私政策，说明数据收集、Cookie、第三方链接和广告相关信息。',
}

export default function PrivacyPage() {
  return (
    <InfoPage
      title="隐私政策"
      intro="我们尊重用户隐私。本政策说明本站可能收集的信息、使用方式，以及第三方服务和广告相关事项。"
      sections={[
        {
          title: '我们可能收集的信息',
          body: '当你访问本站时，服务器或分析服务可能记录基础访问信息，例如访问时间、页面路径、设备类型、浏览器类型和大致地区。这些信息主要用于了解页面表现、排查错误和改进内容。',
        },
        {
          title: 'Cookie 与广告',
          body: '如果本站接入 Google AdSense 或其他广告服务，第三方广告服务商可能使用 Cookie 或类似技术展示广告、衡量广告效果或限制重复展示。你可以在浏览器设置中管理 Cookie。',
        },
        {
          title: '第三方链接',
          body: '本站会链接到 AI 工具官网和第三方平台。访问这些网站后，你将受其各自隐私政策约束。我们无法控制第三方网站如何收集或处理你的信息。',
        },
        {
          title: '联系我们',
          body: `如果你对隐私政策或数据处理有疑问，可以通过 ${siteConfig.email} 联系我们。`,
        },
      ]}
    />
  )
}
