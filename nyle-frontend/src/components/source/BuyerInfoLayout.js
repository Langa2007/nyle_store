"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BuyerInfoLayout({ title, subtitle, children, icons = [] }) {
  const [mounted, setMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(400);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {mounted &&
        icons.map((icon, index) => (
          <motion.img
            key={index}
            src={icon}
            alt="floating icon"
            className="absolute w-12 md:w-16 opacity-30"
            initial={{
              y: Math.random() * 200 - 100,
              x: Math.random() * screenWidth - 150,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + index * 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}

      <div className="relative z-10 max-w-3xl bg-white shadow-xl rounded-2xl p-8 md:p-12 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-lg text-gray-600 mb-6"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-700 text-left leading-relaxed space-y-4"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
