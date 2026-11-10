import { PaymentProcessor } from "./payment-processor";
import type { PaymentResult } from "../types/payment.types";
import { formatCurrency } from "../utils/format.utils";

export class EWalletPaymentProcessor extends PaymentProcessor {
  public override pay(): PaymentResult {
    const receiptId = this.generateReceiptId();

    return {
      status: "success",
      data: {
        id: receiptId,
        orderId: this.orderId,
        amount: this.amount,
        method: "E_WALLET",
        message: `Giao dịch ví điện tử thành công cho đơn hàng #${this.orderId}. Đã trừ số tiền ${formatCurrency(this.amount)} từ ví.`,
      },
    };
  }
}

