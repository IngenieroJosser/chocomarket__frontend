import { ReactNode } from "react";
import Header from "@/components/ui/home/Header";
import Footer from "@/components/ui/home/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <section className="min-h-screen flex flex-col">
        <ToastContainer />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </section>
    </CartProvider>
  );
}
