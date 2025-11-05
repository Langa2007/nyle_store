"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
    <div className="min-h-screen bg-gray-50">
      {/* Nyle Blue Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 text-blue-100 text-sm md:text-base"
          >
            Your secure and reliable payments experience on Nyle.
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* Sidebar Navigation */}
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

        {/* Main Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-3 bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
        >
          {children}
        </motion.section>
      </div>
    </div>
  );
}
