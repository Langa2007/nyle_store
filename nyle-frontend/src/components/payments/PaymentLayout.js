// nyle-frontend/src/components/payments/PaymentLayout.js
"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { 
  HelpCircle, CreditCard, Shield, Lock, RefreshCw, CheckCircle, 
  DollarSign, Globe, Truck, Users, Zap, ArrowRight, 
  Bell, FileText, Package, Award 
} from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaGooglePay, FaApplePay } from "react-icons/fa";

export default function PaymentLayout({ title, subtitle = "Your secure and reliable payments experience on Nyle.", children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/payments/methods", label: "Accepted Methods", icon: <CreditCard size={18} />, badge: "Popular" },
    { href: "/payments/secure-checkout", label: "Secure Checkout", icon: <Lock size={18} />, badge: "Secure" },
    { href: "/payments/protection", label: "Customer Protection", icon: <Shield size={18} />, badge: "Guaranteed" },
    { href: "/payments/refunds", label: "Refunds & Returns", icon: <RefreshCw size={18} /> },
    { href: "/payments/policies", label: "Payment Policies", icon: <FileText size={18} /> },
  ];

  const paymentStats = [
    { value: "99.9%", label: "Success Rate", icon: <CheckCircle />, color: "from-green-500 to-emerald-500" },
    { value: "2M+", label: "Transactions", icon: <DollarSign />, color: "from-blue-500 to-cyan-500" },
    { value: "15", label: "Payment Methods", icon: <Globe />, color: "from-purple-500 to-pink-500" },
    { value: "<1 Min", label: "Average Processing", icon: <Zap />, color: "from-orange-500 to-amber-500" },
  ];

  const acceptedMethods = [
    { icon: <FaCcVisa />, name: "Visa", color: "text-blue-700" },
    { icon: <FaCcMastercard />, name: "Mastercard", color: "text-red-600" },
    { icon: <FaCcPaypal />, name: "PayPal", color: "text-blue-500" },
    { icon: <FaGooglePay />, name: "Google Pay", color: "text-gray-800" },
    { icon: <FaApplePay />, name: "Apple Pay", color: "text-black" },
    { icon: <DollarSign />, name: "M-Pesa", color: "text-green-600" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex flex-col overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-indigo-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white py-16 md:py-20">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield size={16} />
              <span className="text-sm font-medium">🔒 Bank-Level Security</span>
            </div>
            
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* Payment Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl"
          >
            {paymentStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-blue-100 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8 md:gap-12">
          {/* Enhanced Sidebar Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Navigation Card */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Payment Center</h3>
                </div>
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          scroll={false}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                              : "hover:bg-blue-50 hover:shadow-md text-gray-700"
                          }`}
                        >
                          <div className={`transition-transform ${isActive ? 'text-white' : 'text-blue-500 group-hover:text-blue-600'}`}>
                            {item.icon}
                          </div>
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                              isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          <ArrowRight 
                            size={16} 
                            className={`transition-transform ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1'}`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Accepted Methods Card */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Accepted Payment Methods</h4>
                <div className="grid grid-cols-3 gap-3">
                  {acceptedMethods.map((method, index) => (
                    <div key={index} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className={`text-2xl ${method.color}`}>{method.icon}</div>
                      <span className="text-xs text-gray-600 mt-1">{method.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badge Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl border border-green-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Payment Security</h4>
                    <p className="text-sm text-gray-600">PCI-DSS Compliant</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>Fraud Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span>24/7 Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Enhanced Main Content Area */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
              {/* Content Header */}
              <div className="border-b border-blue-100 p-6 md:p-8 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Secure Payment Information</h2>
                    <p className="text-gray-600">All you need to know about payments on Nyle</p>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    {children}
                  </div>
                </div>

                {/* Quick Support */}
                <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                        <HelpCircle className="text-white" size={28} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Payment Questions?</h4>
                        <p className="text-gray-600">Our team is here to help 24/7</p>
                      </div>
                    </div>
                    <Link
                      href="/support/contact"
                      scroll={false}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                    >
                      <HelpCircle size={18} />
                      Get Help Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Truck />, title: "Fast Processing", desc: "Instant payment confirmation", color: "from-blue-500 to-cyan-500" },
                { icon: <Users />, title: "Dedicated Support", desc: "24/7 payment assistance", color: "from-purple-500 to-pink-500" },
                { icon: <Award />, title: "Money Back", desc: "100% buyer protection", color: "from-green-500 to-emerald-500" },
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative mt-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        {/* Wave Divider */}
        <div className="absolute -top-1 left-0 right-0">
          <svg className="w-full h-12 text-gray-900" viewBox="0 0 1440 120" fill="currentColor">
            <path d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,96C672,85,768,75,864,74.7C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold mb-4">Need Payment Assistance?</h4>
                <p className="text-blue-200 mb-6 max-w-md">
                  Our dedicated payment support team is available around the clock to resolve any transaction issues.
                </p>
                <Link
                  href="/support/contact"
                  scroll={false}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transition-all group"
                >
                  <HelpCircle size={18} />
                  Contact Payment Support
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="text-center md:text-right">
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h5 className="font-bold mb-3">Trusted & Verified</h5>
                  <div className="flex justify-center md:justify-end gap-3">
                    {[
                      { icon: <Shield />, label: "PCI Compliant" },
                      { icon: <Lock />, label: "256-bit SSL" },
                      { icon: <CheckCircle />, label: "Verified" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center"
                        title={item.label}
                      >
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
                          <div className="text-white">{item.icon}</div>
                        </div>
                        <span className="text-xs text-blue-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-blue-300">
                    © {new Date().getFullYear()} Nyle Marketplace. All rights reserved.
                  </p>
                  <p className="text-sm text-blue-400/70 mt-1">
                    Processing payments securely across Africa
                  </p>
                </div>
                <div className="flex gap-6 text-sm text-blue-300">
                  <Link href="/privacy" scroll={false} className="hover:text-white transition">Privacy Policy</Link>
                  <Link href="/terms" scroll={false} className="hover:text-white transition">Terms of Service</Link>
                  <Link href="/cookies" scroll={false} className="hover:text-white transition">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Help Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center z-50 group"
        aria-label="Back to top"
      >
        <ArrowRight className="text-white transform -rotate-90" size={20} />
      </motion.button>
    </div>
  );
}