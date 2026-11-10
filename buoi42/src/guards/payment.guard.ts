/**
 * Phần 2 — Kiểm tra dữ liệu bằng type guard
 */
import type { PaymentRequest, PaymentMethod } from "../types/payment.types";

/**
 * Type guard kiểm tra giá trị method có thuộc PaymentMethod hay không
 */
export function isPaymentMethod(value: unknown): value is PaymentMethod {
  return (
    typeof value === "string" &&
    (value === "COD" || value === "BANK_TRANSFER" || value === "E_WALLET")
  );
}

/**
 * Type guard xác thực dữ liệu đầu vào có phải là PaymentRequest hợp lệ hay không.
 * Điều kiện:
 * 1. value là object và không phải null.
 * 2. orderId là số nguyên dương (> 0).
 * 3. amount là số hữu hạn và lớn hơn 0.
 * 4. method là một trong 3 giá trị của PaymentMethod.
 */
export function isPaymentRequest(value: unknown): value is PaymentRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  // Ép kiểu sang Record<string, unknown> một cách an toàn mà không dùng `any`
  const record = value as Record<string, unknown>;

  const hasValidOrderId =
    typeof record.orderId === "number" &&
    Number.isInteger(record.orderId) &&
    record.orderId > 0;

  const hasValidAmount =
    typeof record.amount === "number" &&
    Number.isFinite(record.amount) &&
    record.amount > 0;

  const hasValidMethod = isPaymentMethod(record.method);

  return hasValidOrderId && hasValidAmount && hasValidMethod;
}

/**
 * Hàm phân tích lỗi chi tiết từ dữ liệu unknown để hiển thị thông báo lỗi thân thiện
 */
export function getPaymentValidationErrors(value: unknown): string[] {
  const errors: string[] = [];

  if (typeof value !== "object" || value === null) {
    errors.push("Dữ liệu đầu vào phải là một đối tượng hợp lệ.");
    return errors;
  }

  const record = value as Record<string, unknown>;

  // Kiểm tra orderId
  if (record.orderId === undefined || record.orderId === null || record.orderId === "") {
    errors.push("Mã đơn hàng không được để trống.");
  } else if (
    typeof record.orderId !== "number" ||
    Number.isNaN(record.orderId) ||
    !Number.isInteger(record.orderId) ||
    record.orderId <= 0
  ) {
    errors.push("Mã đơn hàng phải là một số nguyên dương (ví dụ: 1001, 1002...).");
  }

  // Kiểm tra amount
  if (record.amount === undefined || record.amount === null || record.amount === "") {
    errors.push("Số tiền không được để trống.");
  } else if (
    typeof record.amount !== "number" ||
    !Number.isFinite(record.amount) ||
    record.amount <= 0
  ) {
    errors.push("Số tiền phải là số hữu hạn lớn hơn 0 (ví dụ: 250000).");
  }

  // Kiểm tra method
  if (!isPaymentMethod(record.method)) {
    errors.push(
      `Phương thức thanh toán "${String(record.method)}" không hợp lệ. Chỉ chấp nhận: COD, BANK_TRANSFER, hoặc E_WALLET.`
    );
  }

  return errors;
}

