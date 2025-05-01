import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/typeDefinition";
import { normalizeImageUrl } from "@/helpers/url";

const ShoppingCart = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(true);

  const { cart, removeFromCart } = useCart();
  
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  if (cart.length === 0) {
    return <p className="text-center">Tu carrito está vacio</p>;
  }

  return (
    <>
      <div className="space-y-4">
        {cart.map((item: Product) => (
          <div key={item.id} className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <Image
                  src={normalizeImageUrl(item.imageUrl!)}
                  width={200}
                  height={200}
                  alt={item.name}
                />
                <h3 className="font-semibold uppercase">{item.name}</h3>
                <p className="text-lg">${item.price.toFixed(2)} COP</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 border-b-2 p-3 text-white hover:font-bold text-sm cursor-pointer transition-all duration-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex justify-between font-semibold text-lg mb-4">
          <span>Subtotal:</span>
          <span>
            ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)} COP
          </span>
        </div>

        <button className="w-full bg-[#008060] text-white py-3 rounded hover:bg-[#00694d] transition-colors">
          Finalizar Compra
        </button>

        <button
          aria-label="Botón para seguir comprando"
          onClick={toggleCart}
          className="w-full mt-4 text-[#008060] cursor-pointer hover:text-[#00694d] underline"
        >
          Seguir comprando
        </button>
      </div>
    </>
  );
};

export default ShoppingCart;
