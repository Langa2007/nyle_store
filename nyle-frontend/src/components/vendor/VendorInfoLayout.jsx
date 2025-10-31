"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Store, Truck, FileText, Smartphone, ShieldCheck, HelpCircle } from "lucide-react";

export default function VendorInfoLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-16 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082349566-187342175e2b?auto=format&fit=crop&w=1500&q=80')] opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className="text-lg opacity-90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </section>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row flex-grow max-w-7xl mx-auto w-full px-6 py-12 gap-10">
        {/* Sidebar Navigation */}
        <aside className="md:w-1/4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-4 self-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Vendor Resources</h3>
          <nav>
            <ul className="space-y-3 text-gray-700">
              {[
                { href: "/vendor/why-sell", icon: Store, label: "Why Sell on Nyle" },
                { href: "/vendor/quotations", icon: FileText, label: "Get Seller Quotations" },
                { href: "/vendor/shipping-logistics", icon: Truck, label: "Shipping & Logistics" },
                { href: "/vendor/policies", icon: ShieldCheck, label: "Seller Policies" },
                { href: "/vendor/app", icon: Smartphone, label: "Get Our Vendors App" },
              ].map(({ href, icon: Icon, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-150"
                  >
                    <Icon size={18} className="text-blue-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 border-t border-gray-200 pt-4">
            <Link
              href="/vendor/signup"
              className="block text-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all duration-200"
            >
              Become a Seller
            </Link>
          </div>
        </aside>

        {/* Main Info Content */}
        <main className="md:w-3/4 flex-grow">
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Need Help?</h4>
            <p className="text-sm flex items-center justify-center md:justify-start gap-2">
              <HelpCircle size={16} className="text-blue-400" /> Contact our Vendor Support Team
            </p>
          </div>

          <div className="text-sm opacity-70">
            © {new Date().getFullYear()} Nyle Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
