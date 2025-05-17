import { use } from "react";
import CheckoutClient from "@/components/ui/CheckoutClient";

interface CheckoutPageProps {
  params: Promise<{ orderId: string }>; // ¡Es una promesa!
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { orderId } = use(params); // 👈 se resuelve con `use()`

  return <CheckoutClient orderId={orderId} />;
}
