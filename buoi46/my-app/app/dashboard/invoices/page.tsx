import { fetchFilteredInvoices, fetchTotalPages } from "@/app/data";
import Pagination from "@/app/ui/Pagination";
import Search from "@/app/ui/Search";
import { Suspense } from "react";

async function InvoicesContent({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || "";
  const currentPage = Number(resolvedParams?.page) || 1;

  const [invoices, totalPages] = await Promise.all([
    fetchFilteredInvoices(search, currentPage),
    fetchTotalPages(search),
  ]);

  if (invoices.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg border border-gray-200 shadow-sm text-gray-500 font-medium">
        Không tìm thấy hóa đơn nào
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Khách hàng</th>
              <th className="px-4 py-3 border-b">Số tiền</th>
              <th className="px-4 py-3 border-b">Trạng thái</th>
              <th className="px-4 py-3 border-b">Ngày</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{invoice.id}</td>
                <td className="px-4 py-3 text-gray-800">{invoice.name}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {Number(invoice.amount).toLocaleString("vi-VN")} đ
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(invoice.date).toLocaleDateString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách Hóa đơn</h1>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Suspense fallback={<div>Đang tải ô tìm kiếm...</div>}>
          <Search placeholder="Tìm kiếm theo tên khách hàng..." />
        </Suspense>
      </div>

      <Suspense fallback={<div className="p-4 text-gray-500">Đang tải hóa đơn...</div>}>
        <InvoicesContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
