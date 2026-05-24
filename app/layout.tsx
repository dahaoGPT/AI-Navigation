import './globals.css'
import Script from 'next/script'
import { siteConfig } from './site-config'

export const metadata = {
  title: '小熊AI导航 - 普通人的 AI 工具指南',
  description: siteConfig.description,
  keywords: 'AI工具, 人工智能, ChatGPT, Midjourney, AI导航, AI工具推荐, AI使用指南',
  openGraph: {
    title: '小熊AI导航 - 普通人的 AI 工具指南',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'zh_CN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT

  return (
    <html lang="zh-CN" className="dark">
      <head>
        <meta name="theme-color" content="#08070b" />
      </head>
      <body className="bg-[#08070b] text-[#c8c2b4] antialiased">
        {adsenseClient && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
        {children}
      </body>
    </html>
  )
}
