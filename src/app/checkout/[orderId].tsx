"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { initiatePayment } from "@/services/payment/paymentService";

export default function CheckoutPage() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePay = async () => {
    if (!orderId) {
      setError("El ID del pedido es inválido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { paymentUrl } = await initiatePayment(orderId as string);
      if (paymentUrl) {
        window.location.href = paymentUrl; // O usar router.push(paymentUrl);
      } else {
        setError("Error iniciando pago. Intenta nuevamente.");
      }
    } catch (error) {
      setError("Hubo un problema al iniciar el pago.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Resumen de tu pedido</h1>
      <p>Pedido: {orderId}</p>
      {error && <p className="text-red-600">{error}</p>}
      <button
        onClick={handlePay}
        className="mt-4 bg-green-600 text-white p-3 rounded-lg"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Pagar ahora"}
      </button>
    </div>
  );
}
