import React from 'react'
import { Star, MessageSquare, User, Calendar } from 'lucide-react'

export default function ProductReviews({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-2">
          <MessageSquare className="w-6 h-6" />
        </div>
        <p className="text-slate-600 font-medium">Sản phẩm chưa có đánh giá</p>
        <p className="text-xs text-slate-400 mt-1">Hãy là người đầu tiên trải nghiệm và chia sẻ cảm nhận!</p>
      </div>
    )
  }

  // Tính trung bình số sao
  const avgRating = (
    reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
  ).toFixed(1)

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Thống kê đánh giá */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            Đánh giá từ người mua
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Tổng số đánh giá: <span className="font-semibold text-slate-800">{reviews.length}</span> lượt nhận xét
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-amber-200/80 shadow-xs">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(Number(avgRating))
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-slate-800">{avgRating} / 5</span>
        </div>
      </div>

      {/* Danh sách từng đánh giá */}
      <div className="grid gap-4">
        {reviews.map((rev, index) => (
          <div
            key={index}
            className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {rev.reviewerName ? rev.reviewerName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">
                    {rev.reviewerName || 'Khách hàng ẩn danh'}
                  </h5>
                  {rev.reviewerEmail && (
                    <span className="text-xs text-slate-400 block">{rev.reviewerEmail}</span>
                  )}
                </div>
              </div>

              {/* Số sao của reviewer */}
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-200/40">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (rev.rating || 0)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-700 ml-1">{rev.rating}</span>
              </div>
            </div>

            {/* Nội dung đánh giá */}
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100">
              "{rev.comment}"
            </p>

            {/* Ngày đánh giá nếu có */}
            {rev.date && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(rev.date).toLocaleDateString('vi-VN')}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
