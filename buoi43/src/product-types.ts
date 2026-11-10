/**
 * Khai báo kiểu Product mô tả thuộc tính của sản phẩm
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

/**
 * Danh sách trạng thái dùng trong ứng dụng (as const để cố định các giá trị literal)
 */
export const PRODUCT_STATUSES = [
  "in-stock",
  "low-stock",
  "out-of-stock",
] as const;

/**
 * Suy ra ProductStatus từ danh sách PRODUCT_STATUSES bằng typeof và indexed access
 * Kết quả: "in-stock" | "low-stock" | "out-of-stock"
 */
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

/**
 * Kiểu dữ liệu cập nhật sản phẩm, sử dụng Partial<Product>
 * Cho phép cập nhật chỉ một vài trường mà không bắt buộc truyền tất cả
 */
export type ProductUpdate = Partial<Product>;

/**
 * Bảng ánh xạ trạng thái sang nhãn tiếng Việt sử dụng Record<ProductStatus, string>
 */
export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  "in-stock": "Còn hàng",
  "low-stock": "Sắp hết hàng",
  "out-of-stock": "Hết hàng",
};

/**
 * Mapped type duyệt qua keyof Product: mỗi trường có thể chứa thông báo lỗi dạng string hoặc undefined
 */
export type ProductFieldErrors = {
  [K in keyof Product]?: string;
};

/**
 * Xác định trạng thái tồn kho dựa trên số lượng stock:
 * - stock === 0: "out-of-stock" (Hết hàng)
 * - stock từ 1 đến 5: "low-stock" (Sắp hết)
 * - stock > 5: "in-stock" (Còn hàng)
 */
export function getProductStatus(stock: number): ProductStatus {
  if (stock === 0) {
    return "out-of-stock";
  }
  if (stock >= 1 && stock <= 5) {
    return "low-stock";
  }
  return "in-stock";
}

/**
 * Lấy nhãn tiếng Việt tương ứng với trạng thái tồn kho
 */
export function getProductStatusLabel(status: ProductStatus): string {
  return PRODUCT_STATUS_LABELS[status];
}

