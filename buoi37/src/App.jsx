import React, { useState } from 'react';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import SelfTestModal from './components/SelfTestModal';
import StandaloneCartDemo from './components/StandaloneCartDemo';

export default function App() {
  // Client state: Danh mục đang được chọn (ban đầu là null theo yêu cầu đề bài)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Điều khiển Cart Drawer & SelfTestModal
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Tab điều hướng phía trên (giống ảnh mẫu người dùng gửi)
  const [activeTab, setActiveTab] = useState('combined');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* 1. Thanh Tabs trên cùng (Tailwind CSS) */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-7 overflow-x-auto">
          <button
            type="button"
            className={`py-3 text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'combined'
                ? 'border-[#f05123] text-[#f05123] font-bold'
                : 'border-transparent text-gray-500 hover:text-[#f05123] font-medium'
            }`}
            onClick={() => setActiveTab('combined')}
          >
            Mua sắm kết hợp (Bài 1 + Bài 2)
          </button>

          <button
            type="button"
            className={`py-3 text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'bai1'
                ? 'border-[#f05123] text-[#f05123] font-bold'
                : 'border-transparent text-gray-500 hover:text-[#f05123] font-medium'
            }`}
            onClick={() => setActiveTab('bai1')}
          >
            Bài 1: Giỏ hàng độc lập (Zustand)
          </button>

          <button
            type="button"
            className={`py-3 text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'bai2'
                ? 'border-[#f05123] text-[#f05123] font-bold'
                : 'border-transparent text-gray-500 hover:text-[#f05123] font-medium'
            }`}
            onClick={() => setActiveTab('bai2')}
          >
            Bài 2: Danh mục &amp; Sản phẩm (useQuery)
          </button>
        </div>
      </nav>

      {/* 2. Header với logo F8 FilterShop và nút Giỏ hàng */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTestGuide={() => setIsTestModalOpen(true)}
      />

      {/* 3. Phần nội dung chính */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full">
        {activeTab === 'bai1' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-800">
                Bài 1: Quản lý giỏ hàng với Zustand
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Thử nghiệm giỏ hàng độc lập với ít nhất 3 sản phẩm mẫu có ID riêng biệt.
              </p>
            </div>
            <StandaloneCartDemo />
          </div>
        )}

        {activeTab === 'bai2' && (
          <div>
            <CategoryList
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <ProductList selectedCategory={selectedCategory} />
          </div>
        )}

        {activeTab === 'combined' && (
          <div>
            {/* Bộ lọc danh mục (Bài 2) */}
            <CategoryList
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Danh sách sản phẩm từ API (Bài 2) có thể thêm vào giỏ hàng (Bài 1) */}
            <ProductList selectedCategory={selectedCategory} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-5 border-t border-gray-200 text-xs text-gray-400 bg-white">
        <p>Thực hành React F8 - Buổi 37: Quản lý State với Zustand &amp; TanStack Query (Tailwind CSS)</p>
      </footer>

      {/* Drawer Giỏ hàng */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Modal kịch bản tự kiểm tra */}
      <SelfTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </div>
  );
}