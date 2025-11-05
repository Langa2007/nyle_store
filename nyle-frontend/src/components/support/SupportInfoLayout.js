"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SupportInfoLayout({ title, subtitle, children, icons = [] }) {
  const [mounted, setMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(400);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") setScreenWidth(window.innerWidth);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col overflow-hidden">
      {/* 🌊 Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-14 shadow-lg relative z-10">
        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-3 text-base md:text-lg text-blue-100 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* ✨ Floating Icons (optional aesthetic) */}
      {mounted &&
        icons.map((icon, index) => (
          <motion.img
            key={index}
            src={icon}
            alt="floating icon"
            className="absolute w-10 md:w-14 opacity-25"
            initial={{
              y: Math.random() * 150 - 75,
              x: Math.random() * screenWidth - 100,
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

      {/* 📘 Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto mt-12 mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 text-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-left leading-relaxed space-y-5"
        >
          {children}
        </motion.div>
      </div>

      {/* 📞 Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-auto relative z-20">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Need Help?</h4>
            <p className="text-sm flex items-center justify-center md:justify-start gap-2">
              <HelpCircle size={16} className="text-blue-400" />
              <Link
                href="/support/contact"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-all duration-200"
              >
                Contact our Support Team
              </Link>
            </p>
          </div>
          <div className="text-sm opacity-70">
            © {new Date().getFullYear()} Nyle Marketplace. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 🌊 Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-40 text-blue-500 opacity-25"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,96L40,128C80,160,160,224,240,229.3C320,235,400,181,480,154.7C560,128,640,128,720,122.7C800,117,880,107,960,128C1040,149,1120,203,1200,218.7C1280,235,1360,213,1400,202.7L1440,192L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
