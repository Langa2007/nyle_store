"use client";
import { motion } from "framer-motion";

export default function CartPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-gray-200"
    >
      <h1 className="text-xl font-bold mb-2">Cart</h1>
      <p>Your shopping cart is empty.</p>
    </motion.div>
  );
}
