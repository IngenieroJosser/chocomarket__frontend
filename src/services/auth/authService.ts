import axios from 'axios';

export interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(data: RegisterData) {
  try {
    const response = await axios.post(`${baseURL}auth/register`, data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al registrar el usuario';
    throw new Error(message);
  }
}