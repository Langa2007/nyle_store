"use client";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function QuotationsPage() {
  return (
    <VendorInfoLayout
      title="Get Seller Quotations"
      subtitle="Find competitive quotes and supplier deals through Nyle’s vendor network."
    >
      <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center items-center px-6 py-16 text-gray-800">
        <motion.div
          className="max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FileText className="mx-auto mb-4 text-blue-600" size={60} />
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Connect. Compare. Collaborate.
          </h1>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">
            Nyle helps you connect with trusted suppliers and partners who offer
            the best quotations for bulk and retail deals. Whether you need raw
            materials or finished goods, get competitive prices all in one place.
          </p>
          <p className="text-gray-700">
            <strong>Coming soon:</strong> A smart quotation system that matches
            you with verified vendors instantly.
          </p>
        </motion.div>
      </section>
    </VendorInfoLayout>
  );
}
