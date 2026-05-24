export const siteConfig = {
  name: '小熊AI导航',
  shortName: '小熊AI',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8080',
  email: '1369129052@qq.com',
  description: '面向普通人的 AI 工具指南，按学习、办公、创作、编程和生意经营等真实场景推荐合适的 AI 工具。',
}

export const footerLinks = [
  { href: '/about', label: '关于我们' },
  { href: '/scenarios', label: '使用场景' },
  { href: '/compare', label: '工具对比' },
  { href: '/privacy', label: '隐私政策' },
  { href: '/terms', label: '使用条款' },
  { href: '/disclaimer', label: '免责声明' },
  { href: '/advertising', label: '广告说明' },
  { href: '/contact', label: '联系我们' },
]

export const corePages = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/advertising',
  '/guides',
  '/compare',
  '/scenarios',
]
