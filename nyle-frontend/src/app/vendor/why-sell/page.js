"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  DollarSign, 
  Truck, 
  BarChart, 
  Heart, 
  Target, 
  Award, 
  Clock, 
  Sparkles,
  ChevronRight,
  MessageSquare,
  Package,
  CheckCircle
} from "lucide-react";

export default function WhySellPage() {
  const [activeStat, setActiveStat] = useState(0);
  const [sellerCount, setSellerCount] = useState(1250);
  const [salesVolume, setSalesVolume] = useState(2.4);

  const successStats = [
    { label: "Active Sellers", value: "2,500+", icon: Users, color: "text-blue-600" },
    { label: "Avg Monthly Sales", value: "$3.2K", icon: TrendingUp, color: "text-green-600" },
    { label: "Buyer Reach", value: "500K+", icon: Globe, color: "text-purple-600" },
    { label: "Success Rate", value: "94%", icon: Award, color: "text-orange-600" },
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Massive Reach",
      description: "Showcase to thousands of buyers across Kenya and East Africa",
      details: ["500K+ monthly visitors", "Regional expansion support", "Localized marketing"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Trusted payment system with transparent fees and fast settlements",
      details: ["Nyle Pay protection", "Weekly settlements", "Fraud prevention"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Truck,
      title: "Smart Logistics",
      description: "Integrated shipping solutions with competitive rates",
      details: ["Partner discounts", "Real-time tracking", "Nationwide coverage"],
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Users,
      title: "Seller Success Team",
      description: "Dedicated support and growth strategies for your business",
      details: ["24/7 support", "Marketing tools", "Performance coaching"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Real-time insights to optimize your sales strategy",
      details: ["Sales dashboards", "Customer insights", "Trend analysis"],
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Quick Onboarding",
      description: "Get started in minutes with our streamlined setup process",
      details: ["Simple registration", "Free training", "Instant store setup"],
      color: "from-yellow-500 to-orange-500"
    },
  ];

  const successStories = [
    {
      name: "Sarah's Handcrafts",
      growth: "3x revenue growth",
      timeline: "6 months on Nyle",
      quote: "Nyle helped me reach customers I never could have found on my own.",
      category: "Arts & Crafts"
    },
    {
      name: "TechGadgets Ltd",
      growth: "500+ orders/month",
      timeline: "1 year on Nyle",
      quote: "The logistics support and secure payments made scaling easy.",
      category: "Electronics"
    },
    {
      name: "Organic Farms Kenya",
      growth: "National distribution",
      timeline: "9 months on Nyle",
      quote: "From local farm to national brand – Nyle made it possible.",
      category: "Food & Beverage"
    },
  ];

  const growthTimeline = [
    { month: "Month 1", action: "Store Setup & Training", result: "Ready to sell" },
    { month: "Month 3", action: "First 50 Sales", result: "Building reputation" },
    { month: "Month 6", action: "Featured Seller", result: "Increased visibility" },
    { month: "Month 12", action: "Premium Tier", result: "Maximized earnings" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % successStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VendorInfoLayout
      title="Why Sell on Nyle"
      subtitle="Empower your business with unmatched marketplace reach and powerful seller tools."
      stats={successStats}
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Join Kenya's Fastest Growing Marketplace
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Turn Your Passion into Profit
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            Nyle opens the door to a thriving digital marketplace where your products meet thousands of 
            eager buyers. Whether you're a small business or established brand, we provide the tools, 
            support, and visibility you need to grow fearlessly.
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {successStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color.replace('text', 'bg')}/10`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Everything You Need to Succeed
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${benefit.color} mb-4`}>
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {benefit.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
                
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-5 w-5 text-blue-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
              <p className="text-gray-600">Real sellers, real results</p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <MessageSquare className="h-5 w-5" />
              <span>Hear from our sellers</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{story.name}</h4>
                    <div className="text-sm text-gray-500">{story.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold">{story.growth}</div>
                    <div className="text-xs text-gray-500">{story.timeline}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 italic mb-4">"{story.quote}"</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span>Featured Seller</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Growth Timeline */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Your Growth Journey
          </h2>
          
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-0.5 bg-gray-200 w-full -translate-y-1/2 hidden md:block" />
            
            <div className="grid md:grid-cols-4 gap-8">
              {growthTimeline.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      {step.month.split(' ')[1]}
                    </div>
                    
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2">{step.month}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.action}</p>
                      <div className="text-green-600 font-semibold text-sm">{step.result}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Transparent & Competitive Fees
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">0%</div>
              <div className="font-medium text-gray-900">Listing Fee</div>
              <p className="text-sm text-gray-600 mt-1">List unlimited products for free</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5%</div>
              <div className="font-medium text-gray-900">Transaction Fee</div>
              <p className="text-sm text-gray-600 mt-1">Only pay when you make a sale</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$0</div>
              <div className="font-medium text-gray-900">Monthly Subscription</div>
              <p className="text-sm text-gray-600 mt-1">No hidden costs or monthly fees</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">Special Offer for New Sellers</div>
                <p className="text-sm text-gray-600">50% off transaction fees for first 3 months</p>
              </div>
              <div className="text-green-600 font-bold">2.5% fee</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              Limited Time Offer
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Success Story Today
            </h2>
            
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join hundreds of successful sellers who've chosen Nyle to power their businesses. 
              With zero setup fees, comprehensive support, and massive market reach, your 
              journey to success starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vendor/signup"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" />
                Start Selling Now
              </Link>
              
              <Link
                href="/vendor/demo"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
              >
                <MessageSquare className="h-5 w-5" />
                Schedule a Demo
              </Link>
            </div>
            
            <p className="text-blue-100/80 text-sm mt-6">
              No credit card required • Get started in 5 minutes • 30-day free trial
            </p>
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How long does it take to set up my store?",
                answer: "Most sellers are ready to start selling within 30 minutes."
              },
              {
                question: "What support do you offer to new sellers?",
                answer: "24/7 support, free training, and a dedicated success manager."
              },
              {
                question: "Can I sell internationally?",
                answer: "Yes, we support shipping to multiple countries in East Africa."
              },
              {
                question: "How often do I get paid?",
                answer: "Weekly settlements directly to your bank account or mobile money."
              },
            ].map((faq, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link
              href="/vendor/faq"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              View all FAQ
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </VendorInfoLayout>
  );
}