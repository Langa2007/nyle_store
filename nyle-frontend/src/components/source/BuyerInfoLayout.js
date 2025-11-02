"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BuyerInfoLayout({ title, subtitle, children }) {
  const icons = [
    "https://cdn-icons-png.flaticon.com/512/1995/1995574.png", // shipping box
    "https://cdn-icons-png.flaticon.com/512/2597/2597051.png", // quotation
    "https://cdn-icons-png.flaticon.com/512/810/810354.png",  // verified badge
    "https://cdn-icons-png.flaticon.com/512/484/484167.png",  // shield
    "https://cdn-icons-png.flaticon.com/512/2303/2303703.png", // truck
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 overflow-hidden relative">
      {/* Hero Section */}
      <div className="relative w-full py-24 text-center bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-lg overflow-hidden">
        {/* Floating Trade Icons */}
        {icons.map((icon, index) => (
          <motion.img
            key={index}
            src={icon}
            alt="floating icon"
            className="absolute w-12 md:w-16 opacity-30"
            initial={{
              y: Math.random() * 200 - 100,
              x: Math.random() * window.innerWidth - 150,
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

        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-5xl md:text-6xl font-extrabold tracking-tight mb-4 z-10 drop-shadow-md"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative text-lg md:text-xl text-blue-100 max-w-2xl mx-auto z-10"
        >
          {subtitle}
        </motion.p>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-12"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39 56.44C160.95 65.41 0 120 0 120h1200V0S873.46 47.13 674.28 42.69c-129.2-2.85-253.86-17.23-352.89 13.75z"
              fill="white"
            ></path>
          </svg>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-5xl mx-auto py-16 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100"
        >
          {children}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-700 mb-4 text-lg">
            Have products to sell instead?
          </p>
          <Link
            href="/vendor/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform hover:scale-105"
          >
            Become a Seller on Nyle
          </Link>
        </div>
      </div>
    </div>
  );
}
