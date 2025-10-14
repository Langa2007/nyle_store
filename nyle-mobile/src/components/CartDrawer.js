"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { X } from "lucide-react";

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  // Close with Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* drawer */}
          <motion.section
            className="fixed left-0 right-0 bottom-0 z-50 bg-white text-gray-900 rounded-t-2xl shadow-xl max-h-[80vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button onClick={() => setIsOpen(false)} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {items.length === 0 && (
                <div className="text-center text-gray-500 py-10">Your cart is empty</div>
              )}

              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1">
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">${it.price}</div>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(it.id, Math.max(1, (it.quantity || 1) - 1))}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >−</button>
                      <div className="px-3 py-1 border rounded">{it.quantity}</div>
                      <button
                        onClick={() => updateQuantity(it.id, (it.quantity || 1) + 1)}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >+</button>

                      <button onClick={() => removeFromCart(it.id)} className="ml-3 text-sm text-red-500">Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              {items.length > 0 && (
                <>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="text-lg font-semibold">${totalPrice.toFixed(2)}</div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => {
                        // Placeholder checkout - wire to real checkout flow later
                        alert("Proceed to checkout (stub)");
                      }}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                      Checkout
                    </button>

                    <button
                      onClick={() => clearCart()}
                      className="w-full border border-gray-200 py-2 rounded-lg text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
