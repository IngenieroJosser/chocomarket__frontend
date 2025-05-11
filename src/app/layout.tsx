import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/PageLoader";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChocóMarket",
  description:
    "MarketPlace de Quibdó para ventas y compra de productos locales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <UserProvider>
          <CartProvider>
            <PageLoader />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
