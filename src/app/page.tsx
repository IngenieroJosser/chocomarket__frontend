import Header from "@/components/ui/home/Header";
import Presentation from "@/components/ui/home/Presentation";
import MainProduct from "@/components/ui/home/MainProduct";
import NewCollection from "@/components/ui/home/NewCollection";
import Category from "@/components/ui/home/Category";
import Stories from "@/components/ui/home/Stories";
import Advantages from "@/components/ui/home/Advantages";
import Footer from "@/components/ui/home/Footer";
import { CartProvider } from "@/context/CartContext";
import type { AppProps } from "next/app";

export default function Home() {
  return (
    <CartProvider>
      <main className="dark:bg-gray-900 dark:text-white transition-all">
        <Header />
        <Presentation />
        <MainProduct />
        <NewCollection />
        <Category />
        <Stories />
        <Advantages />
        <Footer />
      </main>
    </CartProvider>
  );
}
