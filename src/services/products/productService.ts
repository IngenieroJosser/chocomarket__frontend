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

export interface Tag {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
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
  tags: Tag[];
  user: User; // ← asegúrate de que esté aquí
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

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function createProduct(dataProduct: CreateProductData): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('POST', `${baseUrl}/products/`, dataProduct);
}

export async function updateProduct(slug: string, updateData: UpdateProductData): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('PATCH', `${baseUrl}/products/${slug}`, updateData);
}

export async function findAProductBySlug(slug: string): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('POST', `${baseUrl}/products/${slug}`);
}

export async function findAllProduct(): Promise<ProductListResponse> {
  return await apiRequest<ProductListResponse>('GET', `${baseUrl}/products/`);
}

export async function removeProduct(id: number): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('DELETE', `${baseUrl}/products/${id}`);
}
