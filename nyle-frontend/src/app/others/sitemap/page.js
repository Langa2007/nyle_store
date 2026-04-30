"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Users, Building2, Globe, Search, ExternalLink,
  Home, Sparkles, Zap, Crown, Map, ChevronRight, ArrowRight,
  HelpCircle, Shield, FileText
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useIsMobile } from "@/lib/useMobile";

const siteSections = [
  {
    id: "shop",
    title: "Shopping & Products",
    subtitle: "Explore our full catalog",
    icon: <ShoppingBag size={22} />,
    accent: "from-blue-600 to-indigo-600",
    glow: "rgba(37,99,235,0.2)",
    links: [
      { name: "All Products", href: "/products", icon: "", badge: null },
      { name: "Featured Products", href: "/products/featured", icon: "", badge: "New" },
      { name: "New Arrivals", href: "/products/new", icon: "", badge: null },
      { name: "Best Sellers", href: "/products/bestsellers", icon: "", badge: "Popular" },
      { name: "Deals & Discounts", href: "/deals", icon: "", badge: "Hot" },
      { name: "Categories", href: "/categories", icon: "", badge: null },
      { name: "Brands", href: "/brands", icon: "", badge: null },
      { name: "Flash Sales", href: "/deals?type=flash", icon: "", badge: "Live" },
    ]
  },
  {
    id: "buyer",
    title: "Buyer Resources",
    subtitle: "Manage your account & orders",
    icon: <Users size={22} />,
    accent: "from-blue-500 to-indigo-500",
    glow: "rgba(99,102,241,0.2)",
    links: [
      { name: "My Account", href: "/profile", icon: "", badge: null },
      { name: "My Orders", href: "/orders", icon: "", badge: null },
      { name: "Wishlist", href: "/wishlist", icon: "", badge: null },
      { name: "Address Book", href: "/profile/addresses", icon: "", badge: null },
      { name: "Payment Methods", href: "/profile/payments", icon: "", badge: null },
      { name: "Reviews & Ratings", href: "/profile/reviews", icon: "", badge: null },
      { name: "Sign In", href: "/auth/login", icon: "", badge: null },
      { name: "Create Account", href: "/auth/signup", icon: "", badge: "Free" },
    ]
  },
  {
    id: "seller",
    title: "Seller Hub",
    subtitle: "Your business, amplified",
    icon: <Building2 size={22} />,
    accent: "from-purple-500 to-pink-500",
    glow: "rgba(168,85,247,0.2)",
    links: [
      { name: "Become a Seller", href: "/vendor/signup", icon: "", badge: "Join" },
      { name: "Seller Dashboard", href: "/vendor/dashboard", icon: "", badge: null },
      { name: "Product Management", href: "/vendor/products", icon: "", badge: null },
      { name: "Orders & Fulfillment", href: "/vendor/orders", icon: "", badge: null },
      { name: "Analytics", href: "/vendor/analytics", icon: "", badge: null },
      { name: "Submit a Deal", href: "/vendor/products", icon: "", badge: "New" },
      { name: "Seller Policies", href: "/vendor/policies", icon: "", badge: null },
      { name: "Vendor Login", href: "/vendor/login", icon: "", badge: null },
    ]
  },
  {
    id: "company",
    title: "Company & Support",
    subtitle: "We're here to help",
    icon: <Globe size={22} />,
    accent: "from-teal-500 to-cyan-500",
    glow: "rgba(20,184,166,0.2)",
    links: [
      { name: "About Nyle", href: "/about/know-nyle", icon: "", badge: null },
      { name: "Contact Us", href: "/support/contact", icon: "", badge: null },
      { name: "Help Center", href: "/support/help-center", icon: "", badge: null },
      { name: "FAQs", href: "/support/faqs", icon: "", badge: null },
      { name: "Careers", href: "/about/careers", icon: "", badge: "Hiring" },
      { name: "Blog & Newsletter", href: "/support/newsletter", icon: "", badge: null },
      { name: "Privacy Policy", href: "/others/privacy", icon: "", badge: null },
      { name: "Terms of Service", href: "/others/terms", icon: "", badge: null },
    ]
  }
];

const quickLinks = [
  { name: "Home", href: "/", icon: "", color: "from-blue-600 to-indigo-600" },
  { name: "Shop", href: "/products", icon: "", color: "from-amber-500 to-orange-500" },
  { name: "Deals", href: "/deals", icon: "", color: "from-red-500 to-pink-500" },
  { name: "Categories", href: "/categories", icon: "", color: "from-purple-500 to-pink-500" },
  { name: "Sell", href: "/vendor/signup", icon: "", color: "from-teal-500 to-cyan-500" },
  { name: "Help", href: "/support/help-center", icon: "", color: "from-blue-500 to-cyan-500" },
];

const badgeColors = {
  "Hot": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "New": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Live": "bg-blue-400/20 text-blue-300 border-blue-400/30 animate-pulse",
  "Popular": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "Free": "bg-cyan-600/20 text-cyan-300 border-cyan-600/30",
  "Join": "bg-blue-600/20 text-blue-300 border-blue-600/30",
  "Hiring": "bg-sky-500/20 text-sky-400 border-sky-500/30",
};

const footerPages = [
  { href: "/others/privacy", label: "Privacy Policy", icon: "", color: "from-blue-500 to-cyan-500" },
  { href: "/others/terms", label: "Terms of Service", icon: "", color: "from-blue-600 to-indigo-600" },
  { href: "/others/cookies", label: "Cookie Policy", icon: "", color: "from-indigo-600 to-purple-600" },
  { href: "/others/accessibility", label: "Accessibility", icon: "", color: "from-cyan-500 to-blue-500" },
];

const footerQuickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop Products" },
  { href: "/categories", label: "Browse Categories" },
  { href: "/support/help-center", label: "Help Center" },
  { href: "/support/contact", label: "Contact Us" },
];

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);

  const filteredSections = siteSections.map(section => ({
    ...section,
    links: section.links.map(link => ({
      ...link,
      href: (link.name === "My Account" && link.href.includes("/profile")) 
        ? (isMobile ? "/profile" : "/dashboard") 
        : link.href
    })).filter(link =>
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.href.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.links.length > 0);

  const totalResults = filteredSections.reduce((acc, s) => acc + s.links.length, 0);

  return (
    <div className="min-h-screen bg-[#060b18] text-white font-sans">

      {/* ── Ambient Background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/3 rounded-full blur-[150px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-32 pb-16 text-center"
        >
          {/* Crown badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-400/5 mb-8"
          >
            <Crown size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">Site Directory</span>
            <Sparkles size={12} className="text-blue-400" />
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6">
            <span className="text-white">Site</span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">map</span>
          </h1>

          <p className="text-white/40 text-lg max-w-xl mx-auto mb-12 font-medium">
            Every corner of the Nyle universe, organized and at your fingertips.
          </p>

          {/* Premium Search */}
          <div className="max-w-lg mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center bg-white/5 border border-white/10 group-focus-within:border-blue-400/40 rounded-2xl transition-all duration-300 overflow-hidden">
              <Search className="ml-4 text-white/30 group-focus-within:text-blue-400 transition-colors flex-shrink-0" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pages, features, sections..."
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder-white/20 focus:outline-none text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mr-4 text-white/30 hover:text-white transition text-xs font-medium"
                >
                  Clear
                </button>
              )}
            </div>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-0 right-0 text-center text-xs text-white/30"
              >
                {totalResults} page{totalResults !== 1 ? "s" : ""} found for &ldquo;{searchQuery}&rdquo;
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ── Quick Access Strip ── */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <p className="text-center text-xs font-bold text-white/20 uppercase tracking-[0.3em] mb-6">Quick Access</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {quickLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/20 hover:bg-white/7 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 ring-2 ring-blue-500/20`}>
                      {link.icon}
                    </div>
                    <span className="text-xs font-semibold text-white/50 group-hover:text-white transition-colors">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Main Sitemap Grid ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1, duration: 0.6 }}
            >
              <div
                className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-all duration-500 group"
                style={{ boxShadow: activeSection === section.id ? `0 0 60px ${section.glow}` : 'none' }}
                onMouseEnter={() => setActiveSection(section.id)}
                onMouseLeave={() => setActiveSection(null)}
              >
                {/* Ambient glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${section.glow}, transparent 60%)` }}
                />

                {/* Section Header */}
                <div className="relative px-6 pt-6 pb-5 border-b border-white/5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.accent} flex items-center justify-center shadow-xl`}>
                        <span className="text-white">{section.icon}</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-white">{section.title}</h2>
                        <p className="text-xs text-white/30 font-medium mt-0.5">{section.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white/20 mt-1">{section.links.length} pages</span>
                  </div>
                </div>

                {/* Links Grid */}
                <div className="relative p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className="group/link flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:border-white/8 hover:bg-white/4 transition-all duration-200"
                      >
                        <span className="text-lg flex-shrink-0 group-hover/link:scale-110 transition-transform duration-200">
                          {link.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white/70 group-hover/link:text-white transition-colors block leading-tight">
                            {link.name}
                          </span>
                          <span className="text-[10px] text-white/20 font-mono truncate block">{link.href}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {link.badge && (
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColors[link.badge] || "bg-white/10 text-white/50 border-white/10"}`}>
                              {link.badge}
                            </span>
                          )}
                          <ExternalLink
                            size={12}
                            className="text-white/10 group-hover/link:text-blue-400 transition-colors"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        <AnimatePresence>
          {searchQuery && filteredSections.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-white/20" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">No pages found</h3>
              <p className="text-white/30 mb-8">
                Nothing matches &ldquo;{searchQuery}&rdquo;. Try a different keyword.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-blue-900/30 transition-all font-sans"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer Stats Strip ── */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden"
          >
            {[
              { value: `${siteSections.reduce((a, s) => a + s.links.length, 0)}+`, label: "Pages Listed", icon: "" },
              { value: "4", label: "Key Sections", icon: "" },
              { value: "24/7", label: "Support Available", icon: "" },
              { value: "100%", label: "Free to Browse", icon: "" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.02] px-6 py-8 text-center hover:bg-white/5 transition-colors">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Bottom CTA ── */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-12 relative rounded-3xl overflow-hidden p-px bg-gradient-to-r from-blue-500/30 via-transparent to-blue-500/30"
          >
            <div className="bg-gradient-to-r from-blue-500/5 via-[#0a0f1e] to-blue-500/5 rounded-3xl p-12 text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
              <Crown size={40} className="text-blue-400/60 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white mb-3">Can't find what you need?</h2>
              <p className="text-white/40 mb-8 max-w-md mx-auto">Our support team is ready to guide you to the right place.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/support/help-center"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-blue-900/30 transition-all"
                >
                  Visit Help Center <ArrowRight size={16} />
                </Link>
                <Link
                  href="/support/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 text-white/70 font-bold rounded-2xl hover:bg-white/5 hover:text-white transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* ── Shared Modal Footer ── */}
      <footer className="relative mt-24 bg-gradient-to-br from-[#060b18] via-blue-950 to-[#060b18] text-white overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.05),transparent_40%)]" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex flex-col -space-y-0.5">
                  <span className="text-2xl font-black tracking-tight text-white">
                    Nyle<span className="text-blue-400">Store</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Kenya's #1 Marketplace</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">
                  Connecting premium buyers and trusted sellers across the region with transparency and trust.
                </p>
                <div className="flex gap-4">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-400 transition-all border border-white/10 hover:border-blue-500/30"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Quick Access</h4>
                <div className="space-y-3">
                  {footerQuickLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="block text-sm text-white/40 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal Pages */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Legal & Policies</h4>
                <div className="space-y-3">
                  {footerPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="block text-sm text-white/40 hover:text-blue-400 transition-colors"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Support</h4>
                <div className="space-y-3">
                  <Link href="/support/help-center" className="block text-sm text-white/40 hover:text-blue-400 transition-colors">Help Center</Link>
                  <Link href="/support/contact" className="block text-sm text-white/40 hover:text-blue-400 transition-colors">Contact Us</Link>
                  <Link href="/support/faqs" className="block text-sm text-white/40 hover:text-blue-400 transition-colors">FAQs</Link>
                  <Link href="/support/report-issue" className="block text-sm text-white/40 hover:text-blue-400 transition-colors">Report Issue</Link>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-white/20 font-medium">
                   {new Date().getFullYear()} Nyle Store. Built for the future of commerce.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20">
                <Link href="/others/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
                <Link href="/others/terms" className="hover:text-blue-400 transition-colors">Terms</Link>
                <Link href="/others/sitemap" className="text-blue-400">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}