import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    const email = formData.get("email")?.trim();
    const password = formData.get("password");

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setSuccess("✅ Đăng nhập thành công!");
    e.target.reset();
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        Đăng nhập
      </h2>
      <p className="text-indigo-200 text-sm text-center mb-8">
        Chào mừng bạn quay trở lại!
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-indigo-100 mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-100 mb-1.5">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="Nhập mật khẩu"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/30 bg-white/10 text-indigo-600 focus:ring-white/50"
            />
            <span className="text-sm text-indigo-200">Ghi nhớ đăng nhập</span>
          </label>
          <a
            href="#"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Quên mật khẩu?
          </a>
        </div>

        {error && (
          <div className="text-red-300 text-sm bg-red-500/20 p-3 rounded-xl">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-300 text-sm bg-green-500/20 p-3 rounded-xl">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-white text-indigo-600 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
        >
          Đăng nhập
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-white/10">
        <button className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Đăng nhập với Google
        </button>
      </div>

      <p className="text-center text-indigo-200 text-sm mt-6">
        Chưa có tài khoản?{" "}
        <Link
          to="/sign-up"
          className="text-white font-semibold hover:underline"
        >
          Đăng ký ngay
        </Link>
      </p>
    </>
  );
}
