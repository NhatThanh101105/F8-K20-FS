import React from 'react';
import { Plus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const SAMPLE_PRODUCTS = [
  {
    id: 101,
    title: 'Sản phẩm mẫu A',
    price: 100,
    category: 'MẪU A',
    thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=60',
  },
  {
    id: 102,
    title: 'Sản phẩm mẫu B',
    price: 50,
    category: 'MẪU B',
    thumbnail: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=300&auto=format&fit=crop&q=60',
  },
  {
    id: 103,
    title: 'Sản phẩm mẫu C',
    price: 120,
    category: 'MẪU C',
    thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=60',
  },
];

export default function StandaloneCartDemo() {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {SAMPLE_PRODUCTS.map((prod) => (
        <div
          key={prod.id}
          className="bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 transition-all duration-150"
        >
          <div className="w-full h-36 bg-gray-50 flex items-center justify-center p-3 border-b border-gray-100">
            <img
              src={prod.thumbnail}
              alt={prod.title}
              className="max-w-full max-h-full object-contain h-28"
            />
          </div>

          <div className="p-3.5 flex flex-col flex-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 truncate">
              {prod.category}
            </span>

            <h4 className="text-sm font-semibold text-gray-800 truncate mb-1">
              {prod.title}
            </h4>

            <div className="text-xs text-amber-500 mb-2">★★★★★</div>

            <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
              <span className="text-sm font-extrabold text-[#f05123]">
                {Math.round(prod.price)}đ
              </span>

              <button
                type="button"
                className="px-2.5 py-1 bg-[#fff1ee] hover:bg-[#f05123] text-[#f05123] hover:text-white border border-[#f05123]/25 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                onClick={() => addToCart(prod)}
              >
                <Plus size={12} />
                <span>Thêm</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
