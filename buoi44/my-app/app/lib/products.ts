const API_URL = process.env.API_URL ?? "http://localhost:3001";

type ApiError = Error & { status?: number };

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type ProductInput = Omit<Product, "id">;

export type ProductPage = {
  items: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export type ProductStats = {
  total: number;
  averagePrice: number;
};

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(
      `API lỗi: ${response.status} ${response.statusText}`,
    ) as ApiError;
    error.status = response.status;
    throw error;
  }

  return (await response.json()) as T;
}

export function getProducts(
  query = "",
  page = 1,
  pageSize = 5,
): Promise<ProductPage> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    pageSize: String(pageSize),
  });
  return apiRequest<ProductPage>(`/products?${params.toString()}`);
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    return await apiRequest<Product>(`/products/${id}`);
  } catch (error) {
    if ((error as ApiError).status === 404) {
      return null;
    }
    throw error;
  }
}

export function getProductStats(): Promise<ProductStats> {
  return apiRequest<ProductStats>("/products/stats");
}

export function createProduct(input: ProductInput): Promise<Product> {
  return apiRequest<Product>("/products", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateProduct(
  id: number,
  input: ProductInput,
): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteProduct(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
}
