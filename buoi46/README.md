# Bài tập Buổi 46 - F8 Next.js & Neon Postgres

Dự án Next.js kết nối trực tiếp với cơ sở dữ liệu Neon Postgres, thực hiện các tính năng:
- Hiển thị 5 hóa đơn mới nhất trên trang Dashboard.
- Danh sách khách hàng sắp xếp theo thứ tự ID.
- Quản lý hóa đơn với tìm kiếm theo tên khách hàng (không phân biệt hoa thường với `ILIKE`) và phân trang đồng bộ với tham số URL.

---

## 1. Cài đặt

1. Di chuyển vào thư mục dự án `my-app`:
   ```bash
   cd my-app
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   pnpm install
   ```

---

## 2. Cấu hình Cơ sở dữ liệu Neon Postgres

1. Tạo một database mới trên [Neon Console](https://console.neon.tech/) hoặc thông qua Vercel Storage.
2. Mở **SQL Editor** trên Neon Console và chạy toàn bộ nội dung file [`db.sql`](./db.sql).
3. Lấy chuỗi kết nối (Connection String) từ Neon.
4. Tạo file `.env.local` ở thư mục gốc của dự án (`my-app/.env.local`) và thêm biến `DATABASE_URL` (không có tiền tố `NEXT_PUBLIC_`):
   ```env
   DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
   ```
   *(Lưu ý: File `.env.local` chứa thông tin nhạy cảm đã được cấu hình trong `.gitignore` để không bị đưa lên GitHub).*

---

## 3. Khởi chạy ứng dụng

Chạy máy chủ phát triển (Development Server):
```bash
pnpm dev
```

Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

---

## 4. Các URL kiểm tra tính năng

- **Trang chủ (`/`)**: [http://localhost:3000/](http://localhost:3000/)  
  *Giới thiệu ngắn, hiển thị ảnh bằng `next/image` và sử dụng font Inter.*
- **Trang Dashboard (`/dashboard`)**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)  
  *Hiển thị 5 hóa đơn mới nhất từ Neon (với dữ liệu mẫu có các ID: 12, 11, 10, 9, 8).*
- **Trang Khách hàng (`/dashboard/customers`)**: [http://localhost:3000/dashboard/customers](http://localhost:3000/dashboard/customers)  
  *Hiển thị 4 khách hàng theo thứ tự ID: Minh, Hoa, Phúc, Lan.*
- **Trang Hóa đơn mặc định (`/dashboard/invoices`)**: [http://localhost:3000/dashboard/invoices](http://localhost:3000/dashboard/invoices)  
  *Trang 1 có 5 hóa đơn (ID 12, 11, 10, 9, 8) và thanh phân trang tổng cộng 3 trang.*
- **Tìm kiếm theo tên khách hàng**:
  - [http://localhost:3000/dashboard/invoices?search=Minh](http://localhost:3000/dashboard/invoices?search=Minh) (có 2 trang).
  - [http://localhost:3000/dashboard/invoices?search=Minh&page=2](http://localhost:3000/dashboard/invoices?search=Minh&page=2) (trang 2 chỉ có hóa đơn ID 1).
  - [http://localhost:3000/dashboard/invoices?search=abc](http://localhost:3000/dashboard/invoices?search=abc) (hiển thị thông báo *"Không tìm thấy hóa đơn nào"*).
