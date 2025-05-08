'use client';

import { Product } from "@/types/typeDefinition";
import Image from "next/image";
import { normalizeImageUrl } from "@/helpers/url";
import { useCart } from "@/context/CartContext";
import { toast, Bounce } from "react-toastify";
import { useMemo } from "react";

type ProductGridProps = {
  products?: Product[];
};

// Función para mezclar array (Fisher-Yates algorithm)
const shuffleArray = (array: Product[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ProductGrid = ({ products = [] }: ProductGridProps) => {
  const { addToCart } = useCart();

  // Mezclar productos solo cuando cambie el array original
  const shuffledProducts = useMemo(
    () => shuffleArray(products),
    [products] // Solo se recalcula cuando cambia products
  );

  if (!shuffledProducts.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {shuffledProducts.map((product) => { 
        const discountPrice = product.discount
          ? product.price * (1 - product.discount)
          : product.price;

        const formattedCategory = product.category
          .replace(/_/g, " ")
          .toLowerCase();

        return (
          <div
            key={product.id}
            className="bg-white shadow-md rounded overflow-hidden flex flex-col transition-transform hover:scale-[1.01]"
          >
            <div className="p-4 text-sm text-[#008060] uppercase tracking-wider font-semibold">
              {formattedCategory}
            </div>

            <div className="px-4">
              {product.imageUrl ? (
                <div className="relative w-full h-48 overflow-hidden rounded-2xl">
                  <Image
                    src={normalizeImageUrl(product.imageUrl!)}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  Sin imagen disponible
                </div>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="text-gray-600 mt-1 text-sm">
                  {product.description}
                </p>

                <p className="mt-2">
                  {product.discount ? (
                    <>
                      <span className="line-through text-sm mr-2 text-[#ff0000]">
                        ${product.price.toFixed(2)} COP
                      </span>
                      <span className="text-[#008060] font-semibold">
                        ${discountPrice.toFixed(2)} COP
                      </span>
                    </>
                  ) : (
                    <span className="text-[#008060] font-semibold">
                      ${product.price.toFixed(2)} COP
                    </span>
                  )}
                </p>
              </div>

              <div className="text-xs text-gray-500">
                <span>Vendido por: </span>
                <span className="font-medium text-gray-700">
                  {product.user?.email || "Desconocido"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 bg-[#008060]/10 text-[#008060] rounded-full text-xs"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <button
                className="px-1 py-2.5 bg-[#008060]/10 text-[#008060] rounded-full text-xs cursor-pointer hover:bg-[rgba(0,128,96,.3)]"
                onClick={() => {
                  toast.promise(
                    new Promise<void>((resolve) => {
                      addToCart(product);
                      setTimeout(resolve, 1000);
                    }),
                    {
                      pending: "Agregando al carrito...",
                      success: "Producto agregado con éxito 💚",
                      error: "Error al agregar el producto ❌",
                    },
                    {
                      autoClose: 2000,
                      transition: Bounce,
                      progress: undefined,
                      closeOnClick: true,
                    }
                  );
                  
                }}
              >
                Seleccionar
              </button>

              {product.status === "INACTIVE" && (
                <span className="text-xs text-red-500 mt-2">
                  Este producto no está activo.
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
