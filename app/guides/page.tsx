import Link from 'next/link'
import { guides } from './guide-data'

export const metadata = {
  title: 'AI 使用指南 | 小熊AI导航',
  description: '面向学生、上班族和内容创作者的 AI 工具使用指南。',
}

export default function GuidesPage() {
  return (
    <main className="min-h-screen observatory-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-[#d4a853] hover:text-[#e8c677]">
          返回首页
        </Link>
        <div className="mt-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#5a5650]">
            Practical AI Guides
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#f0ece4]">
            AI 使用指南
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8a8478]">
            从真实任务出发，整理普通人可以直接套用的 AI 工作流。这里先放内容结构样板，后续可以持续扩展成教程栏目。
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="glass-card block rounded-2xl p-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5a5650]">
                <span>{guide.audience}</span>
                <span>{guide.readingTime}</span>
              </div>
              <h2 className="mt-4 text-base font-semibold leading-6 text-[#f0ece4]">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#8a8478]">
                {guide.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
