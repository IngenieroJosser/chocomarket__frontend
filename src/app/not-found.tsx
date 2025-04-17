'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      {/* Animación del número 404 */}
      <motion.h1
        className="text-7xl font-bold text-[#ff0000] mb-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Animación del mensaje de error */}
      <motion.p
        className="text-lg border-l-4 border-[#008060] pl-4 mb-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.5 }}
      >
        ¡Oops! La página que buscas no existe.
      </motion.p>

      {/* Botón de regreso animado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href="/">
          <motion.button
            className="border-2 cursor-pointer border-[#008060] text-[#008060] px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#008060] hover:text-white transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Botón de volver a la página de inicio"
          >
            Volver al inicio
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
