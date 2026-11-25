import { fetchLatestInvoices } from "../data";

export default async function LatestInvoices() {
  const data = await fetchLatestInvoices();

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <caption className="text-left font-semibold text-lg p-4 border-b bg-gray-50 text-gray-800">
          5 hóa đơn mới nhất
        </caption>
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
          {data.map((invoice) => (
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
  );
}
