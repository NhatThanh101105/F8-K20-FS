import { PaymentProcessor } from "./payment-processor";
import type { PaymentResult } from "../types/payment.types";
import { formatCurrency } from "../utils/format.utils";

export class BankTransferProcessor extends PaymentProcessor {
  public override pay(): PaymentResult {
    const receiptId = this.generateReceiptId();

    return {
      status: "success",
      data: {
        id: receiptId,
        orderId: this.orderId,
        amount: this.amount,
        method: "BANK_TRANSFER",
        message: `Đã xác nhận chuyển khoản ngân hàng thành công cho đơn hàng #${this.orderId} với số tiền ${formatCurrency(this.amount)}.`,
      },
    };
  }
}

