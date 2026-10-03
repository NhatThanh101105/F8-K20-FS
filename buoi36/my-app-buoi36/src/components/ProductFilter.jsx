import { useState, useMemo } from "react";

// Khởi tạo sẵn 1.000 sản phẩm mẫu
const PRODUCTS = Array.from({ length: 1000 }, (_, index) => {
  const categories = ["Điện thoại", "Laptop", "Thời trang", "Gia dụng", "Sách"];

  return {
    id: index + 1,
    name: `Sản phẩm ${index + 1}`,
    category: categories[index % categories.length],
    price: (index % 50) * 20 + 100, // Giá từ 100 đến 1080 (k)
    rating: (index % 5) + 1, // Rating từ 1 đến 5 sao
  };
});

const CATEGORIES = ["Tất cả", "Điện thoại", "Laptop", "Thời trang", "Gia dụng", "Sách"];
const SORT_OPTIONS = ["Mặc định", "Giá tăng dần", "Giá giảm dần"];

const CATEGORY_EMOJI = {
  "Điện thoại": "📱",
  "Laptop": "💻",
  "Thời trang": "👕",
  "Gia dụng": "🏠",
  "Sách": "📚",
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-[1px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductFilter() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [sortType, setSortType] = useState("Mặc định");

  const filteredProducts = useMemo(() => {
    console.log("ĐANG LỌC VÀ SẮP XẾP LẠI DANH SÁCH...");

    let result = PRODUCTS;

    // Lọc theo tên
    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(keyword));
    }

    // Lọc theo danh mục
    if (category !== "Tất cả") {
      result = result.filter((p) => p.category === category);
    }

    // Sắp xếp theo giá (tạo bản sao để không thay đổi PRODUCTS)
    if (sortType === "Giá tăng dần") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortType === "Giá giảm dần") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sortType]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header — giống ShopApp buổi 35 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-[#ee4d2d] rounded-lg flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <span className="text-xl font-bold text-gray-800">
              Filter<span className="text-[#ee4d2d]">Shop</span>
            </span>
          </div>

          {/* Search Input — giống SearchBar buổi 35 */}
          <div className="flex-1 max-w-xl flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Bạn tìm sản phẩm gì?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#ee4d2d] focus:ring-1 focus:ring-[#ee4d2d] transition-colors bg-white"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Sort Dropdown — giống category dropdown buổi 35 */}
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="hidden sm:block px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white focus:outline-none focus:border-[#ee4d2d] cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Count badge — thay cho Giỏ hàng */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCount(count + 1)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline text-gray-600 text-sm font-medium">Re-render</span>
              {count > 0 && (
                <span className="absolute -top-1 left-5 w-5 h-5 flex items-center justify-center bg-[#ee4d2d] text-white text-[10px] font-bold rounded-full">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main — giống buổi 35 */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                category === cat
                  ? "bg-[#ee4d2d] text-white border-[#ee4d2d]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-500 text-sm">
            Tìm thấy{" "}
            <span className="font-semibold text-gray-700">{filteredProducts.length}</span>
            {" "}/{" "}{PRODUCTS.length} sản phẩm
            {category !== "Tất cả" && (
              <> trong <span className="font-semibold text-emerald-600">{category}</span></>
            )}
          </p>
          {/* Re-render info */}
          <p className="text-gray-400 text-xs">
            Count: <span className="font-bold text-[#ee4d2d]">{count}</span>
            <span className="text-gray-300 mx-1">·</span>
            <span className="italic">Tăng count không chạy lại useMemo</span>
          </p>
        </div>

        {/* Product Grid — giống buổi 35 */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="text-5xl mb-3">😕</div>
            <p className="text-gray-500 text-lg font-medium">
              Không tìm thấy sản phẩm
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Thử thay đổi từ khóa hoặc danh mục
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[520px] overflow-y-auto pb-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#ee4d2d]/40 transition-all duration-300 group"
              >
                {/* Thumbnail */}
                <div className="h-32 w-full bg-gray-50 flex items-center justify-center p-3">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {CATEGORY_EMOJI[product.category]}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-gray-800 text-sm font-medium line-clamp-2 mt-0.5 mb-1 min-h-[40px] leading-tight group-hover:text-[#ee4d2d] transition-colors">
                    {product.name}
                  </h3>

                  <StarRating rating={product.rating} />

                  <span className="text-red-500 font-bold text-base mt-2 block">
                    {product.price.toLocaleString()}
                    <span className="text-xs align-top underline">đ</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
