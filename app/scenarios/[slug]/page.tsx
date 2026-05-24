import Link from 'next/link'
import { notFound } from 'next/navigation'
import { scenarios } from '../scenario-data'

export function generateStaticParams() {
  return scenarios.map((scenario) => ({ slug: scenario.slug }))
}

export default function ScenarioDetailPage({ params }: { params: { slug: string } }) {
  const scenario = scenarios.find((item) => item.slug === params.slug)

  if (!scenario) notFound()

  return (
    <main className="min-h-screen observatory-bg px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href="/scenarios" className="text-sm text-[#d4a853] hover:text-[#e8c677]">
          返回场景
        </Link>
        <div className="mt-8 rounded-2xl border border-[rgba(212,168,83,0.08)] bg-[rgba(14,13,19,0.9)] p-6 sm:p-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#5a5650]">
            {scenario.audience}
          </p>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#f0ece4] sm:text-3xl">
            {scenario.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#8a8478]">{scenario.summary}</p>

          <section className="mt-8">
            <h2 className="text-base font-semibold text-[#f0ece4]">常见痛点</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {scenario.painPoints.map((item) => (
                <span key={item} className="rounded-lg bg-[rgba(212,168,83,0.1)] px-2.5 py-1 text-xs text-[#d4a853]">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-base font-semibold text-[#f0ece4]">推荐工具</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {scenario.recommendedTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-4">
                  <h3 className="text-sm font-semibold text-[#f0ece4]">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#8a8478]">{tool.reason}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-base font-semibold text-[#f0ece4]">建议流程</h2>
            <div className="mt-4 space-y-5">
              {scenario.workflow.map((step, index) => (
                <div key={step.title} className="rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
                  <p className="text-[11px] font-mono text-[#d4a853]">STEP {index + 1}</p>
                  <h3 className="mt-2 text-sm font-semibold text-[#f0ece4]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#8a8478]">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          {(scenario.relatedGuides.length > 0 || scenario.relatedComparisons.length > 0) && (
            <section className="mt-8 grid gap-6 md:grid-cols-2">
              {scenario.relatedGuides.length > 0 && (
                <div>
                  <h2 className="text-base font-semibold text-[#f0ece4]">相关教程</h2>
                  <div className="mt-3 space-y-2">
                    {scenario.relatedGuides.map((item) => (
                      <Link key={item.href} href={item.href} className="block text-sm leading-7 text-[#d4a853] hover:text-[#e8c677]">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {scenario.relatedComparisons.length > 0 && (
                <div>
                  <h2 className="text-base font-semibold text-[#f0ece4]">相关对比</h2>
                  <div className="mt-3 space-y-2">
                    {scenario.relatedComparisons.map((item) => (
                      <Link key={item.href} href={item.href} className="block text-sm leading-7 text-[#d4a853] hover:text-[#e8c677]">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </article>
    </main>
  )
}
