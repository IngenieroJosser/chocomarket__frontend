import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { CartProduct } from "@/types/typeDefinition";
import { normalizeImageUrl } from "@/helpers/url";
import { toast } from "sonner";

const ShoppingCart = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(true); // Si el carrito está abierto
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
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full">
            {/* Lista de productos */}
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
                            updateQuantity(item.id, Math.max((item.quantity || 1) - 1, 1))
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

              {/* Botones en columna */}
              <div className="flex flex-col gap-4 items-stretch">
                {/* Botón principal: Finalizar compra */}
                <button
                  className="w-full bg-[#008060] text-white py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:bg-[#00694d] shadow-md hover:shadow-lg"
                  onClick={() => toast.info("Proceso de compra aún no implementado")}
                >
                  🛒 Finalizar Compra
                </button>

                {/* Botón secundario: Seguir comprando */}
                <button
                  onClick={toggleCart}
                  className="w-full bg-[#E5F2EF] text-[#008060] py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-105 hover:bg-[#d3ece5] shadow-sm hover:shadow-md"
                >
                  🛍️ Seguir Comprando
                </button>

                {/* Botón de advertencia: Vaciar carrito */}
                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Carrito vaciado");
                  }}
                  className="w-full bg-red-100 text-red-700 py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-105 hover:bg-red-200 shadow-sm hover:shadow-md"
                >
                  🗑️ Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
