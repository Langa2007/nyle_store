"use client"

import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
  User,
  LogOut,
  Grid,
  Shield
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAdminNotifications } from "../hooks/useAdminNotifications"

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const { notifications: liveNotifications, loading: notificationsLoading } = useAdminNotifications(60000);

  const notifications = [
    ...(liveNotifications.details.pendingVendors > 0 ? [{ id: 'vendor', title: `${liveNotifications.details.pendingVendors} Pending Vendor Approval(s)`, time: "Requires action", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.pendingPartners > 0 ? [{ id: 'partner', title: `${liveNotifications.details.pendingPartners} Pending Partner Application(s)`, time: "Requires action", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.pendingOrders > 0 ? [{ id: 'order', title: `${liveNotifications.details.pendingOrders} Pending Order(s)`, time: "Requires processing", unread: true, type: "info" }] : []),
    ...(liveNotifications.details.openSupportMessages > 0 ? [{ id: 'support', title: `${liveNotifications.details.openSupportMessages} Open Support Ticket(s)`, time: "Unresolved", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.openReportedIssues > 0 ? [{ id: 'report', title: `${liveNotifications.details.openReportedIssues} Open Reported Issue(s)`, time: "Unresolved", unread: true, type: "warning" }] : [])
  ];

  const unreadCount = liveNotifications.total;
  const [currentTime, setCurrentTime] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Search Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl p-2 border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search analytics, reports, vendors, products..."
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-lg"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            {searchQuery && (
              <div className="mt-2 p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400">Quick results for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shadow-xl">
        {/* Left Section - Breadcrumb & Title */}
        <div className="flex items-center space-x-6">
          {/* App Icon */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="h-6 w-px bg-gray-700"></div>
          </div>

          {/* Dashboard Title */}
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Admin</span>
              <span className="text-gray-600">•</span>
              <span className="text-blue-400 font-medium">{currentTime}</span>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                Live
              </span>
            </div>
          </div>
        </div>

        {/* Center Section - Quick Actions */}
        <div className="hidden lg:flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            Analytics
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            Reports
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            Insights
          </button>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-3">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative"
            title="Quick Search"
          >
            <Search className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </button>

          {/* Apps Menu */}
          <button title="Apps Menu"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors hidden lg:flex">
            <Grid className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-yellow-400 transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Help */}
          <button title="Help Center"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-blue-400 transition-colors hidden lg:flex">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button title="Settings"
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
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
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors ${notification.unread ? 'bg-blue-500/5' : ''
                            }`}
                          onClick={() => setShowNotifications(false)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 animate-pulse flex-shrink-0 ${notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                              }`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{notification.title}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-800">
                    <button className="w-full py-2 text-sm text-center text-blue-400 hover:text-blue-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-1 pl-3 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">John Smith</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  JS
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''
                }`} />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 z-40 overflow-hidden">
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                        JS
                      </div>
                      <div>
                        <p className="font-semibold text-white">John Smith</p>
                        <p className="text-sm text-gray-400">admin@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center space-x-3">
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center space-x-3">
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </button>
                    <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center space-x-3">
                      <Shield className="w-4 h-4" />
                      <span>Security</span>
                    </button>
                    <div className="h-px bg-gray-800 my-2"></div>
                    <button className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-3">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-40 flex items-center justify-around py-2 px-4">
        <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="text-xs mt-1">Alerts</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 right-1/4 w-4 h-4 bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
          <Grid className="w-5 h-5" />
          <span className="text-xs mt-1">Apps</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </>
  )
}