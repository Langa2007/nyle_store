"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
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
  Shield
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home, badge: null },
  { href: "/dashboard/vendors", label: "Vendors", icon: Users, badge: 5 },
  { href: "/dashboard/products", label: "Products", icon: Package, badge: 12 },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart, badge: "3+" },
  { href: "/dashboard/categories", label: "Categories", icon: FolderTree, badge: null },
  { href: "/dashboard/newsletter", label: "Newsletter", icon: Mail, badge: "New" },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3, badge: null },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, badge: null },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity ${
          collapsed ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setCollapsed(false)}
      />

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen 
        bg-gradient-to-b from-gray-900 to-black
        border-r border-gray-800 
        z-50 transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
        shadow-2xl shadow-blue-500/5
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Admin Panel
                  </h1>
                  <p className="text-xs text-gray-400">Enterprise Edition</p>
                </div>
              </div>
            )}
            
            {collapsed && (
              <div className="flex justify-center w-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
          
          {/* Quick Search - Only visible when expanded */}
          {!collapsed && (
            <div className="mt-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setActiveHover(item.href)}
                onMouseLeave={() => setActiveHover(null)}
                className={`
                  relative flex items-center rounded-xl p-3 text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/10 text-white border-l-4 border-blue-500" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }
                  ${collapsed ? "justify-center" : "space-x-3"}
                `}
              >
                {/* Animated background effect */}
                {activeHover === item.href && !isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl" />
                )}

                {/* Icon with gradient */}
                <div className={`relative z-10 ${isActive ? "text-blue-400" : "group-hover:text-blue-300"}`}>
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <div className="absolute -inset-1 bg-blue-500/20 blur-sm rounded-full"></div>
                  )}
                </div>

                {/* Label - Hidden when collapsed */}
                {!collapsed && (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Badge */}
                    {item.badge && (
                      <span className={`
                        ml-auto px-2 py-1 text-xs font-semibold rounded-full
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

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-600 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Active indicator dot for collapsed */}
                {collapsed && isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile & Notifications - Bottom Section */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800
          ${collapsed ? "flex flex-col items-center" : ""}
        `}>
          {/* Notifications */}
          {!collapsed ? (
            <div className="mb-4 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Notifications</p>
                    <p className="text-xs text-gray-400">3 unread messages</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-lg">
                  3
                </div>
              </div>
            </div>
          ) : (
            <div className="relative mb-4">
              <Bell className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          )}

          {/* User Profile */}
          <div className={`
            flex items-center rounded-xl p-3 bg-gray-800/30 hover:bg-gray-800/50 cursor-pointer transition-colors group
            ${collapsed ? "justify-center" : "space-x-3"}
          `}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                JS
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
            </div>
            
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Smith</p>
                <p className="text-xs text-gray-400 truncate">Admin</p>
              </div>
            )}

            {!collapsed && (
              <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
            )}
          </div>
        </div>

        {/* Collapse Toggle for Mobile */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="lg:hidden absolute -right-3 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Mobile Toggle Button */}
      <button title= "Open Sidebar"
        onClick={() => setCollapsed(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-xl"
      >
        <ChevronRight size={20} />
      </button>
    </>
  )
}