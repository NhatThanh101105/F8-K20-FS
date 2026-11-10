/**
 * Phần 1 — Kiểu dữ liệu thanh toán
 */

// Union của 3 phương thức thanh toán được hỗ trợ
export type PaymentMethod = "COD" | "BANK_TRANSFER" | "E_WALLET";

// Yêu cầu thanh toán đầu vào
export interface PaymentRequest {
  orderId: number;
  amount: number;
  method: PaymentMethod;
}

// Biên nhận thanh toán sau khi xử lý thành công
export interface PaymentReceipt {
  id: number;
  orderId: number;
  amount: number;
  method: PaymentMethod;
  message: string;
}

// Discriminated union cho kết quả thanh toán
export type PaymentResult =
  | {
      status: "success";
      data: PaymentReceipt;
    }
  | {
      status: "error";
      message: string;
    };

