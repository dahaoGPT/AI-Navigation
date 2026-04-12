import './globals.css'

export const metadata = {
  title: '小熊AI导航站 - 发现最新AI工具',
  description: '探索和发现最新的AI工具和网站，您的AI导航伴侣',
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
      </head>
      <body className="bg-dark-950 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  )
}
