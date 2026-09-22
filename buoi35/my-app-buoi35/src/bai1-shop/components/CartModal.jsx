import { useShop } from "../context/ShopContext";

export default function CartModal({ isOpen, onClose }) {
  const { state, dispatch } = useShop();
  const { cart } = state;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "₫";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Slide-in Panel */}
      <div
        className="relative w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-[slideIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">
            Giỏ hàng ({totalQuantity})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-2">🛒</div>
              <p className="text-gray-400">Chưa có sản phẩm nào</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
              >
                {/* Mini Thumbnail */}
                <div className="w-14 h-14 rounded-lg flex-shrink-0 bg-gray-50 flex items-center justify-center p-1 border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-800 text-sm font-medium truncate">
                    {item.name}
                  </h4>
                  <p className="text-red-500 text-sm font-semibold">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { id: item.id, quantity: item.quantity - 1 },
                      })
                    }
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-sm"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (val >= 1) {
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: val },
                        });
                      }
                    }}
                    className="w-10 h-8 text-center text-sm text-gray-700 border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { id: item.id, quantity: item.quantity + 1 },
                      })
                    }
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                  }
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Tổng cộng:</span>
              <span className="text-xl font-bold text-red-500">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button className="w-full py-3 bg-[#ee4d2d] text-white font-semibold rounded-lg hover:bg-[#d73211] active:scale-[0.98] transition-all cursor-pointer">
              Mua hàng ({totalQuantity})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
