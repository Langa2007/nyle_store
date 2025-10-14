"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartFAB() {
  const { totalCount, setIsOpen } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-24 right-4 z-50"
    >
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open cart"
        className="bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-500 relative"
      >
        <ShoppingCart size={22} className="text-white" />
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
            {totalCount}
          </span>
        )}
      </button>
    </motion.div>
  );
}
