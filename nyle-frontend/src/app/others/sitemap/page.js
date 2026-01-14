"use client";

import { motion } from "framer-motion";
import { Map, Home, ShoppingBag, Users, Building, CreditCard, FileText, Settings, Package, Truck, Award, Globe, ArrowLeft, Search, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const siteSections = [
    {
      title: "Shopping & Products",
      icon: <ShoppingBag />,
      color: "from-blue-500 to-cyan-500",
      links: [
        { name: "All Products", href: "/products", icon: "📦" },
        { name: "Featured Products", href: "/products/featured", icon: "⭐" },
        { name: "New Arrivals", href: "/products/new", icon: "🆕" },
        { name: "Best Sellers", href: "/products/bestsellers", icon: "🔥" },
        { name: "Deals & Discounts", href: "/deals", icon: "💰" },
        { name: "Categories", href: "/categories", icon: "🗂️" }
      ]
    },
    {
      title: "Buyer Resources",
      icon: <Users />,
      color: "from-blue-600 to-indigo-600",
      links: [
        { name: "My Account", href: "/buyer/account", icon: "👤" },
        { name: "My Orders", href: "/buyer/orders", icon: "📦" },
        { name: "Wishlist", href: "/buyer/wishlist", icon: "❤️" },
        { name: "Address Book", href: "/buyer/addresses", icon: "📍" },
        { name: "Payment Methods", href: "/buyer/payments", icon: "💳" },
        { name: "Reviews", href: "/buyer/reviews", icon: "⭐" }
      ]
    },
    {
      title: "Seller Hub",
      icon: <Building />,
      color: "from-indigo-600 to-purple-600",
      links: [
        { name: "Become a Seller", href: "/vendor/signup", icon: "🚀" },
        { name: "Seller Dashboard", href: "/vendor/dashboard", icon: "📊" },
        { name: "Product Management", href: "/vendor/products", icon: "📦" },
        { name: "Orders & Fulfillment", href: "/vendor/orders", icon: "🚚" },
        { name: "Analytics", href: "/vendor/analytics", icon: "📈" },
        { name: "Seller Policies", href: "/vendor/policies", icon: "📜" }
      ]
    },
    {
      title: "Company & Support",
      icon: <Globe />,
      color: "from-cyan-500 to-blue-500",
      links: [
        { name: "About Us", href: "/about", icon: "🏢" },
        { name: "Contact Us", href: "/contact", icon: "📞" },
        { name: "Help Center", href: "/help", icon: "❓" },
        { name: "FAQs", href: "/faqs", icon: "💬" },
        { name: "Careers", href: "/careers", icon: "💼" },
        { name: "Blog", href: "/blog", icon: "📝" }
      ]
    }
  ];

  const quickLinks = [
    { name: "Privacy Policy", href: "/privacy", icon: <FileText /> },
    { name: "Terms of Service", href: "/terms", icon: <FileText /> },
    { name: "Cookie Policy", href: "/cookies", icon: <Settings /> },
    { name: "Accessibility", href: "/accessibility", icon: <Award /> },
    { name: "Shipping Info", href: "/shipping", icon: <Truck /> },
    { name: "Return Policy", href: "/returns", icon: <Package /> }
  ];

  const filteredLinks = siteSections.map(section => ({
    ...section,
    links: section.links.filter(link => 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.href.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.links.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white py-20 overflow-hidden">
        {/* Map Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMEMxMy40IDAgMCAxMy40IDAgMzBzMTMuNCAzMCAzMCAzMCAzMC0xMy40IDMwLTMwUzQ2LjYgMCAzMCAwem0wIDU2Yy0xNC4zNiAwLTI2LTExLjY0LTI2LTI2UzE1LjY0IDQgMzAgNHMyNiAxMS42NCAyNiAyNi0xMS42NCAyNi0yNiAyNnptMTAtMjZjMC01LjUyMy00LjQ3Ny0xMC0xMC0xMFMyMCAyNC40NzcgMjAgMzBzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTB6IiBmaWxsPSIjZmZmIi8+PC9zdmc+')]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Map className="h-8 w-8" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Sitemap
              </h1>
            </div>
            
            <p className="text-xl text-blue-100/90 max-w-3xl mx-auto mb-8">
              Navigate through all pages and sections of Nyle Store. Find exactly what you're looking for.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for pages... (e.g., 'products', 'account', 'help')"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all">
                <ArrowLeft className="inline mr-2 h-5 w-5" />
                Back to Home
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Back to Top
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Home className="h-6 w-6 text-blue-600" />
            Quick Access Links
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="inline-flex p-3 rounded-lg bg-blue-100 text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Search Results Info */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">
                  Found {filteredLinks.reduce((acc, section) => acc + section.links.length, 0)} results for "{searchQuery}"
                </span>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-gray-600 hover:text-blue-700"
              >
                Clear search
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Sitemap Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredLinks.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{section.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                    >
                      <span className="text-2xl">{link.icon}</span>
                      <div className="flex-grow">
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {link.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {link.href}
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <ArrowLeft className="h-5 w-5 rotate-90" />
            Back to Top
          </button>
        </motion.div>
      </div>
    </div>
  );
}