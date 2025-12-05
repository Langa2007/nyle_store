"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SupportInfoLayout({ title, subtitle, children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/support/contact", label: "Contact Support" },
    { href: "/support/help-center", label: "Help Center" },
    { href: "/support/report-issue", label: "Report Issues" },
    { href: "/support/faqs", label: "FAQs" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* 🌊 Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-16 shadow-lg">
        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-3 text-base md:text-lg text-blue-100 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* 🧭 Sidebar + Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit sticky top-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Support Center
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
          className="md:col-span-3 bg-white rounded-3xl shadow-xl p-8 md:p-12 text-gray-800 border border-gray-100"
        >
          <div className="space-y-5 leading-relaxed text-lg">
            {children}
          </div>
        </motion.section>
      </div>

      {/* 📞 Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-auto relative z-20">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Need More Help?</h4>
            <p className="text-sm flex items-center justify-center md:justify-start gap-2">
              <HelpCircle size={16} className="text-blue-400" />
              <Link
                href="/support/contact"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-all duration-200"
              >
                Reach our Support Team
              </Link>
            </p>
          </div>
          <div className="text-sm opacity-70">
            © {new Date().getFullYear()} Nyle Marketplace. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 🌊 Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-40 text-blue-500 opacity-25"
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
