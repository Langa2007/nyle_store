import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MobileLayout from "../mobile-layout";
import ProductCard from "../../components/ProductCard";
import { fetchWithAuth, API_ENDPOINTS } from "../../lib/api";

const currency = "KES";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchWithAuth(API_ENDPOINTS.PRODUCTS);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);
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
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No products found.</div>
      ) : (
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
                price: `${currency} ${Number(p.price).toLocaleString()}`,
                image: p.image_url || "/images/placeholder.jpg"
              }}
            />
          ))}
        </motion.div>
      )}
    </MobileLayout>
  );
}
