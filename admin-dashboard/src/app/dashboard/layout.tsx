// src/app/dashboard/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Menu,
  X,
  Home,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Mail,
  FolderTree,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  BarChart3,
  Shield,
  User,
  HelpCircle,
  Moon,
  Sun,
  Grid,
  TrendingUp,
  Zap,
  Database,
  CreditCard,
  FileText,
  AlertCircle,
  ChevronDown,
  Building2,
  Layers,
  Tag
} from "lucide-react";
import Providers from "../providers";
import RequireAuth from "../components/RequireAuth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lastPath = pathname.split('/').pop() || 'Home';
  const pageTitle = lastPath.charAt(0).toUpperCase() + lastPath.slice(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin User");

  useEffect(() => {
    const storedName = localStorage.getItem("adminName");
    if (storedName) setAdminName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    toast.success("Logged out successfully", {
      icon: <LogOut className="w-5 h-5 text-emerald-500" />
    });
    router.push("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home size={18} />,
      badge: null
    },
    {
      name: "Vendors",
      href: "/dashboard/vendors",
      icon: <Users size={18} />,
      badge: "5"
    },
    {
      name: "Vendor Leads",
      href: "/dashboard/leads",
      icon: <Building2 size={18} />,
      badge: "New"
    },
    {
      name: "Products",
      href: "/dashboard/products",
      icon: <Package size={18} />,
      badge: "12"
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: <ShoppingCart size={18} />,
      badge: "3+"
    },
    {
      name: "Categories",
      href: "/dashboard/categories",
      icon: <FolderTree size={18} />,
      badge: null
    },
    {
      name: "Newsletter",
      href: "/dashboard/newsletter",
      icon: <Mail size={18} />,
      badge: "New"
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 size={18} />,
      badge: null
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={18} />,
      badge: null
    },
  ];

  const notifications = [
    { id: 1, title: "New order received", time: "5 min ago", unread: true },
    { id: 2, title: "Server maintenance", time: "1 hour ago", unread: true },
    { id: 3, title: "Payment processed", time: "2 hours ago", unread: false },
    { id: 4, title: "New vendor registered", time: "1 day ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Providers>
      <RequireAuth>
        <div className={`min-h-screen flex ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`
              hidden lg:flex flex-col justify-between
              bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950
              border-r border-gray-800/50
              shadow-2xl shadow-blue-500/5
              transition-all duration-300 ease-in-out
              ${sidebarCollapsed ? 'w-20' : 'w-64'}
            `}
          >
            {/* Sidebar Header */}
            <div>
              <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center justify-between">
                  {!sidebarCollapsed && (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          Admin Panel
                        </h2>
                        <p className="text-xs text-gray-400">Enterprise Edition</p>
                      </div>
                    </div>
                  )}

                  {sidebarCollapsed && (
                    <div className="flex justify-center w-full">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  >
                    {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                  </button>
                </div>

                {/* Quick Search */}
                {!sidebarCollapsed && (
                  <div className="mt-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      aria-label="Search"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        relative flex items-center rounded-xl p-3 text-sm font-medium transition-all duration-200 group
                        ${isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/10 text-white border-l-4 border-blue-500"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }
                        ${sidebarCollapsed ? "justify-center" : "gap-3"}
                      `}
                    >
                      <div className={`${isActive ? "text-blue-400" : "group-hover:text-blue-300"}`}>
                        {item.icon}
                      </div>

                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1">{item.name}</span>
                          {item.badge && (
                            <span className={`
                              px-2 py-1 text-xs font-semibold rounded-full
                              ${isActive
                                ? "bg-white text-gray-900"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              }
                            `}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {sidebarCollapsed && item.badge && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
                      )}

                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-600 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-800/50">
              <div className={`flex items-center rounded-xl p-3 bg-gray-800/30 hover:bg-gray-800/50 cursor-pointer transition-colors ${sidebarCollapsed ? "justify-center" : "gap-3"
                }`}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    AD
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                </div>

                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Admin User</p>
                    <p className="text-xs text-gray-400 truncate">Super Admin</p>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {mobileSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* Mobile Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: mobileSidebarOpen ? 0 : -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:hidden z-40 w-64 h-full flex flex-col justify-between bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800"
          >
            <div>
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Admin Panel
                      </h2>
                      <p className="text-xs text-gray-400">Mobile View</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    aria-label="Close sidebar"
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all duration-200
                        ${isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/10 text-white border-l-4 border-blue-500"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }
                      `}
                    >
                      <div className={`${isActive ? "text-blue-400" : ""}`}>
                        {item.icon}
                      </div>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className={`
                          px-2 py-1 text-xs font-semibold rounded-full
                          ${isActive
                            ? "bg-white text-gray-900"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600/20 to-red-700/20 text-red-400 hover:text-white hover:bg-red-600/30 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-red-700/30 hover:border-red-600/50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
            {/* Header */}
            <header className={`
              sticky top-0 z-20
              px-6 py-4 flex items-center justify-between
              border-b backdrop-blur-sm
              ${darkMode
                ? "bg-gray-900/80 border-gray-800/50"
                : "bg-white/80 border-gray-200"
              }
            `}>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  aria-label="Open sidebar"
                  className="lg:hidden text-gray-400 hover:text-white transition-colors"
                >
                  <Menu size={22} />
                </button>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm">
                  <Link
                    href="/dashboard"
                    className={`hover:text-blue-400 transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Dashboard
                  </Link>
                  <span className={darkMode ? "text-gray-600" : "text-gray-400"}>/</span>
                  <span className={darkMode ? "text-white" : "text-gray-900"}>
                    {pageTitle}
                  </span>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className={`p-2 rounded-lg transition-colors ${darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  <Search size={18} />
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    aria-label="Notifications"
                    className={`p-2 rounded-lg transition-colors relative ${darkMode
                      ? "text-gray-400 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                  className={`p-2 rounded-lg transition-colors ${darkMode
                    ? "text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
                    : "text-gray-600 hover:text-amber-600 hover:bg-gray-100"
                    }`}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-label="User menu"
                    className="flex items-center gap-3 p-1 pl-3 rounded-lg transition-colors group"
                  >
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">{adminName}</p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Super Admin</p>
                    </div>
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                        AD
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${darkMode ? "text-gray-400" : "text-gray-600"
                      } ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setUserMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl z-20 overflow-hidden ${darkMode
                            ? "bg-gray-900 border border-gray-800"
                            : "bg-white border border-gray-200"
                            }`}
                        >
                          <div className={`p-4 border-b ${darkMode ? "border-gray-800" : "border-gray-200"
                            }`}>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                                AD
                              </div>
                              <div>
                                <p className="font-semibold">Admin User</p>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                                  }`}>admin@example.com</p>
                              </div>
                            </div>
                          </div>
                          <div className="py-2">
                            <button className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3 ${darkMode
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              }`}>
                              <User className="w-4 h-4" />
                              <span>My Profile</span>
                            </button>
                            <button className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3 ${darkMode
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              }`}>
                              <Settings className="w-4 h-4" />
                              <span>Account Settings</span>
                            </button>
                            <button className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3 ${darkMode
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              }`}>
                              <Shield className="w-4 h-4" />
                              <span>Security</span>
                            </button>
                            <div className={`h-px my-2 ${darkMode ? "bg-gray-800" : "bg-gray-200"
                              }`}></div>
                            <button
                              onClick={handleLogout}
                              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6 overflow-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-6 ${darkMode
                  ? "bg-gray-900/50 border border-gray-800/50"
                  : "bg-white border border-gray-200"
                  }`}
              >
                {children}
              </motion.div>
            </main>

            {/* Footer */}
            <footer className={`
              px-6 py-4 border-t
              ${darkMode
                ? "bg-gray-900/50 border-gray-800/50"
                : "bg-white border-gray-200"
              }
            `}>
              <div className="flex items-center justify-between text-sm">
                <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  © {new Date().getFullYear()} Admin Panel. All rights reserved.
                </div>
                <div className="flex items-center gap-4">
                  <button className={`
                    hover:underline transition-colors
                    ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}
                  `}>
                    Privacy Policy
                  </button>
                  <button className={`
                    hover:underline transition-colors
                    ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}
                  `}>
                    Terms of Service
                  </button>
                  <button className={`
                    hover:underline transition-colors
                    ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}
                  `}>
                    Help Center
                  </button>
                </div>
              </div>
            </footer>
          </div>

          {/* Search Modal */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
                onClick={() => setSearchOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`w-full max-w-2xl rounded-xl shadow-2xl p-2 border ${darkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                    }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search across dashboard, vendors, products..."
                      aria-label="Search"
                      className={`w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:outline-none ${darkMode
                        ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      autoFocus
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      aria-label="Close search"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </RequireAuth>
    </Providers>
  );
}