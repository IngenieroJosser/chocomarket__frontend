"use client";

import { useState } from "react";
import Link from "next/link";

const MainProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const productGrid = [
    {
      img: "/presentation-img3.webp",
      name: "Producto1",
      price: `$3909 COP`,
    },
    {
      img: "/presentation-img1.webp",
      name: "Producto2",
      price: `$3909 COP`,
    },
    {
      img: "/presentation-img2.webp",
      name: "Producto3",
      price: `$3909 COP`,
    },
    {
      img: "/presentation-img4.webp",
      name: "Producto4",
      price: `$3909 COP`,
    },
    {
      img: "/presentation-img5.webp",
      name: "Producto5",
      price: `$3909 COP`,
    },
  ];

  return (
    <section className="p-10 mt-10">
      {/* Header */}
      <div className="flex flex-col my-[2em] md:flex-row md:justify-between gap-4 md:gap-8 mb-3.5">
        <h3 className="font-bold mb-2 md:mb-0 uppercase text-[#008060]">
          Tus Productos
        </h3>
        <Link
          href="/shop"
          className="bg-black rounded-md px-5 py-5 text-white text-center md:text-left transition-all ease-in-out hover:bg-[rgba(0,128,96,.89)]"
        >
          Compra tus productos
        </Link>
      </div>

      {/* Productos */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productGrid.map((product, index) => (
          <div
            key={index}
            className="bg-white relative group rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative group">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <button
                aria-label="Botón para seleccionar el producto y ver vista previa de él"
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,.6)] text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Vista previa
              </button>
            </div>
            <div className="p-4 uppercase bg-white dark:bg-[rgba(0,0,0,.8)] transition-colors duration-300 rounded-lg">
              <h3 className="text-lg font-semibold border-b-2 border-transparent hover:border-[#008060] transition-all duration-300 text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,.6)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg p-12 max-w-md w-full animate-fade-in">
            <div className="relative">
              <button
                aria-label="Botón de modal para cerrar el contenido del producto seleccionado"
                onClick={() => setSelectedProduct(null)}
                className=" cursor-pointer absolute top-2 right-2 text-[#ff0000] w-8 h-8 flex items-center justify-center font-bold hover:bg-red-300 transition"
              >
                ✕
              </button>
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-dvw h-96 object-cover mb-4"
              />
              <h2 className="text-2xl uppercase font-bold text-[#008060] mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-[#5A3E29] font-medium mb-2">
                {selectedProduct.price}
              </p>
              <p className="text-sm text-gray-600">
                Este es un producto de excelente calidad, ideal para tu espacio
                de trabajo o descanso. Disponible por tiempo limitado.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainProduct;
