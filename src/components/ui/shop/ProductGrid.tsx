"use client";

import { Product } from "@/types/typeDefinition";
import Image from "next/image";
import { normalizeImageUrl } from "@/helpers/url";

type ProductGridProps = {
  products?: Product[];
};

const ProductGrid = ({ products = [] }: ProductGridProps) => {
  if (!products.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-[#f9f9f9]">
      {products.map((product) => {
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
                  No Image
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

              <button className="px-1 py-2.5 bg-[#008060]/10 text-[#008060] rounded-full text-xs cursor-pointer hover:bg-[rgba(0,128,96,.3)]">Seleccionar</button>

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
