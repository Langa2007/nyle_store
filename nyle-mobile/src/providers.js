"use client";

import { CartProvider } from "./context/CartContext";
// ⬆️  Adjust this import path if your CartContext is in a different folder

export default function Providers({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
