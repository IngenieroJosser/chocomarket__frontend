"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Select } from "../../Select";
import { useDarkMode } from "@/hooks/useDarkMode";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ShoppingCart from "@/components/ShoppingCart";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/typeDefinition";
import { button } from "framer-motion/client";

const Header = () => {
  const [language, setLanguage] = useState<string>("es");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moneyCountry, setMoneyCountry] = useState<string>("cop");
  const [scrolled, setScrolled] = useState<boolean | null>(null);
  const { isDark, toggleDarkMode } = useDarkMode();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const { cart } = useCart();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Usuario");

  const optionsLanguage = [
    { label: "ES", value: "es" },
    { label: "EN", value: "en" },
    { label: "FR", value: "fr" },
  ];

  const optionMoney = [
    { label: "COP $", value: "cop" },
    { label: "EUR $", value: "eur" },
    { label: "CAD $", value: "cad" },
    { label: "USD $", value: "usd" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("userName");
      setIsLoggedIn(!!token);
      setUserName(name || "Usuario");
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setUserName("Usuario");

    router.push("/");
    router.refresh();
  };

  // Contexto para el carrito de compra
  const { addToCart } = useCart();

  return (
    <>
      <header
        className={`flex items-center justify-between p-6 fixed top-0 w-full z-50 px-4 md:px-14 transition-colors duration-300 ${
          scrolled === null
            ? ""
            : scrolled
            ? "bg-[rgba(255,255,255,0.56)] dark:bg-[rgba(0,0,0,0.5)] backdrop-blur-md"
            : ""
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Next.js logo"
            width={150}
            height={150}
            priority
            className="w-32 md:w-36"
          />
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-14">
          <ul className="flex flex-row gap-2">
            <li>
              <Link
                href="/shop"
                className="relative inline-block px-1 py-0.5 overflow-hidden z-10
             before:content-[''] before:absolute before:bottom-0 before:left-0 
             before:w-full before:h-0 before:bg-[#008060] before:z-[-1] 
             before:transition-all before:duration-300 hover:before:h-full 
             hover:text-white transition-colors duration-300"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/sales"
                className="relative inline-block px-1 py-0.5 overflow-hidden z-10
             before:content-[''] before:absolute before:bottom-0 before:left-0 
             before:w-full before:h-0 before:bg-[#008060] before:z-[-1] 
             before:transition-all before:duration-300 hover:before:h-full 
            hover:text-white transition-colors duration-300"
              >
                Ventas
              </Link>
            </li>
            <li>
              <Link
                href="/sellers"
                className="relative inline-block px-1 py-0.5 overflow-hidden z-10
             before:content-[''] before:absolute before:bottom-0 before:left-0 
             before:w-full before:h-0 before:bg-[#008060] before:z-[-1] 
             before:transition-all before:duration-300 hover:before:h-full 
             hover:text-white transition-colors duration-300"
              >
                Impulsa tus ventas
              </Link>
            </li>
          </ul>

          <div className="px-2 py-1 flex flex-row gap-2.5">
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={optionsLanguage}
              className="w-20 border-none"
            />
          </div>

          <div className="flex flex-row gap-2.5">
            <svg
              onClick={toggleDarkMode}
              className={`icon icon-dark-mode cursor-pointer transition-colors duration-300 ${
                isDark ? "text-[#008060]" : "text-[rgba(0,0,0,.4)]"
              }`}
              width="24"
              height="24"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Modo oscuro"
            >
              <path
                d="M18.6226 13.614C17.2728 13.9925 15.8466 14.0049 14.4904 13.65C13.1342 13.295 11.897 12.5855 10.9057 11.5942C9.91444 10.6029 9.20489 9.36568 8.84992 8.0095C8.49495 6.65333 8.50735 5.22711 8.88586 3.87732C7.55509 4.24772 6.34458 4.96032 5.37492 5.94414C4.40526 6.92797 3.71028 8.14867 3.35921 9.48468C3.00814 10.8207 3.01323 12.2253 3.37397 13.5588C3.73472 14.8922 4.43853 16.1078 5.4153 17.0846C6.39206 18.0614 7.6077 18.7652 8.94112 19.1259C10.2745 19.4867 11.6792 19.4918 13.0152 19.1407C14.3512 18.7896 15.5719 18.0946 16.5558 17.125C17.5396 16.1553 18.2522 14.9448 18.6226 13.614Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              role="presentation"
              className=" cursor-pointer icon icon-account w-6 h-6 text-[#008060] transition-all duration-300 hover:text-[#005f4a] hover:drop-shadow-[0_0_8px_#00c28b]"
              fill="none"
              viewBox="0 0 22 23"
              aria-label="Cuenta de usuario"
            >
              <path
                d="M11 14.25C14.0376 14.25 16.5 11.7876 16.5 8.75C16.5 5.71243 14.0376 3.25 11 3.25C7.96243 3.25 5.5 5.71243 5.5 8.75C5.5 11.7876 7.96243 14.25 11 14.25Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M2.66406 19.0625C3.50877 17.5991 4.72384 16.3838 6.18712 15.5389C7.65039 14.694 9.31031 14.2492 11 14.2492C12.6897 14.2492 14.3496 14.694 15.8129 15.5389C17.2762 16.3838 18.4912 17.5991 19.3359 19.0625"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <svg
              onClick={toggleCart}
              className="icon icon-cart cursor-pointer"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Carrito de compras"
            >
              <path
                d="M17.9437 6.6875H4.05622C3.88705 6.68829 3.72396 6.75067 3.59744 6.86296C3.47091 6.97525 3.3896 7.12978 3.36872 7.29766L2.14841 18.2977C2.13756 18.3935 2.14699 18.4906 2.1761 18.5825C2.20521 18.6745 2.25335 18.7593 2.31738 18.8314C2.38141 18.9035 2.4599 18.9614 2.54776 19.0012C2.63561 19.041 2.73086 19.0619 2.82732 19.0625H19.1726C19.2691 19.0619 19.3643 19.041 19.4522 19.0012C19.54 18.9614 19.6185 18.9035 19.6826 18.8314C19.7466 18.7593 19.7947 18.6745 19.8238 18.5825C19.853 18.4906 19.8624 18.3935 19.8515 18.2977L18.6312 7.29766C18.6103 7.12978 18.529 6.97525 18.4025 6.86296C18.276 6.75067 18.1129 6.68829 17.9437 6.6875Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 6C6.875 4.90598 7.3096 3.85677 8.08318 3.08318C8.85677 2.3096 9.90598 1.875 11 1.875C12.094 1.875 13.1432 2.3096 13.9168 3.08318C14.6904 3.85677 15.125 4.90598 15.125 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {!isLoggedIn ? (
            <ul className="flex flex-row gap-4">
              <li className="list-none">
                <Link
                  href="/login"
                  className="border-b-2 border-transparent hover:border-[#ff0000] transition-all duration-300"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="/register"
                  className="border-b-2 border-transparent hover:border-[#ff0000] transition-all duration-300"
                >
                  Registrate
                </Link>
              </li>
            </ul>
          ) : (
            <div className="flex items-center gap-2">
              <span className="glow-text uppercase">Hola, {userName}</span>
              <button
                aria-label="Botón para cerrar sesión"
                onClick={handleLogout}
                className="text-red-500 cursor-pointer hover:text-red-700 transition-colors text-sm border-b-2 border-transparent hover:border-red-500"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation - Visible only on mobile */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              role="presentation"
              className="icon icon-account"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 22 23"
            >
              <path
                d="M11 14.25C14.0376 14.25 16.5 11.7876 16.5 8.75C16.5 5.71243 14.0376 3.25 11 3.25C7.96243 3.25 5.5 5.71243 5.5 8.75C5.5 11.7876 7.96243 14.25 11 14.25Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M2.66406 19.0625C3.50877 17.5991 4.72384 16.3838 6.18712 15.5389C7.65039 14.694 9.31031 14.2492 11 14.2492C12.6897 14.2492 14.3496 14.694 15.8129 15.5389C17.2762 16.3838 18.4912 17.5991 19.3359 19.0625"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <svg
              onClick={toggleCart}
              className="icon icon-cart"
              width="24"
              height="24"
              viewBox="0 0 22 23"
              fill="none"
            >
              <path
                d="M17.9437 6.6875H4.05622C3.88705 6.68829 3.72396 6.75067 3.59744 6.86296C3.47091 6.97525 3.3896 7.12978 3.36872 7.29766L2.14841 18.2977C2.13756 18.3935 2.14699 18.4906 2.1761 18.5825C2.20521 18.6745 2.25335 18.7593 2.31738 18.8314C2.38141 18.9035 2.4599 18.9614 2.54776 19.0012C2.63561 19.041 2.73086 19.0619 2.82732 19.0625H19.1726C19.2691 19.0619 19.3643 19.041 19.4522 19.0012C19.54 18.9614 19.6185 18.9035 19.6826 18.8314C19.7466 18.7593 19.7947 18.6745 19.8238 18.5825C19.853 18.4906 19.8624 18.3935 19.8515 18.2977L18.6312 7.29766C18.6103 7.12978 18.529 6.97525 18.4025 6.86296C18.276 6.75067 18.1129 6.68829 17.9437 6.6875Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 6C6.875 4.90598 7.3096 3.85677 8.08318 3.08318C8.85677 2.3096 9.90598 1.875 11 1.875C12.094 1.875 13.1432 2.3096 13.9168 3.08318C14.6904 3.85677 15.125 4.90598 15.125 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <button
            aria-label="Botón de menú para abrir más contenido"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white z-50 py-4 px-6 border-b border-black">
            <ul className="flex flex-col gap-4 mb-4">
              {!isLoggedIn && (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block py-2 border-b-2 border-transparent hover:border-[#5A3E29] transition-all duration-300"
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="block py-2 border-b-2 border-transparent hover:border-[#5A3E29] transition-all duration-300"
                    >
                      Registrate
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  href="/shop"
                  className="block py-2 border-b-2 border-transparent hover:border-[#5A3E29] transition-all duration-300"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/sales"
                  className="block py-2 border-b-2 border-transparent hover:border-[#5A3E29] transition-all duration-300"
                >
                  Ventas
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers"
                  className="block py-2 border-b-2 border-transparent hover:border-[#5A3E29] transition-all duration-300"
                >
                  Impulsa tus ventas
                </Link>
              </li>
            </ul>

            {isLoggedIn && (
              <>
                <div className="mb-4 text-center flex flex-col gap-6">
                  <span className="glow-text uppercase">Hola, {userName}</span>

                  <button
                    aria-label="Botón de cerrar sesión"
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition-colors text-sm border-b-2 border-transparent hover:border-red-500"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}

            <div className="mb-4">
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={optionsLanguage}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-4">
              <svg
                onClick={toggleDarkMode}
                className="icon icon-dark-mode"
                width="24"
                height="24"
                viewBox="0 0 22 23"
                fill="none"
              >
                <path
                  d="M18.6226 13.614C17.2728 13.9925 15.8466 14.0049 14.4904 13.65C13.1342 13.295 11.897 12.5855 10.9057 11.5942C9.91444 10.6029 9.20489 9.36568 8.84992 8.0095C8.49495 6.65333 8.50735 5.22711 8.88586 3.87732C7.55509 4.24772 6.34458 4.96032 5.37492 5.94414C4.40526 6.92797 3.71028 8.14867 3.35921 9.48468C3.00814 10.8207 3.01323 12.2253 3.37397 13.5588C3.73472 14.8922 4.43853 16.1078 5.4153 17.0846C6.39206 18.0614 7.6077 18.7652 8.94112 19.1259C10.2745 19.4867 11.6792 19.4918 13.0152 19.1407C14.3512 18.7896 15.5719 18.0946 16.5558 17.125C17.5396 16.1553 18.2522 14.9448 18.6226 13.614Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      </header>

      {/* Modal del carrito */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.27)] bg-opacity-50 z-50 flex justify-end">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white w-full max-w-2xl h-screen p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold uppercase text-[#008060]">
                Carrito ({cart.length})
              </h2>
              <button
                aria-label="Botón para cerrar el modal de contenido del carrito de compras"
                onClick={toggleCart}
                className="text-2xl text-[#ff0000] cursor-pointer"
              >
                &times;
              </button>
            </div>

            {cart.length === 0 ? (
                <p className="text-gray-500">Tu carrito está vacío</p>
            ) : (
              <>
                <ShoppingCart />
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Header;
