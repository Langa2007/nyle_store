"use client";

import { motion } from "framer-motion";
import { 
  Headphones, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  Users, 
  Shield,
  Zap,
  ArrowRight,
  Home,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SellerSupportPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  
  const supportCategories = [
    { id: "general", label: "General Support", icon: "🎯", count: 5 },
    { id: "technical", label: "Technical Issues", icon: "🔧", count: 3 },
    { id: "payments", label: "Payments & Payouts", icon: "💰", count: 4 },
    { id: "account", label: "Account Management", icon: "👤", count: 2 },
    { id: "products", label: "Product Listings", icon: "📦", count: 6 },
    { id: "shipping", label: "Shipping & Logistics", icon: "🚚", count: 3 },
  ];

  const supportTopics = {
    general: [
      { question: "How do I get started as a seller?", answer: "Complete registration, submit required documents, and get verified within 24-48 hours." },
      { question: "What documents are required for verification?", answer: "Business registration, ID/Passport, KRA PIN, and proof of address." },
      { question: "How long does verification take?", answer: "Typically 24-48 hours during business days." },
      { question: "Can I sell internationally?", answer: "Currently, we only support domestic sales within Kenya." },
      { question: "What are the seller fees?", answer: "8% commission on sales, no setup or monthly fees." },
    ],
    technical: [
      { question: "I can't access my seller dashboard", answer: "Try clearing your browser cache or contact our technical team immediately." },
      { question: "Product images not uploading", answer: "Ensure images are under 5MB and in JPG/PNG format." },
      { question: "App not working properly", answer: "Update to the latest version from your app store." },
    ],
    payments: [
      { question: "When will I receive my payments?", answer: "Payouts are processed every 14 days to your registered bank account." },
      { question: "How are commissions calculated?", answer: "8% commission on the final sale price excluding shipping." },
      { question: "Can I change my payout account?", answer: "Yes, from your seller dashboard under Payment Settings." },
      { question: "Are there any hidden fees?", answer: "No hidden fees. All charges are transparently displayed." },
    ],
  };

  const contactMethods = [
    { 
      icon: <MessageCircle />, 
      title: "Live Chat", 
      description: "24/7 instant support", 
      response: "Instant",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Phone />, 
      title: "Phone Support", 
      description: "Direct seller hotline", 
      response: "5 mins",
      color: "from-blue-600 to-indigo-600"
    },
    { 
      icon: <Mail />, 
      title: "Email Support", 
      description: "Detailed issue tracking", 
      response: "4 hours",
      color: "from-indigo-600 to-purple-600"
    },
    { 
      icon: <Users />, 
      title: "Seller Community", 
      description: "Peer-to-peer support", 
      response: "Community",
      color: "from-cyan-500 to-blue-500"
    },
  ];

  const successStories = [
    { name: "Sarah M.", business: "Handmade Crafts", growth: "+320%", period: "6 months" },
    { name: "James K.", business: "Electronics Store", growth: "+180%", period: "4 months" },
    { name: "Premium Foods", business: "Gourmet Foods", growth: "+450%", period: "1 year" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Headphones className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Seller Support Center
                </h1>
                <p className="text-lg text-blue-100 mt-2">Dedicated Support for Nyle Store Sellers</p>
              </div>
            </div>
            
            <p className="text-xl text-blue-100/90 max-w-3xl mx-auto mb-8">
              Get instant help, expert guidance, and dedicated support to grow your business on Nyle Store.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="#contact" 
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                <MessageCircle className="inline mr-2 h-5 w-5" />
                Contact Support Now
              </Link>
              <Link 
                href="/vendor/signup" 
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                <TrendingUp className="inline mr-2 h-5 w-5" />
                Start Selling
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Support Stats */}
      <div className="container mx-auto px-6 -mt-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">15min</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">2K+</div>
              <div className="text-sm text-gray-600">Sellers Helped</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Support Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-blue-600" />
                  Support Categories
                </h3>
                
                <div className="space-y-2">
                  {supportCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        activeCategory === category.id
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeCategory === category.id
                          ? "bg-white/20"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Success Stories */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-4">Seller Success Stories</h4>
                <div className="space-y-4">
                  {successStories.map((story, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="font-bold">{story.name}</div>
                          <div className="text-sm text-blue-100">{story.business}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{story.growth}</div>
                          <div className="text-xs text-blue-100">Growth in {story.period}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tip */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Quick Tip</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Have your seller ID ready when contacting support for faster assistance.
                </p>
                <Link 
                  href="/vendor/dashboard"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Go to Dashboard →
                </Link>
              </div>
            </div>
          </div>

          {/* Support Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="text-white h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                  <p className="text-gray-600">Quick answers to common seller questions</p>
                </div>
              </div>

              <div className="space-y-4">
                {supportTopics[activeCategory]?.map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="p-4 bg-blue-50 border-b border-gray-200">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        {topic.question}
                      </h3>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-gray-700">{topic.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              {!supportTopics[activeCategory] && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Questions Available</h3>
                  <p className="text-gray-600">
                    Select a different category or contact our support team directly.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Methods */}
            <div id="contact" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact Our Seller Support</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${method.color} rounded-2xl p-6 text-white`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{method.title}</h3>
                          <p className="text-blue-100 text-sm">{method.description}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {method.response}
                      </span>
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                      Get Support
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Support Hours</h3>
                    <p className="text-gray-600">We're here when you need us</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Weekdays</div>
                    <div className="text-gray-600">8 AM - 10 PM</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Weekends</div>
                    <div className="text-gray-600">9 AM - 8 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="h-8 w-8" />
                <div>
                  <h3 className="text-2xl font-bold">Emergency Support</h3>
                  <p className="text-red-100">Critical issues requiring immediate attention</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Phone Hotline</h4>
                  <div className="text-2xl font-bold">+254 700 112 233</div>
                  <p className="text-red-100 text-sm mt-1">Available 24/7 for emergencies</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">Email</h4>
                  <div className="text-lg font-bold">emergency@nylestore.com</div>
                  <p className="text-red-100 text-sm mt-1">Mark subject as "URGENT"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Seller Support</h4>
              <p className="text-blue-300">
                Dedicated to helping you succeed on Nyle Store. Your success is our priority.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/vendor/dashboard" className="text-blue-300 hover:text-white transition">Seller Dashboard</Link>
                <Link href="/vendor/faq" className="text-blue-300 hover:text-white transition">Seller FAQs</Link>
                <Link href="/vendor/terms" className="text-blue-300 hover:text-white transition">Seller Terms</Link>
                <Link href="/vendor/privacy" className="text-blue-300 hover:text-white transition">Seller Privacy</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Resources</h4>
              <div className="text-sm text-blue-400">
                <p>📚 Seller Guides & Tutorials</p>
                <p>📈 Growth Strategies</p>
                <p>🎯 Marketing Tips</p>
                <p>📊 Analytics Tools</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-blue-300">
                  © {new Date().getFullYear()} Nyle Store Seller Support. All rights reserved.
                </p>
                <p className="text-sm text-blue-400/70 mt-1">
                  Committed to your selling success
                </p>
              </div>
              <Link 
                href="/"
                className="flex items-center gap-2 text-blue-300 hover:text-white transition"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}