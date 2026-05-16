'use client'

import { useState, useEffect } from 'react'
import { Menu, Search, X, ExternalLink, ChevronDown, Sparkles, Compass, Github, Twitter, Mail, ArrowUpRight, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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

export default function AINavigation() {
  const [loading, setLoading] = useState(true)
  const [aiWebsites, setAiWebsites] = useState<Array<any>>([
    { id: 1, name: 'ChatGPT', url: 'https://chat.openai.com', category: 'chatbots', description: '强大的AI聊天机器人' },
    { id: 2, name: 'DALL-E', url: 'https://labs.openai.com', category: 'image-generation', description: 'AI图像生成工具' },
    { id: 3, name: 'Midjourney', url: 'https://www.midjourney.com', category: 'image-generation', description: '高质量AI艺术创作平台' },
    { id: 4, name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'code-generation', description: 'AI辅助编码工具' },
    { id: 5, name: 'Jasper', url: 'https://www.jasper.ai', category: 'chatbots', description: 'AI写作助手' },
    { id: 6, name: 'Canva', url: 'https://www.canva.com', category: 'image-editing', description: 'AI驱动的图像编辑工具' },
    { id: 7, name: 'DeepL', url: 'https://www.deepl.com', category: 'translation', description: 'AI驱动的翻译工具' },
    { id: 8, name: 'Tableau', url: 'https://www.tableau.com', category: 'data-visualization', description: 'AI增强的数据可视化平台' },
    { id: 9, name: 'AI-powered PPT', url: 'https://www.aippt.cn/', category: 'ppt-generation', description: 'AI增强的PPT生成平台' },
  ])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredWebsites, setFilteredWebsites] = useState(aiWebsites)
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch('/api/route', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
      return await response.json();
    } catch (error) { console.error('Error fetching data:', error); throw error; }
  };

  const processData = (jsonData: any) => {
    if (!jsonData && Array.isArray(jsonData.results)) throw new Error('Invalid data format');
    return jsonData.results.map((page: any) => ({
      id: page.properties.ID.unique_id.number,
      name: page.properties.name.title[0].plain_text,
      url: page.properties.url.rich_text[0].plain_text,
      category: page.properties.category.rich_text[0].plain_text,
      description: page.properties.description.rich_text[0].plain_text
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

  const toggleCategory = (id: string) => setOpenCategories(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const getParentCategory = (subcatId: string) => categories.find(cat => cat.subcategories.some(sub => sub.id === subcatId))
  const getSubcategoryName = (subcatId: string) => { for (const cat of categories) { const sub = cat.subcategories.find(s => s.id === subcatId); if (sub) return sub.name; } return subcatId; }

  const renderNavigation = () => (
    <nav className="space-y-1">
      <div className="mb-5">
        <Button onClick={() => { setSelectedCategory('all'); setActiveNavItem('all'); setIsSheetOpen(false); }} variant="ghost"
          className={`w-full justify-start gap-3 h-11 rounded-xl transition-all duration-300 ${selectedCategory === 'all' ? 'bg-[rgba(212,168,83,0.12)] text-[#e8c677] border border-[rgba(212,168,83,0.15)]' : 'text-[#8a8478] hover:text-[#c8c2b4] hover:bg-[rgba(212,168,83,0.06)]'}`}>
          <Compass className="h-4 w-4" /><span className="text-sm font-medium">全部工具</span>
          <span className="ml-auto text-xs opacity-50 font-mono">{aiWebsites.length}</span>
        </Button>
      </div>
      {categories.map((category, index) => (
        <div key={category.id} className="mb-0.5 animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
          <Collapsible open={openCategories.includes(category.id)} onOpenChange={() => toggleCategory(category.id)}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between h-10 rounded-xl text-[#8a8478] hover:text-[#c8c2b4] hover:bg-[rgba(212,168,83,0.06)] transition-all duration-300">
                <span className="flex items-center gap-2.5">
                  <span className="text-sm" style={{ color: getCatTextColor(category.id) }}>{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openCategories.includes(category.id) ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="ml-4 mt-1 space-y-0.5 border-l border-[rgba(212,168,83,0.08)] pl-3">
                {category.subcategories.map(subcat => {
                  const count = aiWebsites.filter(w => w.category === subcat.id).length;
                  return (
                    <li key={subcat.id} className={`nav-item ${activeNavItem === subcat.id ? 'active' : ''}`}>
                      <Button onClick={() => { setSelectedCategory(subcat.id); setIsSheetOpen(false); setActiveNavItem(subcat.id); }} variant="ghost"
                        className={`w-full justify-between h-9 px-3 rounded-lg text-sm transition-all duration-300 ${selectedCategory === subcat.id ? 'bg-[rgba(212,168,83,0.1)] text-[#e8c677]' : 'text-[#5a5650] hover:text-[#8a8478] hover:bg-[rgba(212,168,83,0.05)]'}`}>
                        <span>{subcat.name}</span>
                        {count > 0 && <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${selectedCategory === subcat.id ? 'bg-[rgba(212,168,83,0.15)] text-[#d4a853]' : 'bg-[rgba(255,255,255,0.03)] text-[#5a5650]'}`}>{count}</span>}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
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
                    <span className="text-[#d4a853]">✦</span> AI 工具分类
                  </SheetTitle>
                  <SheetDescription className="text-[#5a5650]">选择类别来筛选工具</SheetDescription>
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
              <Input type="text" placeholder="搜索 AI 工具..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 h-10 rounded-xl glass-input text-sm" />
              {searchQuery && (
                <Button onClick={() => setSearchQuery('')} variant="ghost" size="icon"
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
                <span className="text-[10px] font-mono text-[#5a5650] uppercase tracking-[0.2em]">分类导航</span>
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
              <Input type="text" placeholder="搜索 AI 工具..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 h-11 rounded-xl glass-input text-sm" />
              {searchQuery && (
                <Button onClick={() => setSearchQuery('')} variant="ghost" size="icon"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 text-[#5a5650] hover:text-[#c8c2b4] rounded-lg">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Hero Section */}
          {selectedCategory === 'all' && !searchQuery && (
            <div className="relative mb-10 p-8 sm:p-10 rounded-3xl border border-[rgba(212,168,83,0.08)] overflow-hidden animate-fade-in"
              style={{ background: 'linear-gradient(135deg, rgba(28,27,37,0.8) 0%, rgba(14,13,19,0.9) 100%)' }}>
              {/* Constellation dots */}
              <div className="absolute top-6 right-12 w-2 h-2 rounded-full bg-[#d4a853] opacity-30 animate-glow-pulse" />
              <div className="absolute top-20 right-32 w-1.5 h-1.5 rounded-full bg-[#7eb8da] opacity-20 animate-glow-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-10 right-20 w-1 h-1 rounded-full bg-[#c9849e] opacity-25 animate-glow-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute top-12 right-24 h-px w-16 bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.1)] to-transparent rotate-[30deg]" />

              <div className="relative z-10">
                <p className="text-[10px] font-mono text-[#5a5650] uppercase tracking-[0.3em] mb-3">✦ Atlas of Artificial Intelligence</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-[#f0ece4] leading-tight mb-3 tracking-tight">
                  探索 AI 的<br /><span className="gradient-text italic">无限可能</span>
                </h2>
                <p className="text-sm text-[#8a8478] max-w-md leading-relaxed">
                  精心策划的人工智能工具图鉴，汇集全球顶尖 AI 产品与平台，助您找到最适合的智能工具。
                </p>
              </div>
            </div>
          )}

          {/* Section Title */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-editorial font-bold text-[#f0ece4] tracking-tight">
                {selectedCategory === 'all' ? '全部工具' : getSubcategoryName(selectedCategory)}
              </h2>
              <p className="text-xs text-[#5a5650] mt-1 font-mono">
                {filteredWebsites.length} 个结果{searchQuery && <span> · "{searchQuery}"</span>}
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
                  <a key={site.id} href={site.url} target="_blank" rel="noopener noreferrer"
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
                          访问 <ExternalLink className="h-2.5 w-2.5" />
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
              <a href="#" className="text-xs text-[#5a5650] hover:text-[#d4a853] transition-colors duration-300">关于我们</a>
              <a href="#" className="text-xs text-[#5a5650] hover:text-[#d4a853] transition-colors duration-300">隐私政策</a>
              <a href="#" className="text-xs text-[#5a5650] hover:text-[#d4a853] transition-colors duration-300">联系我们</a>
            </div>
            <div className="flex items-center gap-2">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-xl flex items-center justify-center text-[#5a5650] hover:text-[#d4a853] hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
