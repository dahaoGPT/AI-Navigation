/**
 * AINavigation Component
 *
 * 科技感 AI 导航站 - 具备暗色主题、玻璃拟态、霓虹发光效果
 * 支持桌面端和移动端完美适配
 *
 * Features:
 * - 暗色科技感主题
 * - 玻璃拟态导航栏和卡片
 * - 响应式设计（桌面/平板/手机）
 * - 搜索过滤和分类导航
 * - 流畅动画和交互反馈
 */
'use client'

import { useState, useEffect } from 'react'
import { Menu, Search, X, ExternalLink, ChevronDown, Sparkles, Compass, Github, Twitter, Mail, ArrowUpRight, Zap } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// 分类图标映射
const categoryIcons: Record<string, string> = {
  'language': '💬',
  'image': '🎨',
  'coding': '💻',
  'data': '📊',
}

const categories = [
  {
    id: 'language',
    name: '语言处理',
    icon: '💬',
    subcategories: [
      { id: 'ppt-generation', name: 'PPT生成' },
      { id: 'chatbots', name: '聊天机器人' },
      { id: 'text-to-speech', name: '文字转语音' },
      { id: 'translation', name: '翻译' },
    ]
  },
  {
    id: 'image',
    name: '图像处理',
    icon: '🎨',
    subcategories: [
      { id: 'image-generation', name: '图像生成' },
      { id: 'image-editing', name: '图像编辑' },
    ]
  },
  {
    id: 'coding',
    name: '编程辅助',
    icon: '💻',
    subcategories: [
      { id: 'code-generation', name: '代码生成' },
      { id: 'code-analysis', name: '代码分析' },
    ]
  },
  {
    id: 'data',
    name: '数据分析',
    icon: '📊',
    subcategories: [
      { id: 'data-visualization', name: '数据可视化' },
      { id: 'predictive-analysis', name: '预测分析' },
    ]
  },
]

// 获取分类颜色
const getCategoryColor = (categoryId: string) => {
  const colors: Record<string, string> = {
    'language': 'from-blue-500/20 to-cyan-500/20',
    'image': 'from-purple-500/20 to-pink-500/20',
    'coding': 'from-green-500/20 to-emerald-500/20',
    'data': 'from-orange-500/20 to-amber-500/20',
  }
  return colors[categoryId] || 'from-neon-blue/20 to-neon-purple/20'
}

const getCategoryBorder = (categoryId: string) => {
  const colors: Record<string, string> = {
    'language': 'border-blue-500/30',
    'image': 'border-purple-500/30',
    'coding': 'border-green-500/30',
    'data': 'border-orange-500/30',
  }
  return colors[categoryId] || 'border-neon-blue/30'
}

const getCategoryAccent = (categoryId: string) => {
  const colors: Record<string, string> = {
    'language': 'text-blue-400',
    'image': 'text-purple-400',
    'coding': 'text-green-400',
    'data': 'text-orange-400',
  }
  return colors[categoryId] || 'text-neon-blue'
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
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const processData = (jsonData: any) => {
    if (!jsonData && Array.isArray(jsonData.results)) {
      throw new Error('Invalid data format');
    }
    const responseData = jsonData.results.map((page: any) => {
      return {
        id: page.properties.ID.unique_id.number,
        name: page.properties.name.title[0].plain_text,
        url: page.properties.url.rich_text[0].plain_text,
        category: page.properties.category.rich_text[0].plain_text,
        description: page.properties.description.rich_text[0].plain_text
      };
    });
    return responseData;
  };

  useEffect(() => {
    const loadData = (): void => {
      setLoading(true);
      fetchData()
        .then((data) => {
          if (data) {
            const processedData = processData(data);
            setAiWebsites(processedData);
          }
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadData();
  }, [])

  useEffect(() => {
    const filtered = aiWebsites.filter((site) => {
      const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredWebsites(filtered);
  }, [aiWebsites, selectedCategory, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
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

  const renderNavigation = () => (
    <nav className="space-y-1">
      {/* 全部类别按钮 */}
      <div className="mb-4">
        <Button
          onClick={() => {
            setSelectedCategory('all')
            setActiveNavItem('all')
            setIsSheetOpen(false)
          }}
          variant="ghost"
          className={`w-full justify-start gap-3 h-11 rounded-lg transition-all duration-200 ${selectedCategory === 'all'
              ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
        >
          <Compass className="h-4 w-4" />
          <span className="text-sm font-medium">全部工具</span>
          <span className="ml-auto text-xs opacity-60">{aiWebsites.length}</span>
        </Button>
      </div>

      {/* 分类列表 */}
      {categories.map((category, index) => (
        <div key={category.id} className="mb-1 animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
          <Collapsible
            open={openCategories.includes(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-10 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-200"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openCategories.includes(category.id) ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="ml-3 mt-1 space-y-0.5 border-l border-white/5 pl-3">
                {category.subcategories.map(subcat => {
                  const count = aiWebsites.filter(w => w.category === subcat.id).length
                  return (
                    <li key={subcat.id} className={`nav-item ${activeNavItem === subcat.id ? 'active' : ''}`}>
                      <Button
                        onClick={() => {
                          setSelectedCategory(subcat.id)
                          setIsSheetOpen(false)
                          setActiveNavItem(subcat.id)
                        }}
                        variant="ghost"
                        className={`w-full justify-between h-9 px-3 rounded-lg text-sm transition-all duration-200 ${selectedCategory === subcat.id
                            ? 'bg-neon-blue/10 text-neon-blue'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                          }`}
                      >
                        <span>{subcat.name}</span>
                        {count > 0 && (
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCategory === subcat.id
                              ? 'bg-neon-blue/20 text-neon-blue'
                              : 'bg-white/5 text-slate-600'
                            }`}>
                            {count}
                          </span>
                        )}
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </nav>
  )

  // 骨架屏
  const renderSkeleton = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="rounded-xl p-5 border border-white/5">
          <div className="skeleton h-5 w-2/3 mb-3" />
          <div className="skeleton h-3 w-1/3 mb-4" />
          <div className="skeleton h-3 w-full mb-2" />
          <div className="skeleton h-3 w-4/5" />
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen cyber-grid-bg">
      {/* ===== 顶部导航栏 ===== */}
      <header className="glass-header sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo 区域 */}
          <div className="flex items-center gap-3">
            {/* 移动端菜单按钮 */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 text-slate-400 hover:text-neon-blue hover:bg-neon-blue/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-slate-200">
                    <Sparkles className="h-5 w-5 text-neon-blue" />
                    AI工具分类
                  </SheetTitle>
                  <SheetDescription className="text-slate-500">
                    选择一个类别来筛选AI工具
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  {renderNavigation()}
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-dark-950 pulse-dot" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold gradient-text leading-tight">小熊AI导航站</h1>
                <p className="text-[10px] text-slate-500 leading-tight">AI Navigation Hub</p>
              </div>
              <span className="sm:hidden text-sm font-bold gradient-text">小熊AI</span>
            </div>
          </div>

          {/* 中间搜索栏 - 桌面端 */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
              <Input
                type="text"
                placeholder="搜索 AI 工具、网站..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-10 h-10 rounded-xl glass-input text-sm text-slate-200 placeholder:text-slate-500"
              />
              {searchQuery && (
                <Button
                  onClick={clearSearch}
                  variant="ghost"
                  size="icon"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 text-slate-500 hover:text-slate-300 rounded-lg"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <Zap className="h-3.5 w-3.5 text-neon-blue" />
              <span>{aiWebsites.length} 个工具</span>
            </div>
            <a
              href="https://github.com/dahaoGPT/AI-Navigation"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-neon-blue hover:bg-neon-blue/10 transition-all duration-200"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* 加载进度条 */}
        {loading && (
          <div className="loading-bar" />
        )}
      </header>

      {/* ===== 主内容区 ===== */}
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {/* 桌面端侧边栏 */}
        <aside className="hidden md:block w-60 lg:w-64 flex-shrink-0">
          <div className="sticky top-20 p-4">
            <div className="glass-sidebar rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-glow-pulse" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">分类导航</span>
              </div>
              {renderNavigation()}
            </div>
          </div>
        </aside>

        {/* 主内容 */}
        <main className="flex-1 p-4 sm:p-6 min-w-0">
          {/* 移动端搜索栏 */}
          <div className="md:hidden mb-5">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
              <Input
                type="text"
                placeholder="搜索 AI 工具..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-10 h-11 rounded-xl glass-input text-sm text-slate-200 placeholder:text-slate-500"
              />
              {searchQuery && (
                <Button
                  onClick={clearSearch}
                  variant="ghost"
                  size="icon"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:text-slate-300 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* 当前分类标题 */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                {selectedCategory === 'all' ? '全部 AI 工具' : getSubcategoryName(selectedCategory)}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {filteredWebsites.length} 个结果
                {searchQuery && <span> · 搜索: &ldquo;{searchQuery}&rdquo;</span>}
              </p>
            </div>
            {selectedCategory !== 'all' && (
              <Button
                onClick={() => {
                  setSelectedCategory('all')
                  setActiveNavItem(null)
                }}
                variant="ghost"
                size="sm"
                className="text-xs text-slate-500 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg"
              >
                <X className="h-3 w-3 mr-1" />
                清除筛选
              </Button>
            )}
          </div>

          {/* 网站卡片网格 */}
          {loading ? (
            renderSkeleton()
          ) : filteredWebsites.length > 0 ? (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWebsites.map((site, index) => {
                const parentCat = getParentCategory(site.category)
                const catId = parentCat?.id || ''
                return (
                  <a
                    key={site.id}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass-card rounded-xl p-4 sm:p-5 animate-slide-up"
                    style={{ animationDelay: `${index * 60}ms` }}
                    onMouseEnter={() => setHoveredCard(site.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* 卡片头部 */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* 图标 */}
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(catId)} ${getCategoryBorder(catId)} border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                          <span className="text-lg">
                            {parentCat?.icon || '🔗'}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-neon-blue transition-colors truncate flex items-center gap-1.5">
                            {site.name}
                          </h3>
                          <span className={`text-xs ${getCategoryAccent(catId)} opacity-70`}>
                            {getSubcategoryName(site.category)}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className={`h-4 w-4 text-slate-600 group-hover:text-neon-blue flex-shrink-0 transition-all duration-300 ${hoveredCard === site.id ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
                    </div>

                    {/* 描述 */}
                    <p className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-400 transition-colors line-clamp-2 leading-relaxed">
                      {site.description}
                    </p>

                    {/* 底部链接指示 */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-600 truncate max-w-[70%]">
                        {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </span>
                      <span className="text-[10px] text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        访问
                        <ExternalLink className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-dark-900 border border-white/5 flex items-center justify-center mb-4">
                <Search className="h-7 w-7 text-slate-600" />
              </div>
              <h3 className="text-base font-medium text-slate-400 mb-1">没有找到匹配的工具</h3>
              <p className="text-sm text-slate-600 mb-4">请尝试其他搜索词或类别</p>
              <Button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                  setActiveNavItem(null)
                }}
                variant="ghost"
                className="text-sm text-neon-blue hover:bg-neon-blue/10 rounded-lg"
              >
                查看全部工具
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* ===== 底部 Footer ===== */}
      <footer className="border-t border-white/5 mt-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo & 版权 */}
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-500">
                © 2024 小熊AI导航站 · All rights reserved
              </span>
            </div>

            {/* 链接 */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-slate-600 hover:text-neon-blue transition-colors">关于我们</a>
              <a href="#" className="text-xs text-slate-600 hover:text-neon-blue transition-colors">隐私政策</a>
              <a href="#" className="text-xs text-slate-600 hover:text-neon-blue transition-colors">联系我们</a>
            </div>

            {/* 社交图标 */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-neon-blue hover:bg-neon-blue/10 transition-all duration-200">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-neon-blue hover:bg-neon-blue/10 transition-all duration-200">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-neon-blue hover:bg-neon-blue/10 transition-all duration-200">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
