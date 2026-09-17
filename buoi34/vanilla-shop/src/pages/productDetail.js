import { renderDefaultLayout } from "../layouts/defaultLayout.js";
import { renderNotFoundPage } from "./notFound.js";
import products from "../data/products.js";
import { formatPrice } from "../utils/formatPrice.js";
import { addToCart } from "../cart.js";
import { navigateTo } from "../router.js";

export function renderProductDetailPage(params) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    renderNotFoundPage();
    return;
  }

  const otherProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const content = `
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <a href="/" data-link class="hover:text-indigo-600 transition-colors">Home</a>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
          <a href="/products" data-link class="hover:text-indigo-600 transition-colors">Products</a>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
          <span class="text-gray-900 font-medium line-clamp-1">${product.name}</span>
        </nav>

        <!-- Product Detail -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div class="aspect-square lg:aspect-auto bg-gray-100 p-8 flex items-center justify-center">
              <img src="${product.thumbnail}" alt="${product.name}" class="max-w-full max-h-[500px] object-contain rounded-2xl" />
            </div>
            <div class="p-8 lg:p-12 flex flex-col justify-center">
              <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                Còn hàng
              </div>
              <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">${product.name}</h1>
              <p class="text-gray-600 leading-relaxed mb-6">${product.description}</p>
              <div class="flex items-baseline gap-3 mb-8">
                <span class="text-3xl font-extrabold text-indigo-600">${formatPrice(product.price)}</span>
              </div>
              <div class="flex flex-wrap gap-3">
                <button id="add-to-cart-btn" class="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
                  Thêm vào giỏ hàng
                </button>
              </div>
              <div id="add-success-msg" class="hidden mt-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium text-center">
                ✅ Đã thêm vào giỏ hàng!
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        ${
          otherProducts.length > 0
            ? `
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${otherProducts
              .map(
                (p) => `
              <a href="/products/${p.id}" data-link class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100">
                <div class="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src="${p.thumbnail}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </div>
                <div class="p-4">
                  <h3 class="font-semibold text-gray-900 mb-1 text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors">${p.name}</h3>
                  <p class="text-base font-bold text-indigo-600">${formatPrice(p.price)}</p>
                </div>
              </a>
            `
              )
              .join("")}
          </div>
        </div>
        `
            : ""
        }
      </div>
    </section>
  `;

  renderDefaultLayout(content);

  // Attach add-to-cart handler
  const btn = document.getElementById("add-to-cart-btn");
  const msg = document.getElementById("add-success-msg");
  if (btn) {
    btn.addEventListener("click", () => {
      addToCart(product);
      msg.classList.remove("hidden");
      btn.innerHTML = `
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        Đã thêm!
      `;
      btn.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
      btn.classList.add("bg-green-600", "hover:bg-green-700");
      setTimeout(() => {
        msg.classList.add("hidden");
        btn.innerHTML = `
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
          Thêm vào giỏ hàng
        `;
        btn.classList.remove("bg-green-600", "hover:bg-green-700");
        btn.classList.add("bg-indigo-600", "hover:bg-indigo-700");
      }, 2000);
    });
  }
}
