import axios from 'axios';

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

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/';

export async function registerUser(data: RegisterData) {
  try {
    const response = await axios.post(`${baseURL}auth/register`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Error al registrar el usuario'
    )
  }
}

export async function userAuthenticated(userAuth: LoginData) {
  try {
    const foundUserAuthenticated = await axios.post(`${baseURL}auth/signin`, userAuth);
    return foundUserAuthenticated.data;
  } catch (error: any) {
    throw new Error(
      error.foundUserAuthenticated?.data?.message || 'Credenciales invalidas'
    )
  }
}

export async function forgotPassword(getEmail: ForgotPasswordData) {
  try {
    const findAndValyUsers = await axios.post(`${baseURL}auth/forgot-password`, getEmail);
    return findAndValyUsers.data;
  } catch (error: any) {
    throw new Error(
      error.findAndValyUsers?.data?.message || 'Error al enviar el correo'
    );    
  }
}

export async function verifyOtp(dataVerifyOtp: VerifyOtpData) {
  try {
    const responseDataVerifyOtp = await axios.post(`${baseURL}auth/verify-otp`, dataVerifyOtp);
    return responseDataVerifyOtp.data;
  } catch (error: any) {
    throw new Error(
      error.responseDataVerifyOtp?.data?.message || 'Error al verificar la OTP'
    )
  }
}

export async function resetPassword(dataResetPassword: ResetPasswordData) {
  try {
    const responseResetPassword = await axios.post(`${baseURL}auth/reset-password`, dataResetPassword);
    return responseResetPassword.data;
  } catch (error: any) {
    throw new Error(
      error.responseResetPassword?.data?.message || 'Error al reestablecer la contraseña'
    );
  }
}
