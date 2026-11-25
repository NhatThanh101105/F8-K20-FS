# Day 44: Next.js App Router — xây dựng trang quản lý sản phẩm

## 1. Getting Started — tạo dự án mới

Cần Node.js 20.9 trở lên.

```bash
node -v
pnpm create next-app@latest product-dashboard --yes
cd product-dashboard
pnpm dev
```

Lệnh dùng các lựa chọn mặc định của Next.js, gồm TypeScript, ESLint, Tailwind CSS, App Router, không dùng `src/` và import alias `@/*`. Mở `http://localhost:3000`. Xóa nội dung mẫu của `app/page.tsx` và viết lại từ đầu.

```bash
pnpm dev    # server phát triển
pnpm build  # kiểm tra TypeScript và tạo bản production
pnpm start  # chạy bản production sau khi build
```

> Thực tế: Next.js vẫn dùng React. Khác biệt lớn là route theo thư mục và Server Component mặc định trong App Router.

## 2. Styling với Tailwind CSS

Dự án được tạo với Tailwind CSS. Giữ `app/globals.css` và phần import CSS trong `app/layout.tsx` như scaffold sinh ra; Next.js hiện dùng Tailwind CSS v4 nên file này thường có dòng `@import "tailwindcss";`. Viết giao diện bằng utility classes trực tiếp trong `className`, không cần tạo CSS riêng cho từng thành phần.

Ví dụ, các lớp `mx-auto`, `max-w-5xl`, `rounded-lg`, `border` và `p-6` lần lượt căn giữa nội dung, giới hạn chiều rộng, bo góc, thêm viền và khoảng đệm:

```tsx
<main className="mx-auto mt-8 max-w-5xl p-6">
  <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
</main>
```

Chỉ thêm CSS tùy chỉnh vào `app/globals.css` khi cần quy tắc dùng chung mà utility classes không phù hợp. Routing, lấy dữ liệu và Server Actions vẫn độc lập với cách viết CSS.

## 3. Optimizing Fonts and Images — Google Font và ảnh sản phẩm

Dùng `next/font/google` để tải Google Font khi build, tự lưu font cùng ứng dụng và áp dụng trên toàn site. Font không cần tải trực tiếp từ Google mỗi lần khách mở trang. Ví dụ dùng Inter hỗ trợ chữ Latin và tiếng Việt:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});
```

Trong `app/layout.tsx`, đặt `className={inter.className}` trên thẻ `<html>`. Inter là variable font nên không cần khai báo từng `weight`. Nếu build không truy cập được Google Fonts, dùng font local với `next/font/local`.

Nếu có ảnh sản phẩm, đặt `product.png` trong `public/` và dùng `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/product.png"
  alt="Ảnh minh họa sản phẩm"
  width={120}
  height={120}
/>;
```

`public/product.png` được truy cập bằng URL `/product.png`. `width` và `height` giúp giữ chỗ trước khi ảnh tải. Ảnh là tùy chọn; nếu chưa có ảnh, bỏ đoạn `<Image />` để dự án vẫn chạy.

## 4. Creating Layouts and Pages — route theo thư mục

Trong App Router, thư mục tạo URL segment; file `page.tsx` làm segment đó thành trang. Root layout là bắt buộc và chứa `<html>`, `<body>`.

| File                                     | URL                          |
| ---------------------------------------- | ---------------------------- |
| `app/page.tsx`                           | `/`                          |
| `app/dashboard/page.tsx`                 | `/dashboard`                 |
| `app/dashboard/products/page.tsx`        | `/dashboard/products`        |
| `app/dashboard/products/[id]/page.tsx`   | `/dashboard/products/1`      |
| `app/dashboard/products/create/page.tsx` | `/dashboard/products/create` |

`app/layout.tsx`:

```tsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.className}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
```

`app/page.tsx`:

```tsx
import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Trang chủ</h1>
      <p className="mt-3 text-slate-600">
        Ứng dụng quản lý sản phẩm viết bằng Next.js.
      </p>
      <Link
        className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        href="/dashboard"
      >
        Vào trang quản lý
      </Link>
    </main>
  );
}
```

`app/dashboard/layout.tsx` bọc mọi trang dưới `/dashboard`:

```tsx
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold">Quản lý sản phẩm</h1>
          <nav className="flex gap-5 text-sm font-medium text-slate-600">
            <Link className="hover:text-blue-700" href="/">
              Trang chủ
            </Link>
            <Link className="hover:text-blue-700" href="/dashboard">
              Tổng quan
            </Link>
            <Link className="hover:text-blue-700" href="/dashboard/products">
              Sản phẩm
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </>
  );
}
```

`children` trong layout tương tự vị trí `<Outlet />` từng học ở React Router. Layout con không viết lại `<html>` và `<body>`.

## 5. Navigating Between Pages — `Link`

Dùng `Link` từ `next/link` cho đường dẫn nội bộ:

```tsx
import Link from "next/link";

<Link href="/dashboard/products">Xem sản phẩm</Link>;
```

| React Router            | Next.js                              |
| ----------------------- | ------------------------------------ |
| `<Link to="/products">` | `<Link href="/dashboard/products">`  |
| `useNavigate()`         | `useRouter()` trong Client Component |
| `<Outlet />`            | `{children}` trong `layout.tsx`      |

`Link` cho phép điều hướng phía client và có thể prefetch. Với hành động bình thường của người dùng, dùng `Link`; khi cần chuyển trang bằng code trong Client Component, dùng `useRouter()` từ `next/navigation`.

> Thực tế: Link là thẻ điều hướng có ngữ nghĩa; người dùng có thể mở tab mới, sao chép URL và dùng bàn phím.

## 6. Kết nối REST API — đọc và ghi sản phẩm

Dùng Express API trong thư mục `api/` của tài liệu buổi học. API chạy ở cổng `3001`; Next.js tiếp tục dùng cổng mặc định `3000`.

| Method   | Endpoint                             | Chức năng                          |
| -------- | ------------------------------------ | ---------------------------------- |
| `GET`    | `/products?query=&page=1&pageSize=5` | Tìm kiếm và phân trang danh sách   |
| `GET`    | `/products/stats`                    | Tổng số sản phẩm và giá trung bình |
| `GET`    | `/products/:id`                      | Lấy chi tiết một sản phẩm          |
| `POST`   | `/products`                          | Thêm sản phẩm; API tự tạo `id`     |
| `PATCH`  | `/products/:id`                      | Cập nhật tên hoặc giá              |
| `DELETE` | `/products/:id`                      | Xóa sản phẩm                       |

Mở terminal thứ nhất và chạy API:

```bash
cd "/Users/vuquocdung/my-folder/1.work/2.teach-class/1.class-resource/k20/day43/api"
pnpm install
pnpm dev
```

Trong terminal thứ hai, chạy Next.js như bình thường:

```bash
cd product-dashboard
pnpm dev
```

Mở `http://localhost:3000`. API demo lưu dữ liệu trong bộ nhớ; khi dừng API, danh sách quay về dữ liệu mẫu. API có kiểm tra đầu vào cơ bản và trả mã `400`/`404`, nhưng chưa có database hay xác thực người dùng.

Tạo `app/lib/products.ts` làm lớp gọi API từ Server Components và Server Actions. `cache: "no-store"` yêu cầu lấy dữ liệu mới mỗi lần gọi. Tìm kiếm và phân trang được gửi đến API thay vì tải toàn bộ danh sách về Next.js.

```ts
// app/lib/products.ts
const API_URL = process.env.API_URL ?? "http://localhost:3001";

type ApiError = Error & { status?: number };

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type ProductInput = Omit<Product, "id">;
export type ProductPage = {
  items: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
};
export type ProductStats = { total: number; averagePrice: number };

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = new Error(
      `API lỗi: ${response.status} ${response.statusText}`,
    ) as ApiError;
    error.status = response.status;
    throw error;
  }
  return response.json() as Promise<T>;
}

export function getProducts(
  query = "",
  page = 1,
  pageSize = 5,
): Promise<ProductPage> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    pageSize: String(pageSize),
  });
  return apiRequest<ProductPage>(`/products?${params}`);
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    return await apiRequest<Product>(`/products/${id}`);
  } catch (error) {
    if ((error as ApiError).status === 404) return null;
    throw error;
  }
}

export function getProductStats(): Promise<ProductStats> {
  return apiRequest<ProductStats>("/products/stats");
}

export function createProduct(input: ProductInput): Promise<Product> {
  return apiRequest<Product>("/products", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateProduct(
  id: number,
  input: ProductInput,
): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteProduct(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
}
```

Tất cả request chạy ở server Next.js nên không cần cấu hình CORS cho bài tập này. Khi triển khai, đặt `API_URL` trỏ đến địa chỉ API thật; không hard-code địa chỉ localhost trong môi trường production.

## 7. Fetching Data — lấy dữ liệu trong Server Component

`app/dashboard/page.tsx` phiên bản đầu tiên:

```tsx
import { getProductStats } from "@/app/lib/products";

export default async function Page() {
  const stats = await getProductStats();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Tổng quan</h2>
      <p>Số sản phẩm: {stats.total}</p>
      <p>Giá trung bình: {stats.averagePrice.toLocaleString("vi-VN")} đ</p>
    </section>
  );
}
```

Server Component có thể là hàm `async` và chờ dữ liệu API trước khi tạo UI. `cache: "no-store"` trong lớp gọi API yêu cầu Next.js lấy dữ liệu mới thay vì dùng Data Cache.

> Thực tế: Nếu một trang cần nhiều nguồn dữ liệu độc lập, bắt đầu các Promise cùng lúc rồi dùng `Promise.all` để tránh chờ tuần tự không cần thiết.
