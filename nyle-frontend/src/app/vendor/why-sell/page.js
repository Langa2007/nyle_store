"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";
import { ArrowRight } from "lucide-react";

export default function WhySellPage() {
  return (
    <VendorInfoLayout
      title="Why Sell on Nyle"
      subtitle="Empower your business with Nyle’s unmatched marketplace reach."
    >
      <section className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center items-center text-gray-800 px-6 py-16">
        <motion.div
          className="max-w-5xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            Turn Your Passion into Profit with Nyle
          </h1>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">
            Nyle opens the door to a thriving digital marketplace where your
            products meet thousands of eager buyers. Whether you’re a small
            business or an established brand, we provide the tools, support, and
            visibility you need to **grow fearlessly**.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 mt-10 max-w-5xl text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">🌍 Massive Reach</h2>
            <p className="text-gray-600">
              Showcase your products to shoppers across Kenya and beyond — Nyle’s
              marketplace ensures you’re never invisible.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">💳 Secure Payments</h2>
            <p className="text-gray-600">
              Enjoy peace of mind with Nyle Pay — our trusted and transparent
              payment system built for vendors.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">🚚 Smart Logistics</h2>
            <p className="text-gray-600">
              From pickup to delivery, Nyle partners with top logistics providers
              to make your shipping seamless and affordable.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">🤝 Seller Success Team</h2>
            <p className="text-gray-600">
              Get dedicated support, marketing tools, and growth strategies from
              our vendor success team — available 24/7.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <p className="text-lg text-gray-700 mb-6">
            Ready to start your journey? Join hundreds of successful sellers
            who’ve chosen Nyle to power their businesses.
          </p>
          <Link
            href="/vendor/signup"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-200"
          >
            Become a Seller on Nyle <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </VendorInfoLayout>
  );
}
