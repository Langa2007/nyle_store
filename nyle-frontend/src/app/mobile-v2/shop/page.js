"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/mobile-app/ProductCard";
import { fetchWithAuth, API_ENDPOINTS } from "@/lib/mobile-app/api";

const currency = "KES";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodData, catData] = await Promise.all([
          fetchWithAuth(API_ENDPOINTS.PRODUCTS),
          fetchWithAuth(API_ENDPOINTS.CATEGORIES)
        ]);
        setProducts(prodData || []);
        setCategories(catData || []);
      } catch (err) {
        console.error("Failed to fetch shop data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category_id === activeCategory || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      {/* 🔹 Nyle Luxe Header */}
      <div className="px-4 pt-6 pb-2">
        <motion.h1
          className="text-2xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-blue-500">Nyle</span>
          <span className="text-gray-300 ml-1">Store</span>
        </motion.h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium mt-1">Premium Curated Essentials</p>
      </div>

      {/* 🏷️ Minimalist Categories */}
      <div className="sticky top-16 z-30 bg-gray-950/80 backdrop-blur-md py-4 mb-2">
        <div className="flex overflow-x-auto gap-3 px-4 no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${activeCategory === "all"
              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/40"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
              }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id || cat._id}
              onClick={() => setActiveCategory(cat.id || cat.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${activeCategory === (cat.id || cat.name)
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/40"
                : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="px-4">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-48 space-y-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-gray-500 font-medium">Curating your experience...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-gray-900/30 rounded-3xl border border-gray-800/50 mx-2">
            <p className="text-sm font-medium">Nothing found in this category.</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 text-xs text-blue-500 font-bold hover:underline"
            >
              BROWSING ALL
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {filteredProducts.map((p, i) => (
              <ProductCard
                key={p.id || p._id}
                index={i}
                product={{
                  ...p,
                  price: `${currency} ${Number(p.price).toLocaleString()}`,
                  image: p.image_url || p.image || "/images/placeholder.jpg"
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
