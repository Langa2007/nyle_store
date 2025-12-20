"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageSquare, FileText, AlertCircle, ChevronRight, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SupportInfoLayout({ title, subtitle, children }) {
  const pathname = usePathname();

  const navItems = [
    { 
      href: "/support/contact", 
      label: "Contact Support", 
      icon: MessageSquare,
      description: "Get direct help from our team"
    },
    { 
      href: "/support/help-center", 
      label: "Help Center", 
      icon: HelpCircle,
      description: "Browse articles & guides"
    },
    { 
      href: "/support/report-issue", 
      label: "Report Issues", 
      icon: AlertCircle,
      description: "Report bugs or problems"
    },
    { 
      href: "/support/faqs", 
      label: "FAQs", 
      icon: FileText,
      description: "Frequently asked questions"
    },
  ];

  const stats = [
    { value: "24/7", label: "Support Available", icon: Globe },
    { value: "<2h", label: "Avg Response Time", icon: Zap },
    { value: "99%", label: "Satisfaction Rate", icon: Shield },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl" />
      </div>

      {/* 🌊 Top Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-16 shadow-xl overflow-hidden">
        {/* Animated wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMlM0Mi42MjcgMTggMzYgMTh6TTAgMGg2MHY2MEgweiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-6 z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Secure Support Portal</span>
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-3 text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="h-5 w-5 text-blue-200" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                </div>
                <div className="text-sm text-blue-200/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  Support Center
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  How can we help you today?
                </p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                              : "hover:bg-blue-50 text-gray-700 hover:text-blue-700"
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-blue-50 group-hover:bg-blue-100'}`}>
                            <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1'}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Quick Help Card */}
              <div className="p-4 border-t border-gray-100">
                <div className="bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Need urgent help?
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Our team is available 24/7 for critical issues.
                  </p>
                  <Link
                    href="/support/contact?priority=urgent"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Get Emergency Support
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    {children}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 grid sm:grid-cols-2 gap-6"
            >
              <Link
                href="/community"
                className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">
                      Community Forum
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Connect with other users
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/status"
                className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">
                      System Status
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Check service availability
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* 📞 Footer */}
      <footer className="mt-auto bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left">
              <h4 className="font-bold text-white text-lg mb-3">Still Need Help?</h4>
              <p className="text-blue-100/80 mb-4 max-w-md">
                Our support team is ready to assist you with any questions or issues you might have.
              </p>
              <Link
                href="/support/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              >
                <MessageSquare className="h-5 w-5" />
                Contact Support Team
              </Link>
            </div>
            
            <div className="flex flex-col items-center lg:items-end gap-4">
              <div className="text-sm text-gray-400">
                Available 24 hours, 7 days a week
              </div>
              <div className="text-xs opacity-70">
                © {new Date().getFullYear()} Nyle Marketplace. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 🌊 Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-32 text-blue-500/20"
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