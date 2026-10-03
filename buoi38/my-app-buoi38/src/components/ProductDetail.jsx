import React, { useState, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/api/productApi'
import { Button } from '@/components/ui/button'
import {
  Store,
  Star,
  RotateCcw,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle,
  Loader2,
  Tag,
} from 'lucide-react'

// Yêu cầu quan trọng: Khai báo React.lazy ngoài component và dùng import() để tải ProductReviews
const ProductReviews = React.lazy(() => import('./ProductReviews'))

export default function ProductDetail() {
  const [showReviews, setShowReviews] = useState(false)

  // useQuery lấy chi tiết sản phẩm (id = 1)
  const {
    data: product,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['product', 1],
    queryFn: () => getProductById(1),
  })

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white shadow-xl shadow-purple-500/10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-purple-100 mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Bài 3: Khách hàng xem đánh giá sản phẩm
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Chi Tiết Sản Phẩm & Nhận Xét
          </h2>
          <p className="mt-2 text-sm sm:text-base text-purple-100">
            Xem thông tin sản phẩm và tải code đánh giá bất đồng bộ theo cơ chế Code-Splitting với React.lazy & Suspense.
          </p>
        </div>
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Trạng thái đang tải dữ liệu API */}
      {isPending && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600 mx-auto" />
          <div>
            <h4 className="text-base font-semibold text-slate-800">Đang tải dữ liệu sản phẩm...</h4>
            <p className="text-xs text-slate-500 mt-1">Đang gửi request GET /products/1 tới DummyJSON</p>
          </div>
        </div>
      )}

      {/* Trạng thái lỗi API kèm nút Thử lại */}
      {isError && (
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-red-900">Không thể tải thông tin sản phẩm</h4>
            <p className="text-xs text-red-600 mt-1 max-w-md mx-auto">
              {error?.message || 'Có lỗi xảy ra trong quá trình truy xuất chi tiết sản phẩm.'}
            </p>
          </div>
          <Button
            variant="default"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => refetch()}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Thử lại
          </Button>
        </div>
      )}

      {/* Giao diện chi tiết sản phẩm khi có dữ liệu */}
      {!isPending && !isError && product && (
        <div className="space-y-6">
          {/* Card chính hiển thị thông tin sản phẩm */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Thanh tiêu đề Cửa hàng */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-200">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  {/* Tên cửa hàng tự đặt */}
                  <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider block">
                    Cửa hàng chính hãng
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    TechZone Flagship Store
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Chính hãng</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 font-medium">
                  <Truck className="w-4 h-4" />
                  <span>Giao hàng toàn quốc</span>
                </div>
              </div>
            </div>

            {/* Chi tiết nội dung: Ảnh, Tên, Giá, Mô tả */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Cột ảnh sản phẩm */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex items-center justify-center h-80 sm:h-96 relative group overflow-hidden">
                <img
                  src={product.thumbnail || (product.images && product.images[0])}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {product.brand && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-semibold text-slate-700 shadow-xs border border-slate-200">
                    {product.brand}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rose-500 text-xs font-bold text-white shadow-xs">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Cột thông tin sản phẩm */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Tag danh mục */}
                  {product.category && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold uppercase tracking-wide border border-purple-100">
                      <Tag className="w-3.5 h-3.5" />
                      {product.category}
                    </div>
                  )}

                  {/* Tên sản phẩm */}
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    {product.title}
                  </h1>

                  {/* Rating sao tổng thể */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(product.rating || 0)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {product.rating} / 5
                    </span>
                    <span className="text-xs text-slate-400">
                      ({product.reviews?.length || 0} đánh giá)
                    </span>
                  </div>

                  {/* Giá sản phẩm */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-baseline gap-3">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Giá bán:</span>
                    <span className="text-3xl font-extrabold text-purple-600">
                      ${Number(product.price).toLocaleString()}
                    </span>
                  </div>

                  {/* Mô tả sản phẩm */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-900">Mô tả sản phẩm</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Chi tiết phụ khác */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block">Tồn kho khả dụng:</span>
                      <span className="font-semibold text-slate-800">{product.stock} sản phẩm</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Chính sách bảo hành:</span>
                      <span className="font-semibold text-slate-800">{product.warrantyInformation || '12 tháng chính hãng'}</span>
                    </div>
                  </div>
                </div>

                {/* Khu vực nút Xem / Ẩn đánh giá */}
                <div className="pt-4 border-t border-slate-100">
                  <Button
                    onClick={() => setShowReviews((prev) => !prev)}
                    className={
                      showReviews
                        ? 'bg-slate-800 hover:bg-slate-900 text-white gap-2 shadow-xs'
                        : 'bg-purple-600 hover:bg-purple-700 text-white gap-2 shadow-md shadow-purple-500/20'
                    }
                  >
                    {showReviews ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Ẩn đánh giá
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Xem đánh giá ({product.reviews?.length || 0})
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Phần đánh giá bọc bằng Suspense - Chỉ render khi người dùng nhấn "Xem đánh giá" */}
          {showReviews && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <Suspense
                fallback={
                  <div className="p-10 text-center rounded-2xl bg-purple-50/50 border border-dashed border-purple-300 animate-pulse space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
                    <p className="text-sm font-semibold text-purple-900">
                      Đang tải giao diện đánh giá...
                    </p>
                    <p className="text-xs text-purple-600">
                      Đang nạp component ProductReviews qua React.lazy & Suspense
                    </p>
                  </div>
                }
              >
                <ProductReviews reviews={product.reviews || []} />
              </Suspense>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
