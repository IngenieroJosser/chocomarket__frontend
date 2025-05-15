import { apiRequest } from "@/lib/api";
import { 
  PaymentData, 
  PaymentResponse, 
} from "@/types/typeDefinition";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';

export async function initiatePayment(orderId: string): Promise<PaymentResponse> {
  try {
    // Realiza la solicitud a la API para iniciar el pago
    const paymentResponse = await apiRequest<PaymentResponse>('POST', `${baseUrl}/payments/initiate`, {
      orderId,
    });

    // Retorna la respuesta con la URL de pago
    return paymentResponse;
  } catch (error) {
    console.error("Error iniciando pago:", error);
    throw new Error("No se pudo iniciar el pago. Intenta nuevamente.");
  }
}

export const createPayment = async (payment: PaymentData): Promise<PaymentResponse> => {
  return await apiRequest<PaymentResponse>("POST", `${baseUrl}/payments`, payment);
};

export const getPaymentById = async (paymentId: string): Promise<PaymentResponse> => {
  return await apiRequest<PaymentResponse>("GET", `${baseUrl}/payments/${paymentId}`);
};

export const getPaymentsByUser = async (userId: string): Promise<PaymentResponse[]> => {
  return await apiRequest<PaymentResponse[]>("GET", `${baseUrl}/users/${userId}/payments`);
};
