import Header from "@/components/ui/home/Header";
import Presentation from "@/components/ui/home/Presentation";
import MainProduct from "@/components/ui/home/MainProduct";

export default function Home() {
  return (
    <main className="dark:bg-gray-900 dark:text-white transition-all">
      <Header />
      <Presentation />
      <MainProduct />
    </main>
  );
}
