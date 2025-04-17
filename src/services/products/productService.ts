import { apiRequest } from "@/lib/api";
import { 
  ProductListResponse, 
  CreateProductData, 
  ProductResponse, 
  UpdateProductData 
} from "@/types/typeDefinition";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';

export async function createProduct(dataProduct: CreateProductData): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('POST', `${baseUrl}/products/`, dataProduct);
}

export async function updateProduct(slug: string, updateData: UpdateProductData): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('PATCH', `${baseUrl}/products/${slug}`, updateData);
}

export async function findAProductBySlug(slug: string): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('GET', `${baseUrl}/products/${slug}`);
}

export async function findAllProduct(): Promise<ProductListResponse> {
  return await apiRequest<ProductListResponse>('GET', `${baseUrl}/products/`);
}

export async function removeProduct(id: number): Promise<ProductResponse> {
  return await apiRequest<ProductResponse>('DELETE', `${baseUrl}/products/${id}`);
}
