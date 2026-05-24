import Link from 'next/link'
import { scenarios } from './scenario-data'

export const metadata = {
  title: 'AI 使用场景 | 小熊AI导航',
  description: '按学生、上班族、创作者和开发者等真实场景，查找适合的 AI 工具和使用流程。',
}

export default function ScenariosPage() {
  return (
    <main className="min-h-screen observatory-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-[#d4a853] hover:text-[#e8c677]">
          返回首页
        </Link>
        <div className="mt-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#5a5650]">
            AI Scenarios
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#f0ece4]">按场景找 AI 工具</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8a8478]">
            如果你还不知道应该先试哪一个工具，可以从自己的任务出发：学习、办公、创作或开发。
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.slug}
              href={`/scenarios/${scenario.slug}`}
              className="glass-card block rounded-2xl p-5"
            >
              <p className="text-[11px] font-mono text-[#5a5650]">{scenario.audience}</p>
              <h2 className="mt-3 text-lg font-semibold text-[#f0ece4]">{scenario.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#8a8478]">{scenario.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {scenario.painPoints.slice(0, 3).map((item) => (
                  <span key={item} className="rounded-lg bg-[rgba(212,168,83,0.1)] px-2.5 py-1 text-xs text-[#d4a853]">
                    {item}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
