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

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/';

export async function registerUser(data: RegisterData) {
  try {
    const response = await axios.post(`${baseURL}auth/register`, data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Error al registrar el usuario';
    throw new Error(message);
  }
}

export async function userAuthenticated(userAuth: LoginData) {
  try {
    const foundUserAuthenticated = await axios.post(`${baseURL}auth/signin`, userAuth);
    return foundUserAuthenticated.data;
  } catch (error: any) {
    const message = error.foundUserAuthenticated?.userAuth?.message || 'Credenciales invalidas';
    throw new Error(message);
  }
}
