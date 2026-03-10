import os

filepath = r'c:\dev\nyle-store\admin-dashboard\src\app\dashboard\layout.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add Import
text = text.replace(
    'import RequireAuth from "../components/RequireAuth";',
    'import RequireAuth from "../components/RequireAuth";\nimport { useAdminNotifications } from "../hooks/useAdminNotifications";'
)

# 2. Replace notifications array and unread count
old_stats = """  const notifications = [
    { id: 1, title: "New order received", time: "5 min ago", unread: true },
    { id: 2, title: "Server maintenance", time: "1 hour ago", unread: true },
    { id: 3, title: "Payment processed", time: "2 hours ago", unread: false },
    { id: 4, title: "New vendor registered", time: "1 day ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;"""

new_stats = """  const { notifications: liveNotifications, loading: notificationsLoading } = useAdminNotifications(60000);

  const notifications = [
    ...(liveNotifications.details.pendingVendors > 0 ? [{ id: 'vendor', title: `${liveNotifications.details.pendingVendors} Pending Vendor Approval(s)`, time: "Requires action", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.pendingPartners > 0 ? [{ id: 'partner', title: `${liveNotifications.details.pendingPartners} Pending Partner Application(s)`, time: "Requires action", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.pendingOrders > 0 ? [{ id: 'order', title: `${liveNotifications.details.pendingOrders} Pending Order(s)`, time: "Requires processing", unread: true, type: "info" }] : []),
    ...(liveNotifications.details.openSupportMessages > 0 ? [{ id: 'support', title: `${liveNotifications.details.openSupportMessages} Open Support Ticket(s)`, time: "Unresolved", unread: true, type: "warning" }] : []),
    ...(liveNotifications.details.openReportedIssues > 0 ? [{ id: 'report', title: `${liveNotifications.details.openReportedIssues} Open Reported Issue(s)`, time: "Unresolved", unread: true, type: "warning" }] : [])
  ];

  const unreadCount = liveNotifications.total;"""

text = text.replace(old_stats, new_stats)

# 3. Inject Dropdown UI
old_ui = """                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>"""

new_ui = """                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
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
                          className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl z-20 overflow-hidden ${
                            darkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"
                          }`}
                        >
                          <div className={`p-4 border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                            <div className="flex items-center justify-between">
                              <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Notifications</h3>
                              <span className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer">
                                Mark all as read
                              </span>
                            </div>
                          </div>
                          <div className="max-h-96 overflow-y-auto w-full">
                            {notificationsLoading ? (
                              <div className={`p-4 text-center text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Loading notifications...</div>
                            ) : notifications.length === 0 ? (
                              <div className={`p-4 text-center text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No pending notifications</div>
                            ) : (
                              notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`p-4 border-b cursor-pointer transition-colors ${
                                    darkMode 
                                      ? `border-gray-800 hover:bg-gray-800/50 ${notification.unread ? 'bg-blue-500/5' : ''}`
                                      : `border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`
                                  }`}
                                  onClick={() => setNotificationsOpen(false)}
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 animate-pulse flex-shrink-0 ${
                                      notification.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`}></div>
                                    <div className="flex-1">
                                      <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{notification.title}</p>
                                      <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{notification.time}</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                          <div className={`p-3 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                            <button className="w-full py-2 text-sm text-center text-blue-500 hover:text-blue-600 transition-colors">
                              View all notifications
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>"""

text = text.replace(old_ui, new_ui)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print('Success')
