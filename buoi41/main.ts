// ==========================================
// PHẦN 1 — THIẾT KẾ KIỂU DỮ LIỆU
// ==========================================

// Bài 1.1. BaseEntity
export interface BaseEntity {
  id: number;
}

// Bài 1.2. Product — Sản phẩm
export interface Product extends BaseEntity {
  name: string;
  price: number;
  stock: number;
  category: string;
}

// Bài 1.3. User — Người dùng
export interface User extends BaseEntity {
  fullName: string;
  email: string;
  phone?: string;
}

// Bài 1.4. OrderItem — Chi tiết đơn hàng
export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

// Bài 1.5. ShippingInfo — Thông tin giao hàng
export interface ShippingInfo {
  receiverName: string;
  receiverPhone: string;
  address: string;
}

// Bài 1.6. PaymentMethod — Phương thức thanh toán
export type PaymentMethod = "COD" | "BANK_TRANSFER" | "E_WALLET";

// Bài 1.7. OrderStatus — Trạng thái đơn hàng
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipping"
  | "completed"
  | "cancelled";

// ==========================================
// PHẦN 2 — BỔ SUNG METADATA CHO ĐƠN HÀNG
// ==========================================

// Bài 2.1. Khai báo OrderMetadata bằng Declaration Merging
export interface OrderMetadata {
  note?: string;
}

export interface OrderMetadata {
  couponCode?: string;
}

// Bài 1.8 & 2.2. Order — Đơn hàng (kế thừa BaseEntity và ShippingInfo, tích hợp metadata)
export interface Order extends BaseEntity, ShippingInfo {
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  metadata?: OrderMetadata;
}

// ==========================================
// PHẦN 3 — XỬ LÝ TRẠNG THÁI ĐƠN HÀNG
// ==========================================

export function getOrderStatusMessage(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "Đơn hàng đang chờ xác nhận";
    case "confirmed":
      return "Đơn hàng đã được xác nhận";
    case "shipping":
      return "Đơn hàng đang được giao";
    case "completed":
      return "Đơn hàng đã giao thành công";
    case "cancelled":
      return "Đơn hàng đã bị hủy";
    default: {
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
    }
  }
}

// ==========================================
// PHẦN 4 — XỬ LÝ KẾT QUẢ API
// ==========================================

// Bài 4.1. Khai báo OrderResult (Discriminated Union)
export type OrderResult =
  | {
      status: "success";
      data: Order;
    }
  | {
      status: "error";
      message: string;
    };

// Bài 4.2. Viết hàm handleOrderResult
export function handleOrderResult(result: OrderResult): void {
  if (result.status === "success") {
    console.log("Tạo đơn hàng thành công!");
    console.log(`Mã đơn hàng: ${result.data.id}`);
    console.log(`Tổng tiền: ${result.data.totalAmount}`);
  } else {
    console.log(`Tạo đơn hàng thất bại: ${result.message}`);
  }
}

// ==========================================
// PHẦN 5 — MỞ RỘNG KIỂU DỮ LIỆU BẰNG INTERSECTION TYPE
// ==========================================

export interface AuditInfo {
  createdBy: number;
  updatedAt: Date;
}

export type ManagedProduct = Product & AuditInfo;

// ==========================================
// PHẦN 6 — XỬ LÝ DỮ LIỆU CÓ THỂ THIẾU
// ==========================================

// Bài 6.1. Tìm sản phẩm theo ID
export function findProductById(
  products: Product[],
  id: number
): Product | undefined {
  return products.find((product) => product.id === id);
}

// Bài 6.2. Lấy tên sản phẩm
export function getProductName(product: Product | undefined): string {
  if (!product) {
    return "Sản phẩm không tồn tại";
  }
  return product.name;
}

// Bài 6.3. Định dạng số điện thoại
export function formatPhone(phone: string | null | undefined): string {
  if (phone === null || phone === undefined) {
    return "Chưa cập nhật";
  }
  const trimmedPhone = phone.trim();
  if (trimmedPhone === "") {
    return "Chưa cập nhật";
  }
  return trimmedPhone;
}

// ==========================================
// PHẦN 7 — XÂY DỰNG CHỨC NĂNG TẠO ĐƠN HÀNG
// ==========================================

// Bài 7.3. Bộ đếm sinh mã đơn hàng
let currentOrderId = 1000;
export function generateOrderId(): number {
  currentOrderId += 1;
  return currentOrderId;
}

// Bài 7.1 & 7.2. Hàm createOrder và các quy tắc nghiệp vụ
export function createOrder(
  user: User | undefined,
  products: Product[],
  cart: {
    productId: number;
    quantity: number;
  }[],
  shippingInfo: ShippingInfo,
  paymentMethod: PaymentMethod,
  metadata?: OrderMetadata
): OrderResult {
  // 1. Kiểm tra người dùng
  if (!user) {
    return {
      status: "error",
      message: "Người dùng không tồn tại.",
    };
  }

  // 2. Kiểm tra giỏ hàng
  if (!cart || cart.length === 0) {
    return {
      status: "error",
      message: "Giỏ hàng không được để trống.",
    };
  }

  // 6. Xử lý sản phẩm trùng nhau trong giỏ hàng
  const seenProductIds = new Set<number>();
  for (const item of cart) {
    if (seenProductIds.has(item.productId)) {
      return {
        status: "error",
        message: `Sản phẩm với ID ${item.productId} bị trùng lặp trong giỏ hàng.`,
      };
    }
    seenProductIds.add(item.productId);
  }

  // Duyệt qua giỏ hàng và kiểm tra từng sản phẩm
  const orderItems: OrderItem[] = [];
  let totalAmount = 0;

  for (const item of cart) {
    // 4. Kiểm tra số lượng mua
    if (
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      return {
        status: "error",
        message: `Số lượng mua của sản phẩm có ID ${item.productId} không hợp lệ (phải là số nguyên dương).`,
      };
    }

    // 3. Kiểm tra sản phẩm trong giỏ hàng
    const product = findProductById(products, item.productId);
    if (!product) {
      return {
        status: "error",
        message: `Sản phẩm có ID ${item.productId} không tồn tại trong danh sách sản phẩm.`,
      };
    }

    // 7. Kiểm tra dữ liệu sản phẩm
    if (
      typeof product.price !== "number" ||
      !Number.isFinite(product.price) ||
      product.price < 0
    ) {
      return {
        status: "error",
        message: `Giá của sản phẩm "${product.name}" không hợp lệ (phải là số hữu hạn không âm).`,
      };
    }

    if (
      typeof product.stock !== "number" ||
      !Number.isInteger(product.stock) ||
      product.stock < 0
    ) {
      return {
        status: "error",
        message: `Tồn kho của sản phẩm "${product.name}" không hợp lệ (phải là số nguyên không âm).`,
      };
    }

    // 5. Kiểm tra tồn kho
    if (item.quantity > product.stock) {
      return {
        status: "error",
        message: `Số lượng mua của sản phẩm "${product.name}" vượt quá số lượng tồn kho hiện tại (${product.stock}).`,
      };
    }

    // 9. Tính tổng tiền & 10. Tạo OrderItem
    totalAmount += product.price * item.quantity;
    orderItems.push({
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      unitPrice: product.price,
    });
  }

  // 8. Kiểm tra thông tin giao hàng
  if (!shippingInfo.receiverName || shippingInfo.receiverName.trim() === "") {
    return {
      status: "error",
      message: "Tên người nhận không được để trống.",
    };
  }

  if (!shippingInfo.receiverPhone || shippingInfo.receiverPhone.trim() === "") {
    return {
      status: "error",
      message: "Số điện thoại người nhận không được để trống.",
    };
  }

  if (!shippingInfo.address || shippingInfo.address.trim() === "") {
    return {
      status: "error",
      message: "Địa chỉ giao hàng không được để trống.",
    };
  }

  // 11. Tạo đơn hàng
  const order: Order = {
    id: generateOrderId(),
    userId: user.id,
    items: orderItems,
    totalAmount,
    status: "pending",
    paymentMethod,
    createdAt: new Date(),
    receiverName: shippingInfo.receiverName.trim(),
    receiverPhone: shippingInfo.receiverPhone.trim(),
    address: shippingInfo.address.trim(),
  };

  // Gán metadata nếu được truyền vào
  if (metadata !== undefined) {
    order.metadata = metadata;
  }

  // 12. Trả về kết quả
  return {
    status: "success",
    data: order,
  };
}

// ==========================================
// PHẦN 8 — DỮ LIỆU MẪU VÀ KIỂM THỬ
// ==========================================

// Bài 8.1. Khai báo dữ liệu mẫu
const users: User[] = [
  {
    id: 1,
    fullName: "Nguyen Van An",
    email: "an@example.com",
    phone: "0901234567",
  },
];

const products: Product[] = [
  {
    id: 101,
    name: "Laptop",
    price: 15000000,
    stock: 5,
    category: "computer",
  },
  {
    id: 102,
    name: "Wireless Mouse",
    price: 350000,
    stock: 10,
    category: "accessory",
  },
];

const cart = [
  { productId: 101, quantity: 1 },
  { productId: 102, quantity: 2 },
];

const shippingInfo: ShippingInfo = {
  receiverName: "Nguyen Van B",
  receiverPhone: "0912345678",
  address: "Ha Noi",
};

const paymentMethod: PaymentMethod = "COD";

const metadata: OrderMetadata = {
  note: "Giao hàng vào buổi sáng",
  couponCode: "WELCOME10",
};

// Bài 8.2. Gọi hàm createOrder
// Xử lý an toàn khi truy cập users[0] theo chuẩn TypeScript strict
const currentUser = users[0];

const result = createOrder(
  currentUser,
  products,
  cart,
  shippingInfo,
  paymentMethod,
  metadata
);

// Xử lý và in kết quả theo hàm handleOrderResult
console.log("=== BÀI 8.2: KẾT QUẢ GỌI createOrder ===");
handleOrderResult(result);

// In chi tiết đối tượng kết quả để kiểm tra các trường mong đợi ở Bài 8.3
console.log("\n=== BÀI 8.3: CHI TIẾT ĐỐI TƯỢNG ĐƠN HÀNG ĐƯỢC TẠO ===");
console.dir(result, { depth: null });

// ==========================================
// KIỂM THỬ MỞ RỘNG CÁC PHẦN KHÁC (DEMO TEST CASES)
// ==========================================
console.log("\n=== KIỂM THỬ PHẦN 3: getOrderStatusMessage ===");
const statuses: OrderStatus[] = ["pending", "confirmed", "shipping", "completed", "cancelled"];
for (const s of statuses) {
  console.log(`- Trạng thái "${s}": ${getOrderStatusMessage(s)}`);
}

console.log("\n=== KIỂM THỬ PHẦN 6: formatPhone & getProductName ===");
console.log(`- formatPhone(null): "${formatPhone(null)}"`);
console.log(`- formatPhone(undefined): "${formatPhone(undefined)}"`);
console.log(`- formatPhone("   "): "${formatPhone("   ")}"`);
console.log(`- formatPhone(" 0987654321 "): "${formatPhone(" 0987654321 ")}"`);
console.log(`- getProductName(products[0]): "${getProductName(products[0])}"`);
console.log(`- getProductName(findProductById(products, 999)): "${getProductName(findProductById(products, 999))}"`);

console.log("\n=== KIỂM THỬ CÁC TRƯỜNG HỢP LỖI CỦA createOrder ===");

// 1. Giỏ hàng rỗng
console.log("1. Test giỏ hàng rỗng:");
handleOrderResult(createOrder(currentUser, products, [], shippingInfo, paymentMethod));

// 2. Người dùng không tồn tại
console.log("\n2. Test người dùng undefined:");
handleOrderResult(createOrder(undefined, products, cart, shippingInfo, paymentMethod));

// 3. Sản phẩm trùng lặp trong giỏ hàng
console.log("\n3. Test sản phẩm trùng lặp trong cart:");
handleOrderResult(
  createOrder(
    currentUser,
    products,
    [
      { productId: 101, quantity: 1 },
      { productId: 101, quantity: 2 },
    ],
    shippingInfo,
    paymentMethod
  )
);

// 4. Mua vượt quá tồn kho (Laptop chỉ còn 5 chiếc)
console.log("\n4. Test mua vượt quá tồn kho:");
handleOrderResult(
  createOrder(
    currentUser,
    products,
    [{ productId: 101, quantity: 10 }],
    shippingInfo,
    paymentMethod
  )
);

// 5. Thông tin người nhận không hợp lệ
console.log("\n5. Test tên người nhận để trống:");
handleOrderResult(
  createOrder(
    currentUser,
    products,
    cart,
    { ...shippingInfo, receiverName: "   " },
    paymentMethod
  )
);

