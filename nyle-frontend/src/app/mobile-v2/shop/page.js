"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/mobile-app/ProductCard";
import { fetchWithAuth, API_ENDPOINTS } from "@/lib/mobile-app/api";

const currency = "KES";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Auto-scroll state for category bar
  const scrollRef = useRef(null);
  const animFrameRef = useRef(null);
  const isPausedRef = useRef(false);
  const lastScrollY = useRef(0);
  const scrollDirectionRef = useRef(1); // 1 = right, -1 = left

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

  // Auto-scroll category bar continuously left or right
  const startAutoScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const step = () => {
      if (!isPausedRef.current && el) {
        const maxScroll = el.scrollWidth - el.clientWidth;

        if (el.scrollLeft >= maxScroll - 2) {
          scrollDirectionRef.current = -1;
        } else if (el.scrollLeft <= 2) {
          scrollDirectionRef.current = 1;
        }

        el.scrollLeft += scrollDirectionRef.current * 0.8;
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    // Delay start so content is ready
    const timeout = setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(step);
    }, 1500);

    return () => {
      clearTimeout(timeout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const cleanup = startAutoScroll();
    return cleanup;
  }, [categories, startAutoScroll]);

  // Pause auto-scroll on touch, resume on lift
  const handleTouchStart = () => { isPausedRef.current = true; };
  const handleTouchEnd = () => {
    setTimeout(() => { isPausedRef.current = false; }, 1500);
  };

  // Scroll category bar position when page scrolls up/down
  useEffect(() => {
    const handleWindowScroll = () => {
      const el = scrollRef.current;
      if (!el) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Shift category bar in opposite direction of scroll
      el.scrollLeft += delta * 0.8;
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category_id === activeCategory || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      {/*  Nyle Luxe Header */}
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

      {/*  Animated Categories Bar */}
      <div className="sticky top-16 z-30 bg-gray-950/80 backdrop-blur-md py-4 mb-2">
        {/* Soft edge fades to hint scrollability */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-gray-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-gray-950 to-transparent" />

          <div
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex overflow-x-auto gap-3 px-4 no-scrollbar scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex-shrink-0 ${activeCategory === "all"
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/40"
                : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
            >
              All Products
            </button>

            {categories.map((cat) => (
              <motion.button
                key={cat.id || cat._id}
                onClick={() => {
                  isPausedRef.current = true;
                  setActiveCategory(prev => prev === (cat.id || cat.name) ? "all" : (cat.id || cat.name));
                  setTimeout(() => { isPausedRef.current = false; }, 2000);
                }}
                whileTap={{ scale: 0.93 }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex-shrink-0 ${activeCategory === (cat.id || cat.name)
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/40"
                  : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                  }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/*  Product Grid */}
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
