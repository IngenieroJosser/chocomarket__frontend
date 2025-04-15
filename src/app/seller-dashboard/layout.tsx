import { ReactNode } from "react";
import Header from "@/components/ui/home/Header";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Header />
        {children}
      </main>
    </div>
  );
}
