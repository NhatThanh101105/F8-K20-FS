import React from 'react';
import { ShoppingCart, CheckSquare } from 'lucide-react';
import { useCartStore, selectTotalQuantity } from '../store/useCartStore';

export default function Header({ onOpenCart, onOpenTestGuide }) {
  // Lấy tổng số lượng từ Zustand store (cộng tất cả quantity của các sản phẩm)
  const totalQuantity = useCartStore(selectTotalQuantity);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3.5 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo giống ảnh mẫu: icon cam chữ F + FilterShop */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#f05123] text-white flex items-center justify-center font-bold text-xl shadow-xs">
            F
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Filter<span className="text-[#f05123]">Shop</span>
            </h1>
          </div>
        </div>

        {/* Hành động: Kịch bản kiểm tra & Giỏ hàng */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            onClick={onOpenTestGuide}
            title="Mở bảng kịch bản tự kiểm tra Bài 1 & Bài 2"
          >
            <CheckSquare size={15} />
            <span>Kịch bản kiểm tra</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#fff1ee] border border-[#f05123]/30 rounded-full text-[#f05123] font-semibold text-sm hover:bg-[#fde5df] transition-colors cursor-pointer"
            onClick={onOpenCart}
            aria-label="Xem giỏ hàng"
          >
            <div className="relative flex items-center">
              <ShoppingCart size={18} />
              {totalQuantity > 0 && (
                <span
                  className="absolute -top-2.5 -right-3 bg-[#f05123] text-white text-[10px] font-bold min-w-[18px] h-[18px] leading-[18px] rounded-full text-center px-1 shadow-xs"
                  id="header-cart-badge"
                >
                  {totalQuantity}
                </span>
              )}
            </div>
            <span>Giỏ hàng {totalQuantity > 0 ? `(${totalQuantity})` : ''}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
