/**
 * API Service cho Bài 2 (DummyJSON)
 * - Kiểm tra response.ok trước khi parse JSON
 * - Ném Error kèm mã HTTP và mô tả thao tác thất bại khi có lỗi 4xx/5xx
 */

const BASE_URL = 'https://dummyjson.com';

/**
 * Tải danh sách tên danh mục sản phẩm
 * @param {boolean} simulateError - Cờ mô phỏng URL lỗi để kiểm tra theo yêu cầu đề bài
 * @returns {Promise<string[]>}
 */
export async function fetchCategories(simulateError = false) {
  const url = simulateError
    ? `${BASE_URL}/invalid-categories-endpoint-test-404`
    : `${BASE_URL}/products/category-list`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Tải danh mục sản phẩm thất bại (HTTP ${response.status}: ${response.statusText || 'Lỗi mạng hoặc tài nguyên không tồn tại'})`
    );
  }

  const data = await response.json();
  return data;
}

/**
 * Tải danh sách sản phẩm theo danh mục
 * @param {string} categoryName - Tên danh mục (vd: 'smartphones')
 * @param {boolean} simulateError - Cờ mô phỏng URL lỗi
 * @returns {Promise<Array>}
 */
export async function fetchProductsByCategory(categoryName, simulateError = false) {
  if (!categoryName) {
    return [];
  }

  const url = simulateError
    ? `${BASE_URL}/invalid-products-endpoint-test-500`
    : `${BASE_URL}/products/category/${encodeURIComponent(categoryName)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Tải danh sách sản phẩm của danh mục "${categoryName}" thất bại (HTTP ${response.status}: ${response.statusText || 'Lỗi máy chủ'})`
    );
  }

  const data = await response.json();
  // DummyJSON trả về { products: [...], total, skip, limit }
  return data.products || [];
}
