import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/api';

export default function CategoryList({ selectedCategory, onSelectCategory }) {
  const [simulateError, setSimulateError] = useState(false);

  // useQuery tải danh mục sản phẩm từ DummyJSON (Server State)
  const {
    data: categories = [],
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['categories', { simulateError }],
    queryFn: () => fetchCategories(simulateError),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="mb-5">
      {/* Trạng thái đang tải */}
      {isPending && (
        <div className="flex items-center justify-center gap-2.5 p-6 bg-white border border-gray-200 rounded-2xl text-sm text-gray-500 shadow-xs">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-[#f05123] rounded-full animate-spin"></div>
          <span>Đang tải danh mục...</span>
        </div>
      )}

      {/* Trạng thái lỗi */}
      {isError && (
        <div className="flex items-center justify-between gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-4">
          <div>
            <strong className="font-semibold">Lỗi tải danh mục: </strong>
            <span>{error.message}</span>
          </div>
          <button
            type="button"
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold cursor-pointer transition-colors"
            onClick={() => {
              setSimulateError(false);
              refetch();
            }}
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Danh sách danh mục dạng Pills giống ảnh mẫu */}
      {!isPending && !isError && (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`px-4 py-1.5 rounded-full border text-sm transition-all cursor-pointer whitespace-nowrap capitalize ${
                    isSelected
                      ? 'bg-[#f05123] border-[#f05123] text-white font-semibold shadow-xs'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 font-medium'
                  }`}
                  onClick={() => onSelectCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-3 pb-3 border-b border-gray-200 text-xs text-gray-500">
            <div>
              {selectedCategory ? (
                <span>
                  Danh mục đang chọn: <strong className="text-gray-800 capitalize">{selectedCategory}</strong>
                </span>
              ) : (
                <span>Chưa chọn danh mục nào</span>
              )}
            </div>

            <div>
              <button
                type="button"
                className="text-gray-400 hover:text-red-500 underline text-xs cursor-pointer transition-colors"
                onClick={() => setSimulateError((prev) => !prev)}
                title="Kiểm tra phản hồi khi API trả lỗi HTTP 4xx/5xx"
              >
                {simulateError ? 'Tắt test lỗi API' : 'Mô phỏng lỗi API'}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
