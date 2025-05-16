'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const imagesPresentation = [
  { src: '/presentation-img1.webp', alt: 'Aventura en la naturaleza', title: 'Naturaleza Viva' },
  { src: '/presentation-img4.webp', alt: 'Tour cultural', title: 'Cultura y Tradición' },
  { src: '/presentation-img6.webp', alt: 'Rutas mágicas', title: 'Rutas Mágicas' },
  { src: '/presentation-img5.webp', alt: 'Joss Vibes', title: 'Joss Vibes' },
];

const Presentation = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imagesPresentation.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { src, alt, title } = imagesPresentation[activeIndex];

  return (
    <section className="w-full h-[80vh] relative overflow-hidden">
      {/* Imagen activa */}
      <div className="relative w-full h-full">
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-opacity duration-700 ease-in-out"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="text-center text-white max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
              {title}
            </h2>
            <Link 
              href="/shop"
              className="bg-white text-black px-6 py-2 rounded-full 
                       hover:font-bold bg-opacity-90 transition-all duration-300
                       hover:scale-105 shadow-lg text-sm md:text-base"
            >
              Descubrir más
            </Link>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {imagesPresentation.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-2 w-8 rounded-full transition-all ${
              index === activeIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Flechas */}
      <button
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-all md:p-3"
        onClick={() => setActiveIndex((prev) => (prev - 1 + imagesPresentation.length) % imagesPresentation.length)}
      >
        ←
      </button>
      <button
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-all md:p-3"
        onClick={() => setActiveIndex((prev) => (prev + 1) % imagesPresentation.length)}
      >
        →
      </button>
    </section>
  );
};

export default Presentation;
