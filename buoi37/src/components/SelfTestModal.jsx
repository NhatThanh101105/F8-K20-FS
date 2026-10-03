import React from 'react';
import { X, Play, RotateCcw } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function SelfTestModal({ isOpen, onClose }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isOpen) return null;

  // Bước 1: Thêm A (giá 100) 2 lần và B (giá 50) 1 lần -> Header: 3, Tổng: 250
  const runStep1 = () => {
    clearCart();
    addToCart({ id: 'test-A', title: 'Sản phẩm thử nghiệm A', price: 100 });
    addToCart({ id: 'test-A', title: 'Sản phẩm thử nghiệm A', price: 100 });
    addToCart({ id: 'test-B', title: 'Sản phẩm thử nghiệm B', price: 50 });
  };

  // Bước 2: Đổi số lượng A thành 3 -> Tổng: 350, Header: 4
  const runStep2 = () => {
    updateQuantity('test-A', 3);
  };

  // Bước 3: Xóa A -> Header: 1, Tổng: 50
  const runStep3 = () => {
    removeFromCart('test-A');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800">Kịch bản kiểm tra ví dụ đề bài</h3>
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex flex-col gap-3">
          <p className="text-xs text-gray-500">
            Bấm các nút dưới đây để kiểm tra tự động theo đúng ví dụ trong đề bài:
          </p>

          <div className="border border-gray-200 rounded-xl p-3.5 bg-gray-50/60">
            <h4 className="text-xs font-bold text-gray-800 mb-1">
              Bước 1: Thêm A (giá 100) 2 lần và B (giá 50) 1 lần
            </h4>
            <p className="text-xs text-gray-500 mb-2.5">
              Kỳ vọng: Giỏ có 2 dòng, Header hiển thị 3, tổng tiền là 250đ.
            </p>
            <button
              type="button"
              className="px-3 py-1.5 bg-[#f05123] hover:bg-[#d84518] text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              onClick={runStep1}
            >
              <Play size={11} />
              <span>Chạy Bước 1</span>
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl p-3.5 bg-gray-50/60">
            <h4 className="text-xs font-bold text-gray-800 mb-1">
              Bước 2: Đổi số lượng A thành 3
            </h4>
            <p className="text-xs text-gray-500 mb-2.5">
              Kỳ vọng: Số lượng A = 3, Header hiển thị 4, tổng tiền là 350đ.
            </p>
            <button
              type="button"
              className="px-3 py-1.5 bg-[#f05123] hover:bg-[#d84518] text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              onClick={runStep2}
            >
              <Play size={11} />
              <span>Chạy Bước 2</span>
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl p-3.5 bg-gray-50/60">
            <h4 className="text-xs font-bold text-gray-800 mb-1">
              Bước 3: Xóa sản phẩm A
            </h4>
            <p className="text-xs text-gray-500 mb-2.5">
              Kỳ vọng: Header còn 1, tổng tiền còn 50đ.
            </p>
            <button
              type="button"
              className="px-3 py-1.5 bg-[#f05123] hover:bg-[#d84518] text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              onClick={runStep3}
            >
              <Play size={11} />
              <span>Chạy Bước 3</span>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50">
          <button
            type="button"
            className="px-3.5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-xs font-semibold transition-colors cursor-pointer"
            onClick={clearCart}
          >
            Xóa giỏ hàng
          </button>
          <button
            type="button"
            className="px-4 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
