import { useShop } from "../context/ShopContext";

export default function ProductItem({ product }) {
  const { dispatch } = useShop();

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(product.price);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#ee4d2d]/40 transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="h-44 w-full bg-gray-50 flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-3 border-t border-gray-100">
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="text-gray-800 text-sm font-medium line-clamp-2 mt-0.5 mb-1 min-h-[40px] leading-tight group-hover:text-[#ee4d2d] transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs line-clamp-1 mb-3">
          {product.description}
        </p>
        <span className="text-red-500 font-bold text-base">
          {formattedPrice}
          <span className="text-xs align-top">₫</span>
        </span>
        <button
          onClick={() =>
            dispatch({ type: "ADD_TO_CART", payload: product })
          }
          className="w-full mt-3 py-2 bg-[#ee4d2d] text-white text-sm font-medium rounded-lg hover:bg-[#d73211] active:scale-[0.98] transition-all cursor-pointer"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
