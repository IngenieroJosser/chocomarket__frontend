'use client'

import Image from "next/image";
import { useState } from "react";

interface CategoryItem {
  title: string;
  imageUrl: string;
}

const categories: CategoryItem[] = [
  { title: "Chairs", imageUrl: "/presentation-img6.webp" },
  { title: "Sofas", imageUrl: "/presentation-img2.webp" },
  { title: "Tables", imageUrl: "/presentation-img5.webp" },
];

const Category: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <p className="text-sm m-3 mt-24 font-bold text-[#008060] uppercase">Compra por categoría</p>
      <section className="flex h-[400px] w-full gap-4">
      {categories.map((category) => (
        <div
          key={category.title}
          className={`relative flex-1 overflow-hidden rounded-lg transition-all duration-500 ${
            hovered === category.title ? "flex-[3]" : hovered ? "flex-[1]" : "flex-[2]"
          }`}
          onMouseEnter={() => setHovered(category.title)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Imagen */}
          <Image
            src={category.imageUrl}
            alt={category.title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300"
          />
          {/* Texto */}
          <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold bg-black bg-opacity-50 px-2 py-1 rounded">
            {category.title}
          </h3>
        </div>
      ))}
    </section>
    </>
  );
};

export default Category;
