import { renderDefaultLayout } from "../layouts/defaultLayout.js";
import products from "../data/products.js";
import { formatPrice } from "../utils/formatPrice.js";

export function renderProductListPage() {
  const content = `
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Tất cả sản phẩm</h1>
          <p class="text-gray-500">Khám phá ${products.length} sản phẩm công nghệ hàng đầu</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          ${products
            .map(
              (p) => `
            <div class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 flex flex-col">
              <a href="/products/${p.id}" data-link class="block">
                <div class="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src="${p.thumbnail}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </div>
              </a>
              <div class="p-5 flex flex-col flex-1">
                <a href="/products/${p.id}" data-link class="block flex-1">
                  <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">${p.name}</h3>
                  <p class="text-sm text-gray-500 mb-3 line-clamp-2">${p.description}</p>
                </a>
                <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span class="text-lg font-bold text-indigo-600">${formatPrice(p.price)}</span>
                  <a href="/products/${p.id}" data-link class="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all">
                    Chi tiết
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Extra content for scroll testing -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Bạn cần tư vấn?</h2>
        <p class="text-gray-500 max-w-xl mx-auto mb-6">Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn lựa chọn sản phẩm phù hợp nhất.</p>
        <div class="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
          📞 Liên hệ ngay: 1900-xxxx
        </div>
      </div>
    </section>
  `;

  renderDefaultLayout(content);
}
