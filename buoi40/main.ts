// ===== Types =====
type CartItem = {
  readonly productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

type Cart = {
  cartId: string;
  currency: "VND";
  items: readonly CartItem[];
  couponCode?: string;
};

// ===== Cart operations =====
function addItem(cart: Cart, item: CartItem): Cart {
  if (item.productId.trim() === "") {
    throw new Error("productId không được để trống");
  }
  if (item.name.trim() === "") {
    throw new Error("name không được để trống");
  }
  if (!Number.isFinite(item.unitPrice) || item.unitPrice < 0) {
    throw new Error("unitPrice phải là số không âm");
  }
  if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
    throw new Error("quantity phải là số nguyên lớn hơn 0");
  }

  const index = cart.items.findIndex((i) => i.productId === item.productId);

  if (index === -1) {
    return { ...cart, items: [...cart.items, { ...item }] };
  }

  const existing = cart.items[index];
  const updated: CartItem = {
    ...existing, // giữ nguyên name và unitPrice của dòng đã có
    quantity: existing.quantity + item.quantity,
  };
  const newItems: CartItem[] = cart.items.map((i, idx) =>
    idx === index ? updated : i
  );
  return { ...cart, items: newItems };
}

function subtotal(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}

function discount(cart: Cart): number {
  if (cart.couponCode === "SALE10") {
    return Math.round(subtotal(cart) * 0.1);
  }
  return 0;
}

function shippingFee(amountAfterDiscount: number): number {
  return amountAfterDiscount >= 500_000 ? 0 : 30_000;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value) + "₫";
}

function priceRange(cart: Cart): [number, number] {
  if (cart.items.length === 0) {
    throw new Error("Giỏ hàng rỗng, không thể tính khoảng giá");
  }
  let min = cart.items[0].unitPrice;
  let max = cart.items[0].unitPrice;
  for (const i of cart.items) {
    if (i.unitPrice < min) min = i.unitPrice;
    if (i.unitPrice > max) max = i.unitPrice;
  }
  return [min, max];
}

async function validateCoupon(code: string): Promise<boolean> {
  // Giả lập gọi API
  await new Promise<void>((resolve) => setTimeout(resolve, 100));
  return code.trim() === "SALE10";
}

function renderInvoice(cart: Cart): string {
  const sub = subtotal(cart);
  const disc = discount(cart);
  const amountAfterDiscount = sub - disc;
  const ship = shippingFee(amountAfterDiscount);
  const total = amountAfterDiscount + ship;

  const lines: string[] = [`HÓA ĐƠN - Giỏ hàng ${cart.cartId}`, "-".repeat(40)];

  for (const i of cart.items) {
    lines.push(
      `${i.name} | SL: ${i.quantity} | Đơn giá: ${formatMoney(i.unitPrice)} | Thành tiền: ${formatMoney(i.unitPrice * i.quantity)}`
    );
  }

  lines.push("-".repeat(40));
  lines.push(`Tạm tính: ${formatMoney(sub)}`);
  lines.push(`Giảm giá: ${formatMoney(disc)}`);
  lines.push(`Phí ship: ${formatMoney(ship)}`);
  lines.push(`Tổng phải trả: ${formatMoney(total)}`);

  return lines.join("\n");
}

// ===== Demo =====
const emptyCart: Cart = {
  cartId: "CART-001",
  currency: "VND",
  items: [],
  couponCode: "SALE10",
};

const cart1 = addItem(emptyCart, {
  productId: "AO-001",
  name: "Áo thun basic",
  unitPrice: 150_000,
  quantity: 2,
});

const cart2 = addItem(cart1, {
  productId: "AO-002",
  name: "Áo sơ mi trắng",
  unitPrice: 320_000,
  quantity: 1,
});

console.log(renderInvoice(cart2));
console.log("Tạm tính:", formatMoney(subtotal(cart2)));
console.log("Khoảng giá:", priceRange(cart2));

validateCoupon(" SALE10 ").then((ok) => console.log("SALE10 hợp lệ?", ok));