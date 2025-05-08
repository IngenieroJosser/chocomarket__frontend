'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Presentation = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const imagesPresentation = [
    { src: '/presentation-img1.webp', alt: 'Aventura en la naturaleza', title: 'Naturaleza Viva' },
    { src: '/presentation-img4.webp', alt: 'Tour cultural', title: 'Cultura y Tradición' },
    { src: '/presentation-img6.webp', alt: 'Rutas mágicas', title: 'Rutas Mágicas' },
    { src: '/presentation-img5.webp', alt: 'Joss Vibes', title: 'Joss Vibes' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imagesPresentation.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) return null; // evita el renderizado en el SSR

  return (
    <section className="w-full h-[80vh] relative overflow-hidden">
      {/* Carrusel de imágenes */}
      <div className="relative w-full h-full">
        {imagesPresentation.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full group">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
              
              {/* Overlay con contenido */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                <div className="text-center text-white max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                    {image.title}
                  </h2>
                  <Link 
                    href='/shop'
                    className="bg-white text-black px-6 py-2 rounded-full 
                             hover:font-bold bg-opacity-90 transition-all duration-300
                             hover:scale-105 shadow-lg text-sm md:text-base"
                  >
                    Descubrir más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles del carrusel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {imagesPresentation.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-8 rounded-full transition-all ${
              index === activeIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ir a la slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Flechas de navegación */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full 
                 hover:bg-white/50 transition-all md:p-3"
        onClick={() => setActiveIndex((prev) => 
          (prev - 1 + imagesPresentation.length) % imagesPresentation.length
        )}
        aria-label="Slide anterior"
      >
        ←
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full 
                 hover:bg-white/50 transition-all md:p-3"
        onClick={() => setActiveIndex((prev) => 
          (prev + 1) % imagesPresentation.length
        )}
        aria-label="Siguiente slide"
      >
        →
      </button>
    </section>
  );
};

export default Presentation;