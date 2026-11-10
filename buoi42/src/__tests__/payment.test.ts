import { describe, it, expect } from "vitest";
import { isPaymentRequest, getPaymentValidationErrors } from "../guards/payment.guard";
import { findById } from "../utils/generic.utils";
import {
  PaymentProcessor,
  CodPaymentProcessor,
  BankTransferProcessor,
  EWalletPaymentProcessor,
} from "../processors";
import type { PaymentRequest, PaymentReceipt } from "../types/payment.types";

describe("Phần 2: Type Guard isPaymentRequest", () => {
  it("Xác thực thành công với dữ liệu hợp lệ (COD, BANK_TRANSFER, E_WALLET)", () => {
    const codReq: unknown = { orderId: 1001, amount: 250000, method: "COD" };
    const bankReq: unknown = { orderId: 1002, amount: 500000, method: "BANK_TRANSFER" };
    const walletReq: unknown = { orderId: 1003, amount: 120000, method: "E_WALLET" };

    expect(isPaymentRequest(codReq)).toBe(true);
    expect(isPaymentRequest(bankReq)).toBe(true);
    expect(isPaymentRequest(walletReq)).toBe(true);

    if (isPaymentRequest(codReq)) {
      // TypeScript kiểm tra type narrowing thành công
      const typed: PaymentRequest = codReq;
      expect(typed.orderId).toBe(1001);
      expect(typed.amount).toBe(250000);
      expect(typed.method).toBe("COD");
    }
  });

  it("Từ chối khi orderId không phải số nguyên dương", () => {
    expect(isPaymentRequest({ orderId: 0, amount: 100000, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: -1, amount: 100000, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1.5, amount: 100000, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: "1001", amount: 100000, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: NaN, amount: 100000, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ amount: 100000, method: "COD" })).toBe(false);
  });

  it("Từ chối khi amount không phải số hữu hạn lớn hơn 0", () => {
    expect(isPaymentRequest({ orderId: 1001, amount: 0, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1001, amount: -50000, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1001, amount: Infinity, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1001, amount: NaN, method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1001, amount: "250000", method: "COD" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1001, method: "COD" })).toBe(false);
  });

  it("Từ chối khi method không thuộc PaymentMethod cho phép", () => {
    expect(isPaymentRequest({ orderId: 1001, amount: 250000, method: "CRYPTO" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1001, amount: 250000, method: "CREDIT_CARD" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1001, amount: 250000, method: "" })).toBe(false);
    expect(isPaymentRequest({ orderId: 1001, amount: 250000, method: null })).toBe(false);
  });

  it("Từ chối khi value là null hoặc không phải object", () => {
    expect(isPaymentRequest(null)).toBe(false);
    expect(isPaymentRequest(undefined)).toBe(false);
    expect(isPaymentRequest("string")).toBe(false);
    expect(isPaymentRequest(123)).toBe(false);
    expect(isPaymentRequest(true)).toBe(false);
  });

  it("getPaymentValidationErrors trả về mô tả lỗi chi tiết", () => {
    const errors = getPaymentValidationErrors({
      orderId: -1,
      amount: 0,
      method: "UNKNOWN",
    });
    expect(errors.length).toBe(3);
    expect(errors[0]).toContain("Mã đơn hàng phải là một số nguyên dương");
    expect(errors[1]).toContain("Số tiền phải là số hữu hạn lớn hơn 0");
    expect(errors[2]).toContain("Phương thức thanh toán");
  });
});

describe("Phần 3: Generic findById", () => {
  const sampleReceipts: PaymentReceipt[] = [
    {
      id: 1001,
      orderId: 50,
      amount: 150000,
      method: "COD",
      message: "Test 1",
    },
    {
      id: 1002,
      orderId: 51,
      amount: 300000,
      method: "BANK_TRANSFER",
      message: "Test 2",
    },
  ];

  it("Tìm thấy phần tử khi id tồn tại", () => {
    const found = findById(sampleReceipts, 1001);
    expect(found).toBeDefined();
    expect(found?.id).toBe(1001);
    expect(found?.orderId).toBe(50);
  });

  it("Trả về undefined khi id không tồn tại", () => {
    const notFound = findById(sampleReceipts, 9999);
    expect(notFound).toBeUndefined();
  });

  it("Hoạt động tốt với các kiểu dữ liệu khác có id: number", () => {
    interface User {
      id: number;
      name: string;
    }
    const users: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const user = findById(users, 2);
    expect(user?.name).toBe("Bob");
  });
});

describe("Phần 4: Thiết kế OOP PaymentProcessor", () => {
  it("CodPaymentProcessor khởi tạo và trả về biên nhận COD", () => {
    const processor: PaymentProcessor = new CodPaymentProcessor(1001, 250000);
    expect(processor.getOrderId()).toBe(1001);
    expect(processor.getAmount()).toBe(250000);

    const result = processor.pay();
    expect(result.status).toBe("success");
    if (result.status === "success") {
      expect(result.data.orderId).toBe(1001);
      expect(result.data.amount).toBe(250000);
      expect(result.data.method).toBe("COD");
      expect(result.data.message).toContain("COD");
      expect(typeof result.data.id).toBe("number");
    }
  });

  it("BankTransferProcessor khởi tạo và trả về biên nhận BANK_TRANSFER", () => {
    const processor: PaymentProcessor = new BankTransferProcessor(1002, 500000);
    const result = processor.pay();

    expect(result.status).toBe("success");
    if (result.status === "success") {
      expect(result.data.orderId).toBe(1002);
      expect(result.data.amount).toBe(500000);
      expect(result.data.method).toBe("BANK_TRANSFER");
      expect(result.data.message).toContain("chuyển khoản ngân hàng");
    }
  });

  it("EWalletPaymentProcessor khởi tạo và trả về biên nhận E_WALLET", () => {
    const processor: PaymentProcessor = new EWalletPaymentProcessor(1003, 120000);
    const result = processor.pay();

    expect(result.status).toBe("success");
    if (result.status === "success") {
      expect(result.data.orderId).toBe(1003);
      expect(result.data.amount).toBe(120000);
      expect(result.data.method).toBe("E_WALLET");
      expect(result.data.message).toContain("ví điện tử");
    }
  });

  it("Gọi pay() đa hình thông qua kiểu cha PaymentProcessor", () => {
    const processors: PaymentProcessor[] = [
      new CodPaymentProcessor(1, 10000),
      new BankTransferProcessor(2, 20000),
      new EWalletPaymentProcessor(3, 30000),
    ];

    const results = processors.map((p) => p.pay());
    expect(results.length).toBe(3);
    results.forEach((res) => {
      expect(res.status).toBe("success");
    });
  });
});
