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
import { userAgent } from 'next/server'



 

const categories = [
  {
    id: 'language',
    name: '语言处理',
    subcategories: [
      { id: 'ppt-generation', name: 'ppt生成' },
      { id: 'chatbots', name: '聊天机器人' },
      { id: 'text-to-speech', name: '文字转语音' },
      { id: 'translation', name: '翻译' },
    ]
  },
  {
    id: 'image',
    name: '图像处理',
    subcategories: [
      { id: 'image-generation', name: '图像生成' },
      { id: 'image-editing', name: '图像编辑' },
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

// const aiWebsites = [
//   { id: 1, name: 'ChatGPT', url: 'https://chat.openai.com', category: 'chatbots', description: '强大的AI聊天机器人' },
//   { id: 2, name: 'DALL-E', url: 'https://labs.openai.com', category: 'image-generation', description: 'AI图像生成工具' },
//   { id: 3, name: 'Midjourney', url: 'https://www.midjourney.com', category: 'image-generation', description: '高质量AI艺术创作平台' },
//   { id: 4, name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'code-generation', description: 'AI辅助编码工具' },
//   { id: 5, name: 'Jasper', url: 'https://www.jasper.ai', category: 'chatbots', description: 'AI写作助手' },
//   { id: 6, name: 'Canva', url: 'https://www.canva.com', category: 'image-editing', description: 'AI驱动的图像编辑工具' },
//   { id: 7, name: 'DeepL', url: 'https://www.deepl.com', category: 'translation', description: 'AI驱动的翻译工具' },
//   { id: 8, name: 'Tableau', url: 'https://www.tableau.com', category: 'data-visualization', description: 'AI增强的数据可视化平台' },
//   { id: 9, name: 'AI-powered PPT', url: 'https://www.aippt.cn/', category: 'ppt-generation', description: 'AI增强的数据可视化平台' },
// ]

export default function AINavigation() {
    // 获取aiWebsites数据
  const [loading, setLoading] = useState(true); // 初始加载状态为 true
  const [aiWebsites, setAiWebsites] = useState<Array<any>>([
    { id: 1, name: 'ChatGPT', url: 'https://chat.openai.com', category: 'chatbots', description: '强大的AI聊天机器人' },
    { id: 2, name: 'DALL-E', url: 'https://labs.openai.com', category: 'image-generation', description: 'AI图像生成工具' },
    { id: 3, name: 'Midjourney', url: 'https://www.midjourney.com', category: 'image-generation', description: '高质量AI艺术创作平台' },
    { id: 4, name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'code-generation', description: 'AI辅助编码工具' },
    { id: 5, name: 'Jasper', url: 'https://www.jasper.ai', category: 'chatbots', description: 'AI写作助手' },
    { id: 6, name: 'Canva', url: 'https://www.canva.com', category: 'image-editing', description: 'AI驱动的图像编辑工具' },
    { id: 7, name: 'DeepL', url: 'https://www.deepl.com', category: 'translation', description: 'AI驱动的翻译工具' },
    { id: 8, name: 'Tableau', url: 'https://www.tableau.com', category: 'data-visualization', description: 'AI增强的数据可视化平台' },
    { id: 9, name: 'AI-powered PPT', url: 'https://www.aippt.cn/', category: 'ppt-generation', description: 'AI增强的数据可视化平台' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredWebsites, setFilteredWebsites] = useState(aiWebsites)
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null); // 用于跟踪选中的导航项
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null); // 当前悬浮的导航项
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({   
  
        }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // 抛出错误，以便在调用函数的地方处理
    }
  };
  
  const processData = (jsonData: any) => {
    // 在这里进行数据处理，例如过滤、排序等
       // 确保 jsonData 是一个对象，并且包含 "results" 数组
      //  console.log("jsonData:"+jsonData);
      //  console.log("jsonData.results:"+jsonData.results);
       if (!jsonData && Array.isArray(jsonData.results)) {
        throw new Error('Invalid data format');
      }
      // 使用 map 方法遍历 "results" 数组，提取每个页面的关键信息
      const responseData = jsonData.results.map((page : any) => {
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
      // setAiWebsites(aiWebsites);
    //获取notion数据
     const loadData= (): void => {
      setLoading(true); // 开始加载数据，设置加载状态
      fetchData()
      .then((data) => {
        if (data) {
          const processedData = processData(data);
          setAiWebsites(processedData); // 将处理后的数据设置到状态
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      })
      .finally(() => {
        setLoading(false); // 数据加载完成，设置加载状态
      });
    };
    loadData(); // 调用加载数据函数
    console.log("第1个aiWebsites",aiWebsites);
  },[])
  
  // 当选中的类别或搜索查询发生变化时，重新筛选AI网站列表
  useEffect(() => {
    console.log("第2个aiWebsites",aiWebsites);
  // 过滤出符合条件的网站列表
  const filtered = aiWebsites.filter((site) => {
    // 检查网站类别是否符合当前筛选条件
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
    // 检查网站名称或描述是否包含搜索关键词
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           site.description.toLowerCase().includes(searchQuery.toLowerCase());
    // 返回满足类别和搜索条件的网站
    return matchesCategory && matchesSearch;
  });
  // 更新筛选后的网站列表状态
  setFilteredWebsites(filtered);

}, [aiWebsites,selectedCategory, searchQuery]);
// }, []);// 空数组作为依赖，确保只在组件挂载时执行一次


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
  

  const renderNavigation = () => (
    <nav>
      <ul className="space-y-2">
        <li>
          <Button
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'default' : 'ghost'}
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
                  variant="ghost"
                  className="w-full justify-between"
                >
                  {category.name}
                  <ChevronDown className={`h-4 w-4 transition-transform ${openCategories.includes(category.id) ? 'transform rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="ml-4 space-y-2 mt-2" >
                  {category.subcategories.map(subcat => (
                    <li key={subcat.id} className={`nav-item ${activeNavItem === subcat.id ? 'active' : ''}`}>
                      <Button
                        onClick={() => {
                          setSelectedCategory(subcat.id);
                          setIsSheetOpen(false);
                          setActiveNavItem(subcat.id)    
                        }}
                        onMouseOver={() => setHoveredNavItem(subcat.id)}
                        variant={selectedCategory === subcat.id ? 'default' : 'ghost'}
                        className="w-full justify-start text-sm "
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
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">小熊AI导航站</h1>
        <p className="mt-2">发现和探索最新的AI工具和网站</p>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:block w-64 bg-gray-100 p-4">
          {renderNavigation()}
        </aside>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden fixed left-4 top-4" >
              <Menu className="h-4 w-4" />
              <span className="sr-only">打开菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" >
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
          {
       //  loading ? (
      //  <p>Loading AI websites...</p>
     // ) : filteredWebsites.length > 0 ? (
          filteredWebsites.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredWebsites.map(site => (
                <a
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded shadow hover:shadow-md transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
                    {site.name}
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </h2>
                  <p className="text-gray-600 mb-2">
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
      <footer className="bg-gray-100 text-gray-600 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-2">
            <p>&copy; 2024 小熊AI导航站. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center space-x-4">
            <a href="#" className="hover:text-purple-500 transition-colors">
              关于我们
            </a>
            <a href="#" className="hover:text-purple-500 transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-purple-500 transition-colors">
              联系我们
            </a>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="#" aria-label="Facebook" className="hover:text-purple-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-purple-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-purple-500 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  )
}
