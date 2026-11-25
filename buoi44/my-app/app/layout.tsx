import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "Quản lý sản phẩm",
  description: "Ứng dụng quản lý sản phẩm bằng Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
