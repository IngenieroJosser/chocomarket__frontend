import { useState } from "react";
import Image from "next/image";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bay Armchair",
      image: "/presentation-img3.webp",
      price: 449.0,
      color: "Green",
      quantity: 3,
    },
    {
      id: 2,
      name: "Producto 2",
      image: "/presentation-img2.webp",
      price: 479.0,
      color: "Blue",
      quantity: 1,
    },
    {
      id: 3,
      name: "Producto3",
      image: "/presentation-img1.webp",
      price: 549.0,
      color: "Green",
      quantity: 7,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <>
      <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Image
                            src={item.image}
                            width={200}
                            height={200}
                            alt={item.name}
                          />
                          <h3 className="font-semibold uppercase">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Color: {item.color}
                          </p>
                          <p className="text-lg">
                            ${item.price.toFixed(2)} CAD
                          </p>
                        </div>
                        <button
                          aria-label="Botón para eliminar algunos productos del carrito de compras"
                          onClick={() => removeItem(item.id)}
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
                      $
                      {cartItems
                        .reduce((sum, item) => sum + item.price, 0)
                        .toFixed(2)}{" "}
                      COP
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Impuestos incluidos y envío calculado al finalizar
                  </p>

                  <button aria-label="Botón para finalizar compras" className="w-full bg-[#008060] cursor-pointer text-white py-3 rounded hover:bg-[#00694d] transition-colors">
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
