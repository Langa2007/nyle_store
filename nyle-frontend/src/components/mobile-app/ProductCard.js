"use client";

import { useCart } from "@/context/CartContext/page";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ShieldCheck } from "lucide-react";

export default function ProductCard({ product, index }) {
  const { addToCart, setShowAuthModal, setAuthAction } = useCart();
  const { data: session } = useSession();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: "easeOut",
      }}
      className="bg-zinc-900 border border-white/5 rounded-2xl p-3 shadow-xl shadow-black/50 
                 hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full"
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

        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="text-blue-500 font-black text-sm tracking-tight">{product.price}</div>

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
  );
}
