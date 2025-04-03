import { ReactNode } from "react";
import Header from "@/components/ui/home/Header";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
