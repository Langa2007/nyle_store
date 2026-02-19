"use client";

import { useCart } from "@/context/mobile-v2/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

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
      className="bg-zinc-900 border border-white/5 rounded-2xl p-2.5 shadow-xl shadow-black/50 
                 hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="px-1 mt-3">
        <h3 className="text-[13px] font-medium text-zinc-100 line-clamp-1 leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2.5">
          <div className="text-blue-500 font-bold text-sm tracking-tight">{product.price}</div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={(e) => { e.preventDefault(); addToCart(product, 1); }}
            className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg transition-colors"
          >
            <ShoppingCart size={14} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
