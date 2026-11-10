# Module Quản Lý Danh Mục Sản Phẩm (TypeScript & Node.js)

Dự án mẫu quản lý danh mục sản phẩm trong bộ nhớ, xây dựng bằng **TypeScript** chạy trên nền tảng **Node.js**, kích hoạt chế độ nghiêm ngặt (`"strict": true`).

---

## 1. Yêu cầu môi trường

- **Node.js**: Phiên bản 18+ (khuyên dùng Node.js 20 hoặc 22 trở lên)
- **npm**: Đi kèm với Node.js

---

## 2. Cách cài đặt

1. Mở terminal tại thư mục gốc của dự án (`buoi43`).
2. Chạy lệnh cài đặt các gói phụ thuộc (dependencies):

```bash
npm install
```

---

## 3. Cách chạy chương trình

Dự án hỗ trợ các câu lệnh thực thi sau trong `package.json`:

### Chạy trực tiếp (Môi trường phát triển - Development)
Sử dụng `tsx` để chạy trực tiếp mã nguồn TypeScript không cần build trước:
```bash
npm run dev
```

### Kiểm tra kiểu tĩnh (Typecheck)
Kiểm tra tính hợp lệ về kiểu dữ liệu theo chuẩn `strict: true` mà không xuất file:
```bash
npm run typecheck
```

### Biên dịch sang JavaScript (Build)
Biên dịch toàn bộ mã nguồn trong thư mục `src/` sang `dist/`:
```bash
npm run build
```

### Chạy mã đã biên dịch (Production)
Chạy mã JavaScript đã được biên dịch trong thư mục `dist/`:
```bash
npm start
```

---

## 4. Cấu trúc thư mục và chức năng của từng file chính

```text
.
├── src/
│   ├── product-types.ts    # Khai báo kiểu, suy luận kiểu, Record và Mapped Types
│   ├── product-service.ts  # Dữ liệu sản phẩm mẫu và các hàm xử lý nghiệp vụ
│   └── main.ts             # Điểm khởi chạy (entry point) kiểm thử các tình huống
├── dist/                   # Mã JavaScript sau khi biên dịch (tự sinh khi build)
├── package.json            # Cấu hình dự án, scripts và devDependencies
├── tsconfig.json           # Cấu hình TypeScript compiler (bật strict: true)
├── .gitignore              # Bỏ qua node_modules, dist khỏi Git
└── README.md               # Tài liệu hướng dẫn cài đặt, chạy và giải thích chức năng
```

### Chức năng chi tiết của từng file:

### `tsconfig.json`
- Kích hoạt `"strict": true` để áp dụng toàn bộ các quy tắc kiểm tra kiểu nghiêm ngặt nhất của TypeScript (`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`,...).
- Cấu hình `"target": "ES2022"`, `"module": "CommonJS"`, `"rootDir": "./src"`, `"outDir": "./dist"`.

### `src/product-types.ts`
- **`Product`**: Định nghĩa cấu trúc sản phẩm gồm `id`, `name`, `price`, `category`, `stock`.
- **`PRODUCT_STATUSES`**: Mảng hằng số chứa các trạng thái `["in-stock", "low-stock", "out-of-stock"] as const`.
- **`ProductStatus`**: Kiểu suy ra tự động từ `PRODUCT_STATUSES` bằng cú pháp `(typeof PRODUCT_STATUSES)[number]`, giúp đồng bộ giá trị thực tế và kiểu TypeScript mà không cần định nghĩa lại union riêng.
- **`ProductUpdate`**: Kiểu cập nhật một phần dữ liệu dùng `Partial<Product>`.
- **`PRODUCT_STATUS_LABELS`**: Bảng ánh xạ nhãn tiếng Việt sử dụng utility type `Record<ProductStatus, string>`.
- **`ProductFieldErrors`**: Mapped type duyệt qua `keyof Product` (`[K in keyof Product]?: string;`) dùng để lưu trữ thông báo lỗi validation cho từng trường.
- **`getProductStatus(stock)` & `getProductStatusLabel(status)`**: Hàm xác định trạng thái tồn kho (hết hàng: `stock === 0`, sắp hết: `1 <= stock <= 5`, còn hàng: `stock > 5`) và lấy nhãn tiếng Việt tương ứng.

### `src/product-service.ts`
- **`products`**: Mảng dữ liệu mẫu gồm 5 sản phẩm được gán kiểu `Product[]`.
- **`getAllProducts()`**: Trả về danh sách toàn bộ sản phẩm (dưới dạng bản sao để bảo toàn immutability).
- **`findProductById(id)`**: Tìm sản phẩm theo mã định danh `id`, trả về `Product` hoặc `undefined`.
- **`updateProduct(id, update)`**: Cập nhật chỉ những trường được cung cấp trong `update: ProductUpdate` mà không làm thay đổi trực tiếp đối tượng từ bên ngoài. Trả về `Product` đã cập nhật hoặc `undefined` nếu không tìm thấy ID.
- **`getProductProperty(product, key)`**: Hàm đọc trường dữ liệu với ràng buộc `K extends keyof Product` và kiểu trả về phụ thuộc tương ứng `Product[K]`.
- **`filterBy<T, K extends keyof T>(items: T[], key: K, value: T[K]): T[]`**: Hàm generic lọc danh sách theo một trường bất kỳ. Ép kiểu chặt chẽ giữa `key` và `value` mà không dùng `any` hay ép kiểu `as`.

### `src/main.ts`
- Sử dụng cú pháp `import type` cho các kiểu dữ liệu (`Product`, `ProductUpdate`, `ProductFieldErrors`).
- Thực hiện đầy đủ 7 kịch bản kiểm thử:
  1. In danh sách sản phẩm kèm trạng thái tồn kho và nhãn tiếng Việt.
  2. Tìm kiếm sản phẩm tồn tại và không tồn tại theo ID; minh họa đọc trường bằng `getProductProperty`.
  3. Cập nhật riêng lẻ một trường (giá sản phẩm), các trường còn lại giữ nguyên.
  4. Cập nhật đồng thời nhiều trường (tên và tồn kho).
  5. Cập nhật ID không tồn tại và xử lý kết quả `undefined`.
  6. Lọc sản phẩm theo trường chuỗi (`category`) và trường số (`stock`); minh họa việc TypeScript compiler từ chối các giá trị không tương thích với key tại thời điểm biên dịch.
  7. Minh họa lưu trữ lỗi validation bằng mapped type `ProductFieldErrors`.

