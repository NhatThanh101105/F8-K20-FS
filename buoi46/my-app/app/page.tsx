import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-8 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Chào mừng đến với hệ thống Quản lý Hóa đơn
      </h1>

      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors"
      >
        Truy cập Dashboard &rarr;
      </Link>
    </main>
  );
}
