"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext/page';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag, FiShield, FiTruck, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart, getCartTotals, loading } = useCart();
  const totals = getCartTotals();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || localStorage.getItem('userAccessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  if (cart.items.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="w-32 h-32 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
                <FiShoppingBag className="w-16 h-16 text-blue-500" />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xl">✨</span>
                </div>
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-4">Your Cart is Empty</h1>
            <p className="text-slate-500 mb-10 text-lg">Your shopping journey awaits! Discover our latest collections and find something you love.</p>
            <Link
              href="/"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition shadow-xl shadow-blue-200 group"
            >
              <FiArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" />
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
                <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 mb-2 text-sm hover:underline">
                    <FiArrowLeft /> Back to Shop
                </Link>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Shopping Bag</h1>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-medium">
                <span className="text-blue-600 font-bold">{totals.itemCount} Items</span>
                <span>•</span>
                <span>Subtotal: Ksh {Number(totals.subtotal).toLocaleString()}</span>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h2 className="text-xl font-bold text-slate-800">Review Items</h2>
                <button
                  onClick={clearCart}
                  className="text-rose-500 hover:text-rose-700 text-sm font-bold flex items-center gap-2 transition"
                >
                  <FiTrash2 />
                  Clear Bag
                </button>
              </div>

              <div className="divide-y divide-slate-50">
                <AnimatePresence>
                {cart.items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id || item.product_id} 
                    className="p-8 hover:bg-slate-50/50 transition-colors group"
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                      {/* Product Image */}
                      <div className="relative w-40 h-40 flex-shrink-0">
                        <div className="absolute inset-0 bg-slate-100 rounded-3xl animate-pulse -z-10" />
                        <img
                          src={item.image_url || item.product?.image_url || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-3xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-2 py-0.5 rounded">PID: {item.product_id || item.id}</span>
                                <span className="text-emerald-500 font-bold text-xs flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> In Stock
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                            <p className="text-slate-400 text-sm mt-1 line-clamp-1">Category: {item.category || "General"}</p>
                          </div>
                          <div className="text-left lg:text-right">
                            <div className="text-2xl font-black text-slate-900">
                              Ksh {Number(item.price).toLocaleString()}
                            </div>
                            <p className="text-slate-400 text-xs font-bold uppercase mt-1">Price per unit</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-50">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-slate-100 rounded-2xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id || item.product_id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-black text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id || item.product_id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition"
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-lg font-black text-blue-600">
                                    Ksh {(Number(item.price) * item.quantity).toLocaleString()}
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Line Total</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id || item.product_id)}
                              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition shadow-sm hover:shadow-rose-200"
                              title="Remove item"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Extra Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <FiTruck className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-emerald-900">Free Express Shipping</h4>
                        <p className="text-emerald-700/70 text-sm">On all orders over Ksh 5,000. Delivered to your doorstep within 24-48 hours.</p>
                    </div>
                </div>
                <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                        <FiShield className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-900">Secure Payments</h4>
                        <p className="text-blue-700/70 text-sm">PCI-DSS compliant payments via MPESA, Cards, and more. Your data is always safe.</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="xl:col-span-4">
            <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 text-white sticky top-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

                <h2 className="text-2xl font-black mb-10 relative">Order Summary</h2>

                <div className="space-y-6 mb-10 relative">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Subtotal ({totals.itemCount} items)</span>
                        <span className="text-xl font-bold italic">Ksh {Number(totals.subtotal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Shipping Fee</span>
                        <span className="text-xl font-bold italic text-emerald-400">
                            {Number(totals.shipping) === 0 ? 'FREE' : `Ksh ${Number(totals.shipping).toLocaleString()}`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">VAT (16%)</span>
                        <span className="text-xl font-bold italic">Ksh {Number(totals.tax).toLocaleString()}</span>
                    </div>
                    
                    <div className="h-px bg-white/10 my-8" />
                    
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-black uppercase tracking-widest text-blue-400">Total Amount</span>
                            <div className="text-4xl font-black tracking-tighter mt-1 italic">
                                Ksh {Number(totals.total).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {!isLoggedIn && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm"
                    >
                        <p className="text-blue-200 text-sm font-medium mb-4">
                            Log in to save your cart and access exclusive member deals.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/auth/login?redirect=/checkout"
                                className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl font-bold transition shadow-lg shadow-blue-900/40"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/register?redirect=/checkout"
                                className="w-full text-center border border-white/20 text-white hover:bg-white/5 py-3 rounded-2xl font-bold transition"
                            >
                                Create Account
                            </Link>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-4 relative">
                    <Link
                        href={isLoggedIn ? "/checkout" : "/auth/login?redirect=/checkout"}
                        className="flex items-center justify-center gap-3 w-full bg-white text-slate-900 py-5 rounded-[1.5rem] font-black text-lg transition hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] shadow-xl group"
                    >
                        Checkout Now
                        <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/"
                        className="block w-full border border-white/10 hover:bg-white/5 text-white/70 hover:text-white text-center py-4 rounded-2xl font-bold transition"
                    >
                        Add More Items
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 opacity-50 relative">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-4">Secure Checkout Powered By NylePay</p>
                    <div className="flex flex-wrap gap-3">
                        <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold">VISA</div>
                        <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold">MPESA</div>
                        <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold">MASTERCARD</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}