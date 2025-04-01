import axios from "axios";

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

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/';

export async function createProduct(dataProduct: CreateProductData) {
  try {
    const newProduct = await axios.post(`${baseURL}product/`, dataProduct);
    return newProduct.data;
  } catch (error: any) {
    throw new Error(
      error.newProduct?.data?.message || 'Error al crear el producto'
    );
  }
}

// slug: identificador del producto (ej. "café-del-chocó")
export async function updateProduct(slug: string, updateData: UpdateProductData) {
  try {
    const updateProduct = await axios.patch(`${baseURL}product/${slug}`, updateData);
    return updateProduct.data;
  } catch (error: any) {
    throw new Error(
      error.updateProduct?.data?.message || 'Error al actualizar el producto'
    );
  }
}

export async function findAProductBySlug(slug: string) {
  try {
    const getProductBySlug = await axios.post(`${baseURL}product/${slug}`);
    return getProductBySlug.data;
  } catch (error: any) {
    throw new Error(
      error.getProductBySlug?.data?.message || 'Slug no encontrado'
    )
  }
}

export async function findAllProduct() {
  try {
    const responseAllProduct = await axios.get(`${baseURL}product/`);
    return responseAllProduct.data;
  } catch (error: any) {
    throw new Error(
      error.responseAllProduct?.data?.message || 'No se encontró ningún producto'
    )
  }
}
