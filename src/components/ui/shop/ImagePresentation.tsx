'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const ImagePresentation = () => {
  const pathname = usePathname();

  return (
    <section className="relative w-full h-[390px] mt-23 flex justify-center items-center">
      {/* Contenedor del texto responsive */}
      <div className="absolute right-5 sm:bottom-10 sm:right-8 z-10 text-center sm:text-end">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[#008060] uppercase text-2xl sm:text-4xl lg:text-5xl font-semibold"
        >
          Tus productos <code className="text-amber-950 text-2xl sm:text-base">{pathname}</code>
        </motion.p>
      </div>

      {/* Imagen de fondo */}
      <Image
        src="/presentation-img2.webp"
        alt="Imagen de presentación"
        fill
        priority
        quality={100}
        className="object-cover object-center z-[-1]"
      />
    </section>
  );
};

export default ImagePresentation;
