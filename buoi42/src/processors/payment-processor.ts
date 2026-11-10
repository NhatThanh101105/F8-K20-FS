/**
 * Phần 4 — Thiết kế các bộ xử lý thanh toán bằng OOP
 * Abstract class PaymentProcessor
 */
import type { PaymentResult } from "../types/payment.types";

export abstract class PaymentProcessor {
  // Đóng gói với protected readonly: không thể sửa đổi orderId và amount sau khi khởi tạo
  protected readonly orderId: number;
  protected readonly amount: number;

  private static receiptCounter: number = 1000;

  constructor(orderId: number, amount: number) {
    this.orderId = orderId;
    this.amount = amount;
  }

  // Getter truy xuất dữ liệu an toàn
  public getOrderId(): number {
    return this.orderId;
  }

  public getAmount(): number {
    return this.amount;
  }

  /**
   * Sinh mã biên nhận duy nhất tự tăng
   */
  protected generateReceiptId(): number {
    PaymentProcessor.receiptCounter += 1;
    return PaymentProcessor.receiptCounter;
  }

  /**
   * Phương thức trừu tượng xử lý thanh toán, trả về PaymentResult
   */
  public abstract pay(): PaymentResult;
}

