export function renderAuthLayout(contentHtml) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
      <div class="p-6">
        <a href="/" data-link class="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
          <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="text-sm font-medium">Về trang chủ</span>
        </a>
      </div>
      <div class="flex-1 flex items-center justify-center px-4 pb-12">
        <div class="w-full max-w-md">
          <div class="text-center mb-8">
            <a href="/" data-link class="inline-flex items-center gap-2 group">
              <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span class="text-2xl font-bold text-white">VanillaShop</span>
            </a>
          </div>
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-black/20 border border-white/20">
            ${contentHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}
