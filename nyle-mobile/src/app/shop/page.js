"use client";

import { motion } from "framer-motion";
import MobileLayout from "../mobile-layout";
import ProductCard from "../../components/ProductCard";

// ✅ Local price conversion — temporary until global rollout
const convertToKES = (usd) => Math.round(usd * 130); // Example conversion rate

const products = [
  { id: 1, name: "Wireless Earbuds", price: 49.99, image: "/images/earbuds.jpg" },
  { id: 2, name: "Smart Watch", price: 89.99, image: "/images/smartwatch.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 59.99, image: "/images/speaker.jpg" },
  { id: 4, name: "Gaming Mouse", price: 29.99, image: "/images/mouse.jpg" },
  { id: 5, name: "Mini Drone", price: 129.99, image: "/images/drone.jpg" },
  { id: 6, name: "Portable Charger", price: 39.99, image: "/images/powerbank.jpg" },
];

export default function ShopPage() {
  const currency = "KES";

  return (
    <MobileLayout>
      <h1 className="text-2xl font-bold text-blue-400 mb-4">Shop</h1>

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
              price: `${currency} ${convertToKES(p.price).toLocaleString("en-KE")}`,
            }}
          />
        ))}
      </motion.div>
    </MobileLayout>
  );
}
