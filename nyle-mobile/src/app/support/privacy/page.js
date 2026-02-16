"use client";

import MobileLayout from "../../mobile-layout";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
    return (
        <MobileLayout>
            <div className="pt-6 pb-24 px-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-2xl font-bold">Privacy Policy</h1>
                </div>

                <div className="prose prose-blue max-w-none text-gray-600 space-y-4">
                    <p>Last updated: February 2025</p>
                    <h2 className="text-lg font-bold text-gray-800">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us when you create an account, make a purchase, or contact us.</p>

                    <h2 className="text-lg font-bold text-gray-800">2. How We Use Your Information</h2>
                    <p>We use the information to process your orders, improve our services, and communicate with you about your account.</p>

                    <h2 className="text-lg font-bold text-gray-800">3. Information Sharing</h2>
                    <p>We do not share your personal information with third parties except as necessary to fulfill your orders (e.g., sharing your address with delivery partners).</p>
                </div>
            </div>
        </MobileLayout>
    );
}
