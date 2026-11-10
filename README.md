# F8 K20 Fullstack - Bài Tập Buổi 42

Repo tổng hợp các bài tập khóa học F8 K20 Fullstack.

---

## 📌 Bài Tập Buổi 42: Module Xử Lý Thanh Toán Đơn Hàng (TypeScript)

Thư mục dự án: [`buoi42/`](./buoi42)

Ứng dụng web TypeScript chạy trên trình duyệt được xây dựng với Vite, mô phỏng module xử lý thanh toán đơn hàng theo đúng các yêu cầu:
- **Kiểu dữ liệu thanh toán**: `PaymentMethod`, `PaymentRequest`, `PaymentReceipt`, `PaymentResult` (discriminated union), không sử dụng `any`.
- **Custom Type Guard**: `isPaymentRequest(value: unknown): value is PaymentRequest` kiểm tra an toàn dữ liệu đầu vào trước khi xử lý.
- **Generic**: Hàm `findById<T extends { id: number }>(items: T[], id: number): T | undefined` tra cứu biên nhận.
- **OOP (Đa hình & Đóng gói)**: `PaymentProcessor` (abstract class), `CodPaymentProcessor`, `BankTransferProcessor`, `EWalletPaymentProcessor`.
- **DOM & Type Safety**: Generic querySelector, null checks, event target type guard `instanceof`.

---

## 🛠️ Lệnh Cài Đặt

Chuyển vào thư mục `buoi42` và cài đặt các dependencies:

```bash
cd buoi42
npm install
```

---

## ▶️ Lệnh Chạy Ứng Dụng & Kiểm Thử

```bash
# 1. Chạy môi trường phát triển (Dev Server)
npm run dev

# 2. Biên dịch kiểm tra Type-check và Build dự án
npm run build

# 3. Chạy 13 bài test tự động với Vitest
npm test
```

---

## 🧩 Cách Các Class Xử Lý Thanh Toán Phối Hợp Với Nhau

1. **Lớp cha trừu tượng (`PaymentProcessor`)**:
   - Nhận `orderId` và `amount` qua constructor, đóng gói bằng `protected readonly` để ngăn chặn việc sửa đổi mã đơn hàng và số tiền sau khi khởi tạo.
   - Cung cấp các getter an toàn và hàm sinh mã biên nhận tự tăng `generateReceiptId()`.
   - Khai báo phương thức trừu tượng: `public abstract pay(): PaymentResult`.

2. **Ba lớp con chuyên biệt (`CodPaymentProcessor`, `BankTransferProcessor`, `EWalletPaymentProcessor`)**:
   - Cả 3 lớp đều kế thừa `PaymentProcessor` và ghi đè (`override`) phương thức `pay()`.
   - Mỗi lớp thực hiện logic tạo biên nhận thành công và sinh thông báo đặc thù cho phương thức của mình:
     - `CodPaymentProcessor`: Thông báo chuẩn bị tiền mặt khi nhận hàng (COD).
     - `BankTransferProcessor`: Thông báo xác nhận giao dịch chuyển khoản ngân hàng thành công.
     - `EWalletPaymentProcessor`: Thông báo đã trừ tiền từ ví điện tử thành công.

3. **Cơ chế phối hợp đa hình (Polymorphism) tại Controller (`main.ts`)**:
   - Dữ liệu thu thập từ form được gán kiểu `unknown` và được xác thực qua type guard `isPaymentRequest`.
   - Khi dữ liệu hợp lệ, dựa vào `paymentRequest.method`, hệ thống khởi tạo instance của class con tương ứng và gán vào biến mang kiểu cha:
     ```typescript
     let processor: PaymentProcessor;
     switch (paymentRequest.method) {
       case "COD":
         processor = new CodPaymentProcessor(paymentRequest.orderId, paymentRequest.amount);
         break;
       case "BANK_TRANSFER":
         processor = new BankTransferProcessor(paymentRequest.orderId, paymentRequest.amount);
         break;
       case "E_WALLET":
         processor = new EWalletPaymentProcessor(paymentRequest.orderId, paymentRequest.amount);
         break;
     }

     // Gọi phương thức thanh toán thống nhất qua kiểu cha PaymentProcessor:
     const result: PaymentResult = processor.pay();
     ```
   - Tầng giao diện gọi `processor.pay()` thông qua kiểu cha `PaymentProcessor` mà không cần phụ thuộc vào chi tiết cài đặt của từng class con, đảm bảo tính mở rộng linh hoạt (Open/Closed Principle).
