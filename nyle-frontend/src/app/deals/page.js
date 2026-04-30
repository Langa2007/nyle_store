"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getProducts } from "../../services/productService";
import { useCart } from "@/context/CartContext/page";
import ClientProviders from "../../components/ClientProviders";
import { motion } from "framer-motion";
import { 
  FaBolt, FaStar, FaShoppingCart, FaArrowLeft, FaFilter, 
  FaTag, FaFire, FaClock, FaShieldAlt, FaTruck 
} from "react-icons/fa";

function DealsContent() {
  const { addToCart } = useCart();
  const [currency] = useState("KES");
  const [exchangeRate] = useState(1);

  const { data: rawHotDeals, isLoading } = useQuery({
    queryKey: ["hot-deals-page"],
    queryFn: () => getProducts({ is_hot_deal: true }),
    staleTime: 5 * 60 * 1000,
  });

  const hotDeals = Array.isArray(rawHotDeals) ? rawHotDeals : (rawHotDeals?.products || rawHotDeals?.items || []);

  const convertPrice = (price) => (price * exchangeRate).toFixed(2);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-bold">Uncovering the hottest deals for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-400 via-orange-600 to-red-500 text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <FaBolt className="absolute top-10 left-10 text-9xl rotate-12" />
          <FaFire className="absolute bottom-10 right-10 text-9xl -rotate-12" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition group">
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
             HOT DEALS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-orange-100 max-w-2xl"
          >
            Don't miss out on these exclusive, limited-time offers. Quality products at unbeatable prices, just for you.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10">
        {/* Stats/Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-xl flex items-center space-x-4 border-l-4 border-red-500">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Limited Time</p>
              <p className="text-xl font-bold text-gray-900">Ends Soon</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl flex items-center space-x-4 border-l-4 border-orange-500">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xl">
              <FaTag />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Discounts</p>
              <p className="text-xl font-bold text-gray-900">Up to 70% Off</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl flex items-center space-x-4 border-l-4 border-green-500">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
              <FaShieldAlt />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Guarantee</p>
              <p className="text-xl font-bold text-gray-900">100% Authentic</p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Showing <span className="text-red-600">{hotDeals.length}</span> Exclusive Offers
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Sort by:</span>
            <select className="bg-white border-0 rounded-lg px-4 py-2 shadow-md focus:ring-2 focus:ring-red-500 font-medium">
              <option>Highest Discount</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Deals Grid */}
        {hotDeals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-200">
            <FaBolt className="text-6xl text-gray-200 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400">No Hot Deals right now</h3>
            <p className="text-gray-500 mt-2">Check back later for fresh discounts!</p>
            <Link href="/products" className="inline-block mt-8 bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotDeals.map((product, index) => {
              // Smart discount % calculation
              const discountPct = product.discount_percentage
                ? Math.round(product.discount_percentage)
                : product.original_price && product.price < product.original_price
                ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
                : null;

              const savings = product.original_price && product.price < product.original_price
                ? convertPrice(product.original_price - product.price)
                : null;

              return (
                <motion.div
                  key={product.id || product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/products/${product.id || product._id}`}>
                    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 relative h-full flex flex-col">

                      {/* Badges — stacked */}
                      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                        {discountPct && (
                          <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg shadow-red-900/20">
                            {discountPct}% OFF
                          </span>
                        )}
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                           Hot Deal
                        </span>
                      </div>

                      {/* Image Area */}
                      <div className="relative h-56 overflow-hidden bg-gray-50 flex-shrink-0">
                        <img
                          src={product.image_url || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all"></div>

                        {/* Hover quick-add */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.preventDefault(); e.stopPropagation();
                              addToCart(product, 1);
                            }}
                            className="bg-white text-red-600 p-4 rounded-full shadow-2xl hover:bg-red-600 hover:text-white transition transform -translate-y-4 group-hover:translate-y-0 duration-300"
                          >
                            <FaShoppingCart className="text-xl" />
                          </button>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5 flex-grow flex flex-col">
                        {product.vendor_name && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">{product.vendor_name}</span>
                        )}
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-3 leading-snug flex-1">
                          {product.name}
                        </h3>

                        {/* Pricing row */}
                        <div className="flex items-end gap-2 mb-1">
                          <div className="text-xl font-black text-red-600">
                            {currency} {convertPrice(product.price)}
                          </div>
                          {product.original_price && product.original_price > product.price && (
                            <div className="text-sm text-gray-400 line-through mb-0.5">
                              {currency} {convertPrice(product.original_price)}
                            </div>
                          )}
                        </div>

                        {/* Savings pill */}
                        {savings && (
                          <p className="text-xs font-bold text-green-600 bg-green-50 rounded-lg px-2 py-1 mb-3 inline-block">
                            Save {currency} {savings}
                          </p>
                        )}

                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={11} className={i < Math.round(product.rating || 4.5) ? 'text-yellow-400' : 'text-gray-200'} />
                          ))}
                          <span className="text-xs text-gray-400 ml-1">({product.review_count || '24'})</span>
                        </div>

                        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <FaTruck className="mr-1.5 text-green-500" />
                            <span>Express Delivery</span>
                          </div>
                          <span className="text-red-500 font-bold">Only {product.stock || 5} left!</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DealsPage() {
  return (
    <ClientProviders>
      <DealsContent />
    </ClientProviders>
  );
}
