"use client";
import { motion } from "framer-motion";
import { Smartphone, Download } from "lucide-react";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function VendorAppPage() {
  return (
    <VendorInfoLayout
      title="Get Our Vendor App"
      subtitle="Manage your store, sales, and orders from anywhere."
    >
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-white px-6 py-16 text-gray-800">
        <motion.div
          className="max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Smartphone className="mx-auto mb-4 text-blue-600" size={60} />
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Run Your Business on the Go
          </h1>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">
            The Nyle Vendor App gives you full control of your business — manage
            inventory, respond to customers, and track sales in real time. Stay
            connected, stay efficient, stay profitable.
          </p>
          <motion.button
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
          >
            <Download size={18} />
            Download App (Coming Soon)
          </motion.button>
        </motion.div>
      </section>
    </VendorInfoLayout>
  );
}
