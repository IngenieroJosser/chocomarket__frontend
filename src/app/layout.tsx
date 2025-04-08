import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Space_Mono,
  Open_Sans
} from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/PageLoader";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistPoppins = Poppins({
  variable: '--font-geist-poppins',
  subsets: ["latin"],
  weight: ["400"]
});

const geistSpaceMono = Space_Mono({
  variable: "--font-geist-space_mono",
  subsets: ["latin"],
  weight: ["400"]
});

const geistOpenSans = Open_Sans({
  variable: "--font-geist-open-sans",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "ChocóMarket",
  description: "MarketPlace de Quibdó para ventas y compra de productos locales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistPoppins.variable} antialiased`}
      >
        <PageLoader />
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
