'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { Menu, Search, X, ExternalLink, ChevronDown, Sparkles, Compass, Github, Twitter, Mail, ArrowUpRight, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { footerLinks } from './site-config'
import { comparisons } from './compare/compare-data'
import { capabilityGroups, primaryNavLinks, roleNavLinks, sidebarNavigationSections, taskFilters, type SidebarNavigationSection } from './navigation-data'
import { scenarios } from './scenarios/scenario-data'
import { toolDetails } from './tools/tool-data'
import { guides } from './guides/guide-data'

const categories = [
  { id: 'language', name: '语言处理', icon: '✦', subcategories: [
    { id: 'ppt-generation', name: 'PPT生成' }, { id: 'chatbots', name: '聊天机器人' },
    { id: 'text-to-speech', name: '文字转语音' }, { id: 'translation', name: '翻译' },
  ]},
  { id: 'image', name: '图像处理', icon: '◈', subcategories: [
    { id: 'image-generation', name: '图像生成' }, { id: 'image-editing', name: '图像编辑' },
  ]},
  { id: 'coding', name: '编程辅助', icon: '⬡', subcategories: [
    { id: 'code-generation', name: '代码生成' }, { id: 'code-analysis', name: '代码分析' },
  ]},
  { id: 'data', name: '数据分析', icon: '◇', subcategories: [
    { id: 'data-visualization', name: '数据可视化' }, { id: 'predictive-analysis', name: '预测分析' },
  ]},
]

const getCatColor = (id: string) => {
  const m: Record<string, string> = {
    language: 'rgba(126,184,218,', image: 'rgba(201,132,158,',
    coding: 'rgba(126,203,161,', data: 'rgba(212,168,83,',
  }
  return m[id] || 'rgba(212,168,83,'
}

const getCatTextColor = (id: string) => {
  const m: Record<string, string> = {
    language: '#7eb8da', image: '#c9849e', coding: '#7ecba1', data: '#d4a853',
  }
  return m[id] || '#d4a853'
}

const initialTools = toolDetails.map((tool) => ({
  id: tool.id,
  name: tool.name,
  url: tool.url,
  category: tool.category,
  description: tool.description,
  slug: tool.slug,
}))

const toolSlugByName = new Map(toolDetails.map((tool) => [tool.name.toLowerCase(), tool.slug]))

const defaultOpenSidebarSections = sidebarNavigationSections
  .filter((section) => 'collapsible' in section && section.collapsible && section.defaultOpen)
  .map((section) => section.id)

type LinkListNavigationSection = Extract<SidebarNavigationSection, { type: 'link-list' }>
type TitledNavigationSection = Extract<SidebarNavigationSection, { title: string }>

export default function AINavigation() {
  const [loading, setLoading] = useState(true)
  const [aiWebsites, setAiWebsites] = useState<Array<any>>(initialTools)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [navSearchQuery, setNavSearchQuery] = useState('')
  const [filteredWebsites, setFilteredWebsites] = useState(aiWebsites)
  const [openCategories, setOpenCategories] = useState<string[]>(defaultOpenSidebarSections)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch('/api/route', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
      if (!response.ok) throw new Error('Remote tool database is unavailable');
      return await response.json();
    } catch (error) { console.error('Error fetching data:', error); throw error; }
  };

  const processData = (jsonData: any) => {
    if (!jsonData || !Array.isArray(jsonData.results)) throw new Error('Invalid data format');
    return jsonData.results.map((page: any) => ({
      id: page.properties.ID.unique_id.number,
      name: page.properties.name.title[0].plain_text,
      url: page.properties.url.rich_text[0].plain_text,
      category: page.properties.category.rich_text[0].plain_text,
      description: page.properties.description.rich_text[0].plain_text,
      slug: toolSlugByName.get(page.properties.name.title[0].plain_text.toLowerCase()),
    }));
  };

  useEffect(() => {
    setLoading(true);
    fetchData().then((data) => { if (data) setAiWebsites(processData(data)); })
      .catch((e) => console.error("Error loading data:", e))
      .finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    setFilteredWebsites(aiWebsites.filter((site) => {
      const matchesCat = selectedCategory === 'all' || site.category === selectedCategory;
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || site.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    }));
  }, [aiWebsites, selectedCategory, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const clearNavSearch = () => {
    setNavSearchQuery('')
  }

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // 获取网站所属的大类
  const getParentCategory = (subcatId: string) => {
    return categories.find(cat => cat.subcategories.some(sub => sub.id === subcatId))
  }

  // 获取子分类名称
  const getSubcategoryName = (subcatId: string) => {
    for (const cat of categories) {
      const sub = cat.subcategories.find(s => s.id === subcatId)
      if (sub) return sub.name
    }
    return subcatId
  }

  const navSearchTerm = navSearchQuery.trim().toLowerCase()
  const matchesNavSearch = (...parts: Array<string | undefined>) => {
    if (!navSearchTerm) return true
    return parts.filter(Boolean).join(' ').toLowerCase().includes(navSearchTerm)
  }
  const roleLinks = roleNavLinks(scenarios)
  const filteredPrimaryNavLinks = primaryNavLinks.filter(link => matchesNavSearch(link.label, link.description, link.href))
  const filteredRoleLinks = roleLinks.filter(link => matchesNavSearch(link.label, link.description, link.href))
  const filteredTaskFilters = taskFilters.filter(task => matchesNavSearch(task.label, task.description, task.category))
  const filteredCapabilityGroups = capabilityGroups
    .map(group => ({
      ...group,
      items: group.items.filter(subcatId => matchesNavSearch(group.label, getSubcategoryName(subcatId), subcatId)),
    }))
    .filter(group => matchesNavSearch(group.label) || group.items.length > 0)
  const navResultCount =
    filteredPrimaryNavLinks.length +
    filteredRoleLinks.length +
    filteredTaskFilters.length +
    filteredCapabilityGroups.reduce((total, group) => total + group.items.length, 0)

  const getFilteredLinkItems = (section: LinkListNavigationSection) =>
    section.source === 'primaryNavLinks' ? filteredPrimaryNavLinks : filteredRoleLinks

  const getNavigationSectionCount = (section: SidebarNavigationSection) => {
    switch (section.type) {
      case 'link-list':
        return getFilteredLinkItems(section).length
      case 'tool-filter-list':
        return filteredTaskFilters.length
      case 'capability-groups':
        return filteredCapabilityGroups.reduce((total, group) => total + group.items.length, 0)
      default:
        return 1
    }
  }

  const renderLinkListItems = (section: LinkListNavigationSection) => {
    const links = getFilteredLinkItems(section)
    const compact = section.collapsible

    return (
      <div className={compact ? 'ml-4 mt-2 space-y-1 border-l border-[rgba(212,168,83,0.08)] pl-3' : 'space-y-2'}>
        {!compact && (
          <p className="px-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#5a5650]">{section.title}</p>
        )}
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsSheetOpen(false)}
            className={compact
              ? 'block rounded-lg px-3 py-2 text-sm text-[#5a5650] transition-all duration-300 hover:bg-[rgba(212,168,83,0.05)] hover:text-[#8a8478]'
              : 'block rounded-xl px-3 py-2.5 text-[#8a8478] transition-all duration-300 hover:bg-[rgba(212,168,83,0.06)] hover:text-[#c8c2b4]'}
          >
            <span className={compact ? undefined : 'block text-sm font-medium'}>{link.label}</span>
            {!compact && <span className="mt-1 block text-xs leading-5 text-[#5a5650]">{link.description}</span>}
          </Link>
        ))}
      </div>
    )
  }

  const renderToolFilterItems = () => (
    <div className="ml-4 mt-2 space-y-1 border-l border-[rgba(212,168,83,0.08)] pl-3">
      {filteredTaskFilters.map((task) => {
        const count = aiWebsites.filter(w => w.category === task.category).length
        return (
          <button
            key={task.id}
            onClick={() => { setSelectedCategory(task.category); setIsSheetOpen(false); setActiveNavItem(task.id); }}
            className={`block w-full rounded-lg px-3 py-2 text-left transition-all duration-300 ${activeNavItem === task.id || selectedCategory === task.category ? 'bg-[rgba(212,168,83,0.1)] text-[#e8c677]' : 'text-[#5a5650] hover:bg-[rgba(212,168,83,0.05)] hover:text-[#8a8478]'}`}
          >
            <span className="flex items-center justify-between gap-2 text-sm">
              <span>{task.label}</span>
              {count > 0 && <span className="text-[10px] font-mono opacity-60">{count}</span>}
            </span>
            <span className="mt-1 block text-xs leading-5 opacity-70">{task.description}</span>
          </button>
        )
      })}
    </div>
  )

  const renderCapabilityGroupItems = () => (
    <div className="mt-2 space-y-3">
      {filteredCapabilityGroups.map((group) => (
        <div key={group.id} className="ml-4 border-l border-[rgba(212,168,83,0.08)] pl-3">
          <p className="mb-1 px-3 text-[10px] font-mono uppercase tracking-[0.16em] text-[#5a5650]">{group.label}</p>
          {group.items.map((subcatId) => {
            const count = aiWebsites.filter(w => w.category === subcatId).length
            return (
              <button
                key={subcatId}
                onClick={() => { setSelectedCategory(subcatId); setIsSheetOpen(false); setActiveNavItem(subcatId); }}
                className={`flex h-9 w-full items-center justify-between rounded-lg px-3 text-sm transition-all duration-300 ${selectedCategory === subcatId ? 'bg-[rgba(212,168,83,0.1)] text-[#e8c677]' : 'text-[#5a5650] hover:bg-[rgba(212,168,83,0.05)] hover:text-[#8a8478]'}`}
              >
                <span>{getSubcategoryName(subcatId)}</span>
                {count > 0 && <span className="text-[10px] font-mono opacity-60">{count}</span>}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )

  const renderCollapsibleNavigationSection = (section: TitledNavigationSection, content: ReactNode) => (
    <Collapsible key={section.id} open={openCategories.includes(section.id)} onOpenChange={() => toggleCategory(section.id)}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between h-10 rounded-xl text-[#8a8478] hover:text-[#c8c2b4] hover:bg-[rgba(212,168,83,0.06)] transition-all duration-300">
          <span className="text-sm font-medium">{section.title}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openCategories.includes(section.id) ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>{content}</CollapsibleContent>
    </Collapsible>
  )

  const renderNavigationSection = (section: SidebarNavigationSection) => {
    if (getNavigationSectionCount(section) === 0) return null

    switch (section.type) {
      case 'all-tools':
        return (
          <div key={section.id} className="mb-5">
            <Button onClick={() => { setSelectedCategory('all'); setActiveNavItem('all'); setIsSheetOpen(false); }} variant="ghost"
              className={`w-full justify-start gap-3 h-11 rounded-xl transition-all duration-300 ${selectedCategory === 'all' ? 'bg-[rgba(212,168,83,0.12)] text-[#e8c677] border border-[rgba(212,168,83,0.15)]' : 'text-[#8a8478] hover:text-[#c8c2b4] hover:bg-[rgba(212,168,83,0.06)]'}`}>
              <Compass className="h-4 w-4" /><span className="text-sm font-medium">{section.label}</span>
              <span className="ml-auto text-xs opacity-50 font-mono">{aiWebsites.length}</span>
            </Button>
          </div>
        )
      case 'navigation-search':
        return (
          <div key={section.id} className="space-y-2">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5a5650] transition-colors duration-300 group-focus-within:text-[#d4a853]" />
              <Input
                type="text"
                value={navSearchQuery}
                onChange={(event) => setNavSearchQuery(event.target.value)}
                placeholder={section.placeholder}
                aria-label={section.ariaLabel}
                className="h-9 w-full rounded-xl pl-10 pr-9 text-xs glass-input"
              />
              {navSearchQuery && (
                <Button onClick={clearNavSearch} variant="ghost" size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-lg text-[#5a5650] hover:text-[#c8c2b4]">
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
            {navSearchQuery && (
              <p className="px-1 text-[10px] font-mono text-[#5a5650]">{navResultCount} 个导航结果</p>
            )}
          </div>
        )
      case 'link-list': {
        const content = renderLinkListItems(section)
        return section.collapsible
          ? renderCollapsibleNavigationSection(section, content)
          : <div key={section.id}>{content}</div>
      }
      case 'tool-filter-list':
        return renderCollapsibleNavigationSection(section, renderToolFilterItems())
      case 'capability-groups':
        return renderCollapsibleNavigationSection(section, renderCapabilityGroupItems())
      default:
        return null
    }
  }

  const renderNavigation = () => (
    <nav className="space-y-5">
      {sidebarNavigationSections.map(renderNavigationSection)}
      {navSearchQuery && navResultCount === 0 && (
        <div className="rounded-xl border border-[rgba(212,168,83,0.08)] bg-[rgba(14,13,19,0.52)] px-3 py-4 text-xs leading-5 text-[#5a5650]">
          没有找到匹配的导航入口
        </div>
      )}
    </nav>
  )

  const renderSkeleton = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="rounded-2xl p-6 border border-[rgba(212,168,83,0.06)]">
          <div className="skeleton h-5 w-2/3 mb-3" /><div className="skeleton h-3 w-1/3 mb-4" />
          <div className="skeleton h-3 w-full mb-2" /><div className="skeleton h-3 w-4/5" />
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen observatory-bg">
      {/* ===== Header ===== */}
      <header className="glass-header sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 text-[#5a5650] hover:text-[#d4a853] hover:bg-[rgba(212,168,83,0.08)]">
                  <Menu className="h-5 w-5" /><span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-[#f0ece4]">
                    <span className="text-[#d4a853]">✦</span> AI 使用导航
                  </SheetTitle>
                  <SheetDescription className="text-[#5a5650]">按场景、任务和能力找到合适工具</SheetDescription>
                </SheetHeader>
                <div className="mt-6">{renderNavigation()}</div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#c9849e] flex items-center justify-center shadow-[0_0_20px_rgba(212,168,83,0.2)]">
                  <Sparkles className="h-4 w-4 text-[#08070b]" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#7ecba1] rounded-full border-[1.5px] border-[#08070b] pulse-dot" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold gradient-text leading-tight font-editorial tracking-tight">小熊AI导航</h1>
                <p className="text-[10px] text-[#5a5650] leading-tight font-mono tracking-widest uppercase">Atlas of AI</p>
              </div>
              <span className="sm:hidden text-sm font-bold gradient-text font-editorial">小熊AI</span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a5650] group-focus-within:text-[#d4a853] transition-colors duration-300" />
              <Input type="text" placeholder="搜索 AI 工具..." value={searchQuery} onChange={handleSearch}
                className="w-full pl-11 pr-10 h-10 rounded-xl glass-input text-sm" />
              {searchQuery && (
                <Button onClick={clearSearch} variant="ghost" size="icon"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 text-[#5a5650] hover:text-[#c8c2b4] rounded-lg">
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#5a5650] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853] animate-glow-pulse" />
              <span>{aiWebsites.length} tools</span>
            </div>
            <a href="https://github.com/dahaoGPT/AI-Navigation" target="_blank" rel="noopener noreferrer"
              className="h-9 w-9 rounded-xl flex items-center justify-center text-[#5a5650] hover:text-[#d4a853] hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300">
              <Github className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
        {loading && <div className="loading-bar" />}
      </header>

      {/* ===== Main Content ===== */}
      <div className="flex flex-1 max-w-[1440px] mx-auto w-full">
        {/* Sidebar */}
        <aside className="hidden md:block w-60 lg:w-64 flex-shrink-0">
          <div className="sticky top-20 p-4">
            <div className="glass-sidebar rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-5 px-1">
                <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#d4a853] to-[#c9849e]" />
                <span className="text-[10px] font-mono text-[#5a5650] uppercase tracking-[0.2em]">真实需求导航</span>
              </div>
              {renderNavigation()}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Mobile Search */}
          <div className="md:hidden mb-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a5650] group-focus-within:text-[#d4a853] transition-colors duration-300" />
              <Input type="text" placeholder="搜索 AI 工具..." value={searchQuery} onChange={handleSearch}
                className="w-full pl-11 pr-10 h-11 rounded-xl glass-input text-sm" />
              {searchQuery && (
                <Button onClick={clearSearch} variant="ghost" size="icon"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 text-[#5a5650] hover:text-[#c8c2b4] rounded-lg">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Hero Section */}
          {selectedCategory === 'all' && !searchQuery && (
            <div className="relative mb-6 p-8 sm:p-10 rounded-3xl border border-[rgba(212,168,83,0.08)] overflow-hidden animate-fade-in"
              style={{ background: 'linear-gradient(135deg, rgba(28,27,37,0.8) 0%, rgba(14,13,19,0.9) 100%)' }}>
              {/* Constellation dots */}
              <div className="absolute top-6 right-12 w-2 h-2 rounded-full bg-[#d4a853] opacity-30 animate-glow-pulse" />
              <div className="absolute top-20 right-32 w-1.5 h-1.5 rounded-full bg-[#7eb8da] opacity-20 animate-glow-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-10 right-20 w-1 h-1 rounded-full bg-[#c9849e] opacity-25 animate-glow-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute top-12 right-24 h-px w-16 bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.1)] to-transparent rotate-[30deg]" />

              <div className="relative z-10">
                <p className="text-[10px] font-mono text-[#5a5650] uppercase tracking-[0.3em] mb-3">✦ Atlas of Artificial Intelligence</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-[#f0ece4] leading-tight mb-3 tracking-tight">
                  按真实场景<br /><span className="gradient-text italic">找到合适的 AI 工具</span>
                </h2>
                <p className="text-sm text-[#8a8478] max-w-md leading-relaxed">
                  面向学生、上班族、创作者和小团队，整理 AI 工具的适用场景、优缺点、价格线索和替代选择。
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/guides" className="inline-flex h-10 items-center gap-2 rounded-xl bg-[rgba(212,168,83,0.14)] px-4 text-sm text-[#e8c677] hover:bg-[rgba(212,168,83,0.2)]">
                    <Zap className="h-4 w-4" /> 查看使用指南
                  </Link>
                  <Link href="/compare" className="inline-flex h-10 items-center rounded-xl border border-[rgba(212,168,83,0.14)] px-4 text-sm text-[#8a8478] hover:text-[#e8c677]">
                    对比怎么选
                  </Link>
                  <Link href="/about" className="inline-flex h-10 items-center rounded-xl border border-[rgba(212,168,83,0.14)] px-4 text-sm text-[#8a8478] hover:text-[#e8c677]">
                    了解收录原则
                  </Link>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'all' && !searchQuery && (
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
          )}

          {selectedCategory === 'all' && !searchQuery && (
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
          )}

          {selectedCategory === 'all' && !searchQuery && (
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
          )}

          {/* Section Title */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-editorial font-bold text-[#f0ece4] tracking-tight">
                {selectedCategory === 'all' ? '全部工具' : getSubcategoryName(selectedCategory)}
              </h2>
              <p className="text-xs text-[#5a5650] mt-1 font-mono">
                {filteredWebsites.length} 个结果{searchQuery && <span> · &ldquo;{searchQuery}&rdquo;</span>}
              </p>
            </div>
            {selectedCategory !== 'all' && (
              <Button onClick={() => { setSelectedCategory('all'); setActiveNavItem(null); }} variant="ghost" size="sm"
                className="text-xs text-[#5a5650] hover:text-[#d4a853] hover:bg-[rgba(212,168,83,0.08)] rounded-lg">
                <X className="h-3 w-3 mr-1" />清除
              </Button>
            )}
          </div>

          {/* Cards Grid */}
          {loading ? renderSkeleton() : filteredWebsites.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWebsites.map((site, index) => {
                const parentCat = getParentCategory(site.category)
                const catId = parentCat?.id || ''
                const catColorBase = getCatColor(catId)
                const catText = getCatTextColor(catId)
                return (
                  <a key={site.id} href={site.slug ? `/tools/${site.slug}` : site.url} target={site.slug ? undefined : '_blank'} rel={site.slug ? undefined : 'noopener noreferrer'}
                    className="group glass-card rounded-2xl p-5 sm:p-6 animate-card-enter block"
                    style={{ animationDelay: `${index * 60}ms` }}
                    onMouseEnter={() => setHoveredCard(site.id)} onMouseLeave={() => setHoveredCard(null)}>
                    <div className="relative z-10">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg border"
                            style={{ background: `${catColorBase}0.08)`, borderColor: `${catColorBase}0.15)` }}>
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
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#8a8478] group-hover:text-[#c8c2b4] transition-colors duration-300 line-clamp-2 leading-relaxed mb-4">
                        {site.description}
                      </p>
                      {/* Footer */}
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
          ) : (
            <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-[#15141c] border border-[rgba(212,168,83,0.08)] flex items-center justify-center mb-5">
                <Search className="h-7 w-7 text-[#5a5650]" />
              </div>
              <h3 className="text-base font-editorial font-medium text-[#8a8478] mb-1">没有找到匹配的工具</h3>
              <p className="text-sm text-[#5a5650] mb-5">请尝试其他搜索词或类别</p>
              <Button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setActiveNavItem(null); }} variant="ghost"
                className="text-sm text-[#d4a853] hover:bg-[rgba(212,168,83,0.08)] rounded-xl">查看全部工具</Button>
            </div>
          )}
        </main>
      </div>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[rgba(212,168,83,0.06)] mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#d4a853] to-[#c9849e] flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-[#08070b]" />
              </div>
              <span className="text-sm text-[#5a5650]">© 2024 小熊AI导航 · All rights reserved</span>
            </div>
            <div className="flex items-center gap-6">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-xs text-[#5a5650] hover:text-[#d4a853] transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <a href="https://github.com/dahaoGPT/AI-Navigation" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl flex items-center justify-center text-[#5a5650] hover:text-[#d4a853] hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300">
                <Github className="h-4 w-4" />
              </a>
              <Link href="/guides" className="w-8 h-8 rounded-xl flex items-center justify-center text-[#5a5650] hover:text-[#d4a853] hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </Link>
              <a href="mailto:1369129052@qq.com" className="w-8 h-8 rounded-xl flex items-center justify-center text-[#5a5650] hover:text-[#d4a853] hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
