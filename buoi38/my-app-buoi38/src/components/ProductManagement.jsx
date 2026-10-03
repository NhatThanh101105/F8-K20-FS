import React, { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, addProduct, updateProduct } from '@/api/productApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Plus,
  Pencil,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Package,
  Loader2,
  DollarSign,
  Boxes,
} from 'lucide-react'

export default function ProductManagement() {
  const queryClient = useQueryClient()

  // State quản lý Dialog và Form
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null) // null = Thêm mới, object = Đang sửa
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Lưu trữ các thay đổi cục bộ (vì DummyJSON không lưu dữ liệu thật trên server khi invalidate)
  const [localEdits, setLocalEdits] = useState({})
  const [addedProducts, setAddedProducts] = useState([])

  // Query: Lấy danh sách sản phẩm
  const {
    data: productsData,
    isPending: isLoadingProducts,
    isError: isLoadError,
    error: loadError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const serverProducts = productsData?.products || []

  // Hợp nhất danh sách hiển thị với các thay đổi/thêm mới để giao diện cập nhật ngay lập tức
  const products = useMemo(() => {
    const list = serverProducts.map((item) => {
      if (localEdits[item.id]) {
        return { ...item, ...localEdits[item.id] }
      }
      return item
    })
    return [...addedProducts, ...list]
  }, [serverProducts, localEdits, addedProducts])

  // Đặt lại form về ban đầu
  const resetForm = () => {
    setFormData({ title: '', price: '', stock: '' })
    setFieldErrors({})
    setSubmitError(null)
    setEditingProduct(null)
  }

  // Mutation 1: Thêm sản phẩm
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data, variables) => {
      setIsDialogOpen(false)
      resetForm()
      setSuccessMessage(`Thêm sản phẩm "${data.title || variables.title || 'mới'}" thành công!`)

      // Cập nhật danh sách hiển thị ngay lập tức
      const newProduct = {
        ...data,
        id: data.id || Date.now(),
        title: variables.title,
        price: variables.price,
        stock: variables.stock,
      }
      setAddedProducts((prev) => [newProduct, ...prev])

      // Vẫn gọi invalidateQueries theo đúng chuẩn TanStack Query
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setTimeout(() => setSuccessMessage(null), 5000)
    },
    onError: (err) => {
      // Giữ dialog mở, giữ nguyên dữ liệu đã nhập, chỉ hiển thị lỗi
      setSubmitError(err?.message || 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.')
    },
  })

  // Mutation 2: Sửa sản phẩm
  const editMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data, variables) => {
      setIsDialogOpen(false)
      resetForm()
      const productName = data.title || variables.title || 'được chọn'
      setSuccessMessage(`Cập nhật sản phẩm "${productName}" thành công!`)

      // Cập nhật giá trị đã sửa vào state hiển thị ngay lập tức
      setLocalEdits((prev) => ({
        ...prev,
        [variables.id]: {
          ...data,
          title: variables.title,
          price: variables.price,
          stock: variables.stock,
        },
      }))

      // Vẫn gọi invalidateQueries theo đúng chuẩn TanStack Query
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setTimeout(() => setSuccessMessage(null), 5000)
    },
    onError: (err) => {
      // Giữ dialog mở, giữ nguyên dữ liệu đã nhập, chỉ hiển thị lỗi
      setSubmitError(err?.message || 'Có lỗi xảy ra khi cập nhật sản phẩm. Vui lòng thử lại.')
    },
  })

  const isSubmitting = addMutation.isPending || editMutation.isPending

  // Mở Dialog thêm mới
  const handleOpenAddDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Mở Dialog chỉnh sửa với dữ liệu mới nhất (bao gồm cả dữ liệu đã chỉnh sửa trước đó)
  const handleOpenEditDialog = (product) => {
    const currentProduct = localEdits[product.id]
      ? { ...product, ...localEdits[product.id] }
      : product

    setEditingProduct(currentProduct)
    setFormData({
      title: currentProduct.title || '',
      price: currentProduct.price !== undefined ? String(currentProduct.price) : '',
      stock: currentProduct.stock !== undefined ? String(currentProduct.stock) : '',
    })
    setFieldErrors({})
    setSubmitError(null)
    setIsDialogOpen(true)
  }

  // Xử lý thay đổi input
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }))
    }
    if (submitError) setSubmitError(null)
  }

  // Validate form nghiêm ngặt theo yêu cầu
  const validateForm = () => {
    const errors = {}

    // 1. Tên không được để trống hoặc chỉ chứa khoảng trắng
    if (!formData.title || formData.title.trim() === '') {
      errors.title = 'Tên sản phẩm không được để trống hoặc chỉ chứa khoảng trắng.'
    }

    // 2. Giá phải là số lớn hơn 0, không được để trống, không để chuỗi rỗng thành 0
    if (formData.price === '' || formData.price === null || formData.price === undefined) {
      errors.price = 'Giá sản phẩm không được để trống.'
    } else {
      const numPrice = Number(formData.price)
      if (isNaN(numPrice) || numPrice <= 0) {
        errors.price = 'Giá sản phẩm phải là một số lớn hơn 0.'
      }
    }

    // 3. Tồn kho phải là số nguyên không âm (>= 0), không được để trống
    if (formData.stock === '' || formData.stock === null || formData.stock === undefined) {
      errors.stock = 'Tồn kho không được để trống.'
    } else {
      const numStock = Number(formData.stock)
      if (isNaN(numStock) || !Number.isInteger(numStock) || numStock < 0) {
        errors.stock = 'Tồn kho phải là số nguyên không âm (lớn hơn hoặc bằng 0).'
      }
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const payload = {
      title: formData.title.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    if (editingProduct) {
      editMutation.mutate({
        id: editingProduct.id,
        ...payload,
      })
    } else {
      addMutation.mutate(payload)
    }
  }

  return (
    <div className="space-y-6">
      {/* Thông báo thành công */}
      {successMessage && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-xs text-emerald-700 hover:underline font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Card Header & Add Button */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Danh Sách Sản Phẩm</h3>
              <p className="text-xs text-slate-500">
                {products.length > 0 ? `Tổng cộng ${products.length} sản phẩm trong kho` : 'Đang đồng bộ dữ liệu...'}
              </p>
            </div>
          </div>

          <Button
            onClick={handleOpenAddDialog}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Trạng thái đang tải dữ liệu */}
        {isLoadingProducts && (
          <div className="p-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
            <p className="text-sm text-slate-500 font-medium">Đang tải danh sách sản phẩm từ DummyJSON...</p>
          </div>
        )}

        {/* Trạng thái lỗi tải dữ liệu */}
        {isLoadError && (
          <div className="p-8 text-center space-y-3 bg-red-50/50">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto text-red-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-red-900">Không thể tải danh sách sản phẩm</h4>
            <p className="text-xs text-red-600 max-w-md mx-auto">{loadError?.message || 'Lỗi mạng hoặc máy chủ'}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchProducts()}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Thử lại
            </Button>
          </div>
        )}

        {/* Bảng danh sách sản phẩm */}
        {!isLoadingProducts && !isLoadError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/70 border-b border-slate-200/80 text-xs uppercase font-semibold text-slate-500 tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-3.5">ID</th>
                  <th scope="col" className="px-6 py-3.5">Tên sản phẩm (Title)</th>
                  <th scope="col" className="px-6 py-3.5">Giá (Price)</th>
                  <th scope="col" className="px-6 py-3.5">Tồn kho (Stock)</th>
                  <th scope="col" className="px-6 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                      Không có sản phẩm nào trong hệ thống.
                    </td>
                  </tr>
                ) : (
                  products.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">
                        #{item.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-10 h-10 object-contain rounded-md bg-slate-100 p-1 border border-slate-200/60 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                              <Package className="w-5 h-5" />
                            </div>
                          )}
                          <span className="line-clamp-1">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        ${Number(item.price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.stock > 10
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                              : item.stock > 0
                              ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                              : 'bg-red-50 text-red-700 border border-red-200/60'
                          }`}
                        >
                          {item.stock} cái
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEditDialog(item)}
                          className="hover:border-emerald-500 hover:text-emerald-700 gap-1.5 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Chỉnh sửa
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dialog Form Thêm / Sửa Sản Phẩm */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!isSubmitting) {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }
        }}
      >
        <DialogContent className="sm:max-w-[480px]">
          <form onSubmit={handleSubmit} noValidate>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? `Cập nhật thông tin chi tiết cho sản phẩm ID #${editingProduct.id}.`
                  : 'Điền thông tin hợp lệ để thêm sản phẩm vào hệ thống.'}
              </DialogDescription>
            </DialogHeader>

            {/* Thông báo lỗi khi mutation thất bại */}
            {submitError && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Lỗi gửi dữ liệu: </span>
                  {submitError}
                </div>
              </div>
            )}

            <div className="grid gap-4 py-4">
              {/* Trường 1: Tên sản phẩm */}
              <div className="space-y-1.5">
                <Label htmlFor="product-title" className="text-slate-800">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-title"
                  placeholder="Ví dụ: Laptop Dell XPS 15"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  disabled={isSubmitting}
                  className={fieldErrors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {fieldErrors.title && (
                  <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.title}
                  </p>
                )}
              </div>

              {/* Trường 2: Giá */}
              <div className="space-y-1.5">
                <Label htmlFor="product-price" className="text-slate-800">
                  Giá sản phẩm ($) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <Input
                    id="product-price"
                    type="number"
                    step="any"
                    placeholder="Ví dụ: 199.99"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    disabled={isSubmitting}
                    className={`pl-8 ${fieldErrors.price ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                </div>
                {fieldErrors.price && (
                  <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.price}
                  </p>
                )}
              </div>

              {/* Trường 3: Tồn kho */}
              <div className="space-y-1.5">
                <Label htmlFor="product-stock" className="text-slate-800">
                  Tồn kho (Số lượng) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <Input
                    id="product-stock"
                    type="number"
                    step="1"
                    placeholder="Ví dụ: 50"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    disabled={isSubmitting}
                    className={`pl-8 ${fieldErrors.stock ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                </div>
                {fieldErrors.stock && (
                  <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.stock}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  resetForm()
                }}
                disabled={isSubmitting}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                    Đang lưu...
                  </>
                ) : editingProduct ? (
                  'Lưu thay đổi'
                ) : (
                  'Thêm sản phẩm'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
