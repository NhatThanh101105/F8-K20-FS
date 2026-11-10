/**
 * Format số tiền sang định dạng tiền tệ VNĐ (ví dụ: 250.000 ₫)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Hiển thị nhãn thân thiện cho phương thức thanh toán
 */
export function formatMethodLabel(method: string): string {
  switch (method) {
    case "COD":
      return "Thanh toán khi nhận hàng (COD)";
    case "BANK_TRANSFER":
      return "Chuyển khoản ngân hàng";
    case "E_WALLET":
      return "Ví điện tử (MoMo / ZaloPay)";
    default:
      return method;
  }
}

