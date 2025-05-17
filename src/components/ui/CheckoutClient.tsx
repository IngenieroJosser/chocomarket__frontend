"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initiatePayment } from "@/services/payment/paymentService";
import { useUser } from "@/context/UserContext";
import { OrderDetails } from "@/types/typeDefinition";
import axios from "axios";

interface CheckoutClientProps {
  orderId: string;
}

export default function CheckoutClient({ orderId }: CheckoutClientProps) {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subtotal, setSubtotal] = useState<number>(0);

  const router = useRouter();
  const { email } = useUser();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:3001";

        const response = await axios.get(`${baseUrl}/payment/${orderId}`);
        const data: OrderDetails = response.data;
        setOrderDetails(data);

        const total = data.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setSubtotal(total);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error al obtener el pedido");
      }
    }

    fetchOrder();
  }, [orderId]);

  const handlePay = async () => {
    if (!email) {
      setError("No hay un usuario autenticado con correo válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dto = {
        orderId: Number(orderId),
        amount: subtotal,
        method: "PAYU",
        email,
      };

      const { paymentUrl, formData } = await initiatePayment(dto);

      if (paymentUrl) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = paymentUrl;

        for (const key in formData) {
          if (typeof formData[key] === "object") continue;
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
      } else {
        setError("Error iniciando pago. Intenta nuevamente.");
      }
    } catch (error) {
      setError("Hubo un problema al iniciar el pago.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-[#008060] mb-6">
        Resumen de tu pedido #{orderId}
      </h1>

      {error && (
        <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
      )}

      {orderDetails ? (
        <div className="w-full max-w-xl bg-[#00a88480] rounded-lg p-6 shadow-md">
          <ul className="mb-6 space-y-3">
            {orderDetails.items.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between border-b border-black/10 pb-2"
              >
                <span className="font-medium text-black">{item.name}</span>
                <span className="text-black/80">
                  {item.quantity} x ${item.price}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-right text-2xl font-bold text-[#000000]">
            Subtotal: ${subtotal.toLocaleString()}
          </p>
          <button
            onClick={handlePay}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-lg font-bold text-black transition-colors ${
              loading
                ? "bg-[#00a88480] cursor-not-allowed"
                : "bg-[#00ffcc] hover:bg-[#00ddb3]"
            }`}
          >
            {loading ? "Procesando pago..." : "Pagar ahora"}
          </button>
        </div>
      ) : (
        !error && (
          <p className="text-black/70">Cargando detalles del pedido...</p>
        )
      )}
    </div>
  );
}
