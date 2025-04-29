import { apiRequest } from "@/lib/api";
import {
  RegisterData,
  AuthResponse,
  LoginData,
  ForgotPasswordData,
  VerifyOtpData,
  ResetPasswordData
} from "@/types/typeDefinition";
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"

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


// Authentication with Google
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.id_token = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      session.id_token = token.id_token
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}