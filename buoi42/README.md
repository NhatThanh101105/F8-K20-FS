# Bài Tập Buổi 42: Module Xử Lý Thanh Toán Đơn Hàng (TypeScript)

Ứng dụng web TypeScript chạy trên trình duyệt mô phỏng module xử lý thanh toán đơn hàng, áp dụng nghiêm ngặt các khái niệm: **OOP (Encapsulation, Inheritance, Polymorphism)**, **Custom Type Guard**, **Generics**, và **DOM Type Safety**.

---

## 🛠️ Lệnh Cài Đặt

Mở terminal tại thư mục `buoi42` và chạy:

```bash
npm install
```

---

## ▶️ Lệnh Chạy Ứng Dụng & Kiểm Thử

```bash
# 1. Khởi chạy dev server trên trình duyệt (mặc định: http://localhost:5173/)
npm run dev

# 2. Biên dịch Type-check và Build dự án
npm run build

# 3. Chạy toàn bộ bộ test tự động (13 unit tests với Vitest)
npm test
```

---

## 🧩 Cách Các Class Xử Lý Thanh Toán Phối Hợp Với Nhau

Hệ thống thanh toán được thiết kế theo mô hình **hướng đối tượng (OOP)** với tính **đa hình (Polymorphism)** và **đóng gói (Encapsulation)**:

1. **Lớp trừu tượng cha (`PaymentProcessor`)**:
   - Khai báo các trường dữ liệu `protected readonly orderId: number` và `protected readonly amount: number` qua constructor, ngăn ngừa sửa đổi mã đơn hàng và số tiền sau khi khởi tạo.
   - Cung cấp các getter `getOrderId()`, `getAmount()` và hàm sinh mã biên nhận tự tăng `generateReceiptId()`.
   - Định nghĩa phương thức trừu tượng: `public abstract pay(): PaymentResult`.

2. **Ba lớp con chuyên biệt kế thừa `PaymentProcessor`**:
   - `CodPaymentProcessor`: Kế thừa `PaymentProcessor`, ghi đè `pay()` trả về biên nhận có phương thức `"COD"` và thông báo nhắc chuẩn bị tiền mặt khi nhận hàng.
   - `BankTransferProcessor`: Kế thừa `PaymentProcessor`, ghi đè `pay()` trả về biên nhận có phương thức `"BANK_TRANSFER"` và thông báo xác nhận giao dịch chuyển khoản.
   - `EWalletPaymentProcessor`: Kế thừa `PaymentProcessor`, ghi đè `pay()` trả về biên nhận có phương thức `"E_WALLET"` và thông báo trừ tiền từ ví điện tử.

3. **Cơ chế phối hợp tại Controller (`main.ts`)**:
   - **Xác thực Type Guard**: Form nhận dữ liệu dưới dạng `unknown`, kiểm tra bằng `isPaymentRequest(payload)`. Nếu không hợp lệ, ứng dụng báo lỗi và dừng lại ngay.
   - **Đa hình (Polymorphism)**: Khi dữ liệu hợp lệ, dựa vào `paymentRequest.method`, hệ thống khởi tạo instance của class con tương ứng và gán vào biến có kiểu cha:
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

     // Gọi phương thức thanh toán thống nhất thông qua kiểu cha PaymentProcessor:
     const result: PaymentResult = processor.pay();
     ```
   - Nhờ đa hình, tầng điều khiển giao diện không cần biết chi tiết xử lý nội bộ của từng phương thức mà chỉ tương tác qua interface thống nhất của `PaymentProcessor`.

---

## 🔍 Tra Cứu Biên Nhận Bằng Generic (`findById`)

Sau khi thanh toán thành công, biên nhận được lưu vào danh sách phiên làm việc và hiển thị trên giao diện. Người dùng có thể tìm lại bất kỳ biên nhận nào thông qua hàm generic:

```typescript
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}
```

---

## 🧪 Các Kịch Bản Kiểm Thử Có Sẵn Trên Giao Diện

Giao diện tích hợp sẵn thanh **"Kịch bản kiểm thử nhanh (Phần 6)"** để bấm 1-click:
- **Đơn 1001, 250.000₫ (COD)**: Thanh toán thành công, hiển thị biên nhận.
- **Đơn 1002, 500.000₫ (BANK_TRANSFER)**: Thanh toán thành công, hiển thị biên nhận chuyển khoản.
- **Đơn 1003, 120.000₫ (E_WALLET)**: Thanh toán thành công, hiển thị biên nhận ví điện tử.
- **Lỗi mã đơn âm hoặc không nguyên (-10, 1.5)**: Type guard từ chối, hiển thị lỗi.
- **Lỗi số tiền <= 0 (-50.000₫)**: Type guard từ chối, hiển thị lỗi.
- **Lỗi phương thức lạ (CRYPTO_UNKNOWN)**: Type guard từ chối dữ liệu.
- **Tìm biên nhận ID có thật và không tồn tại**: Kiểm tra kết quả hiển thị của `findById`.
