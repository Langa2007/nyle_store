"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  List,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";

interface AdminLayoutProps {
  title?: string;
  children: ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Products", href: "/dashboard/products", icon: <Package size={18} /> },
    { name: "Categories", href: "/dashboard/categories", icon: <List size={18} /> },
    { name: "Orders", href: "/dashboard/orders", icon: <ShoppingCart size={18} /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed md:static z-30 bg-gray-900 text-gray-100 w-64 flex-shrink-0 h-full flex flex-col justify-between ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-300`}
      >
        {/* Sidebar Header */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
            <h2 className="text-lg font-bold text-white">Nyle Admin</h2>
            <button
              aria-label="Close sidebar"
              title="Close sidebar"
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <button
            aria-label="Logout"
            title="Logout"
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          aria-label="Close sidebar overlay"
          title="Close sidebar overlay"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-100 flex items-center justify-between px-6 py-4 z-10">
          <div className="flex items-center gap-4">
            <button
              aria-label="Open sidebar"
              title="Open sidebar"
              className="md:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            {title && (
              <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
