import { PaymentProcessor } from "./payment-processor";
import type { PaymentResult } from "../types/payment.types";
import { formatCurrency } from "../utils/format.utils";

export class CodPaymentProcessor extends PaymentProcessor {
  public override pay(): PaymentResult {
    const receiptId = this.generateReceiptId();

    return {
      status: "success",
      data: {
        id: receiptId,
        orderId: this.orderId,
        amount: this.amount,
        method: "COD",
        message: `Đơn hàng #${this.orderId} được xác nhận thanh toán COD. Quý khách vui lòng thanh toán ${formatCurrency(this.amount)} khi nhận hàng.`,
      },
    };
  }
}

