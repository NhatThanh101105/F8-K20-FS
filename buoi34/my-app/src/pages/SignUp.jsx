import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    const fullname = formData.get("fullname")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!fullname || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setSuccess(`✅ Đăng ký thành công! Chào mừng ${fullname}.`);
    e.target.reset();
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        Tạo tài khoản
      </h2>
      <p className="text-indigo-200 text-sm text-center mb-8">
        Đăng ký để trải nghiệm mua sắm tốt nhất
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-indigo-100 mb-1.5">
            Họ và tên
          </label>
          <input
            type="text"
            name="fullname"
            required
            placeholder="Nguyễn Văn A"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          />
        </div>
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
            placeholder="Tối thiểu 6 ký tự"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-100 mb-1.5">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Nhập lại mật khẩu"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          />
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
          Đăng ký
        </button>
      </form>

      <p className="text-center text-indigo-200 text-sm mt-6">
        Đã có tài khoản?{" "}
        <Link
          to="/sign-in"
          className="text-white font-semibold hover:underline"
        >
          Đăng nhập
        </Link>
      </p>
    </>
  );
}
