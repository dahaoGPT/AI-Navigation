import Link from 'next/link'
import { notFound } from 'next/navigation'
import { comparisons } from '../compare-data'

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }))
}

export default function CompareDetailPage({ params }: { params: { slug: string } }) {
  const comparison = comparisons.find((item) => item.slug === params.slug)

  if (!comparison) notFound()

  return (
    <main className="min-h-screen observatory-bg px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href="/compare" className="text-sm text-[#d4a853] hover:text-[#e8c677]">
          返回对比
        </Link>
        <div className="mt-8 rounded-2xl border border-[rgba(212,168,83,0.08)] bg-[rgba(14,13,19,0.9)] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#5a5650]">
            <span>{comparison.audience}</span>
            <span>{comparison.readingTime}</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold leading-tight text-[#f0ece4] sm:text-3xl">
            {comparison.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#8a8478]">{comparison.summary}</p>

          <section className="mt-8 overflow-hidden rounded-xl border border-[rgba(212,168,83,0.08)]">
            <div className="grid bg-[rgba(212,168,83,0.08)] px-4 py-3 text-xs font-semibold text-[#e8c677] md:grid-cols-4">
              <span>工具</span>
              <span>适合场景</span>
              <span>优势</span>
              <span>限制</span>
            </div>
            {comparison.options.map((option) => (
              <div
                key={option.name}
                className="grid gap-2 border-t border-[rgba(212,168,83,0.08)] px-4 py-4 text-sm leading-6 text-[#8a8478] md:grid-cols-4"
              >
                <strong className="text-[#f0ece4]">{option.name}</strong>
                <span>{option.bestFor}</span>
                <span>{option.strength}</span>
                <span>{option.limitation}</span>
              </div>
            ))}
          </section>

          <section className="mt-8 rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
            <h2 className="text-base font-semibold text-[#f0ece4]">选择建议</h2>
            <p className="mt-3 text-sm leading-7 text-[#8a8478]">{comparison.recommendation}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {comparison.criteria.map((item) => (
                <span key={item} className="rounded-lg bg-[rgba(212,168,83,0.1)] px-2.5 py-1 text-xs text-[#d4a853]">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <div className="mt-8 space-y-7">
            {comparison.details.map((detail) => (
              <section key={detail.title}>
                <h2 className="text-base font-semibold text-[#f0ece4]">{detail.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#8a8478]">{detail.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-base font-semibold text-[#f0ece4]">常见问题</h2>
            <div className="mt-4 space-y-4">
              {comparison.faq.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
                  <h3 className="text-sm font-semibold text-[#f0ece4]">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#8a8478]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
