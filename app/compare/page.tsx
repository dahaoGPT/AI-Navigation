import Link from 'next/link'
import { comparisons } from './compare-data'

export const metadata = {
  title: 'AI 工具对比 | 小熊AI导航',
  description: '从真实使用场景出发，对比常见 AI 工具的适用人群、优缺点和选择建议。',
}

export default function ComparePage() {
  return (
    <main className="min-h-screen observatory-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-[#d4a853] hover:text-[#e8c677]">
          返回首页
        </Link>
        <div className="mt-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#5a5650]">
            Tool Comparisons
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#f0ece4]">AI 工具对比</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8a8478]">
            不只是列出工具，而是按预算、场景、难度和产出要求，帮你判断应该先试哪一个。
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/compare/${comparison.slug}`}
              className="glass-card block rounded-2xl p-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5a5650]">
                <span>{comparison.audience}</span>
                <span>{comparison.readingTime}</span>
              </div>
              <h2 className="mt-4 text-base font-semibold leading-6 text-[#f0ece4]">
                {comparison.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#8a8478]">
                {comparison.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
