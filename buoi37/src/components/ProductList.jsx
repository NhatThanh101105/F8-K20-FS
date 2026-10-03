import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HelpCircle, Plus, Check } from 'lucide-react';
import { fetchProductsByCategory } from '../services/api';
import { useCartStore } from '../store/useCartStore';

export default function ProductList({ selectedCategory }) {
  const [simulateProductError, setSimulateProductError] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const [addedId, setAddedId] = useState(null);

  // useQuery tải sản phẩm theo danh mục đang chọn
  const {
    data: products = [],
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', selectedCategory, { simulateProductError }],
    queryFn: () => fetchProductsByCategory(selectedCategory, simulateProductError),
    enabled: Boolean(selectedCategory), // Chỉ fetch khi đã chọn danh mục
    staleTime: 2 * 60 * 1000,
  });

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 800);
  };

  return (
    <section>
      {/* 1. Khi chưa chọn danh mục: hiển thị "Vui lòng chọn danh mục", không để loading quay mãi */}
      {!selectedCategory && (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-14 text-center text-gray-500 flex flex-col items-center gap-3 my-4">
          <HelpCircle size={44} className="text-[#f05123]" />
          <h3 className="text-base font-bold text-gray-800">Vui lòng chọn danh mục</h3>
          <p className="text-sm max-w-md">
            Nhấp vào một trong các danh mục ở thanh phía trên để tải danh sách sản phẩm từ API.
          </p>
        </div>
      )}

      {/* 2. Đang tải: isPending */}
      {selectedCategory && isPending && (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center flex items-center justify-center gap-3 text-sm text-gray-500 my-4 shadow-xs">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-[#f05123] rounded-full animate-spin"></div>
          <span>Đang tải sản phẩm của danh mục "{selectedCategory}"...</span>
        </div>
      )}

      {/* 3. Lỗi: isError */}
      {selectedCategory && isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-3 text-sm text-red-700 my-4">
          <div>
            <strong className="font-semibold">Lỗi tải sản phẩm: </strong>
            <span>{error.message}</span>
          </div>
          <button
            type="button"
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
            onClick={() => {
              setSimulateProductError(false);
              refetch();
            }}
          >
            Thử lại
          </button>
        </div>
      )}

      {/* 4. Rỗng */}
      {selectedCategory && !isPending && !isError && products.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-sm text-gray-500 my-4 shadow-xs">
          <span>Không có sản phẩm nào trong danh mục này.</span>
        </div>
      )}

      {/* 5. Hiển thị danh sách sản phẩm dạng Grid 5 cột (giống ảnh mẫu) */}
      {selectedCategory && !isPending && !isError && products.length > 0 && (
        <>
          <div className="text-xs text-gray-500 my-2">
            Tìm thấy <strong className="text-gray-800">{products.length}</strong> sản phẩm
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => {
              const isAdded = addedId === product.id;
              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 transition-all duration-150"
                >
                  <div className="w-full h-36 bg-gray-50 flex items-center justify-center p-3 border-b border-gray-100">
                    <img
                      src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/150'}
                      alt={product.title}
                      className="max-w-full max-height-full object-contain h-28"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-3.5 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 truncate">
                      {product.category || selectedCategory}
                    </span>

                    <h4 className="text-sm font-semibold text-gray-800 truncate mb-1" title={product.title}>
                      {product.title}
                    </h4>

                    <div className="text-xs text-amber-500 mb-2">
                      ★★★★★
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
                      <span className="text-sm font-extrabold text-[#f05123]">
                        {Math.round(product.price)}đ
                      </span>

                      <button
                        type="button"
                        className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-[#fff1ee] hover:bg-[#f05123] text-[#f05123] hover:text-white border border-[#f05123]/25'
                        }`}
                        onClick={() => handleAdd(product)}
                      >
                        {isAdded ? (
                          <>
                            <Check size={12} />
                            <span>Đã thêm</span>
                          </>
                        ) : (
                          <>
                            <Plus size={12} />
                            <span>Thêm</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}