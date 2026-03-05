"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState({ items: [], cart_id: null });
  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState(null); // 'login' or 'register'

  // Get or create session ID
  const getSessionId = () => {
    if (typeof window === 'undefined') return null;
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  // Get current user ID if logged in
  const getUserId = useCallback(() => {
    if (status === "authenticated" && session?.user?.id) {
      return String(session.user.id);
    }

    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('accessToken') || localStorage.getItem('userAccessToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        if (user.id) {
          return String(user.id);
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [status, session]);

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    try {
      const userId = getUserId();
      const sessionId = userId ? null : getSessionId();

      const params = new URLSearchParams();
      if (userId) params.append('user_id', userId);
      if (sessionId) params.append('session_id', sessionId);

      const res = await fetch(`${API_URL}/api/cart?${params}`);
      if (!res.ok) throw new Error('Failed to fetch cart');

      const data = await res.json();
      setCart(data);
      return data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Fallback to localStorage for guest
      if (!getUserId() && typeof window !== 'undefined') {
        const localCart = JSON.parse(localStorage.getItem('local_cart') || '[]');
        setCart({ items: localCart, cart_id: null });
      }
    }
  }, [getUserId]);

  // Add item to cart
  const addToCart = async (product, quantity = 1, options = {}) => {
    const userId = getUserId();
    const sessionId = userId ? null : getSessionId();

    // If user is not logged in, handle guest cart
    if (!userId) {
      setAuthAction('login');
      setShowAuthModal(true);
      return { success: false, requiresAuth: true };
    }


    // User is logged in, add to backend
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/cart/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
        }
  };

      // Update item quantity
      const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;

        const userId = getUserId();

        if (!userId) {
          // Update in localStorage
          const localCart = JSON.parse(localStorage.getItem('local_cart') || '[]');
          const updatedCart = localCart.map(item =>
            item.product_id === itemId ? { ...item, quantity } : item
          ).filter(item => item.quantity > 0);

          localStorage.setItem('local_cart', JSON.stringify(updatedCart));
          setCart({ ...cart, items: updatedCart });
          return;
        }

        try {
          const res = await fetch(`${API_URL}/api/cart/items/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
          });

          if (res.ok) {
            fetchCart();
          }
        } catch (error) {
          console.error('Error updating quantity:', error);
        }
      };

      // Remove item from cart
      const removeItem = async (itemId) => {
        const userId = getUserId();

        if (!userId) {
          // Remove from localStorage
          const localCart = JSON.parse(localStorage.getItem('local_cart') || '[]');
          const updatedCart = localCart.filter(item => item.product_id !== itemId);
          localStorage.setItem('local_cart', JSON.stringify(updatedCart));
          setCart({ ...cart, items: updatedCart });
          return;
        }

        try {
          const res = await fetch(`${API_URL}/api/cart/items/${itemId}`, {
            method: 'DELETE'
          });

          if (res.ok) {
            fetchCart();
          }
        } catch (error) {
          console.error('Error removing item:', error);
        }
      };

      // Sync local cart with backend after login
      const syncCartAfterLogin = async (userId) => {
        const localCart = JSON.parse(localStorage.getItem('local_cart') || '[]');

        if (localCart.length > 0) {
          try {
            const res = await fetch(`${API_URL}/api/cart/sync`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: userId,
                items: localCart.map(item => ({
                  product_id: item.product_id,
                  quantity: item.quantity
                }))
              })
            });

            if (res.ok) {
              localStorage.removeItem('local_cart');
              fetchCart();
            }
          } catch (error) {
            console.error('Error syncing cart:', error);
          }
        }
      };

      // Clear cart
      const clearCart = async () => {
        const userId = getUserId();

        if (!userId) {
          localStorage.removeItem('local_cart');
          setCart({ items: [], cart_id: null });
          return;
        }

        // For backend cart, remove items one by one (or you could add a clear endpoint)
        if (cart.items.length > 0) {
          for (const item of cart.items) {
            await removeItem(item.id);
          }
        }
      };

      // Calculate totals
      const getCartTotals = () => {
        const subtotal = cart.items.reduce((sum, item) => {
          return sum + (Number(item.price) * item.quantity);
        }, 0);

        const shipping = subtotal > 5000 ? 0 : 300; // Free shipping over 5000
        const tax = subtotal * 0.16; // 16% VAT
        const total = subtotal + shipping + tax;

        return {
          subtotal: subtotal.toFixed(2),
          shipping: shipping.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2),
          itemCount: cart.items.reduce((count, item) => count + item.quantity, 0)
        };
      };

      // Initial fetch
      useEffect(() => {
        fetchCart();
      }, [fetchCart]);

      return (
        <CartContext.Provider value={{
          cart,
          loading,
          showCart,
          setShowCart,
          showAuthModal,
          setShowAuthModal,
          authAction,
          setAuthAction,
          addToCart,
          updateQuantity,
          removeItem,
          clearCart,
          getCartTotals,
          syncCartAfterLogin,
          fetchCart
        }}>
          {children}
        </CartContext.Provider>
      );
    }

export const useCart = () => useContext(CartContext);
