import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center gap-6 px-6 py-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src="/img1.png"
          alt="Minh họa quản lý sản phẩm"
          width={140}
          height={140}
          className="rounded-xl border border-slate-200 bg-white object-cover p-2"
          priority
        />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Quản lý sản phẩm
          </h1>
          <p className="mt-2 max-w-xl text-slate-600">
            Ứng dụng quản lý sản phẩm xây dựng bằng Next.js App Router, kết nối
            trực tiếp với REST API trên server.
          </p>
          <Link
            className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            href="/dashboard"
          >
            Vào trang quản lý
          </Link>
        </div>
      </div>
    </main>
  );
}
