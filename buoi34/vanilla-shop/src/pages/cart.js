import { renderDefaultLayout } from "../layouts/defaultLayout.js";
import {
  getCartItems,
  getCartTotal,
  removeFromCart,
  updateQuantity,
} from "../cart.js";
import { formatPrice } from "../utils/formatPrice.js";
import { handleRoute } from "../router.js";

export function renderCartPage() {
  const items = getCartItems();
  const total = getCartTotal();

  const emptyCartHtml = `
    <div class="text-center py-20">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
      <p class="text-gray-500 mb-8">Hãy thêm sản phẩm yêu thích vào giỏ hàng của bạn</p>
      <a href="/products" data-link class="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
        Khám phá sản phẩm
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      </a>
    </div>
  `;

  const cartItemsHtml =
    items.length > 0
      ? `
    <div class="space-y-4">
      ${items
        .map(
          (item) => `
        <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4" data-cart-item="${item.id}">
          <a href="/products/${item.id}" data-link class="shrink-0">
            <img src="${item.thumbnail}" alt="${item.name}" class="w-24 h-24 rounded-xl object-cover" />
          </a>
          <div class="flex-1 min-w-0">
            <a href="/products/${item.id}" data-link class="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1">${item.name}</a>
            <p class="text-indigo-600 font-bold mt-1">${formatPrice(item.price)}</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button class="qty-btn px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600 font-medium" data-id="${item.id}" data-action="decrease">−</button>
              <span class="px-4 py-2 text-sm font-semibold min-w-[40px] text-center bg-gray-50">${item.quantity}</span>
              <button class="qty-btn px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600 font-medium" data-id="${item.id}" data-action="increase">+</button>
            </div>
            <span class="font-bold text-gray-900 min-w-[120px] text-right">${formatPrice(item.price * item.quantity)}</span>
            <button class="remove-btn p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" data-id="${item.id}" title="Xóa">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      `
        )
        .join("")}
    </div>

    <!-- Summary -->
    <div class="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <span class="text-gray-600">Tạm tính (${items.reduce(
          (s, i) => s + i.quantity,
          0
        )} sản phẩm)</span>
        <span class="font-bold text-gray-900">${formatPrice(total)}</span>
      </div>
      <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
        <span class="text-gray-600">Phí vận chuyển</span>
        <span class="font-medium text-green-600">Miễn phí</span>
      </div>
      <div class="flex items-center justify-between mb-6">
        <span class="text-lg font-bold text-gray-900">Tổng cộng</span>
        <span class="text-2xl font-extrabold text-indigo-600">${formatPrice(total)}</span>
      </div>
      <button class="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30 text-lg">
        Thanh toán
      </button>
    </div>
  `
      : emptyCartHtml;

  const content = `
    <section class="py-12 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>
        ${cartItemsHtml}
      </div>
    </section>
  `;

  renderDefaultLayout(content);

  // Attach event handlers
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;
      const item = items.find((i) => i.id === id);
      if (item) {
        const newQty =
          action === "increase" ? item.quantity + 1 : item.quantity - 1;
        updateQuantity(id, newQty);
        renderCartPage(); // Re-render
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      removeFromCart(id);
      renderCartPage(); // Re-render
    });
  });
}
