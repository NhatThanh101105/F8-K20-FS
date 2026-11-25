import Link from "next/link";
import { getProductById } from "@/app/lib/products";

export const instant = false;

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const isPositiveInt = /^\d+$/.test(id);
  const productId = isPositiveInt ? Number(id) : NaN;

  const product =
    Number.isInteger(productId) && productId > 0
      ? await getProductById(productId)
      : null;

  if (!product) {
    return (
      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-sm text-slate-600">
          Sản phẩm bạn yêu cầu không tồn tại hoặc mã sản phẩm không hợp lệ.
        </p>
        <Link
          href="/dashboard/products"
          className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Quay về danh sách
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
        <p className="text-sm font-medium text-slate-500">
          Mã sản phẩm: #{product.id}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          {product.name}
        </h2>
        <p className="mt-4 text-lg font-semibold text-blue-700">
          Giá: {product.price.toLocaleString("vi-VN")} đ
        </p>
      </div>

      <div>
        <Link
          href="/dashboard/products"
          className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Quay về danh sách
        </Link>
      </div>
    </section>
  );
}
