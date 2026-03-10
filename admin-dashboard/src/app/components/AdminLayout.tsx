"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  List,
  ShoppingCart,
  Settings,
  LogOut,
  Users,
  Mail,
  BarChart3,
  Shield,
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
  TrendingUp,
  Zap,
  FileText,
} from "lucide-react";
import { useAdminNotifications } from "../hooks/useAdminNotifications";

interface AdminLayoutProps {
  title?: string;
  children: ReactNode;
  headerActions?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

// Utility function for conditional classes
function mergeClasses(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout({
  title,
  children,
  headerActions,
  breadcrumbs
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      badge: null
    },
    {
      name: "Vendors",
      href: "/dashboard/vendors",
      icon: <Users size={18} />,
      badge: "5"
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
      icon: <List size={18} />,
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

  const { notifications: liveNotifications, loading: notificationsLoading } = useAdminNotifications(60000); // Poll every minute

  // Map the summary details into actionable notification objects
  const notifications = [
    ...(liveNotifications.details.pendingVendors > 0 ? [{ id: 'vendor', title: `${liveNotifications.details.pendingVendors} Pending Vendor Approval(s)`, time: "Requires action", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.pendingPartners > 0 ? [{ id: 'partner', title: `${liveNotifications.details.pendingPartners} Pending Partner Application(s)`, time: "Requires action", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.pendingOrders > 0 ? [{ id: 'order', title: `${liveNotifications.details.pendingOrders} Pending Order(s)`, time: "Requires processing", unread: true, type: "info" }] : []),
    ...(liveNotifications.details.openSupportMessages > 0 ? [{ id: 'support', title: `${liveNotifications.details.openSupportMessages} Open Support Ticket(s)`, time: "Unresolved", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.openReportedIssues > 0 ? [{ id: 'report', title: `${liveNotifications.details.openReportedIssues} Open Reported Issue(s)`, time: "Unresolved", unread: true, type: "warning" }] : [])
  ];

  const unreadCount = liveNotifications.total;

  return (
    <div className={mergeClasses(
      "min-h-screen flex",
      darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-800"
    )}>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={mergeClasses(
          "fixed md:static z-40 w-72 flex-shrink-0 h-full flex flex-col justify-between",
          "bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950",
          "border-r border-gray-800/50 backdrop-blur-sm",
          "shadow-2xl shadow-blue-500/5",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div>
          <div className="px-6 py-5 border-b border-gray-800/50">
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
                    Nyle Admin
                  </h2>
                  <p className="text-xs text-gray-400">Enterprise Edition</p>
                </div>
              </div>
              <button
                aria-label="Close sidebar"
                title="Close sidebar"
                className="md:hidden text-gray-400 hover:text-white transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Today</span>
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                </div>
                <p className="text-lg font-semibold text-white mt-1">$12.4k</p>
                <p className="text-xs text-emerald-400">+24%</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Orders</span>
                  <ShoppingCart className="w-3 h-3 text-blue-400" />
                </div>
                <p className="text-lg font-semibold text-white mt-1">342</p>
                <p className="text-xs text-blue-400">+12%</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={mergeClasses(
                    "group flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
                    "hover:bg-gray-800/50 hover:translate-x-1",
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/10 text-white border-l-4 border-blue-500"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={mergeClasses(
                      "transition-colors",
                      isActive ? "text-blue-400" : "group-hover:text-blue-300"
                    )}>
                      {item.icon}
                    </div>
                    {item.name}
                  </div>

                  {item.badge && (
                    <span className={mergeClasses(
                      "px-2 py-1 text-xs font-semibold rounded-full transition-all",
                      isActive
                        ? "bg-white text-gray-900"
                        : "bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-blue-300 group-hover:text-white"
                    )}>
                      {item.badge}
                    </span>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800/50 space-y-4">
          {/* System Status */}
          <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">System Status</span>
              </div>
              <span className="text-xs text-emerald-400">All Systems Go</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span>CPU: 42%</span>
              <span>Memory: 68%</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            aria-label="Logout"
            title="Logout"
            className={mergeClasses(
              "w-full flex items-center justify-center gap-2",
              "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              "bg-gradient-to-r from-red-600/20 to-red-700/20",
              "text-red-400 hover:text-white hover:bg-red-600/30",
              "border border-red-700/30 hover:border-red-600/50",
              "hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            aria-label="Close sidebar overlay"
            title="Close sidebar overlay"
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className={mergeClasses(
          "sticky top-0 z-20",
          "px-6 py-4 flex items-center justify-between",
          "border-b backdrop-blur-sm",
          darkMode
            ? "bg-gray-900/80 border-gray-800/50"
            : "bg-white/80 border-gray-200"
        )}>
          <div className="flex items-center gap-4">
            <button
              aria-label="Open sidebar"
              title="Open sidebar"
              className="md:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/dashboard"
                className={mergeClasses(
                  "hover:text-blue-400 transition-colors",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}
              >
                Dashboard
              </Link>
              {breadcrumbs?.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={darkMode ? "text-gray-600" : "text-gray-400"}>/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={mergeClasses(
                        "hover:text-blue-400 transition-colors",
                        darkMode ? "text-gray-400" : "text-gray-600"
                      )}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={darkMode ? "text-white" : "text-gray-900"}>{crumb.label}</span>
                  )}
                </div>
              ))}
              {title && (
                <>
                  <span className={darkMode ? "text-gray-600" : "text-gray-400"}>/</span>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {title}
                  </h1>
                </>
              )}
            </div>
          </div>

          {/* Header Actions & Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button className={mergeClasses(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                "flex items-center gap-2",
                darkMode
                  ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              )}>
                <Zap size={14} />
                Quick Action
              </button>
              <button className={mergeClasses(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}>
                <FileText size={14} />
                Report
              </button>
            </div>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className={mergeClasses(
                "p-2 rounded-lg transition-colors",
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
              title="Quick Search"
            >
              <Search size={18} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={mergeClasses(
                  "p-2 rounded-lg transition-colors relative",
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setNotificationsOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={mergeClasses(
                        "absolute right-0 mt-2 w-80 rounded-xl shadow-2xl z-20 overflow-hidden",
                        darkMode
                          ? "bg-gray-900 border border-gray-800"
                          : "bg-white border border-gray-200"
                      )}
                    >
                      <div className={mergeClasses(
                        "p-4 border-b",
                        darkMode ? "border-gray-800" : "border-gray-200"
                      )}>
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Notifications</h3>
                          <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">
                            Mark all as read
                          </span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto w-full">
                        {notificationsLoading ? (
                          <div className="p-4 text-center text-sm text-gray-500">Loading notifications...</div>
                        ) : notifications.length === 0 ? (
                          <div className="p-4 text-center text-sm text-gray-500">No pending notifications</div>
                        ) : (
                          notifications.map((notification) => (
                            <Link href={`/dashboard`} key={notification.id} onClick={() => setNotificationsOpen(false)}>
                              <div
                                className={mergeClasses(
                                  "p-4 border-b cursor-pointer transition-colors",
                                  notification.unread && darkMode && "bg-amber-500/5 hover:bg-amber-500/10",
                                  notification.unread && !darkMode && "bg-amber-50 hover:bg-amber-100",
                                  darkMode ? "border-gray-800" : "border-gray-100"
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={mergeClasses(
                                    "w-2 h-2 rounded-full mt-2 flex-shrink-0 animate-pulse",
                                    notification.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                                  )}></div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className={mergeClasses(
                                      "text-xs mt-1",
                                      darkMode ? "text-gray-400" : "text-gray-500"
                                    )}>{notification.time}</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                      <div className={mergeClasses(
                        "p-3 border-t",
                        darkMode ? "border-gray-800" : "border-gray-200"
                      )}>
                        <button className="w-full py-2 text-sm text-center text-blue-400 hover:text-blue-300 transition-colors">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={mergeClasses(
                "p-2 rounded-lg transition-colors",
                darkMode
                  ? "text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
                  : "text-gray-600 hover:text-amber-600 hover:bg-gray-100"
              )}
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-1 pl-3 rounded-lg transition-colors group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className={mergeClasses(
                    "text-xs",
                    darkMode ? "text-gray-400" : "text-gray-500"
                  )}>Super Admin</p>
                </div>
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    JS
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <ChevronDown className={mergeClasses(
                  "w-4 h-4 transition-transform duration-200",
                  darkMode ? "text-gray-400" : "text-gray-600",
                  userMenuOpen ? "rotate-180" : ""
                )} />
              </button>

              {/* User Dropdown Menu */}
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
                      className={mergeClasses(
                        "absolute right-0 mt-2 w-56 rounded-xl shadow-2xl z-20 overflow-hidden",
                        darkMode
                          ? "bg-gray-900 border border-gray-800"
                          : "bg-white border border-gray-200"
                      )}
                    >
                      <div className={mergeClasses(
                        "p-4 border-b",
                        darkMode ? "border-gray-800" : "border-gray-200"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                            JS
                          </div>
                          <div>
                            <p className="font-semibold">John Smith</p>
                            <p className={mergeClasses(
                              "text-sm",
                              darkMode ? "text-gray-400" : "text-gray-500"
                            )}>admin@example.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button className={mergeClasses(
                          "w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3",
                          darkMode
                            ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}>
                          <Users size={16} />
                          <span>My Profile</span>
                        </button>
                        <button className={mergeClasses(
                          "w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3",
                          darkMode
                            ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}>
                          <Settings size={16} />
                          <span>Account Settings</span>
                        </button>
                        <button className={mergeClasses(
                          "w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3",
                          darkMode
                            ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}>
                          <Shield size={16} />
                          <span>Security</span>
                        </button>
                        <div className={mergeClasses(
                          "h-px my-2",
                          darkMode ? "bg-gray-800" : "bg-gray-200"
                        )}></div>
                        <button className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3">
                          <LogOut size={16} />
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

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {headerActions && (
            <div className="mb-6">
              {headerActions}
            </div>
          )}

          {/* Animated Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={mergeClasses(
              "rounded-2xl p-6",
              darkMode
                ? "bg-gray-900/50 border border-gray-800/50"
                : "bg-white border border-gray-200"
            )}
          >
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className={mergeClasses(
          "px-6 py-4 border-t",
          darkMode
            ? "bg-gray-900/50 border-gray-800/50"
            : "bg-white border-gray-200"
        )}>
          <div className="flex items-center justify-between text-sm">
            <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
              © {new Date().getFullYear()} Nyle Admin. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <button className={mergeClasses(
                "hover:underline transition-colors",
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}>
                Privacy Policy
              </button>
              <button className={mergeClasses(
                "hover:underline transition-colors",
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}>
                Terms of Service
              </button>
              <button className={mergeClasses(
                "hover:underline transition-colors",
                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}>
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
              className={mergeClasses(
                "w-full max-w-2xl rounded-xl shadow-2xl p-2 border",
                darkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search analytics, reports, vendors, products..."
                  className={mergeClasses(
                    "w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:outline-none",
                    darkMode
                      ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  )}
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
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
  );
}