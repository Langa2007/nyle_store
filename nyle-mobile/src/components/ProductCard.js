"use client";

import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="bg-gray-800 rounded-2xl p-3 shadow-lg shadow-gray-900/30 
                 hover:shadow-blue-900/30 transition-all duration-200"
    >
      <motion.img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-cover rounded-md"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      <h3 className="mt-2 text-sm font-semibold text-gray-100 line-clamp-1">
        {product.name}
      </h3>

      <div className="flex items-center justify-between mt-2">
        <div className="text-blue-400 font-semibold">{product.price}</div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ boxShadow: "0 0 8px rgba(59,130,246,0.7)" }}
          onClick={() => addToCart(product, 1)}
          className="bg-blue-600 px-3 py-1 rounded-full text-white text-xs 
                     hover:bg-blue-500 transition-colors duration-150"
        >
          Add
        </motion.button>
      </div>
    </motion.div>
  );
}
