import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductCatalog from './components/ProductCatalog'
import ProductManagement from './components/ProductManagement'
import ProductDetail from './components/ProductDetail'
import { 
  ShoppingBag, 
  Settings2, 
  FileText, 
  ExternalLink
} from 'lucide-react'

export default function App() {
  // Khởi tạo QueryClient ổn định
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 2, // 2 phút
          },
        },
      })
  )

  // State tab hiện tại
  const [activeTab, setActiveTab] = useState('catalog')

  const tabs = [
    {
      id: 'catalog',
      title: 'Bài 1: Xem theo danh mục',
      subtitle: 'Khách hàng xem & lọc sản phẩm',
      icon: ShoppingBag,
      component: <ProductCatalog />,
    },
    {
      id: 'management',
      title: 'Bài 2: Quản lý sản phẩm',
      subtitle: 'Quản trị viên thêm & sửa sản phẩm',
      icon: Settings2,
      component: <ProductManagement />,
    },
    {
      id: 'detail',
      title: 'Bài 3: Chi tiết & Đánh giá',
      subtitle: 'React.lazy & Suspense Code-splitting',
      icon: FileText,
      component: <ProductDetail />,
    },
  ]

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0]

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50/80 text-slate-900 flex flex-col font-sans">
        {/* Navigation Bar - Đã bỏ logo title theo yêu cầu */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Tab Buttons */}
              <div className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span>{tab.title}</span>
                    </button>
                  )
                })}
              </div>

              {/* API Link */}
              <div className="flex items-center gap-2">
                <a
                  href="https://dummyjson.com/docs/products"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-md transition-colors font-medium"
                >
                  <span>DummyJSON API</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {currentTab.component}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>Bài tập thực hành TanStack Query, Axios Instance & shadcn/ui</span>
            <span>React 19 • Tailwind CSS v4</span>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  )
}