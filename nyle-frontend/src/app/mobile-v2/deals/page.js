"use client";

import { Sparkles, Tag } from "lucide-react";

export default function DealsPage() {
    return (
        <div className="pt-6 pb-24 px-4 bg-black min-h-screen text-gray-100">
            <div className="pt-6 pb-24">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                        <Tag size={24} />
                    </div>
                    <h1 className="text-2xl font-bold">Hot Deals</h1>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100 mb-8">
                    <Sparkles className="mx-auto text-blue-500 mb-2" size={32} />
                    <h2 className="text-lg font-bold text-gray-800">Mega February Sale!</h2>
                    <p className="text-gray-600 text-sm mt-1">Up to 60% off on premium electronics and fashion.</p>
                </div>

                <div className="text-center py-20 text-gray-400">
                    <p>Loading the best deals for you...</p>
                </div>
            </div>
        </div>
    );
}
