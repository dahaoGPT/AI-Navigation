import Link from 'next/link'
import { siteConfig } from './site-config'

type InfoSection = {
  title: string
  body: string
}

export function InfoPage({
  title,
  intro,
  sections,
}: {
  title: string
  intro: string
  sections: InfoSection[]
}) {
  return (
    <main className="min-h-screen observatory-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-[#d4a853] hover:text-[#e8c677]">
          返回首页
        </Link>
        <div className="mt-8 rounded-2xl border border-[rgba(212,168,83,0.08)] bg-[rgba(14,13,19,0.9)] p-6 sm:p-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#5a5650]">
            {siteConfig.name}
          </p>
          <h1 className="mt-3 text-2xl font-bold text-[#f0ece4] sm:text-3xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#8a8478]">{intro}</p>
          <div className="mt-8 space-y-7">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-base font-semibold text-[#f0ece4]">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#8a8478]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
