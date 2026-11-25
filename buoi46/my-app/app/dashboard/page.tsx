import { Suspense } from "react";
import LatestInvoices from "../ui/LatestInvoices";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <Suspense fallback={<div className="p-4 text-gray-500">Đang tải hóa đơn...</div>}>
        <LatestInvoices />
      </Suspense>
    </div>
  );
}
