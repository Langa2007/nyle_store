"use client";

import { useCart } from "@/context/CartContext/page";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Zap, Truck } from "lucide-react";
import { FaStar, FaFire } from "react-icons/fa";
import { useState } from "react";

export default function MobileProductCard({ product, index }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    // Handle price conversion/display
    const priceNum = typeof product.price === 'number' ? product.price : parseFloat(product.price?.toString().replace(/[^0-9.]/g, '') || '0');
    const priceFormatted = `KES ${priceNum.toLocaleString()}`;
    const originalPrice = `KES ${(priceNum * 1.25).toLocaleString()}`;
    const discount = Math.round(((priceNum * 1.25 - priceNum) / (priceNum * 1.25)) * 100);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        await addToCart(product, 1);
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: (index % 10) * 0.05,
                duration: 0.5,
            }}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50/50 flex flex-col h-full active:scale-[0.98] transition-all"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-blue-50/30">
                <img
                    src={product.image_url || product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FaStar className="text-yellow-400 text-[10px]" />
                    <span className="text-[10px] font-bold text-gray-800">4.8</span>
                </div>

                {/* Favorite/Action */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors">
                    <Plus size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-grow">
                <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-1 opacity-80">
                    {product.category || "General"}
                </span>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-2 flex-grow">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 line-through font-medium">
                            {originalPrice}
                        </span>
                        <span className="text-blue-700 font-black text-base tracking-tight">
                            {priceFormatted}
                        </span>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={handleAddToCart}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-300 ${isAdding
                                ? "bg-green-500 shadow-green-200 rotate-[360deg]"
                                : "bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-100"
                            }`}
                    >
                        {isAdding ? <Zap size={18} fill="white" /> : <Plus size={20} />}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
