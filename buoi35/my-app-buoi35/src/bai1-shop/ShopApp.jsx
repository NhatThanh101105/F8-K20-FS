import { useState } from "react";
import { ShopProvider, useShop } from "./context/ShopContext";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import CartModal from "./components/CartModal";

function ShopContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const { state } = useShop();
  const totalQuantity = state.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-[#ee4d2d] rounded-lg flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <span className="text-xl font-bold text-gray-800">
              Tech<span className="text-[#ee4d2d]">Store</span>
            </span>
          </div>

          {/* Search */}
          <SearchBar />

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span className="hidden sm:inline text-gray-600 text-sm font-medium">Giỏ hàng</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-1 left-5 w-5 h-5 flex items-center justify-center bg-[#ee4d2d] text-white text-[10px] font-bold rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <ProductList />
      </main>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function ShopApp() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  );
}
