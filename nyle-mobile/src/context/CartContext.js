"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const LOCAL_KEY = "nyle_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load cart from localStorage", e);
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const index = prev.findIndex((p) => p.id === product.id);
      if (index > -1) {
        const copy = [...prev];
        copy[index].quantity += qty;
        return copy;
      }
      return [...prev, { ...product, quantity: qty }];
    });
    // optional: animate or show toast from caller
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) => prev.map(p => p.id === id ? { ...p, quantity } : p));
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setItems([]);

  // Example stub for server sync (call when online)
  const syncCart = async () => {
    try {
      // Replace with your API endpoint later
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/sync`, { method: 'POST', body: JSON.stringify(items) });
      console.log("Syncing cart to server (stub) — items:", items);
      return { ok: true };
    } catch (err) {
      console.error("Cart sync failed", err);
      return { ok: false, error: err };
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      setIsOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      syncCart,
      totalCount: items.reduce((s, it) => s + (it.quantity || 0), 0),
      totalPrice: items.reduce((s, it) => s + (it.quantity * (it.price || 0)), 0),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
