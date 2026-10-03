import { create } from 'zustand';

/**
 * useCartStore - Quản lý giỏ hàng tạm thời bằng Zustand (Bài 1)
 * Lưu ý:
 * - Dữ liệu items không bị mất khi đổi danh mục sản phẩm (Bài 2)
 * - Cập nhật bất biến (immutable), không sửa trực tiếp state
 */
export const useCartStore = create((set, get) => ({
  items: [],

  /**
   * Thêm sản phẩm vào giỏ
   * - Nếu chưa có (theo id): thêm mới với quantity = 1
   * - Nếu đã có: tăng quantity lên 1
   */
  addToCart: (product) => {
    if (!product || product.id === undefined) return;

    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        // Đã có sản phẩm -> tăng quantity lên 1
        const updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { items: updatedItems };
      } else {
        // Chưa có -> thêm mới với quantity = 1
        const newItem = {
          id: product.id,
          title: product.title,
          price: Number(product.price) || 0,
          quantity: 1,
          thumbnail: product.thumbnail || product.image || '',
        };
        return { items: [...state.items, newItem] };
      }
    });
  },

  /**
   * Cập nhật số lượng mới của sản phẩm theo id
   * - Không chấp nhận số lượng âm, bằng 0 hoặc không phải số nguyên
   * - Nút giảm vô hiệu hóa khi quantity === 1
   */
  updateQuantity: (id, quantity) => {
    // Kiểm tra tính hợp lệ: phải là số nguyên dương >= 1
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  /**
   * Xóa hoàn toàn sản phẩm theo id khỏi giỏ hàng
   */
  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  /**
   * Xóa sạch giỏ hàng (tiện ích bổ sung)
   */
  clearCart: () => {
    set({ items: [] });
  },

  /**
   * Trả về tổng tiền (price * quantity) của tất cả sản phẩm trong giỏ
   */
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));

// Selectors tối ưu hiệu năng để components subscribe chính xác khi items thay đổi
export const selectTotalQuantity = (state) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);
