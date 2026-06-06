'use client'

import { useState } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { toolCategories } from './navigation-data'
import type { ToolListing } from './tools/notion-adapter'

const getCategoryColor = (id: string) => {
  const colors: Record<string, string> = {
    language: 'rgba(126,184,218,',
    image: 'rgba(201,132,158,',
    coding: 'rgba(126,203,161,',
    data: 'rgba(212,168,83,',
  }
  return colors[id] || 'rgba(212,168,83,'
}

const getCategoryTextColor = (id: string) => {
  const colors: Record<string, string> = {
    language: '#7eb8da',
    image: '#c9849e',
    coding: '#7ecba1',
    data: '#d4a853',
  }
  return colors[id] || '#d4a853'
}

const getParentCategory = (subcatId: string) =>
  toolCategories.find((category) => category.subcategories.some((sub) => sub.id === subcatId))

const getSubcategoryName = (subcatId: string) => {
  for (const category of toolCategories) {
    const subcategory = category.subcategories.find((sub) => sub.id === subcatId)
    if (subcategory) return subcategory.name
  }
  return subcatId
}

export function ToolCardGrid({ tools }: { tools: ToolListing[] }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((site, index) => {
        const parentCat = getParentCategory(site.category)
        const catId = parentCat?.id || ''
        const catColorBase = getCategoryColor(catId)
        const catText = getCategoryTextColor(catId)

        return (
          <a
            key={site.id}
            href={site.slug ? `/tools/${site.slug}` : site.url}
            target={site.slug ? undefined : '_blank'}
            rel={site.slug ? undefined : 'noopener noreferrer'}
            className="group glass-card rounded-2xl p-5 sm:p-6 animate-card-enter block"
            style={{ animationDelay: `${index * 60}ms` }}
            onMouseEnter={() => setHoveredCard(site.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg border"
                    style={{ background: `${catColorBase}0.08)`, borderColor: `${catColorBase}0.15)` }}
                  >
                    <span className="text-base">{parentCat?.icon || '◇'}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-[15px] font-semibold text-[#f0ece4] group-hover:text-[#e8c677] transition-colors duration-300 truncate">
                      {site.name}
                    </h3>
                    <span className="text-[11px] font-mono" style={{ color: catText, opacity: 0.7 }}>
                      {getSubcategoryName(site.category)}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className={`h-4 w-4 text-[#5a5650] group-hover:text-[#d4a853] flex-shrink-0 transition-all duration-400 ${hoveredCard === site.id ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
              </div>

              <p className="text-xs sm:text-sm text-[#8a8478] group-hover:text-[#c8c2b4] transition-colors duration-300 line-clamp-2 leading-relaxed mb-4">
                {site.description}
              </p>

              <div className="pt-3 border-t border-[rgba(212,168,83,0.06)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#5a5650] truncate max-w-[70%]">
                  {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>
                <span className="text-[10px] text-[#d4a853] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1">
                  {site.slug ? '查看指南' : '访问'} <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
