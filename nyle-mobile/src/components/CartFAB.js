"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartFAB() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 right-4 z-50"
    >
      <Link href="/cart">
        <button className="bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-500 transition-colors relative">
          <ShoppingCart size={22} className="text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
            3
          </span>
        </button>
      </Link>
    </motion.div>
  );
}
