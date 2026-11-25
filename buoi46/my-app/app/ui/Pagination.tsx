"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber > 1) {
      params.set("page", pageNumber.toString());
    } else {
      params.delete("page");
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  if (totalPages <= 1) {
    return null;
  }

  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
          currentPage <= 1
            ? "pointer-events-none text-gray-400 border-gray-200 bg-gray-50"
            : "text-gray-700 border-gray-300 bg-white hover:bg-gray-100"
        }`}
        aria-disabled={currentPage <= 1}
      >
        &laquo; Trước
      </Link>

      {allPages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`min-w-9 text-center px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
              isCurrent
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "text-gray-700 border-gray-300 bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? "pointer-events-none text-gray-400 border-gray-200 bg-gray-50"
            : "text-gray-700 border-gray-300 bg-white hover:bg-gray-100"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Sau &raquo;
      </Link>
    </div>
  );
}
