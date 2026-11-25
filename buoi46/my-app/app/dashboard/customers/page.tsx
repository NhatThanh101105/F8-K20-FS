import { fetchCustomers } from "@/app/data";
import { Suspense } from "react";

async function CustomersList() {
  const customers = await fetchCustomers();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden max-w-md">
      <ul className="divide-y divide-gray-200">
        {customers.map((customer, index) => (
          <li
            key={index}
            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-900 font-medium">{customer.name}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              Khách hàng #{index + 1}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Danh sách Khách hàng</h1>
      <Suspense fallback={<div className="p-4 text-gray-500">Đang tải danh sách khách hàng...</div>}>
        <CustomersList />
      </Suspense>
    </div>
  );
}
