import Link from 'next/link'
import { comparisons } from './compare/compare-data'
import { guides } from './guides/guide-data'
import { scenarios } from './scenarios/scenario-data'

export function HomeContent() {
  return (
    <>
      <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {scenarios.map((scenario) => (
          <Link
            key={scenario.slug}
            href={`/scenarios/${scenario.slug}`}
            className="rounded-2xl border border-[rgba(212,168,83,0.08)] bg-[rgba(14,13,19,0.66)] p-4 text-left transition-all duration-300 hover:border-[rgba(212,168,83,0.2)] hover:bg-[rgba(28,27,37,0.82)]"
          >
            <h3 className="text-sm font-semibold text-[#f0ece4]">{scenario.title}</h3>
            <p className="mt-2 text-xs leading-5 text-[#8a8478]">{scenario.summary}</p>
          </Link>
        ))}
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-editorial font-bold text-[#f0ece4]">入门指南</h2>
          <Link href="/guides" className="text-xs text-[#d4a853] hover:text-[#e8c677]">全部指南</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="glass-card block rounded-2xl p-5">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#5a5650]">
                <span>{guide.audience}</span>
                <span>{guide.readingTime}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-6 text-[#f0ece4]">{guide.title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#8a8478]">{guide.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-editorial font-bold text-[#f0ece4]">工具对比</h2>
          <Link href="/compare" className="text-xs text-[#d4a853] hover:text-[#e8c677]">全部对比</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {comparisons.map((comparison) => (
            <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="glass-card block rounded-2xl p-5">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#5a5650]">
                <span>{comparison.audience}</span>
                <span>{comparison.readingTime}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-6 text-[#f0ece4]">{comparison.title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#8a8478]">{comparison.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
