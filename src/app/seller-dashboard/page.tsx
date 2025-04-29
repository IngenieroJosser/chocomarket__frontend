"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthRoute } from "@/lib/AuthRoute";
import BannerAside from "@/components/ui/sellers/BannerAside";
import SellerContent from "@/components/ui/sellers/SellerContent";

export default function SellerDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <AuthRoute allowedRoles={["SELLER"]} />
      <section className="flex flex-col lg:flex-row pt-[92px]">
        {/* Botón menú para móviles */}
        <div className="lg:hidden flex justify-between items-center p-4 mt-2 md:mt-10">
          <button
            onClick={toggleMenu}
            className="text-[#005f4a] focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105"
            aria-label="Abrir menú lateral"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar en modo desktop */}
        <div className="hidden lg:block w-64 bg-[#F9F9F9] shadow-md h-[calc(100vh-92px)] sticky top-[92px]">
          <BannerAside />
        </div>

        {/* Sidebar animado en móviles y tablet */}
        <AnimatePresence>
          {isClient && isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5 }}
              className="fixed left-0 w-64 h-[calc(100vh-98px)] z-50 bg-[#F9F9F9] shadow-md lg:hidden md:top-[120px] top-[92px]"
            >
              <BannerAside />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido principal */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out px-4 ${
            isMenuOpen ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          <SellerContent />
        </div>
      </section>
    </>
  );
}
