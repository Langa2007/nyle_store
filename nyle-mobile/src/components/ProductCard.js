"use client";

import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-800 rounded-2xl shadow-lg p-3 flex flex-col items-center cursor-pointer transition-all"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-cover rounded-xl"
      />
      <h3 className="mt-2 text-sm font-semibold text-gray-100 text-center line-clamp-1">
        {product.name}
      </h3>
      <p className="text-blue-400 font-bold mt-1">${product.price}</p>
      <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-500">
        Add to Cart
      </button>
    </motion.div>
  );
}
