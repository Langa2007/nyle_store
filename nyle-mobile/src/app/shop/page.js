"use client";

import { motion } from "framer-motion";
import MobileLayout from "../mobile-layout";
import ProductCard from "../../components/ProductCard";

// ✅ Temporary currency conversion (until dynamic currency detection)
const convertToKES = (usd) => Math.round(usd * 130);
const currency = "KES";

const products = [
  { id: 1, name: "Wireless Earbuds", price: 49.99, image: "/images/earbuds.jpg" },
  { id: 2, name: "Smart Watch", price: 89.99, image: "/images/smartwatch.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 59.99, image: "/images/speaker.jpg" },
  { id: 4, name: "Gaming Mouse", price: 29.99, image: "/images/mouse.jpg" },
  { id: 5, name: "Mini Drone", price: 129.99, image: "/images/drone.jpg" },
  { id: 6, name: "Portable Charger", price: 39.99, image: "/images/powerbank.jpg" },
];

export default function ShopPage() {
  return (
    <MobileLayout>
      {/* 🔹 Nyle Luxe Store Header (Left-aligned) */}
      <div className="flex flex-col items-start mb-6 mt-2 px-2">
        <motion.h1
          className="text-3xl font-bold italic tracking-tight text-blue-400"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontStyle: "italic",
            letterSpacing: "-1px",
            textShadow: "0 0 10px rgba(59,130,246,0.5)",
          }}
        >
          <span className="font-extrabold text-blue-300">Nyle</span>
          <span className="text-blue-500 ml-1">Luxe</span>
          <span className="text-gray-300 ml-1">Store</span>
        </motion.h1>

        {/* 🔍 Placeholder for upcoming search bar */}
        <div className="mt-4 w-full pr-3">
          <input
            type="text"
            placeholder="Search by category..."
            className="w-full rounded-full bg-gray-800 text-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <motion.div
        className="grid grid-cols-2 gap-3 pb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            index={i}
            product={{
              ...p,
              price: `${currency} ${convertToKES(p.price).toLocaleString()}`,
            }}
          />
        ))}
      </motion.div>
    </MobileLayout>
  );
}
