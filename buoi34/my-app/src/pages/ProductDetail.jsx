import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import ProductPrice from "../components/ProductPrice";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return <Navigate to="/not-found" replace />;
  }

  const otherProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link
            to="/products"
            className="hover:text-indigo-600 transition-colors"
          >
            Products
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-900 font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="aspect-square lg:aspect-auto bg-gray-100 p-8 flex items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="max-w-full max-h-[500px] object-contain rounded-2xl"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Còn hàng
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <ProductPrice
                  price={product.price}
                  className="text-3xl !font-extrabold"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${
                    added
                      ? "bg-green-600 hover:bg-green-700 shadow-green-500/30 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30 text-white"
                  }`}
                >
                  {added ? (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Đã thêm!
                    </>
                  ) : (
                    <>
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                        />
                      </svg>
                      Thêm vào giỏ hàng
                    </>
                  )}
                </button>
              </div>
              {added && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium text-center">
                  ✅ Đã thêm vào giỏ hàng!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {otherProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {p.name}
                    </h3>
                    <ProductPrice price={p.price} className="text-base" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
