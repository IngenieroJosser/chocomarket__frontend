import axios from 'axios';

export interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
}

const API_URL_BACKEND = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(data: RegisterData) {
  try {
    const response = await axios.post(`${API_URL_BACKEND}/auth/register`, data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al registrar el usuario';
    throw new Error(message);
  }
}