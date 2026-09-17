import { renderDefaultLayout } from "../layouts/defaultLayout.js";
import products from "../data/products.js";
import { formatPrice } from "../utils/formatPrice.js";

export function renderHomePage() {
  const featured = products.slice(0, 4);

  const content = `
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-sm font-medium">Mới nhất 2026</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Khám phá công nghệ<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">đỉnh cao</span>
          </h1>
          <p class="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed max-w-2xl">
            Tuyển chọn những sản phẩm công nghệ tốt nhất với giá ưu đãi. Trải nghiệm mua sắm hiện đại, nhanh chóng và tiện lợi.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="/products" data-link class="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-black/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              Xem sản phẩm
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a href="/sign-up" data-link class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 rounded-2xl hover:bg-indigo-50 transition-colors duration-300">
            <div class="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🚀</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Giao hàng nhanh</h3>
            <p class="text-gray-500 text-sm">Miễn phí giao hàng cho đơn từ 500K. Nhận hàng trong 24h nội thành.</p>
          </div>
          <div class="text-center p-6 rounded-2xl hover:bg-purple-50 transition-colors duration-300">
            <div class="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🔒</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Bảo hành chính hãng</h3>
            <p class="text-gray-500 text-sm">Tất cả sản phẩm đều có bảo hành chính hãng. Đổi trả trong 30 ngày.</p>
          </div>
          <div class="text-center p-6 rounded-2xl hover:bg-pink-50 transition-colors duration-300">
            <div class="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">💎</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Sản phẩm chính hãng</h3>
            <p class="text-gray-500 text-sm">100% hàng chính hãng, nhập khẩu trực tiếp từ nhà sản xuất.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-3">Sản phẩm nổi bật</h2>
          <p class="text-gray-500 max-w-xl mx-auto">Những sản phẩm được yêu thích nhất tại VanillaShop</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${featured
            .map(
              (p) => `
            <a href="/products/${p.id}" data-link class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100">
              <div class="aspect-[4/3] overflow-hidden bg-gray-100">
                <img src="${p.thumbnail}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div class="p-5">
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">${p.name}</h3>
                <p class="text-lg font-bold text-indigo-600">${formatPrice(p.price)}</p>
              </div>
            </a>
          `
            )
            .join("")}
        </div>
        <div class="text-center mt-10">
          <a href="/products" data-link class="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group">
            Xem tất cả sản phẩm
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
        </div>
      </div>
    </section>
  `;

  renderDefaultLayout(content);
}
