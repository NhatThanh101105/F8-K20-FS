import { axiosClient } from './axiosClient'

// Bài 1: Lấy danh mục sản phẩm
export const getCategories = async () => {
  const response = await axiosClient.get('/products/categories')
  return response.data
}

// Bài 1: Lấy danh sách sản phẩm theo danh mục (hoặc tất cả)
export const getProductsByCategory = async (category = 'all') => {
  if (!category || category === 'all') {
    const response = await axiosClient.get('/products')
    return response.data
  }
  const response = await axiosClient.get(`/products/category/${encodeURIComponent(category)}`)
  return response.data
}

// Bài 2: Lấy danh sách sản phẩm quản lý
export const getProducts = async () => {
  const response = await axiosClient.get('/products')
  return response.data
}

// Bài 2: Thêm sản phẩm mới
export const addProduct = async (productData) => {
  const response = await axiosClient.post('/products/add', productData)
  return response.data
}

// Bài 2: Chỉnh sửa sản phẩm
export const updateProduct = async ({ id, ...productData }) => {
  const response = await axiosClient.patch(`/products/${id}`, productData)
  return response.data
}

// Bài 3: Lấy chi tiết sản phẩm kèm reviews
export const getProductById = async (id = 1) => {
  const response = await axiosClient.get(`/products/${id}`)
  return response.data
}
