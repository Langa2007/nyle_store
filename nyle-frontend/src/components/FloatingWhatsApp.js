"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/254704521408"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center z-[100] group"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="text-white fill-white" size={32} />
      <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
        Chat with Support
      </span>
      <span className="absolute flex h-full w-full rounded-full bg-[#25D366] opacity-20 animate-ping -z-10" />
    </motion.a>
  );
}
