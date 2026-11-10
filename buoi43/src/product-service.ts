import type { Product, ProductUpdate } from "./product-types";

/**
 * Danh sách sản phẩm mẫu lưu trong bộ nhớ
 */
const products: Product[] = [
  {
    id: 101,
    name: "Laptop Air",
    price: 24990000,
    category: "computer",
    stock: 8,
  },
  {
    id: 102,
    name: "Chuột không dây",
    price: 450000,
    category: "accessory",
    stock: 4,
  },
  {
    id: 103,
    name: "Bàn phím cơ",
    price: 1290000,
    category: "accessory",
    stock: 12,
  },
  {
    id: 104,
    name: "Màn hình 27 inch",
    price: 5990000,
    category: "computer",
    stock: 0,
  },
  {
    id: 105,
    name: "Tai nghe Bluetooth",
    price: 1890000,
    category: "audio",
    stock: 5,
  },
];

/**
 * Lấy toàn bộ danh sách sản phẩm (trả về bản sao để tránh đột biến bên ngoài)
 */
export function getAllProducts(): Product[] {
  return products.map((item) => ({ ...item }));
}

/**
 * Tìm sản phẩm theo id. Trả về sản phẩm tìm thấy hoặc undefined.
 */
export function findProductById(id: number): Product | undefined {
  const found = products.find((item) => item.id === id);
  return found ? { ...found } : undefined;
}

/**
 * Cập nhật một phần thông tin sản phẩm.
 * - Không sửa trực tiếp object cập nhật từ bên ngoài.
 * - Chỉ cập nhật các trường được cung cấp trong update.
 * - Trả về sản phẩm đã cập nhật hoặc undefined nếu không tìm thấy ID.
 */
export function updateProduct(
  id: number,
  update: ProductUpdate
): Product | undefined {
  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    return undefined;
  }

  const current = products[index];

  // Tạo đối tượng mới chỉ cập nhật những trường được truyền vào
  const updatedProduct: Product = {
    ...current,
    ...update,
    id: current.id, // Đảm bảo ID nguyên bản không bị ghi đè ngoài ý muốn
  };

  products[index] = updatedProduct;
  return { ...updatedProduct };
}

/**
 * Đọc giá trị của một thuộc tính trong Product.
 * - Dùng `keyof Product` để ràng buộc key K phải là thuộc tính hợp lệ của Product.
 * - Dùng indexed access `Product[K]` làm kiểu trả về tương ứng chính xác với kiểu của thuộc tính đó.
 */
export function getProductProperty<K extends keyof Product>(
  product: Product,
  key: K
): Product[K] {
  return product[key];
}

/**
 * Hàm generic lọc mảng phần tử theo một thuộc tính và giá trị tương ứng.
 * - T: Kiểu phần tử của mảng
 * - K extends keyof T: Thuộc tính phải thuộc kiểu T
 * - value: T[K]: Kiểu của value bắt buộc phải khớp với kiểu của T[K]
 * Không dùng `any` hay ép kiểu bằng `as`.
 */
export function filterBy<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T[] {
  return items.filter((item) => item[key] === value);
}

