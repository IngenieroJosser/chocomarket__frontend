import { Product } from "@/services/products/productService";

export interface ProductResponse {
  message: string;
  product: Product;
}

export interface ProductListResponse {
  message: string;
  products: Product[];
}