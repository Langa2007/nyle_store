"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  FileText, 
  Settings, 
  Users, 
  Globe, 
  HelpCircle, 
  ArrowLeft, 
  Home, 
  CheckCircle,
  AlertCircle,
  Search
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function FooterInfoLayout({ 
  title, 
  subtitle, 
  children, 
  icon,
  lastUpdated = "January 15, 2024",
  category = "Legal"
}) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigation for all footer info pages
  const footerPages = [
    { 
      href: "/privacy", 
      label: "Privacy Policy", 
      icon: <Shield size={18} />,
      color: "from-blue-500 to-cyan-500",
      badge: "Security"
    },
    { 
      href: "/terms", 
      label: "Terms of Service", 
      icon: <FileText size={18} />,
      color: "from-blue-600 to-indigo-600",
      badge: "Legal"
    },
    { 
      href: "/cookies", 
      label: "Cookie Policy", 
      icon: <Settings size={18} />,
      color: "from-indigo-600 to-purple-600",
      badge: "Tracking"
    },
    { 
      href: "/accessibility", 
      label: "Accessibility", 
      icon: <Users size={18} />,
      color: "from-cyan-500 to-blue-500",
      badge: "Inclusive"
    },
  ];

  const quickLinks = [
    { href: "/", label: "Home", icon: <Home size={16} /> },
    { href: "/products", label: "Shop Products", icon: "🛒" },
    { href: "/categories", label: "Browse Categories", icon: "📂" },
    { href: "/support/help-center", label: "Help Center", icon: "❓" },
    { href: "/support/contact", label: "Contact Us", icon: "📞" },
  ];

  const keyPoints = [
    { icon: "🔒", text: "Secure & Trusted Platform" },
    { icon: "📖", text: "Transparent Policies" },
    { icon: "🔄", text: "Regularly Updated" },
    { icon: "👥", text: "User-Focused Design" },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* 🌊 Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                {icon}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                {title}
              </h1>
            </div>
            
            {subtitle && (
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-blue-100/90 max-w-3xl mx-auto mb-8 leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <span className="text-sm font-medium">Category: {category}</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                ↑ Scroll to Top
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🧭 Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-4 gap-8 md:gap-12">
          {/* 📚 Enhanced Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Navigation Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <FileText className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Legal & Policies</h3>
                </div>
                
                <ul className="space-y-2">
                  {footerPages.map((page) => {
                    const isActive = pathname === page.href;
                    return (
                      <li key={page.href}>
                        <Link
                          href={page.href}
                          className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive
                              ? `bg-gradient-to-r ${page.color} text-white shadow-lg`
                              : "hover:bg-blue-50 hover:shadow-md text-gray-700"
                          }`}
                        >
                          <div className={`transition-transform ${isActive ? 'text-white' : 'text-blue-500 group-hover:text-blue-600'}`}>
                            {page.icon}
                          </div>
                          <span className="font-medium">{page.label}</span>
                          {isActive && (
                            <span className="ml-auto text-xs px-2 py-1 bg-white/20 rounded-full">
                              ✓ Viewing
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Key Points</h4>
                <div className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-xl">{point.icon}</span>
                      <span className="text-sm text-gray-700">{point.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">Last Updated</h4>
                    <p className="text-sm text-blue-700">{lastUpdated}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  We regularly review and update our policies to ensure compliance and clarity.
                </p>
              </div>
            </div>
          </motion.aside>

          {/* 📝 Main Content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
              {/* Content Header */}
              <div className="border-b border-blue-100 p-6 md:p-8 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                      {icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                      <p className="text-gray-600">Important information for all Nyle Store users</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      Version 2.1
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      {category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-8 lg:p-12">
                <div className="prose prose-blue max-w-none">
                  {children}
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                        <HelpCircle className="h-6 w-6" />
                        Need Clarification?
                      </h3>
                      <p className="text-blue-100">
                        Our support team is ready to help you understand any aspect of this policy.
                      </p>
                    </div>
                    <Link
                      href="/support/contact"
                      className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                    >
                      <HelpCircle className="h-5 w-5" />
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* 🏁 Enhanced Footer */}
      <footer className="relative mt-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Wave Divider */}
        <div className="absolute -top-1 left-0 right-0">
          <svg className="w-full h-12 text-gray-900" viewBox="0 0 1440 120" fill="currentColor">
            <path d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,96C672,85,768,75,864,74.7C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <h4 className="text-xl font-bold mb-4">Nyle Store</h4>
                <p className="text-blue-200 mb-6">
                  Kenya's premier marketplace connecting buyers and sellers with trust and transparency.
                </p>
                <div className="flex gap-3">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition hover:scale-110"
                    >
                      <Icon className="text-white" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-bold mb-4">Quick Access</h4>
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="block text-blue-300 hover:text-white transition hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal Pages */}
              <div>
                <h4 className="text-xl font-bold mb-4">Legal & Policies</h4>
                <div className="space-y-2">
                  {footerPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="block text-blue-300 hover:text-white transition hover:translate-x-1"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-xl font-bold mb-4">Support</h4>
                <div className="space-y-2">
                  <Link href="/support/help-center" className="block text-blue-300 hover:text-white transition">Help Center</Link>
                  <Link href="/support/contact" className="block text-blue-300 hover:text-white transition">Contact Us</Link>
                  <Link href="/support/faqs" className="block text-blue-300 hover:text-white transition">FAQs</Link>
                  <Link href="/support/report-issue" className="block text-blue-300 hover:text-white transition">Report Issue</Link>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-blue-300">
                    © {new Date().getFullYear()} Nyle Store. All rights reserved.
                  </p>
                  <p className="text-sm text-blue-400/70 mt-1">
                    Building trust through transparency
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-300">
                  {footerPages.map((page) => (
                    <Link 
                      key={page.href} 
                      href={page.href}
                      className="hover:text-white transition"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 🆙 Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowLeft className="text-white rotate-90 group-hover:animate-bounce" size={22} />
      </motion.button>
    </div>
  );
}