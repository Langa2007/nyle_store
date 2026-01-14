"use client";

import { Map, ShoppingBag, Users, Building, Globe, Search, ExternalLink, Home } from "lucide-react";
import FooterInfoLayout from "@/components/footer/FooterInfoLayout";
import { useState } from "react";
import Link from "next/link";

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

  const filteredLinks = siteSections.map(section => ({
    ...section,
    links: section.links.filter(link => 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.href.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.links.length > 0);

  return (
    <FooterInfoLayout
      title="Sitemap"
      subtitle="Navigate through all pages and sections of Nyle Store. Find exactly what you're looking for."
      icon={<Map className="h-8 w-8" />}
      lastUpdated="January 15, 2024"
      category="Navigation"
    >
      <div className="space-y-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for pages... (e.g., 'products', 'account', 'help')"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
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
          </div>
        )}

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Home className="h-6 w-6 text-blue-600" />
            Quick Access Links
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: "Home", href: "/", icon: "🏠" },
              { name: "Shop", href: "/products", icon: "🛒" },
              { name: "Categories", href: "/categories", icon: "📂" },
              { name: "Deals", href: "/deals", icon: "💰" },
              { name: "Sell", href: "/vendor/signup", icon: "🚀" },
              { name: "Support", href: "/help", icon: "❓" }
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Sitemap Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredLinks.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
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
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {searchQuery && filteredLinks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No pages found</h3>
            <p className="text-gray-600 mb-6">
              No pages match your search for "{searchQuery}". Try a different search term.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </FooterInfoLayout>
  );
}