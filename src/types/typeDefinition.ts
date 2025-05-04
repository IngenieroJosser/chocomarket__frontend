export interface IAvailableProduct {
  isVisible: boolean; 
}

export interface IAvailableProductByCategory {
  isVisible: boolean; 
  category: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: 'SELLER' | 'ADMIN' | 'BUYER';
  };
}

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
  user?: { email: string };
  tags?: { id: number; name: string }[];
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

export interface ProductResponse {
  message: string;
  product: Product;
}

export interface ProductListResponse {
  message: string;
  products: Product[];
}

export interface CartProduct extends Product {
  quantity: number;
}