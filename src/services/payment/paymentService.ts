import { apiRequest } from "@/lib/api";
import { 
  PaymentData, 
  PaymentResponse, 
  PaymentRequestDTO,
  OrderDetails
} from "@/types/typeDefinition";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';

export async function initiatePayment(dto: PaymentRequestDTO): Promise<PaymentResponse> {
  try {
    const paymentResponse = await apiRequest<PaymentResponse>('POST', `${baseUrl}/payment/initiate`, dto);
    return paymentResponse;
  } catch (error) {
    console.error("Error iniciando pago:", error);
    throw new Error("No se pudo iniciar el pago. Intenta nuevamente.");
  }
}

export const createPayment = async (payment: PaymentData): Promise<PaymentResponse> => {
  return await apiRequest<PaymentResponse>("POST", `${baseUrl}/payment`, payment);
};

export const getPaymentById = async (paymentId: string): Promise<PaymentResponse> => {
  return await apiRequest<PaymentResponse>("GET", `${baseUrl}/payment/${paymentId}`);
};

export const getPaymentsByUser = async (userId: string): Promise<PaymentResponse[]> => {
  return await apiRequest<PaymentResponse[]>("GET", `${baseUrl}/user/${userId}/payment`);
};

export const getOrderDetails = async (orderId: string): Promise<OrderDetails> => {
  return await apiRequest<OrderDetails>("GET", `${baseUrl}/order/${orderId}`);
};
