'use client'

import { useState, useEffect } from 'react'
import { Menu, Search, X, ExternalLink, ChevronDown } from 'lucide-react'

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

const categories = [
  {
    id: 'image',
    name: '图像处理',
    subcategories: [
      { id: 'image-generation', name: '图像生成' },
      { id: 'image-editing', name: '图像编辑' },
    ]
  },
  {
    id: 'language',
    name: '语言处理',
    subcategories: [
      { id: 'chatbots', name: '聊天机器人' },
      { id: 'text-to-speech', name: '文字转语音' },
      { id: 'translation', name: '翻译' },
    ]
  },
  {
    id: 'coding',
    name: '编程辅助',
    subcategories: [
      { id: 'code-generation', name: '代码生成' },
      { id: 'code-analysis', name: '代码分析' },
    ]
  },
  {
    id: 'data',
    name: '数据分析',
    subcategories: [
      { id: 'data-visualization', name: '数据可视化' },
      { id: 'predictive-analysis', name: '预测分析' },
    ]
  },
]

const aiWebsites = [
  { id: 1, name: 'ChatGPT', url: 'https://chat.openai.com', category: 'chatbots', description: '强大的AI聊天机器人' },
  { id: 2, name: 'DALL-E', url: 'https://labs.openai.com', category: 'image-generation', description: 'AI图像生成工具' },
  { id: 3, name: 'Midjourney', url: 'https://www.midjourney.com', category: 'image-generation', description: '高质量AI艺术创作平台' },
  { id: 4, name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'code-generation', description: 'AI辅助编码工具' },
  { id: 5, name: 'Jasper', url: 'https://www.jasper.ai', category: 'chatbots', description: 'AI写作助手' },
  { id: 6, name: 'Canva', url: 'https://www.canva.com', category: 'image-editing', description: 'AI驱动的图像编辑工具' },
  { id: 7, name: 'DeepL', url: 'https://www.deepl.com', category: 'translation', description: 'AI驱动的翻译工具' },
  { id: 8, name: 'Tableau', url: 'https://www.tableau.com', category: 'data-visualization', description: 'AI增强的数据可视化平台' },
]

export default function AINavigation() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredWebsites, setFilteredWebsites] = useState(aiWebsites)
  const [openCategories, setOpenCategories] = useState<string[]>([])

  useEffect(() => {
    const filtered = aiWebsites.filter(site => {
      const matchesCategory = !selectedCategory || 
        (selectedSubcategory ? site.category === selectedSubcategory : 
          categories.find(cat => cat.id === selectedCategory)?.subcategories.some(sub => sub.id === site.category))
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            site.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setFilteredWebsites(filtered)
  }, [selectedCategory, selectedSubcategory, searchQuery])

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

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory(null)
    if (!openCategories.includes(categoryId)) {
      toggleCategory(categoryId)
    }
  }

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory(subcategoryId)
  }

  const renderNavigation = () => (
    <nav>
      <ul className="space-y-2">
        <li>
          <Button
            onClick={() => {
              setSelectedCategory(null)
              setSelectedSubcategory(null)
            }}
            variant={!selectedCategory ? 'default' : 'ghost'}
            className="w-full justify-start"
          >
            所有类别
          </Button>
        </li>
        {categories.map(category => (
          <li key={category.id}>
            <Collapsible
              open={openCategories.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  onClick={() => handleCategoryClick(category.id)}
                  variant={selectedCategory === category.id && !selectedSubcategory ? 'default' : 'ghost'}
                  className="w-full justify-between"
                >
                  {category.name}
                  <ChevronDown className={`h-4 w-4 transition-transform ${openCategories.includes(category.id) ? 'transform rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="ml-4 space-y-2 mt-2">
                  {category.subcategories.map(subcat => (
                    <li key={subcat.id}>
                      <Button
                        onClick={() => handleSubcategoryClick(category.id, subcat.id)}
                        variant={selectedSubcategory === subcat.id ? 'default' : 'ghost'}
                        className="w-full justify-start text-sm"
                      >
                        {subcat.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="relative bg-cover bg-center h-64 flex items-center justify-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AI导航站</h1>
          <p className="text-xl md:text-2xl text-white">发现和探索最新的AI工具和网站</p>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:block w-64 bg-gray-100 p-4">
          {renderNavigation()}
        </aside>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden fixed left-4 top-4 z-10">
              <Menu className="h-4 w-4" />
              <span className="sr-only">打开菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>类别</SheetTitle>
              <SheetDescription>
                选择一个AI网站类别
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              {renderNavigation()}
            </div>
          </SheetContent>
        </Sheet>

        <main className="flex-1 p-4">
          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="搜索AI网站..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <Button
                onClick={clearSearch}
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">清除搜索</span>
              </Button>
            )}
          </div>
          {filteredWebsites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWebsites.map(site => (
                <a
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
                    {site.name}
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {categories.find(cat => cat.subcategories.some(sub => sub.id === site.category))?.subcategories.find(sub => sub.id === site.category)?.name}
                  </p>
                  <p className="text-sm text-gray-500">{site.description}</p>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">没有找到匹配的AI网站。请尝试其他搜索词或类别。</p>
          )}
        </main>
      </div>
    </div>
  )
}