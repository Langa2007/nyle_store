// AboutInfoLayout.js
"use client";

import { motion } from "framer-motion";
import { HelpCircle, Users, Briefcase, BookOpen, Home, ArrowRight, Sparkles, Shield, Globe, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function AboutInfoLayout({ title, subtitle, children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pathname = usePathname();

  const navItems = [
    { href: "/about/know-nyle", label: "About the Company", icon: <Home size={18} /> },
    { href: "/about/partner", label: "Our Team", icon: <Users size={18} /> },
    { href: "/about/careers", label: "Careers", icon: <Briefcase size={18} /> },
    { href: "/about/newsletter", label: "Blog", icon: <BookOpen size={18} /> },
  ];

  const companyStats = [
    { value: "50K+", label: "Happy Customers", color: "from-blue-500 to-cyan-500" },
    { value: "2K+", label: "Active Vendors", color: "from-purple-500 to-pink-500" },
    { value: "98%", label: "Satisfaction Rate", color: "from-green-500 to-emerald-500" },
    { value: "24/7", label: "Support", color: "from-orange-500 to-amber-500" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-indigo-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* 🌊 Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white py-20 md:py-24">
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
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Discover Nyle's Journey</span>
            </div>
            
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
            >
              {title}
            </motion.h1>
            
            {subtitle && (
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Company Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {companyStats.map((stat, index) => (
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

      {/* 🧭 Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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
                    <Target className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Explore</h3>
                </div>
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
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
                          <ArrowRight 
                            size={16} 
                            className={`ml-auto transition-transform ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1'}`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Quick Links Card */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <Link href="/support" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition group">
                    <Shield size={16} />
                    <span className="text-sm">Support Center</span>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition group">
                    <HelpCircle size={16} />
                    <span className="text-sm">Contact Us</span>
                  </Link>
                  <Link href="/careers" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition group">
                    <Briefcase size={16} />
                    <span className="text-sm">Join Our Team</span>
                  </Link>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: <FaFacebookF />, color: "hover:bg-blue-600", href: "#" },
                    { icon: <FaTwitter />, color: "hover:bg-cyan-500", href: "#" },
                    { icon: <FaInstagram />, color: "hover:bg-pink-600", href: "#" },
                    { icon: <FaLinkedinIn />, color: "hover:bg-blue-700", href: "#" },
                    { icon: <FaYoutube />, color: "hover:bg-red-600", href: "#" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
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
                    <Globe className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome to Nyle</h2>
                    <p className="text-gray-600">Your journey through our story</p>
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

                {/* Content Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: <Shield />, title: "Secure Platform", desc: "Trusted by thousands" },
                    { icon: <Globe />, title: "Global Reach", desc: "Connecting markets" },
                    { icon: <Users />, title: "Community", desc: "Growing together" },
                  ].map((feature, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-blue-600">{feature.icon}</div>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Footer */}
              <div className="border-t border-blue-100 p-6 md:p-8 bg-gradient-to-r from-blue-50/50 to-white/50">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Need More Information?</h4>
                    <p className="text-sm text-gray-600">Our team is here to help</p>
                  </div>
                  <Link
                    href="/support/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                  >
                    <HelpCircle size={18} />
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* 🌊 Enhanced Footer */}
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
                <h4 className="text-2xl font-bold mb-4">Have Questions?</h4>
                <p className="text-blue-200 mb-6 max-w-md">
                  Our dedicated support team is available 24/7 to assist you with any inquiries.
                </p>
                <Link
                  href="/support/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transition-all group"
                >
                  <HelpCircle size={18} />
                  Get Help Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="text-center md:text-right">
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h5 className="font-bold mb-3">Connect With Us</h5>
                  <div className="flex justify-center md:justify-end gap-3">
                    {[
                      { icon: <FaFacebookF />, label: "Facebook" },
                      { icon: <FaTwitter />, label: "Twitter" },
                      { icon: <FaInstagram />, label: "Instagram" },
                      { icon: <FaLinkedinIn />, label: "LinkedIn" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition hover:scale-110"
                        title={social.label}
                      >
                        {social.icon}
                      </a>
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
                    Building Kenya's premier digital marketplace
                  </p>
                </div>
                <div className="flex gap-6 text-sm text-blue-300">
                  <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
                  <Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 🌟 Floating Help Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center z-50 group"
      >
        <HelpCircle className="text-white" size={22} />
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
          1
        </span>
      </motion.button>
    </div>
  );
}