"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Store,
  Truck,
  FileText,
  Smartphone,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  Bell,
  TrendingUp,
  Users,
  BarChart,
  Award,
  Sparkles,
  Zap,
  Target,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  Package,
  DollarSign,
  Globe,
  Heart
} from "lucide-react";

export default function VendorInfoLayout({
  title,
  subtitle,
  bannerImage = "https://images.unsplash.com/photo-1607082349566-187342175e2b?auto=format&fit=crop&w=1500&q=80",
  children,
  stats = [],
  showNotifications = true,
  vendorLevel = "verified"
}) {
  const [notifications, setNotifications] = useState(3);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultStats = stats.length > 0 ? stats : [
    { label: "Store Views", value: "2.4K", change: "+12%", icon: Eye, color: "text-blue-600" },
    { label: "Total Sales", value: "$24.5K", change: "+8%", icon: DollarSign, color: "text-green-600" },
    { label: "Active Orders", value: "18", change: "Processing", icon: Package, color: "text-orange-600" },
    { label: "Store Rating", value: "4.8/5", change: "+0.2", icon: Star, color: "text-yellow-600" },
  ];

  const navItems = [
    { 
      href: "/vendor/dashboard", 
      icon: BarChart, 
      label: "Dashboard",
      count: null,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      href: "/vendor/why-sell", 
      icon: Store, 
      label: "Why Sell on Nyle",
      description: "Benefits & opportunities",
      color: "from-green-500 to-emerald-500"
    },
    { 
      href: "/vendor/quotations", 
      icon: FileText, 
      label: "Get Quotations",
      description: "Receive buyer requests",
      color: "from-purple-500 to-pink-500"
    },
    { 
      href: "/vendor/shipping-logistics", 
      icon: Truck, 
      label: "Shipping & Logistics",
      description: "Delivery solutions",
      color: "from-orange-500 to-amber-500"
    },
    { 
      href: "/vendor/policies", 
      icon: ShieldCheck, 
      label: "Seller Policies",
      description: "Rules & guidelines",
      color: "from-indigo-500 to-blue-500"
    },
    { 
      href: "/vendor/app", 
      icon: Smartphone, 
      label: "Vendor App",
      description: "Mobile management",
      color: "from-gray-600 to-gray-800"
    },
  ];

  const additionalResources = [
    { href: "/vendor/support", icon: MessageSquare, label: "Vendor Support" },
    { href: "/vendor/settings", icon: Settings, label: "Store Settings" },
    { href: "/vendor/analytics", icon: TrendingUp, label: "Analytics" },
  ];

  const vendorBadges = {
    "starter": { label: "Starter", color: "bg-gray-100 text-gray-800", icon: "🚀" },
    "verified": { label: "Verified", color: "bg-blue-100 text-blue-800", icon: "✅" },
    "premium": { label: "Premium", color: "bg-purple-100 text-purple-800", icon: "⭐" },
    "elite": { label: "Elite", color: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white", icon: "👑" },
  };

  const quickStats = [
    { label: "Response Time", value: "2.4h", change: "Good" },
    { label: "Order Fulfillment", value: "98%", change: "Excellent" },
    { label: "Customer Rating", value: "4.8", change: "Top Rated" },
  ];

  // Floating particles animation
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 overflow-hidden">
      {/* Animated Background Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-700/70 to-cyan-700/70 z-10" />
        <Image
          src={bannerImage}
          alt={title}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                  <Store className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Vendor Portal</div>
                  <div className="text-blue-100 text-sm">Powered by Nyle</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {showNotifications && (
                  <button className="relative p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <Bell className="h-5 w-5 text-white" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                )}
                
                <Link
                  href="/"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <Home className="h-5 w-5 text-white" />
                </Link>
              </div>
            </div>

            {/* Main Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${vendorBadges[vendorLevel]?.color}`}>
                  {vendorBadges[vendorLevel]?.icon} {vendorBadges[vendorLevel]?.label} Seller
                </span>
                <span className="text-blue-200 text-sm flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Active
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        {defaultStats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 z-20"
          >
            <div className="max-w-7xl mx-auto px-6 -mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {defaultStats.map((stat, index) => (
                  <div key={index} className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${stat.color.replace('text', 'bg')}/10`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <span className="text-xs font-medium text-green-600">{stat.change}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 mt-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      V
                    </div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Vendor Profile</h3>
                    <p className="text-sm text-gray-600">Business Account</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500">(128 reviews)</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-green-600">{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Vendor Dashboard</h4>
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.href.split('/').pop();
                    
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveNav(item.href.split('/').pop())}
                          className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                              : "hover:bg-blue-50 text-gray-700 hover:text-blue-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-blue-100'}`}>
                              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                            </div>
                            <div>
                              <div className="font-medium">{item.label}</div>
                              {item.description && (
                                <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>
                          <ChevronRight className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Additional Resources */}
              <div className="p-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
                <div className="space-y-1">
                  {additionalResources.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <resource.icon className="h-4 w-4" />
                      {resource.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Become a Seller CTA */}
              <div className="p-4 border-t border-gray-100">
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Ready to Grow?
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Upgrade to access premium features
                  </p>
                  <Link
                    href="/vendor/signup"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Upgrade Account
                  </Link>
                </div>
              </div>

              {/* Logout */}
              <div className="p-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 font-medium rounded-lg transition-colors">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Quick Tips
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Target className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Respond to quotations within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Update stock levels regularly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-3 w-3 text-pink-600 mt-0.5 flex-shrink-0" />
                  <span>High-quality images boost sales</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="h-3 w-3 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Maintain 90%+ response rate</span>
                </li>
              </ul>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Content Header */}
              <div className="border-b border-gray-100">
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Vendor Center</h2>
                        <p className="text-gray-600 text-sm">Manage your business and grow with Nyle</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg text-sm transition-colors">
                        <Settings className="h-4 w-4 inline mr-2" />
                        Settings
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg text-sm transition-colors">
                        <TrendingUp className="h-4 w-4 inline mr-2" />
                        Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 md:p-8">
                <div className="space-y-8">
                  {children}
                </div>
              </div>
            </div>

            {/* Additional Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Performance Card */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6" />
                  <div>
                    <h3 className="font-bold text-white">Performance Score</h3>
                    <p className="text-blue-100 text-sm">Top 15% of vendors</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Response Rate</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Order Accuracy</span>
                    <span className="font-semibold">98%</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
                  View Details
                </button>
              </div>

              {/* Support Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Support Center</h3>
                    <p className="text-gray-600 text-sm">Get help when you need it</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>24/7 Vendor Support</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>Dedicated Account Manager</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span>Training & Resources</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.main>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="mt-auto bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left">
              <h4 className="font-bold text-white text-lg mb-3">Vendor Support</h4>
              <p className="text-blue-100/80 mb-4 max-w-md">
                Our dedicated vendor support team is here to help you grow your business on Nyle.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/support/contact"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all hover:shadow-lg"
                >
                  <HelpCircle className="h-5 w-5 inline mr-2" />
                  Contact Support
                </Link>
                <Link
                  href="/vendor/help"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                >
                  Vendor Guides
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center lg:items-end gap-4">
              <div className="text-sm text-gray-400">
                Secure vendor platform
              </div>
              <div className="flex items-center gap-4 text-xs opacity-70">
                <span>© {new Date().getFullYear()} Nyle Marketplace</span>
                <span>•</span>
                <span>All rights reserved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Missing Eye icon component
const Eye = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);