import { apiRequest } from "@/lib/api";
import { ProductResponse } from '@/types/responseApi'

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';

export async function getProductAvailable(dataProduct: { isVisible: boolean }) {
  const query = new URLSearchParams({
    isVisible: String(dataProduct.isVisible),
  });

  const url = `${baseUrl}/products-available?${query.toString()}`;

  return await apiRequest<ProductResponse>('GET', url);
}

export async function getProductAvailableByCategory(dataProduct: { isVisible: boolean; category: string }): Promise<ProductResponse> {
  const queryParams = new URLSearchParams({
    isVisible: String(dataProduct.isVisible),
    category: dataProduct.category
  });

  const url = `${baseUrl}/seller-dashobard/product-available-by-category?${queryParams.toString()}`;
  
  return await apiRequest<ProductResponse>('GET', url);
}