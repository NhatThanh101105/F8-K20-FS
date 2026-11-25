import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-slate-900">
            Quản lý sản phẩm
          </h1>
          <nav className="flex gap-5 text-sm font-medium text-slate-600">
            <Link className="hover:text-blue-700" href="/">
              Trang chủ
            </Link>
            <Link className="hover:text-blue-700" href="/dashboard">
              Tổng quan
            </Link>
            <Link className="hover:text-blue-700" href="/dashboard/products">
              Danh sách sản phẩm
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-6 py-8">{children}</main>
    </>
  );
}
