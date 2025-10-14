"use client";

import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div whileTap={{ scale: 0.98 }} className="bg-gray-800 rounded-2xl p-3">
      <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-md" />
      <h3 className="mt-2 text-sm font-semibold text-gray-100">{product.name}</h3>
      <div className="flex items-center justify-between mt-2">
        <div className="text-blue-400 font-semibold">${product.price}</div>
        <button
          onClick={() => addToCart(product, 1)}
          className="bg-blue-600 px-3 py-1 rounded-full text-white text-xs"
        >
          Add
        </button>
      </div>
    </motion.div>
  );
}
