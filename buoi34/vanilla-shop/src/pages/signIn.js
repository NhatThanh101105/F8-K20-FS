import { renderAuthLayout } from "../layouts/authLayout.js";

export function renderSignInPage() {
  const content = `
    <h2 class="text-2xl font-bold text-white mb-2 text-center">Đăng nhập</h2>
    <p class="text-indigo-200 text-sm text-center mb-8">Chào mừng bạn quay trở lại!</p>

    <form id="signin-form" class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-indigo-100 mb-1.5">Email</label>
        <input type="email" name="email" required placeholder="email@example.com"
          class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-indigo-100 mb-1.5">Mật khẩu</label>
        <input type="password" name="password" required placeholder="Nhập mật khẩu"
          class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all" />
      </div>
      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="w-4 h-4 rounded border-white/30 bg-white/10 text-indigo-600 focus:ring-white/50" />
          <span class="text-sm text-indigo-200">Ghi nhớ đăng nhập</span>
        </label>
        <a href="#" class="text-sm text-white/70 hover:text-white transition-colors">Quên mật khẩu?</a>
      </div>
      <div id="signin-error" class="hidden text-red-300 text-sm bg-red-500/20 p-3 rounded-xl"></div>
      <div id="signin-success" class="hidden text-green-300 text-sm bg-green-500/20 p-3 rounded-xl"></div>
      <button type="submit" class="w-full bg-white text-indigo-600 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg">
        Đăng nhập
      </button>
    </form>

    <div class="mt-6 pt-6 border-t border-white/10">
      <button class="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
        <svg class="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Đăng nhập với Google
      </button>
    </div>

    <p class="text-center text-indigo-200 text-sm mt-6">
      Chưa có tài khoản?
      <a href="/sign-up" data-link class="text-white font-semibold hover:underline">Đăng ký ngay</a>
    </p>
  `;

  renderAuthLayout(content);

  // Form handler
  const form = document.getElementById("signin-form");
  const errorEl = document.getElementById("signin-error");
  const successEl = document.getElementById("signin-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.classList.add("hidden");
    successEl.classList.add("hidden");

    const data = new FormData(form);
    const email = data.get("email").trim();
    const password = data.get("password");

    if (!email || !password) {
      errorEl.textContent = "Vui lòng điền đầy đủ thông tin.";
      errorEl.classList.remove("hidden");
      return;
    }

    if (password.length < 6) {
      errorEl.textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
      errorEl.classList.remove("hidden");
      return;
    }

    successEl.textContent = "✅ Đăng nhập thành công!";
    successEl.classList.remove("hidden");
    form.reset();
  });
}
