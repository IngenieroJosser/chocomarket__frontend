import { ReactNode } from "react";
import Header from "@/components/ui/home/Header";
import Footer from "@/components/ui/home/Footer";
import { CartProvider } from "@/context/CartContext";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
