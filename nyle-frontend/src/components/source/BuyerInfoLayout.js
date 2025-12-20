"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  User, 
  ChevronRight,
  Bell,
  Settings,
  Shield,
  Package,
  Truck,
  Star,
  TrendingUp,
  Sparkles,
  LogOut,
  Home,
  Calendar,
  Wallet,
  Gift
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function BuyerInfoLayout({ title, subtitle, children, icons = [], stats = [] }) {
  const [mounted, setMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(400);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      const updateWidth = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  // Navigation items with enhanced data
  const navItems = [
    { 
      href: "/buyer/orders", 
      label: "My Orders", 
      icon: <ShoppingBag size={18} />, 
      count: 3,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      href: "/buyer/wishlist", 
      label: "Wishlist", 
      icon: <Heart size={18} />, 
      count: 12,
      color: "from-pink-500 to-rose-500"
    },
    { 
      href: "/buyer/addresses", 
      label: "Addresses", 
      icon: <MapPin size={18} />, 
      count: 2,
      color: "from-green-500 to-emerald-500"
    },
    { 
      href: "/buyer/payments", 
      label: "Payment Methods", 
      icon: <CreditCard size={18} />, 
      count: 1,
      color: "from-purple-500 to-violet-500"
    },
    { 
      href: "/buyer/account", 
      label: "Account Info", 
      icon: <User size={18} />, 
      color: "from-orange-500 to-amber-500"
    },
    { 
      href: "/buyer/settings", 
      label: "Settings", 
      icon: <Settings size={18} />, 
      color: "from-gray-600 to-gray-800"
    },
  ];

  // Quick stats for buyer dashboard
  const buyerStats = stats.length > 0 ? stats : [
    { label: "Total Orders", value: "24", change: "+12%", icon: Package, color: "text-blue-600" },
    { label: "Saved Items", value: "18", change: "+5", icon: Heart, color: "text-pink-600" },
    { label: "Active Deliveries", value: "3", change: "In transit", icon: Truck, color: "text-green-600" },
    { label: "Wallet Balance", value: "$245.50", change: "+$45.20", icon: Wallet, color: "text-purple-600" },
  ];

  // Recent activity
  const recentActivity = [
    { action: "Order placed", item: "Wireless Headphones", time: "2 hours ago", status: "processing" },
    { action: "Item shipped", item: "Smart Watch", time: "1 day ago", status: "shipped" },
    { action: "Review added", item: "Bluetooth Speaker", time: "2 days ago", status: "completed" },
  ];

  // Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 flex flex-col overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Header with Gradient */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white py-12 shadow-xl overflow-hidden">
        {/* Animated wave pattern in header */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMlM0Mi42MjcgMTggMzYgMTh6TTAgMGg2MHY2MEgweiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Welcome back, Alex!</h2>
                <p className="text-blue-100 text-sm">Buyer since March 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Quick Actions */}
              <Link
                href="/"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <Home className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-lg md:text-xl text-blue-100/90 max-w-3xl"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
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
                      A
                    </div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Alex Morgan</h3>
                    <p className="text-sm text-gray-600">Premium Buyer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500">(128 reviews)</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                              : "hover:bg-blue-50 text-gray-700 hover:text-blue-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-blue-100'}`}>
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.count && (
                              <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                                {item.count}
                              </span>
                            )}
                            <ChevronRight className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Quick Stats */}
              <div className="p-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  {buyerStats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-100 rounded-lg">
                          <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <span className="text-sm text-gray-600">{stat.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-green-600">{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 font-medium rounded-lg transition-colors">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-gray-900">{activity.action}</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                    <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs ${
                      activity.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      activity.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {buyerStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${stat.color.replace('text', 'bg')}/10`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs font-medium text-green-600">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Content Header */}
              <div className="border-b border-gray-100">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Your Dashboard</h2>
                        <p className="text-gray-600 text-sm">Manage your purchases and preferences</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg text-sm transition-colors">
                        <Settings className="h-4 w-4 inline mr-2" />
                        Settings
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg text-sm transition-colors">
                        <Gift className="h-4 w-4 inline mr-2" />
                        Explore Deals
                      </button>
                    </div>
                  </div>

                  {/* Quick Navigation Tabs */}
                  <div className="flex space-x-1">
                    {["overview", "orders", "wishlist", "analytics"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  {children}
                </div>
              </div>
            </div>

            {/* Additional Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Security Card */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6" />
                  <div>
                    <h3 className="font-bold text-white">Account Security</h3>
                    <p className="text-blue-100 text-sm">Your account is protected</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Two-factor auth</span>
                    <span className="font-semibold">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Last login</span>
                    <span className="font-semibold">2 hours ago</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
                  Security Settings
                </button>
              </div>

              {/* Tips Card */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Shopping Tips</h3>
                    <p className="text-gray-600 text-sm">Get the most out of Nyle</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    Save items to your wishlist for later
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    Enable price drop alerts
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    Leave reviews to help other buyers
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="mt-auto bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left">
              <h4 className="font-bold text-white text-lg mb-3">Need Buyer Support?</h4>
              <p className="text-blue-100/80 mb-4 max-w-md">
                Our dedicated buyer support team is here to help with orders, returns, or any questions.
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
                  href="/buyer/help"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                >
                  Buyer Guides
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center lg:items-end gap-4">
              <div className="text-sm text-gray-400">
                Secure shopping experience
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

      {/* Enhanced Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-40 text-blue-500/20"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}