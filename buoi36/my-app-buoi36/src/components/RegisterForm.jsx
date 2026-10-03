import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .email({ message: "Email không đúng định dạng" }),
    password: z
      .string()
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Vui lòng nhập lại mật khẩu" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

const onSubmit = async (data) => {
  // Giả lập chờ 2 giây gửi API
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("Đăng ký thành công!");
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header — giống buổi 35 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="w-9 h-9 bg-[#ee4d2d] rounded-lg flex items-center justify-center text-white font-bold text-lg">
            R
          </div>
          <span className="text-xl font-bold text-gray-800">
            Register<span className="text-[#ee4d2d]">Form</span>
          </span>
        </div>
      </header>

      {/* Main — căn giữa */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-[#ee4d2d] px-6 py-5 text-center">
              <h2 className="text-white text-xl font-bold">Đăng Ký Tài Khoản</h2>
              <p className="text-white/70 text-sm mt-1">React Hook Form + Zod validation</p>
            </div>

            {/* Form Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className={`w-full pl-4 pr-4 py-2.5 border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.email
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:border-[#ee4d2d] focus:ring-[#ee4d2d]"
                    }`}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }} className="text-xs mt-1.5">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu</label>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Tối thiểu 8 ký tự"
                    className={`w-full pl-4 pr-4 py-2.5 border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:border-[#ee4d2d] focus:ring-[#ee4d2d]"
                    }`}
                  />
                  {errors.password && (
                    <p style={{ color: "red" }} className="text-xs mt-1.5">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Nhập lại mật khẩu"
                    className={`w-full pl-4 pr-4 py-2.5 border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:border-[#ee4d2d] focus:ring-[#ee4d2d]"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p style={{ color: "red" }} className="text-xs mt-1.5">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 text-white text-sm font-medium rounded-lg transition-all cursor-pointer ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#ee4d2d] hover:bg-[#d73211] active:scale-[0.98]"
                  }`}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
