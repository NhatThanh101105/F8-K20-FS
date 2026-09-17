import { renderAuthLayout } from "../layouts/authLayout.js";

export function renderSignUpPage() {
  const content = `
    <h2 class="text-2xl font-bold text-white mb-2 text-center">Tạo tài khoản</h2>
    <p class="text-indigo-200 text-sm text-center mb-8">Đăng ký để trải nghiệm mua sắm tốt nhất</p>

    <form id="signup-form" class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-indigo-100 mb-1.5">Họ và tên</label>
        <input type="text" name="fullname" required placeholder="Nguyễn Văn A"
          class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-indigo-100 mb-1.5">Email</label>
        <input type="email" name="email" required placeholder="email@example.com"
          class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-indigo-100 mb-1.5">Mật khẩu</label>
        <input type="password" name="password" required placeholder="Tối thiểu 6 ký tự"
          class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-indigo-100 mb-1.5">Xác nhận mật khẩu</label>
        <input type="password" name="confirmPassword" required placeholder="Nhập lại mật khẩu"
          class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all" />
      </div>
      <div id="signup-error" class="hidden text-red-300 text-sm bg-red-500/20 p-3 rounded-xl"></div>
      <div id="signup-success" class="hidden text-green-300 text-sm bg-green-500/20 p-3 rounded-xl"></div>
      <button type="submit" class="w-full bg-white text-indigo-600 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg">
        Đăng ký
      </button>
    </form>

    <p class="text-center text-indigo-200 text-sm mt-6">
      Đã có tài khoản?
      <a href="/sign-in" data-link class="text-white font-semibold hover:underline">Đăng nhập</a>
    </p>
  `;

  renderAuthLayout(content);

  // Form handler
  const form = document.getElementById("signup-form");
  const errorEl = document.getElementById("signup-error");
  const successEl = document.getElementById("signup-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.classList.add("hidden");
    successEl.classList.add("hidden");

    const data = new FormData(form);
    const fullname = data.get("fullname").trim();
    const email = data.get("email").trim();
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (!fullname || !email || !password) {
      errorEl.textContent = "Vui lòng điền đầy đủ thông tin.";
      errorEl.classList.remove("hidden");
      return;
    }

    if (password.length < 6) {
      errorEl.textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
      errorEl.classList.remove("hidden");
      return;
    }

    if (password !== confirmPassword) {
      errorEl.textContent = "Mật khẩu xác nhận không khớp.";
      errorEl.classList.remove("hidden");
      return;
    }

    successEl.textContent = `✅ Đăng ký thành công! Chào mừng ${fullname}.`;
    successEl.classList.remove("hidden");
    form.reset();
  });
}
