import { getCartCount } from "../cart.js";

export function renderDefaultLayout(contentHtml) {
  const path = window.location.pathname;
  const cartCount = getCartCount();

  const isActive = (href, exact = false) => {
    if (exact) return path === href;
    return path === href || path.startsWith(href + "/");
  };

  const linkClass = (href, exact = false) => {
    const base =
      "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg";
    const active = "bg-white/20 text-white shadow-lg shadow-white/10";
    const inactive = "text-indigo-100 hover:bg-white/10 hover:text-white";
    return `${base} ${isActive(href, exact) ? active : inactive}`;
  };

  const app = document.getElementById("app");
  app.innerHTML = `
    <header class="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl shadow-indigo-500/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="/" data-link class="flex items-center gap-2 group">
            <div class="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span class="text-xl font-bold text-white tracking-tight">VanillaShop</span>
          </a>
          <nav class="hidden md:flex items-center gap-1">
            <a href="/" data-link class="${linkClass("/", true)}">
              <span>🏠</span> Home
            </a>
            <a href="/products" data-link class="${linkClass("/products")}">
              <span>📦</span> Products
            </a>
            <a href="/cart" data-link class="${linkClass("/cart", true)} flex items-center gap-1">
              <span>🛒</span> Cart
              ${
                cartCount > 0
                  ? `<span class="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center animate-pulse">${cartCount}</span>`
                  : ""
              }
            </a>
            <div class="w-px h-6 bg-white/20 mx-2"></div>
            <a href="/sign-in" data-link class="${linkClass("/sign-in", true)}">
              Sign In
            </a>
            <a href="/sign-up" data-link class="${linkClass(
              "/sign-up",
              true
            )} !bg-white/20 !text-white border border-white/30 hover:!bg-white/30">
              Sign Up
            </a>
          </nav>
          <button id="mobile-menu-btn" class="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-menu" class="hidden md:hidden border-t border-white/10">
        <div class="px-4 py-3 space-y-1">
          <a href="/" data-link class="block ${linkClass("/", true)}">🏠 Home</a>
          <a href="/products" data-link class="block ${linkClass(
            "/products"
          )}">📦 Products</a>
          <a href="/cart" data-link class="block ${linkClass("/cart", true)}">🛒 Cart ${
    cartCount > 0
      ? `<span class="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">${cartCount}</span>`
      : ""
  }</a>
          <a href="/sign-in" data-link class="block ${linkClass(
            "/sign-in",
            true
          )}">Sign In</a>
          <a href="/sign-up" data-link class="block ${linkClass(
            "/sign-up",
            true
          )}">Sign Up</a>
        </div>
      </div>
    </header>
    <main class="min-h-[calc(100vh-64px)]" id="page-content">
      ${contentHtml}
    </main>
    <footer class="bg-gray-900 text-gray-400 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-sm">© 2026 VanillaShop — F8 Buổi 34. Built with ❤️ and JavaScript thuần.</p>
      </div>
    </footer>
  `;

  // Mobile menu toggle
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
}
