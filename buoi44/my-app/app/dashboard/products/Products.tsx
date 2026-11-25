import Link from "next/link";
import type { ProductPage } from "@/app/lib/products";

type ProductsProps = {
  result: ProductPage;
  query: string;
};

export default function Products({ result, query }: ProductsProps) {
  function hrefFor(targetPage: number) {
    const params = new URLSearchParams();
    if (query) {
      params.set("query", query);
    }
    params.set("page", String(targetPage));
    return `/dashboard/products?${params.toString()}`;
  }

  return (
    <div className="space-y-4">
      {result.items.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
          {query
            ? `Không tìm thấy sản phẩm phù hợp với từ khóa "${query}".`
            : "Chưa có sản phẩm nào trong danh sách."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">
                  ID
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Tên sản phẩm
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Giá
                </th>
              </tr>
            </thead>
            <tbody>
              {result.items.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="border-t border-slate-200 px-4 py-3 text-slate-600">
                    {product.id}
                  </td>
                  <td className="border-t border-slate-200 px-4 py-3">
                    <Link
                      className="font-medium text-blue-700 hover:underline"
                      href={`/dashboard/products/${product.id}`}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="border-t border-slate-200 px-4 py-3 text-slate-900">
                    {product.price.toLocaleString("vi-VN")} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Có {result.total} sản phẩm. Trang {result.currentPage}/
          {result.totalPages}
        </p>

        <nav
          className="flex gap-3 font-medium"
          aria-label="Phân trang sản phẩm"
        >
          {result.currentPage > 1 && (
            <Link
              href={hrefFor(result.currentPage - 1)}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-100"
            >
              Trang trước
            </Link>
          )}
          {result.currentPage < result.totalPages && (
            <Link
              href={hrefFor(result.currentPage + 1)}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-100"
            >
              Trang sau
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
