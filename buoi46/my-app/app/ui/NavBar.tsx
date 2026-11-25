"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Invoices", href: "/dashboard/invoices" },
  { name: "Customers", href: "/dashboard/customers" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 border-b bg-white px-6 py-3 shadow-sm">
      <span className="font-bold text-lg text-blue-600 mr-4">Dashboard</span>
      <div className="flex gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
