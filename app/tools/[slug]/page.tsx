import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { toolDetails } from '../tool-data'

export function generateStaticParams() {
  return toolDetails.map((tool) => ({ slug: tool.slug }))
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = toolDetails.find((item) => item.slug === params.slug)

  if (!tool) notFound()

  return (
    <main className="min-h-screen observatory-bg px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-[#d4a853] hover:text-[#e8c677]">
          返回首页
        </Link>
        <div className="mt-8 rounded-2xl border border-[rgba(212,168,83,0.08)] bg-[rgba(14,13,19,0.9)] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#5a5650]">
                {tool.categoryName} · {tool.difficulty}
              </p>
              <h1 className="mt-3 text-3xl font-bold text-[#f0ece4]">
                {tool.name}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8a8478]">
                {tool.description}
              </p>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[rgba(212,168,83,0.2)] bg-[rgba(212,168,83,0.12)] px-4 text-sm text-[#e8c677] hover:bg-[rgba(212,168,83,0.18)]"
            >
              访问官网
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard title="适合人群" items={tool.bestFor} />
            <InfoCard title="典型用途" items={tool.useCases} />
            <InfoCard title="替代工具" items={tool.alternatives} />
          </div>

          <section className="mt-8 rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
            <h2 className="text-base font-semibold text-[#f0ece4]">怎么判断是否该用 {tool.name}</h2>
            <p className="mt-3 text-sm leading-7 text-[#8a8478]">
              如果你的任务属于{tool.useCases.slice(0, 3).join('、')}，并且你希望先得到一个可修改的草稿或方向，{tool.name} 通常值得尝试。
              如果任务涉及高风险决策、敏感数据、严肃引用或必须一次准确交付的结果，建议把它作为辅助工具，而不是最终判断来源。
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-base font-semibold text-[#f0ece4]">推荐使用流程</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <StepCard
                step="1"
                title="先说明目标"
                body={`把任务背景、目标用户、输出格式和限制条件写清楚，再让 ${tool.name} 生成第一版结果。`}
              />
              <StepCard
                step="2"
                title="再要求改进"
                body="不要只看第一版。可以要求它压缩、扩写、换语气、列风险，或根据你的真实材料重新整理。"
              />
              <StepCard
                step="3"
                title="最后人工核对"
                body="检查事实、价格、版权、隐私和适用边界。正式发布或商用前，以官网条款和真实资料为准。"
              />
            </div>
          </section>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <TextBlock title="主要优点" items={tool.pros} />
            <TextBlock title="注意限制" items={tool.cons} />
          </div>

          <div className="mt-8 rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
            <h2 className="text-base font-semibold text-[#f0ece4]">价格与语言</h2>
            <p className="mt-3 text-sm leading-7 text-[#8a8478]">{tool.pricing}</p>
            <p className="mt-2 text-sm leading-7 text-[#8a8478]">
              支持语言：{tool.languages.join('、')}。最后更新：{tool.lastUpdated}。
            </p>
          </div>

          <section className="mt-8 rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
            <h2 className="text-base font-semibold text-[#f0ece4]">本站编辑提醒</h2>
            <p className="mt-3 text-sm leading-7 text-[#8a8478]">
              本页信息用于帮助普通用户理解工具定位，不代表官方说明或购买建议。AI 工具的价格、功能、可用地区和授权条款变化较快，
              订阅、商用或处理敏感资料前，请再次查看 {tool.name} 官网。
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-4">
      <h2 className="text-sm font-semibold text-[#f0ece4]">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg bg-[rgba(212,168,83,0.1)] px-2.5 py-1 text-xs text-[#d4a853]"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

function StepCard({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <section className="rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-4">
      <p className="text-[11px] font-mono text-[#d4a853]">STEP {step}</p>
      <h3 className="mt-2 text-sm font-semibold text-[#f0ece4]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#8a8478]">{body}</p>
    </section>
  )
}

function TextBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-[#f0ece4]">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-[#8a8478]">
        {items.map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
    </section>
  )
}
