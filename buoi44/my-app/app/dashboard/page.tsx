import Link from "next/link";
import { getProductStats } from "@/app/lib/products";

export const instant = false;

export default async function DashboardPage() {
  const stats = await getProductStats();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Tổng quan</h2>
        <p className="mt-1 text-sm text-slate-600">
          Thống kê sản phẩm hiện có từ hệ thống API.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
          <p className="text-sm font-medium text-slate-500">Tổng số sản phẩm</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.total}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
          <p className="text-sm font-medium text-slate-500">Giá trung bình</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.averagePrice.toLocaleString("vi-VN")} đ
          </p>
        </div>
      </div>

      <div>
        <Link
          href="/dashboard/products"
          className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Xem danh sách sản phẩm
        </Link>
      </div>
    </section>
  );
}
