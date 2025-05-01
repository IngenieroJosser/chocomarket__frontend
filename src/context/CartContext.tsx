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

  const addToCart = (product: Product) => {
    setCart((prev: Product[]) => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((removeProduct) => removeProduct.filter((item) => item.id !== productId));
  };

  const findProductFromCart = (productId: number) => {
    return cart.find((foundProduct) => foundProduct.id === productId);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
