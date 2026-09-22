import { useShop } from "../context/ShopContext";
import { categories } from "../data/products";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { state, dispatch } = useShop();
  const { products, selectedCategory, searchKeyword } = state;

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    const matchKeyword = product.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  return (
    <div>
      {/* Category Tabs (mobile + desktop) */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              dispatch({ type: "SET_FILTER", payload: { category: cat } })
            }
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategory === cat
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
          Hiển thị <span className="font-semibold text-gray-700">{filteredProducts.length}</span> sản phẩm
          {selectedCategory !== "Tất cả" && (
            <> trong <span className="font-semibold text-emerald-600">{selectedCategory}</span></>
          )}
        </p>
      </div>

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
