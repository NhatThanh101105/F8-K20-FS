import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 flex flex-col">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/products/${product.id}`} className="block flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {product.description}
          </p>
        </Link>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <ProductPrice price={product.price} className="text-lg" />
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all"
          >
            Chi tiết
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
