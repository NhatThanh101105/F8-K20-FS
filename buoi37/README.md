# Bài Tập Buổi 37: Quản Lý State Với Zustand & TanStack Query

Ứng dụng thực hành React kết hợp hai công nghệ quản lý state hiện đại:
- **Bài 1:** Quản lý giỏ hàng tạm thời với **Zustand**
- **Bài 2:** Hiển thị danh mục và danh sách sản phẩm với **TanStack Query (useQuery)** và DummyJSON API
- **Styling:** Giao diện tối giản, thanh lịch với **Tailwind CSS v4**

---

## 🛠️ Công Nghệ Sử Dụng

- **React 19**
- **Vite**
- **Zustand 5** (Client state: giỏ hàng tạm thời)
- **TanStack Query v5** (Server state: caching danh mục & sản phẩm)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (Icons)

---

## 📋 Nội Dung Thực Hiện

### Bài 1: Quản lý giỏ hàng tạm thời với Zustand
- Store `useCartStore` lưu danh sách `items`, với các fields: `id`, `title`, `price` (số), `quantity` (số nguyên dương >= 1).
- `addToCart(product)`: Nếu chưa có thì thêm mới với `quantity = 1`; nếu đã có thì tăng số lượng lên 1.
- `updateQuantity(id, quantity)`: Cập nhật số lượng mới, kiểm tra số nguyên dương, vô hiệu hóa nút giảm khi `quantity = 1`.
- `removeFromCart(id)`: Xóa hoàn toàn sản phẩm khỏi giỏ hàng.
- `getTotalPrice()` & Selectors: Tính tổng tiền `price * quantity` và tổng số lượng items để Header và Drawer cập nhật tức thời khi giỏ hàng thay đổi.

### Bài 2: Hiển thị danh mục và sản phẩm với TanStack Query
- Khởi tạo `QueryClient` ổn định, bọc toàn bộ App bằng `QueryClientProvider`.
- Phân biệt rõ Client State (`selectedCategory`) và Server State (kết quả trả về từ DummyJSON).
- Query 1: `['categories']` tải danh sách danh mục từ `https://dummyjson.com/products/category-list`.
- Query 2: `['products', selectedCategory]` tải danh sách sản phẩm theo danh mục đang chọn. Kích hoạt có điều kiện với `enabled: Boolean(selectedCategory)`.
- Xử lý đầy đủ các trạng thái:
  - Chưa chọn danh mục: Hiển thị thông báo *"Vui lòng chọn danh mục"*, không bị kẹt ở trạng thái loading.
  - Đang tải: Hiển thị biểu tượng và thông báo đang tải.
  - Lỗi mạng/API: Kiểm tra `response.ok`, ném `Error` kèm mã HTTP và hiển thị thông báo lỗi. Có nút mô phỏng lỗi API để kiểm tra.
- Khi chuyển đổi danh mục, giỏ hàng (Zustand) vẫn giữ nguyên không bị mất.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy

```bash
# 1. Cài đặt dependencies
npm install

# 2. Khởi chạy dev server
npm run dev

# 3. Build production
npm run build
```
