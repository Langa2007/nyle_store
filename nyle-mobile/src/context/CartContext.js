"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Defensive fallback to prevent build-time SSR crash
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
    };
  }
  return context;
}
