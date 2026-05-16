import './globals.css'

export const metadata = {
  title: '小熊AI导航 — 探索无限可能',
  description: '精心策划的 AI 工具图鉴，发现最前沿的人工智能工具与平台',
  keywords: 'AI工具, 人工智能, ChatGPT, Midjourney, AI导航, 工具推荐',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#08070b" />
      </head>
      <body className="bg-[#08070b] text-[#c8c2b4] antialiased">
        {children}
      </body>
    </html>
  )
}
