import type {
  Product,
  ProductUpdate,
  ProductFieldErrors,
} from "./product-types";
import {
  getProductStatus,
  getProductStatusLabel,
} from "./product-types";
import {
  getAllProducts,
  findProductById,
  updateProduct,
  getProductProperty,
  filterBy,
} from "./product-service";

/**
 * Hàm tiện ích định dạng số tiền sang chuẩn VND
 */
function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Hàm in chi tiết một sản phẩm kèm trạng thái và nhãn tiếng Việt
 */
function printProduct(product: Product): void {
  const status = getProductStatus(product.stock);
  const statusLabel = getProductStatusLabel(status);
  console.log(
    `[#${product.id}] ${product.name} | Danh mục: ${product.category} | Giá: ${formatVND(
      product.price
    )} | Tồn kho: ${product.stock} -> Trạng thái: ${statusLabel} (${status})`
  );
}

console.log("================================================================================");
console.log("               HỆ THỐNG QUẢN LÝ DANH MỤC SẢN PHẨM (TYPESCRIPT)                 ");
console.log("================================================================================\n");

// -----------------------------------------------------------------------------
// Tình huống 1: In toàn bộ sản phẩm và nhãn tồn kho
// -----------------------------------------------------------------------------
console.log("--- 1. DANH SÁCH TOÀN BỘ SẢN PHẨM VÀ NHÃN TỒN KHO ---");
const allProducts = getAllProducts();
allProducts.forEach(printProduct);
console.log();

// -----------------------------------------------------------------------------
// Tình huống 2: Tìm sản phẩm có ID tồn tại và ID không tồn tại
// -----------------------------------------------------------------------------
console.log("--- 2. TÌM KIẾM SẢN PHẨM THEO ID ---");
const existingId = 101;
const foundProduct = findProductById(existingId);
if (foundProduct) {
  console.log(`Tìm thấy sản phẩm ID ${existingId}:`);
  printProduct(foundProduct);

  // Minh họa đọc trường với getProductProperty<K extends keyof Product>
  const prodName = getProductProperty(foundProduct, "name");   // string
  const prodPrice = getProductProperty(foundProduct, "price"); // number
  console.log(`  -> Đọc bằng keyof/indexed access: name = "${prodName}" (string), price = ${prodPrice} (number)`);
} else {
  console.log(`Không tìm thấy sản phẩm có ID ${existingId}`);
}

const nonExistingId = 999;
const notFoundProduct = findProductById(nonExistingId);
if (notFoundProduct) {
  console.log(`Tìm thấy sản phẩm ID ${nonExistingId}:`);
  printProduct(notFoundProduct);
} else {
  console.log(`Kết quả tìm ID ${nonExistingId}: Không tìm thấy sản phẩm (kết quả: undefined)`);
}
console.log();

// -----------------------------------------------------------------------------
// Tình huống 3: Cập nhật riêng giá của một sản phẩm (các trường khác giữ nguyên)
// -----------------------------------------------------------------------------
console.log("--- 3. CẬP NHẬT RIÊNG GIÁ CỦA SẢN PHẨM (ID: 102) ---");
console.log("Trước khi cập nhật:");
const beforeUpdate102 = findProductById(102);
if (beforeUpdate102) printProduct(beforeUpdate102);

const priceUpdate: ProductUpdate = { price: 520000 };
const updated102 = updateProduct(102, priceUpdate);
console.log("Sau khi cập nhật giá thành 520.000 đ (tên, danh mục, tồn kho giữ nguyên):");
if (updated102) {
  printProduct(updated102);
}
console.log();

// -----------------------------------------------------------------------------
// Tình huống 4: Cập nhật tên và số lượng tồn kho cùng lúc
// -----------------------------------------------------------------------------
console.log("--- 4. CẬP NHẬT TÊN VÀ TỒN KHO CÙNG LÚC (ID: 104) ---");
console.log("Trước khi cập nhật:");
const beforeUpdate104 = findProductById(104);
if (beforeUpdate104) printProduct(beforeUpdate104);

const multiUpdate: ProductUpdate = {
  name: "Màn hình 27 inch 4K UltraHD",
  stock: 15,
};
const updated104 = updateProduct(104, multiUpdate);
console.log("Sau khi cập nhật tên và số lượng tồn kho (từ 0 hết hàng -> 15 còn hàng):");
if (updated104) {
  printProduct(updated104);
}
console.log();

// -----------------------------------------------------------------------------
// Tình huống 5: Cập nhật ID không tồn tại
// -----------------------------------------------------------------------------
console.log("--- 5. CẬP NHẬT ID KHÔNG TỒN TẠI (ID: 888) ---");
const invalidUpdateResult = updateProduct(888, { price: 100000 });
if (invalidUpdateResult === undefined) {
  console.log("Cập nhật thất bại: Không tìm thấy sản phẩm có ID 888 (kết quả trả về undefined)");
} else {
  console.log("Cập nhật thành công:", invalidUpdateResult);
}
console.log();

// -----------------------------------------------------------------------------
// Tình huống 6: Lọc sản phẩm theo trường chuỗi (string) và trường số (number)
// -----------------------------------------------------------------------------
console.log("--- 6. LỌC DANH SÁCH BẰNG HÀM GENERIC filterBy<T, K extends keyof T> ---");
const currentProducts = getAllProducts();

console.log("a. Lọc theo trường chuỗi (category = 'accessory'):");
const accessories = filterBy(currentProducts, "category", "accessory");
accessories.forEach(printProduct);

console.log("\nb. Lọc theo trường số (stock = 12):");
const itemsWithStock12 = filterBy(currentProducts, "stock", 12);
itemsWithStock12.forEach(printProduct);

console.log("\nc. Kiểm tra kiểm soát kiểu tĩnh của TypeScript đối với filterBy:");
// Ví dụ hợp lệ:
// filterBy(currentProducts, "category", "computer"); // Hợp lệ vì "computer" là string khớp với Product["category"]
// filterBy(currentProducts, "stock", 0);             // Hợp lệ vì 0 là number khớp với Product["stock"]

// Nếu truyền sai kiểu giá trị so với key, TypeScript compiler sẽ báo lỗi ngay lập tức:
// Minh họa cơ chế type-safe với chỉ thị @ts-expect-error:
// @ts-expect-error TypeScript bắt lỗi: Argument of type 'number' is not assignable to parameter of type 'string'
filterBy(currentProducts, "category", 12345);

// @ts-expect-error TypeScript bắt lỗi: Argument of type 'string' is not assignable to parameter of type 'number'
filterBy(currentProducts, "stock", "ten-items");

// @ts-expect-error TypeScript bắt lỗi: Argument of type '"unknown_key"' is not assignable to parameter of type 'keyof Product'
filterBy(currentProducts, "unknown_key", "value");

console.log("  [Kiểm tra type-safe] filterBy(currentProducts, 'category', 12345) -> Bị TypeScript từ chối tại compile-time vì 12345 không thuộc kiểu string.");
console.log("  [Kiểm tra type-safe] filterBy(currentProducts, 'stock', 'abc')   -> Bị TypeScript từ chối tại compile-time vì 'abc' không thuộc kiểu number.");
console.log();

// -----------------------------------------------------------------------------
// Tình huống 7: Minh họa mapped type ProductFieldErrors
// -----------------------------------------------------------------------------
console.log("--- 7. MINH HỌA MAPPED TYPE ProductFieldErrors ---");
const sampleValidationErrors: ProductFieldErrors = {
  name: "Tên sản phẩm không được để trống",
  price: "Giá sản phẩm phải lớn hơn 0",
};
console.log("Mapped type ProductFieldErrors cho phép lưu trữ lỗi validation linh hoạt cho từng keyof Product:");
console.log(sampleValidationErrors);

console.log("\n================================================================================");
console.log("                         CHƯƠNG TRÌNH KẾT THÚC THÀNH CÔNG                      ");
console.log("================================================================================");
