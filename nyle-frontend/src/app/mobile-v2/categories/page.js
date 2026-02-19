"use client";

import { Grid } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchWithAuth, API_ENDPOINTS } from "@/lib/mobile-app/api";
import Link from "next/link";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCategories() {
            try {
                const data = await fetchWithAuth(API_ENDPOINTS.CATEGORIES);
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            } finally {
                setLoading(false);
            }
        }
        getCategories();
    }, []);

    return (
        <div className="pt-6 pb-24 px-4 bg-black min-h-screen text-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <Grid size={24} />
                </div>
                <h1 className="text-2xl font-bold">Categories</h1>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/shop?category=${encodeURIComponent(cat.name)}`}
                            className="group relative h-32 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={cat.image_url || "/images/placeholder.jpg"}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="text-white font-bold">{cat.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
