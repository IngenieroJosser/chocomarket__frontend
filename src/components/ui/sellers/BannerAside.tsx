"use client";
import { useState } from "react";

type MenuItem = {
  title: string;
  children: string[];
};

const menuItems: MenuItem[] = [
  {
    title: "Productos",
    children: ["Agregar Producto", "Mis Productos", "Categorías"],
  },
  {
    title: "Pedidos",
    children: ["Pedidos Recibidos", "Historial de Pedidos"],
  },
  {
    title: "Finanzas",
    children: ["Resumen de Ventas", "Mis Ingresos"],
  },
  {
    title: "Configuración",
    children: ["Perfil", "Preferencias"],
  },
];

const BannerAside = () => {
  const [openTab, setOpenTab] = useState<number | null>(null);

  const toggleTab = (index: number) => {
    setOpenTab(openTab === index ? null : index);
  };

  return (
    <aside className="w-64 fixed top-23 left-0 h-[calc(100vh-92px)] bg-[#F9F9F9] p-8 border-r border-gray-200 shadow-sm overflow-y-auto">
      <nav className="space-y-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            <button
              aria-label="Botón para ver información sobre el menú del item"
              onClick={() => toggleTab(index)}
              className="w-full text-left flex justify-between items-center text-[#005f4a] font-semibold hover:text-[#004a38] transition duration-200"
            >
              <span>{item.title}</span>
              <span className="text-sm transition">
                {openTab === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25L12 21m0 0L8.25 17.25M12 21V3"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                    />
                  </svg>
                )}
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openTab === index
                  ? "max-h-40 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="pl-4 text-sm text-[#005f4a80] space-y-2">
                {item.children.map((child, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-[#005f4a] transition"
                  >
                    {child}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default BannerAside;
