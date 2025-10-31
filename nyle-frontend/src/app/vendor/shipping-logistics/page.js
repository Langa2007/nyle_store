"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, ArrowRight } from "lucide-react";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function ShippingLogisticsPage() {
  return (
    <VendorInfoLayout
      title="Shipping & Logistics"
      subtitle="Simplify your delivery process with Nyle’s smart logistics network."
    >
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center items-center px-6 py-16 text-gray-800">
        <motion.div
          className="max-w-5xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Truck className="mx-auto mb-4 text-blue-600" size={60} />
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Seamless Deliveries. Happier Customers.
          </h1>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">
            We’ve partnered with trusted logistics providers to ensure your
            products reach customers fast, safely, and affordably. Whether it’s
            across the city or across Kenya — Nyle’s logistics system is built
            to scale with your growth.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {[
            {
              title: "Real-time Tracking",
              desc: "Monitor every order from dispatch to delivery with precision tracking tools.",
            },
            {
              title: "Affordable Rates",
              desc: "Benefit from our negotiated rates with top courier partners across Kenya.",
            },
            {
              title: "Nationwide Coverage",
              desc: "From major cities to remote regions — Nyle ensures no customer is left behind.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-lg mb-4 text-gray-700">
            Want to start shipping with us?
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
