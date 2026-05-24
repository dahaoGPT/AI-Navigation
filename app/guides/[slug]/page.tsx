import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guides } from '../guide-data'

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = guides.find((item) => item.slug === params.slug)

  if (!guide) notFound()

  return (
    <main className="min-h-screen observatory-bg px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <Link href="/guides" className="text-sm text-[#d4a853] hover:text-[#e8c677]">
          返回指南
        </Link>
        <div className="mt-8 rounded-2xl border border-[rgba(212,168,83,0.08)] bg-[rgba(14,13,19,0.9)] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#5a5650]">
            <span>{guide.audience}</span>
            <span>{guide.readingTime}</span>
            <span>工具：{guide.tools.join(' / ')}</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold leading-tight text-[#f0ece4] sm:text-3xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#8a8478]">{guide.summary}</p>
          <div className="mt-8 space-y-8">
            {guide.sections.map((section, index) => (
              <section key={section.title}>
                <p className="text-[11px] font-mono text-[#5a5650]">步骤 {index + 1}</p>
                <h2 className="mt-2 text-lg font-semibold text-[#f0ece4]">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#8a8478]">{section.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <section className="rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
              <h2 className="text-base font-semibold text-[#f0ece4]">执行清单</h2>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#8a8478]">
                {guide.checklist.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
              <h2 className="text-base font-semibold text-[#f0ece4]">风险提醒</h2>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#8a8478]">
                {guide.risks.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </section>
          </div>
          <section className="mt-10">
            <h2 className="text-base font-semibold text-[#f0ece4]">常见问题</h2>
            <div className="mt-4 space-y-4">
              {guide.faqs.map((faq) => (
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
