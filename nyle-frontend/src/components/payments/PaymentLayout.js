"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { HelpCircle } from "lucide-react";

export default function PaymentLayout({ title, children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/payments/policies", label: "Payment Policies" },
    { href: "/payments/refunds", label: "Refunds & Returns" },
    { href: "/payments/secure-checkout", label: "Secure Checkout" },
    { href: "/payments/methods", label: "Accepted Methods" },
    { href: "/payments/protection", label: "Customer Protection" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col overflow-hidden">
      {/* ✅ Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 text-blue-100 text-sm md:text-base"
          >
            Your secure and reliable payments experience on Nyle.
          </motion.p>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10 flex-grow relative z-10">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h3 className="font-semibold text-lg mb-4 text-gray-900">
            Nyle Payments
          </h3>
          <ul className="space-y-2 text-gray-700">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white font-semibold shadow-sm"
                        : "hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.aside>

        {/* Main Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-3 bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
        >
          {children}
        </motion.section>
      </div>

      {/* ✅ Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-auto relative z-20">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Need Help?</h4>
            <p className="text-sm flex items-center justify-center md:justify-start gap-2">
              <HelpCircle size={16} className="text-blue-400" />
              <Link
                href="/support/contact"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-all duration-200"
              >
                Contact our Support Team
              </Link>
            </p>
          </div>

          <div className="text-sm opacity-70">
            © {new Date().getFullYear()} Nyle Marketplace. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ✅ Decorative Blue Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-40 text-blue-500 opacity-30"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,96L40,128C80,160,160,224,240,229.3C320,235,400,181,480,154.7C560,128,640,128,720,122.7C800,117,880,107,960,128C1040,149,1120,203,1200,218.7C1280,235,1360,213,1400,202.7L1440,192L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
