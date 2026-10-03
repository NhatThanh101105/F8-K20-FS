import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getProductsByCategory } from '@/api/productApi'
import { Button } from '@/components/ui/button'
import { 
  AlertCircle, 
  RotateCcw, 
  ShoppingBag, 
  Tag, 
  Layers, 
  Sparkles,
  PackageOpen
} from 'lucide-react'

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Query 1: Lấy danh mục sản phẩm
  const {
    data: categoriesData,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ['products', 'categories'],
    queryFn: getCategories,
  })

  // Chuẩn hóa danh sách danh mục (DummyJSON có thể trả mảng string hoặc mảng object {slug, name})
  const categories = React.useMemo(() => {
    if (!categoriesData) return []
    return categoriesData.map((item) => {
      if (typeof item === 'string') {
        return { slug: item, name: item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, ' ') }
      }
      return {
        slug: item.slug,
        name: item.name || item.slug,
      }
    })
  }, [categoriesData])

  // Query 2: Lấy danh sách sản phẩm theo danh mục đang chọn
  const {
    data: productsData,
    isPending: isProductsPending,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ['products', 'catalog', selectedCategory],
    queryFn: () => getProductsByCategory(selectedCategory),
  })

  const products = productsData?.products || []

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100 mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Bài 1: Khách hàng xem sản phẩm theo danh mục
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Khám Phá Sản Phẩm Cửa Hàng
          </h2>
          <p className="mt-2 text-sm sm:text-base text-blue-100">
            Duyệt các mặt hàng chất lượng cao theo danh mục. Lọc tức thì với TanStack Query và Axios instance.
          </p>
        </div>
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Category Filter Section */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold text-base">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>Danh mục sản phẩm</span>
          {categories.length > 0 && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-normal">
              {categories.length + 1} lựa chọn
            </span>
          )}
        </div>

        {/* Trạng thái tải danh mục */}
        {isCategoriesPending && (
          <div className="flex flex-wrap gap-2 animate-pulse">
            <div className="h-9 w-20 bg-slate-200 rounded-lg"></div>
            <div className="h-9 w-24 bg-slate-200 rounded-lg"></div>
            <div className="h-9 w-28 bg-slate-200 rounded-lg"></div>
            <div className="h-9 w-24 bg-slate-200 rounded-lg"></div>
            <div className="h-9 w-32 bg-slate-200 rounded-lg"></div>
            <div className="h-9 w-24 bg-slate-200 rounded-lg"></div>
          </div>
        )}

        {/* Trạng thái lỗi danh mục */}
        {isCategoriesError && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>
                Không thể tải danh sách danh mục: {categoriesError?.message || 'Lỗi mạng hoặc máy chủ'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchCategories()}
              className="border-red-300 text-red-700 hover:bg-red-100 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Thử lại
            </Button>
          </div>
        )}

        {/* Danh sách nút danh mục */}
        {!isCategoriesPending && !isCategoriesError && (
          <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1">
            <Button
              key="all"
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-700 hover:text-blue-600'
              }
            >
              <Tag className="w-3.5 h-3.5" />
              Tất cả
            </Button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug
              return (
                <Button
                  key={cat.slug}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                      : 'text-slate-700 hover:text-blue-600'
                  }
                >
                  {cat.name}
                </Button>
              )
            })}
          </div>
        )}
      </div>

      {/* Product List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">
              {selectedCategory === 'all'
                ? 'Tất cả sản phẩm'
                : `Sản phẩm danh mục: ${
                    categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory
                  }`}
            </h3>
          </div>
          {!isProductsPending && !isProductsError && (
            <span className="text-sm text-slate-500">
              Hiển thị <span className="font-semibold text-slate-900">{products.length}</span> sản phẩm
            </span>
          )}
        </div>

        {/* Trạng thái đang tải sản phẩm */}
        {isProductsPending && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 animate-pulse shadow-xs"
              >
                <div className="w-full h-48 bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Trạng thái lỗi tải sản phẩm */}
        {isProductsError && (
          <div className="p-8 rounded-2xl bg-red-50/70 border border-red-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto text-red-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-red-900">
                Không thể tải danh sách sản phẩm
              </h4>
              <p className="text-sm text-red-600 mt-1 max-w-md mx-auto">
                {productsError?.message || 'Có lỗi xảy ra trong quá trình truy xuất dữ liệu từ API DummyJSON.'}
              </p>
            </div>
            <Button
              variant="default"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => refetchProducts()}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Thử lại
            </Button>
          </div>
        )}

        {/* Trạng thái rỗng */}
        {!isProductsPending && !isProductsError && products.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <PackageOpen className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-slate-700">
              Không có sản phẩm nào
            </h4>
            <p className="text-sm text-slate-500">
              Chưa có sản phẩm nào thuộc danh mục này hoặc danh sách rỗng.
            </p>
          </div>
        )}

        {/* Trạng thái có dữ liệu */}
        {!isProductsPending && !isProductsError && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative w-full h-48 bg-slate-50 overflow-hidden p-4 flex items-center justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.category && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[11px] font-medium text-slate-700 shadow-xs border border-slate-200/60 capitalize">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h4
                      className="font-semibold text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors"
                      title={product.title}
                    >
                      {product.title}
                    </h4>
                    {product.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Giá bán</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${Number(product.price).toLocaleString()}
                      </span>
                    </div>
                    {product.rating && (
                      <div className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md font-semibold border border-amber-200/60">
                        ★ {product.rating}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
