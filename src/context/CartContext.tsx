'use client'

import { createContext, useState, useContext, ReactNode } from "react";
import { Product } from '../types/typeDefinition';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  // función para añadir un producto al carrito de compra
  const addToCart = (product: Product) => {
    setCart((prev: Product[]) => [...prev, product]);
  };

  // función para remover un producto del carrito de compra
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // función para mostrar un producto del carrito de compra
  const findProductFromCart = (productId: number) => {
    return cart.find((foundProduct) => foundProduct.id === productId);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
