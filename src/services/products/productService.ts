import { apiRequest } from "@/lib/api";

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  status: string;
  category: string;
  discount?: number;
  discountEnd?: Date;
  isFeatured?: boolean;
  isVisible?: boolean;
  tags: string[];
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  status?: string;
  category?: string;
  discount?: number;
  discountEnd?: Date;
  isFeatured?: boolean;
  isVisible?: boolean;
  tags?: string[];
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  status: string;
  category: string;
  discount?: number;
  discountEnd?: Date;
  isFeatured: boolean;
  isVisible: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  message: string;
  product: Product;
}

export interface ProductListResponse {
  message: string;
  products: Product[];
}

export async function createProduct(dataProduct: CreateProductData): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('POST', 'product/', dataProduct);
}

export async function updateProduct(slug: string, updateData: UpdateProductData): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('PATCH', `product/${slug}`, updateData);
}

export async function findAProductBySlug(slug: string): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('POST', `product/${slug}`);
}

export async function findAllProduct(): Promise<ProductListResponse> {
  return await apiRequest<ProductListResponse>('GET', 'product/');
}

export async function removeProduct(id: number): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('DELETE', `product/${id}`);
}
