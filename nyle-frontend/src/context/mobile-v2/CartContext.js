"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState('login');

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const syncCartAfterLogin = async (userId) => {
    // Basic sync logic using local state
    if (cart.length > 0) {
      try {
        const res = await fetch(`${API_URL}/cart/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            items: cart.map(item => ({
              product_id: item.id,
              quantity: item.quantity || 1
            }))
          })
        });

        if (res.ok) {
          // Clear local cart if synced successfully
          // setCart([]); 
        }
      } catch (error) {
        console.error('Error syncing cart:', error);
      }
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      showAuthModal,
      setShowAuthModal,
      authAction,
      setAuthAction,
      syncCartAfterLogin
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: [],
      showAuthModal: false,
      setShowAuthModal: () => { },
      authAction: 'login',
      setAuthAction: () => { },
      addToCart: () => { },
      removeFromCart: () => { },
      syncCartAfterLogin: () => { }
    };
  }
  return context;
}
