import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductPrice from "../components/ProductPrice";
import { formatPrice } from "../utils/formatPrice";

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Giỏ hàng của bạn
          </h1>
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-500 mb-8">
              Hãy thêm sản phẩm yêu thích vào giỏ hàng của bạn
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
            >
              Khám phá sản phẩm
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Giỏ hàng của bạn
        </h1>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link to={`/products/${item.id}`} className="shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${item.id}`}
                  className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>
                <ProductPrice
                  price={item.price}
                  className="block mt-1"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600 font-medium"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold min-w-[40px] text-center bg-gray-50">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600 font-medium"
                  >
                    +
                  </button>
                </div>
                <span className="font-bold text-gray-900 min-w-[120px] text-right">
                  {formatPrice(item.price * item.quantity)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Xóa"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">
              Tạm tính ({totalQuantity} sản phẩm)
            </span>
            <span className="font-bold text-gray-900">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <span className="text-gray-600">Phí vận chuyển</span>
            <span className="font-medium text-green-600">Miễn phí</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
            <span className="text-2xl font-extrabold text-indigo-600">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30 text-lg">
            Thanh toán
          </button>
        </div>
      </div>
    </section>
  );
}
