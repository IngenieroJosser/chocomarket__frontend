"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { CartProduct, Order } from "@/types/typeDefinition";
import { normalizeImageUrl } from "@/helpers/url";
import { createShopInTheCart } from "@/services/products/productService";
import { useRouter } from "next/navigation";
import { Spinner } from "./Spinner";
import { toast, Bounce } from "react-toastify";

const ShoppingCart = () => {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(true);
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { id: userId } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

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
    return <p>Tu carrito está vacío</p>;
  }

  const handleCompletePurchase = async () => {
    if (!userId) {
      toast.error('Debes iniciar sesión para completar la compra');
      router.push('/login');
      return;
    }

    const orderData: Order = {
      userId,
      total: subtotal,
      status: 'PENDING',
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity || 1,
      })),
    };

    const response = await createShopInTheCart(orderData);

    if (response?.success) {
      router.push(`/checkout/${response.orderId}`); // Redirige al checkout
      return response;
    } else {
      throw new Error(
        response?.message || 'Hubo un error al procesar la compra'
      );
    }
  };

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
                <h3 className="font-semibold uppercase text-black">
                  {item.name}
                </h3>
                <p className="text-lg text-[#008060]">
                  ${item.price.toFixed(2)} COP
                </p>

                {/* Selector de cantidad */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.max((item.quantity || 1) - 1, 1)
                      )
                    }
                    className="px-2 py-1 bg-gray-800 hover:bg-gray-600 rounded-2xl"
                  >
                    -
                  </button>
                  <span className="text-emerald-600">{item.quantity || 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                    className="px-2 py-1 bg-gray-800 hover:bg-gray-600 rounded-2xl"
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
          <span className="text-black">Subtotal:</span>
          <span className="text-black">${subtotal.toFixed(2)} COP</span>
        </div>

        <div className="mt-8 space-y-4">
          <button
            className={`w-full cursor-pointer py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 shadow-md 
            ${
              !userId || loading || cart.length === 0
                ? "bg-green-300 text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={!userId || loading || cart.length === 0}
            onClick={async () => {
              setLoading(true);

              await toast.promise(
                handleCompletePurchase(),
                {
                  pending: "Agregando compra...",
                  success: "Compra registrada éxitosamente 💚",
                  error: "Error al realizar la compra ❌",
                },
                {
                  autoClose: 2000,
                  transition: Bounce,
                  progress: undefined,
                  closeOnClick: true,
                }
              );

              setLoading(false);
            }}
          >
            {loading ? <Spinner /> : "🛒 Finalizar compra"}
          </button>

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
