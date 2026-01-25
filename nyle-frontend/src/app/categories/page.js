"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categoryService";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronRight, FaSearch, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import ClientProviders from "../../components/ClientProviders";

function CategoriesContent() {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const [searchTerm, setSearchTerm] = useState("");

    // Helper to get category config (image - reuse logic or fallback)
    const getCategoryConfig = (catName) => {
        const name = catName?.toLowerCase() || "";
        let image = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80";
        if (name.includes("computer") || name.includes("electronics")) image = "https://images.unsplash.com/photo-1498049381929-7232985a9003?auto=format&fit=crop&w=400&q=80";
        else if (name.includes("fashion")) image = "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80";
        return { image };
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 group">
                            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                            Browse <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Categories</span>
                        </h1>
                        <p className="text-gray-600 mt-2 text-lg">Discover our curated collections and brands</p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find a category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="animate-pulse">
                                <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                        {filteredCategories.map((cat, index) => {
                            const { image: fallbackImage } = getCategoryConfig(cat.name);
                            const image = cat.image_url || fallbackImage;

                            return (
                                <motion.div
                                    key={cat.id || cat._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={`/?category=${cat.name}`} className="group block">
                                        <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                                            <img
                                                src={image}
                                                alt={cat.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                                            <div className="absolute bottom-6 left-6 right-6">
                                                <h3 className="text-white font-bold text-xl leading-tight group-hover:text-blue-300 transition-colors">
                                                    {cat.name}
                                                </h3>
                                                <div className="flex items-center text-xs text-blue-200 font-medium mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                    <span>Browse Products</span>
                                                    <FaChevronRight className="ml-2 w-2.5 h-2.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800">No categories found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search for "{searchTerm}"</p>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CategoriesPage() {
    return (
        <ClientProviders>
            <CategoriesContent />
        </ClientProviders>
    );
}
