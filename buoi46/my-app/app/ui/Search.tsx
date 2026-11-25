"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");

    if (term.trim()) {
      params.set("search", term.trim());
    } else {
      params.delete("search");
    }

    startTransition(() => {
      const queryString = params.toString();
      replace(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  return (
    <div className="relative flex-1 max-w-md">
      <label htmlFor="search" className="sr-only">
        Tìm kiếm
      </label>
      <input
        id="search"
        type="text"
        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        placeholder={placeholder}
        defaultValue={searchParams.get("search")?.toString() || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
