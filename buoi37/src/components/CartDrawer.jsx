import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import {
  useCartStore,
  selectTotalQuantity,
  selectTotalPrice,
} from '../store/useCartStore';

export default function CartDrawer({ isOpen, onClose }) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  // Theo dõi trực tiếp items để tự động re-render tổng số lượng & tổng tiền
  const totalQuantity = useCartStore(selectTotalQuantity);
  const totalPrice = useCartStore(selectTotalPrice);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end" onClick={onClose}>
      <aside
        className="w-full max-w-sm sm:max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
        aria-label="Giỏ hàng"
      >
        {/* Header Drawer */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">Giỏ hàng</h2>
            <span className="bg-[#fff1ee] text-[#f05123] text-xs font-semibold px-2 py-0.5 rounded-full">
              {totalQuantity} món
            </span>
          </div>
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Đóng giỏ hàng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Danh sách sản phẩm trong giỏ */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {items.length === 0 ? (
            <div className="py-20 text-center text-gray-400 flex flex-col items-center gap-2">
              <ShoppingBag size={48} strokeWidth={1.5} />
              <h3 className="text-base font-semibold text-gray-700 mt-2">Giỏ hàng trống</h3>
              <p className="text-xs text-gray-400">Chưa có sản phẩm nào trong giỏ hàng</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const lineTotal = item.price * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 border border-gray-200 rounded-xl bg-white shadow-xs"
                  >
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-14 h-14 object-contain bg-gray-50 rounded-lg p-1 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-xl shrink-0">
                        📦
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-gray-800 truncate" title={item.title}>
                        {item.title}
                      </h4>
                      <div className="text-[11px] text-gray-500 my-1">
                        Đơn giá: <span className="font-semibold text-gray-700">{Math.round(item.price)}đ</span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Cụm tăng giảm số lượng */}
                        <div className="inline-flex items-center border border-gray-200 rounded-md bg-gray-50">
                          <button
                            type="button"
                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-l-md transition-colors cursor-pointer"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            title={item.quantity <= 1 ? 'Tối thiểu 1 sản phẩm' : 'Giảm 1'}
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r-md transition-colors cursor-pointer"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            title="Tăng 1"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Nút xóa sản phẩm */}
                        <button
                          type="button"
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          onClick={() => removeFromCart(item.id)}
                          title="Xóa sản phẩm"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-between shrink-0">
                      <span className="text-xs font-extrabold text-[#f05123]">
                        {Math.round(lineTotal)}đ
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Drawer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Tổng số lượng:</span>
            <strong className="text-gray-800" id="cart-total-quantity">{totalQuantity}</strong>
          </div>

          <div className="flex justify-between items-center text-sm font-bold text-gray-800 pt-2 border-t border-gray-200">
            <span>Tổng tiền:</span>
            <span className="text-base text-[#f05123] font-extrabold" id="cart-total-price">
              {Math.round(totalPrice)}đ
            </span>
          </div>

          {items.length > 0 && (
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                className="w-1/3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                onClick={clearCart}
              >
                Xóa tất cả
              </button>
              <button
                type="button"
                className="w-2/3 py-2 bg-[#f05123] hover:bg-[#d84518] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                onClick={() => alert('Đã hoàn thành demo Giỏ hàng Bài 1!')}
              >
                Thanh toán
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
