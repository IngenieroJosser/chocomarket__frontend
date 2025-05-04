'use client'

import { createContext, useState, useContext, ReactNode } from "react";
import { Product, CartProduct } from '../types/typeDefinition';

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
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
  const [cart, setCart] = useState<CartProduct[]>([]);
  

  const addToCart = (product: Product) => {
    setCart((prev: CartProduct[]) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };  

  const removeFromCart = (productId: number) => {
    setCart((removeProduct) => removeProduct.filter((item) => item.id !== productId));
  };

  const findProductFromCart = (productId: number) => {
    return cart.find((foundProduct) => foundProduct.id === productId);
  }

  const clearCart = () => {
    setCart([]);
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
