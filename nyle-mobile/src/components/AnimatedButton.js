"use client";
import { motion } from "framer-motion";

export default function AnimatedButton({ label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="bg-teal-600 text-white py-2 px-4 rounded-xl shadow-md w-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {label}
    </motion.button>
  );
}
