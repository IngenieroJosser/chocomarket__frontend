import { apiRequest } from "@/lib/api";

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

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';

export interface GenericMessageResponse {
  message: string;
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  return await apiRequest<AuthResponse>('POST', `${baseUrl}/auth/register`, data);
}

export async function userAuthenticated(userAuth: LoginData): Promise<AuthResponse> {
  return await apiRequest<AuthResponse>('POST', `${baseUrl}/auth/signin`, userAuth);
}

export async function forgotPassword(getEmail: ForgotPasswordData): Promise<GenericMessageResponse> {
  return await apiRequest<GenericMessageResponse>('POST', `${baseUrl}/auth/forgot-password`, getEmail);
}

export async function verifyOtp(dataVerifyOtp: VerifyOtpData): Promise<GenericMessageResponse> {
  return await apiRequest<GenericMessageResponse>('POST', `${baseUrl}/auth/verify-otp`, dataVerifyOtp);
}

export async function resetPassword(dataResetPassword: ResetPasswordData): Promise<GenericMessageResponse> {
  return await apiRequest<GenericMessageResponse>('POST', `${baseUrl}/auth/reset-password`, dataResetPassword);
}
