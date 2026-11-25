import Link from "next/link";
import { getProducts } from "@/app/lib/products";
import Products from "./Products";

export const instant = false;

type ProductsPageProps = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.query ?? "").trim();
  const parsedPage = Number.parseInt(resolvedSearchParams.page ?? "1", 10);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const result = await getProducts(query, page);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Danh sách sản phẩm
        </h2>
        <form
          action="/dashboard/products"
          method="get"
          className="flex flex-wrap items-center gap-2"
        >
          <input
            key={query}
            type="search"
            name="query"
            defaultValue={query}
            placeholder="Tìm theo tên sản phẩm..."
            aria-label="Tìm theo tên sản phẩm"
            className="w-60 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Tìm kiếm
          </button>
          {query && (
            <Link
              href="/dashboard/products"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Xóa lọc
            </Link>
          )}
        </form>
      </div>

      <Products result={result} query={query} />
    </section>
  );
}
