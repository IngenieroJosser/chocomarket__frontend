import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { CartProduct } from "@/types/typeDefinition";
import { normalizeImageUrl } from "@/helpers/url";
import { toast } from "sonner";

const ShoppingCart = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(true);
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleRemove = (id: number) => {
    removeFromCart(id);
    toast.success("Producto eliminado del carrito");
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return <p className="text-center">Tu carrito está vacío</p>;
  }

  return (
    <>
      <div className="space-y-4">
        {cart.map((item: CartProduct) => (
          <div key={item.id} className="border-b pb-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <Image
                  src={normalizeImageUrl(item.imageUrl!)}
                  width={200}
                  height={200}
                  alt={item.name}
                />
                <h3 className="font-semibold uppercase">{item.name}</h3>
                <p className="text-lg">${item.price.toFixed(2)} COP</p>

                {/* Selector de cantidad */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.max((item.quantity || 1) - 1, 1)
                      )
                    }
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-600 border-b-2 p-3 text-white hover:font-bold text-sm cursor-pointer transition-all duration-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Totales y acciones */}
      <div className="mt-10 space-y-6">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)} COP</span>
        </div>

        {/* Botones con nuevo estilo y disposición */}
        <div className="mt-8 space-y-4">
          {/* Botón principal centrado */}
          <button
            className="w-full cursor-pointer bg-green-600 text-white py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-green-700 shadow-md"
            onClick={() => toast.info("Proceso de compra aún no implementado")}
          >
            🛒 Finalizar Compra
          </button>

          {/* Botones secundarios en fila */}
          <div className="flex flex-wrap gap-4 justify-between">
            <button
              onClick={toggleCart}
              className="cursor-pointer flex-1 border border-green-600 text-green-700 bg-white py-2 px-4 rounded-xl transition-all hover:bg-green-50 font-medium"
            >
              🛍️ Seguir Comprando
            </button>

            <button
              onClick={() => {
                clearCart();
                toast.success("Carrito vaciado");
              }}
              className="cursor-pointer flex-1 border border-red-500 text-red-600 bg-white py-2 px-4 rounded-xl transition-all hover:bg-red-50 font-medium"
            >
              🗑️ Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
