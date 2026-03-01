"use client";

import { useCart } from "@/context/CartContext/page";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShoppingCart, Star, ShieldCheck, X } from "lucide-react";

export default function ProductCard({ product, index }) {
  const [showInfo, setShowInfo] = useState(false);
  const { addToCart, setShowAuthModal, setAuthAction } = useCart();
  const { data: session } = useSession();

  const handleAddToCart = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!session) {
      setAuthAction('login');
      setShowAuthModal(true);
      return;
    }

    const result = await addToCart(product, 1);

    if (result.success && !result.requiresAuth) {
      // Basic feedback
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-[100] text-xs font-bold animate-bounce';
      notification.innerText = "Added to cart!";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.05,
          duration: 0.3,
          ease: "easeOut",
        }}
        onClick={() => setShowInfo(true)}
        className="bg-zinc-900 border border-white/5 rounded-2xl p-3 shadow-xl shadow-black/50 
                   hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-xl bg-zinc-800 aspect-square">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          {product.price && parseFloat(product.price.toString().split(' ')[1]?.replace(/,/g, '')) > 5000 && (
            <div className="absolute top-2 left-2 bg-blue-600/90 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm">
              Premium
            </div>
          )}
        </div>

        <div className="px-1 mt-3 flex-1 flex flex-col">
          <div className="flex items-center gap-1 mb-1">
            <Star size={10} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] text-zinc-400 font-medium">4.8</span>
            <span className="text-[10px] text-zinc-600">(12)</span>
          </div>

          <h3 className="text-[13px] font-bold text-zinc-100 line-clamp-2 leading-tight min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-500">
            <ShieldCheck size={10} className="text-blue-500" />
            <span>Quality Verified</span>
          </div>

          <div className="flex items-center gap-2 mt-auto pt-3">
            <div className="text-blue-500 font-black text-sm tracking-tight flex-1">{product.price}</div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!session) {
                  setAuthAction('login');
                  setShowAuthModal(true);
                  return;
                }
                window.location.href = `/checkout?productId=${product.id}`;
              }}
              className="text-[10px] bg-white text-blue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100 transition shadow-sm"
            >
              Buy Now
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-colors shadow-lg shadow-blue-900/40"
            >
              <ShoppingCart size={14} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {showInfo && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="aspect-square bg-zinc-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500">(24 customer reviews)</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                  {product.name}
                </h2>

                <div className="text-2xl font-black text-blue-500 mb-4">
                  {product.price}
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-4">
                  {product.description || "Indulge in the perfect blend of style and performance. This premium product is designed to elevate your lifestyle with unmatched quality and attention to detail."}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (!session) {
                        setAuthAction('login');
                        setShowAuthModal(true);
                        return;
                      }
                      window.location.href = `/checkout?productId=${product.id}`;
                    }}
                    className="flex-1 bg-white text-blue-600 py-3 rounded-2xl font-bold hover:bg-gray-100 transition shadow-lg active:scale-95"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => { handleAddToCart(); setShowInfo(false); }}
                    className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-500 transition shadow-lg shadow-blue-900/40 active:scale-95"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
