"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import MobileProductCard from "./MobileProductCard";
import {
    Search,
    Menu,
    Bell,
    Filter,
    ArrowRight,
    Sparkles,
    Flame,
    Zap,
    Clock,
    Tag,
    Star,
    Award,
    Truck
} from "lucide-react";

export default function MobileHome() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const scrollRef = useRef(null);

    const { data: rawCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    const categories = Array.isArray(rawCategories) ? rawCategories : (rawCategories?.categories || rawCategories?.items || []);

    const { data: rawProducts } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });
    const products = Array.isArray(rawProducts) ? rawProducts : (rawProducts?.products || rawProducts?.items || []);


    const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else {
                        if (hours > 0) {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const flashSaleProducts = Array.isArray(products) ? products.filter(p => p && (p.on_sale || p.discount)).slice(0, 6) : [];
    if (flashSaleProducts.length === 0 && Array.isArray(products)) {
        flashSaleProducts.push(...products.slice(0, 6).filter(Boolean));
    }

    const featuredGroups = [
        { id: 'trending', label: 'Trending', icon: <Flame size={14} className="text-orange-500" /> },
        { id: 'top_rated', label: 'Top Rated', icon: <Star size={14} className="text-yellow-500" /> },
        { id: 'new_arrivals', label: 'New', icon: <Award size={14} className="text-blue-500" /> },
    ];

    const filteredProducts = Array.isArray(products) ? products.filter((p) => {
        if (!p) return false;
        const matchesCategory = activeCategory === "all" || p.category === activeCategory || p.category_id === activeCategory;
        const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    }) : [];

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFF] pb-24">
            {/* Premium Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl px-4 py-4 border-b border-blue-50/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-lg font-black text-gray-900 leading-none">NYLE</h1>
                            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">Premium Store</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-2xl bg-white border border-blue-50 flex items-center justify-center text-gray-500 shadow-sm active:scale-95 transition-all">
                            <Bell size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-2xl bg-white border border-blue-50 flex items-center justify-center text-gray-500 shadow-sm active:scale-95 transition-all">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-blue-400 group-focus-within:text-blue-600 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search premium products..."
                        className="w-full bg-blue-50/50 border-none rounded-2xl py-3.5 pl-12 pr-12 text-sm font-medium text-gray-700 placeholder:text-blue-300 focus:ring-2 focus:ring-blue-200 transition-all shadow-inner"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="absolute inset-y-0 right-2 flex items-center p-2 text-blue-500">
                        <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center border border-blue-50">
                            <Filter size={16} />
                        </div>
                    </button>
                </div>
            </header>

            <main className="flex-grow px-4 overflow-x-hidden">
                {/* Hero Promo */}
                <section className="mt-6">
                    <div className="relative h-48 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-200/20 group">
                        <img
                            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            alt="Promo"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/10 to-transparent p-6 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-500/30">
                                    Mega Deal
                                </span>
                                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    Ends Soon
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-white leading-tight mb-3">
                                Premium Tech <br /> <span className="text-blue-400">Save 60%</span>
                            </h2>
                            <button className="bg-white text-blue-900 px-6 py-3 rounded-2xl text-xs font-black shadow-xl shadow-black/20 flex items-center gap-2 w-fit active:scale-95 transition-all">
                                EXPLORE OFFERS <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Flash Sale Countdown */}
                <section className="mt-8 bg-white rounded-[2.5rem] p-6 shadow-sm border border-blue-50/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 shadow-inner">
                                <Clock size={22} className="animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-base font-black text-gray-900">Flash Sale</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Limited Stock</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <div className="bg-gray-900 text-white w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shadow-lg">
                                        {unit.toString().padStart(2, '0')}
                                    </div>
                                    {i < 2 && <span className="text-gray-900 font-bold">:</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide snap-x">
                        {flashSaleProducts.map((p, i) => (
                            <div key={p.id || p._id} className="w-32 flex-shrink-0 snap-start group">
                                <div className="relative aspect-square rounded-2xl bg-gray-50 mb-2 overflow-hidden border border-blue-50/50">
                                    <img src={p.image_url || p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    <div className="absolute top-1 right-1 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-lg">
                                        -35%
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-gray-800 line-clamp-1 mb-1">{p.name}</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-blue-600 font-black text-xs leading-none">
                                        KES {p.price?.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Categories Horizontal Scroll */}
                <section className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-black text-gray-900">Categories</h3>
                        <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest">See All</button>
                    </div>
                    <div
                        ref={scrollRef}
                        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x"
                    >
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`flex-shrink-0 px-6 py-3 rounded-2xl text-xs font-black transition-all snap-start ${activeCategory === "all"
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                : "bg-white text-gray-500 border border-blue-50 shadow-sm"
                                }`}
                        >
                            All Items
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id || cat._id}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex-shrink-0 px-6 py-3 rounded-2xl text-xs font-black transition-all snap-start ${activeCategory === cat.name
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "bg-white text-gray-500 border border-blue-50 shadow-sm"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Featured Section Headers */}
                <section className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-6 bg-blue-600 rounded-full" />
                            <h3 className="text-base font-black text-gray-900">Recommended</h3>
                        </div>
                        <div className="flex bg-blue-50/50 p-1 rounded-xl">
                            {featuredGroups.map(group => (
                                <button
                                    key={group.id}
                                    className="px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center gap-1.5 transition-all active:scale-95"
                                >
                                    {group.icon}
                                    <span className="text-gray-500">{group.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.slice(0, 20).map((product, idx) => (
                                <MobileProductCard
                                    key={product.id || product._id}
                                    product={product}
                                    index={idx}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-4">
                                <Search size={32} className="text-blue-200" />
                            </div>
                            <p className="text-gray-400 font-bold">No products found</p>
                            <button
                                onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                                className="mt-2 text-blue-600 text-xs font-black"
                            >
                                RESET FILTERS
                            </button>
                        </div>
                    )}
                </section>

                {/* Quick Stats/Features for Mobile */}
                <section className="mt-12 mb-12 grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-5 flex flex-col items-center text-center shadow-xl shadow-blue-200/50 relative overflow-hidden group">
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
                            <Flame size={20} className="text-white animate-bounce" />
                        </div>
                        <span className="text-[10px] text-white font-black uppercase tracking-widest leading-none">Hot<br />Deals</span>
                    </div>
                    <div className="bg-white rounded-[2rem] p-5 border border-blue-50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center mb-3 shadow-inner">
                            <Truck size={20} className="text-blue-600" />
                        </div>
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none">Fast<br />Ship</span>
                    </div>
                    <div className="bg-white rounded-[2rem] p-5 border border-blue-50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center mb-3 shadow-inner">
                            <Sparkles size={20} className="text-blue-600" />
                        </div>
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none">Top<br />Rated</span>
                    </div>
                </section>
            </main>
        </div>
    );
}
