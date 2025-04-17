import { apiRequest } from "@/lib/api";
import { 
  IAvailableProduct,
  IAvailableProductByCategory,
  ProductResponse
} from "@/types/interfaces";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';

export async function getProductAvailable(dataProduct: IAvailableProduct) {
  const query = new URLSearchParams({
    isVisible: String(dataProduct.isVisible),
  });

  const url = `${baseUrl}/products-available?${query.toString()}`;

  return await apiRequest<ProductResponse>('GET', url);
}

export async function getProductAvailableByCategory(dataProduct: IAvailableProductByCategory): Promise<ProductResponse> {
  const queryParams = new URLSearchParams({
    isVisible: String(dataProduct.isVisible),
    category: dataProduct.category
  });

  const url = `${baseUrl}/seller-dashobard/product-available-by-category?${queryParams.toString()}`;

  return await apiRequest<ProductResponse>('GET', url);
}