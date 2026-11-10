/**
 * Phần 3 — Generic tìm biên nhận theo ID
 * Tìm kiếm một phần tử có trường `id: number` trong danh sách generic
 */
export function findById<T extends { id: number }>(
  items: T[],
  id: number,
): T | undefined {
  return items.find((item) => item.id === id);
}

