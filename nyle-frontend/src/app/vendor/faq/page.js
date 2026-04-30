"use client";

import { motion } from "framer-motion";
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  CheckCircle, 
  TrendingUp,
  DollarSign,
  Package,
  Truck,
  Users,
  Zap,
  ArrowRight,
  ArrowDown,
  Home,
  Star,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Clock,
  Award,
  Target,
  BarChart,
  Shield,
  Users as UsersIcon,
  Globe,
  Rocket,
  Sparkles,
  TrendingDown,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  FileText,
  Download,
  Share2,
  Bookmark,
  Filter,
  X,
  ThumbsUp,
  Eye,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SellerFAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqs, setExpandedFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("faqs");

  const toggleFaq = (id) => {
    if (expandedFaqs.includes(id)) {
      setExpandedFaqs(expandedFaqs.filter(faqId => faqId !== id));
    } else {
      setExpandedFaqs([...expandedFaqs, id]);
    }
  };

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Rocket className="h-4 w-4" />,
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500/10 via-blue-100 to-cyan-50",
      faqs: [
        {
          id: 1,
          question: "How do I become a seller on Nyle Store?",
          answer: "Visit the seller registration page, complete the application form, submit required documents, and get verified within 24-48 hours. Our AI-powered verification system ensures quick processing for genuine businesses.",
          tags: ["Registration", "Verification", "Quick Start"],
          difficulty: "Beginner",
          readTime: "2 min"
        },
        {
          id: 2,
          question: "What documents do I need for verification?",
          answer: "You'll need: 1) Valid business registration certificate, 2) National ID/Passport, 3) KRA PIN certificate, 4) Proof of business address, 5) Bank account details, 6) Three product sample photos. Digital copies are accepted.",
          tags: ["Documents", "Verification", "Requirements"],
          difficulty: "Beginner",
          readTime: "3 min"
        },
        {
          id: 3,
          question: "Is there a registration fee?",
          answer: "No, registration is completely free. We only charge a competitive 8% commission on successful sales. No hidden fees, no monthly subscriptions - you only pay when you sell!",
          tags: ["Fees", "Registration", "Cost"],
          difficulty: "Beginner",
          readTime: "1 min"
        },
      ]
    },
    {
      id: "products-listings",
      title: "Products & Listings",
      icon: <Package className="h-4 w-4" />,
      color: "from-blue-600 to-indigo-600",
      gradient: "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50",
      faqs: [
        {
          id: 4,
          question: "How many products can I list?",
          answer: "Unlimited listings! We encourage quality over quantity. Premium sellers get featured placement and analytics. Optimize your listings with clear titles, detailed descriptions, and professional photos for better visibility.",
          tags: ["Listings", "Products", "Inventory"],
          difficulty: "Intermediate",
          readTime: "4 min"
        },
        {
          id: 5,
          question: "What are the product image requirements?",
          answer: "Required: High-quality images (minimum 800x800px), under 5MB each, JPG/PNG format. Best practices: Show product from multiple angles, include lifestyle shots, use natural lighting, and add size comparison. Pro tip: Videos increase conversions by 40%!",
          tags: ["Images", "Requirements", "Optimization"],
          difficulty: "Intermediate",
          readTime: "5 min"
        },
        {
          id: 6,
          question: "Can I edit my product listings?",
          answer: "Yes! Edit product details, prices, images, and descriptions anytime from your seller dashboard. Real-time sync ensures changes reflect immediately. Bulk editing tools available for managing multiple products efficiently.",
          tags: ["Editing", "Management", "Dashboard"],
          difficulty: "Beginner",
          readTime: "2 min"
        },
      ]
    },
    {
      id: "payments-payouts",
      title: "Payments & Payouts",
      icon: <DollarSign className="h-4 w-4" />,
      color: "from-indigo-600 to-purple-600",
      gradient: "bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50",
      faqs: [
        {
          id: 7,
          question: "What is the commission rate?",
          answer: "We charge 8% commission on the final sale price (excluding shipping costs). Premium sellers with 100+ sales get reduced rates. No hidden fees - payment processing, customer support, and platform maintenance included.",
          tags: ["Commission", "Fees", "Pricing"],
          difficulty: "Intermediate",
          readTime: "3 min"
        },
        {
          id: 8,
          question: "When will I receive my payments?",
          answer: "Payouts are processed every 14 days directly to your registered bank account. First payment may take additional 3-5 days for verification. Real-time earnings dashboard shows pending and processed payments.",
          tags: ["Payouts", "Payments", "Schedule"],
          difficulty: "Beginner",
          readTime: "2 min"
        },
        {
          id: 9,
          question: "Are there any transaction fees?",
          answer: "No additional transaction fees! The 8% commission covers all platform usage, payment processing, and customer support. M-Pesa integration available with instant transfer options for premium sellers.",
          tags: ["Fees", "Transactions", "M-Pesa"],
          difficulty: "Beginner",
          readTime: "1 min"
        },
      ]
    },
    {
      id: "shipping-logistics",
      title: "Shipping & Logistics",
      icon: <Truck className="h-4 w-4" />,
      color: "from-cyan-500 to-blue-500",
      gradient: "bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50",
      faqs: [
        {
          id: 10,
          question: "How does shipping work?",
          answer: "Choose from our integrated shipping partners (Sendy, G4S, Uber Send) or arrange your own delivery. Automated shipping labels, real-time tracking, and insurance options available. Nairobi delivery: 1-2 days. Upcountry: 2-5 days.",
          tags: ["Shipping", "Delivery", "Logistics"],
          difficulty: "Intermediate",
          readTime: "4 min"
        },
        {
          id: 11,
          question: "What are the shipping rates?",
          answer: "Rates vary by location, weight, and delivery speed. Use our built-in calculator for accurate pricing. You can set: 1) Fixed rates, 2) Free shipping over amount, 3) Regional rates, 4) Combined shipping discounts.",
          tags: ["Rates", "Shipping", "Calculator"],
          difficulty: "Intermediate",
          readTime: "3 min"
        },
        {
          id: 12,
          question: "How do I handle returns?",
          answer: "Follow our 7-day return policy: Accept returns for unused items in original packaging. We mediate disputes and provide return shipping labels. Return rate below 2% qualifies for seller protection program.",
          tags: ["Returns", "Policy", "Customer Service"],
          difficulty: "Advanced",
          readTime: "5 min"
        },
      ]
    },
    {
      id: "marketing-growth",
      title: "Marketing & Growth",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
      faqs: [
        {
          id: 13,
          question: "How can I promote my products?",
          answer: "1) Use promoted listings for 5x more visibility, 2) Run flash sales, 3) Create bundles, 4) Offer discounts, 5) Use SEO-optimized titles, 6) Share on social media directly from dashboard, 7) Join our Featured Seller program.",
          tags: ["Marketing", "Promotion", "Growth"],
          difficulty: "Advanced",
          readTime: "6 min"
        },
        {
          id: 14,
          question: "What analytics do you provide?",
          answer: "Real-time dashboard with: Sales analytics, Customer demographics, Traffic sources, Conversion rates, Best-performing products, Seasonal trends, Competitor insights, and Predictive analytics for inventory planning.",
          tags: ["Analytics", "Reports", "Dashboard"],
          difficulty: "Intermediate",
          readTime: "4 min"
        },
      ]
    },
    {
      id: "premium-features",
      title: "Premium Features",
      icon: <Award className="h-4 w-4" />,
      color: "from-yellow-500 to-orange-500",
      gradient: "bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50",
      faqs: [
        {
          id: 15,
          question: "What are premium seller benefits?",
          answer: "Premium sellers get: 1) Reduced commission rates (down to 5%), 2) Featured placement, 3) Priority support, 4) Advanced analytics, 5) Bulk editing tools, 6) Custom storefront, 7) API access, 8) Early feature access.",
          tags: ["Premium", "Benefits", "Upgrade"],
          difficulty: "Advanced",
          readTime: "3 min"
        },
        {
          id: 16,
          question: "How do I become a premium seller?",
          answer: "Qualify by: 1) 100+ successful sales, 2) 4.5+ star rating, 3) On-time shipping >95%, 4) Low return rate, 5) Active for 6+ months. Apply through your seller dashboard for automatic qualification check.",
          tags: ["Premium", "Qualification", "Upgrade"],
          difficulty: "Intermediate",
          readTime: "2 min"
        },
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(category => category.faqs);
  
  const filteredFaqs = searchQuery 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : activeCategory === "all"
      ? allFaqs
      : faqCategories.find(cat => cat.id === activeCategory)?.faqs || [];

  const popularFaqs = [
    { id: 1, question: "How long does verification take?", views: "2.4K", helpful: "95%" },
    { id: 7, question: "What is the commission rate?", views: "1.8K", helpful: "92%" },
    { id: 8, question: "When will I receive my payments?", views: "1.5K", helpful: "94%" },
    { id: 4, question: "How many products can I list?", views: "1.2K", helpful: "88%" },
    { id: 10, question: "How does shipping work?", views: "980", helpful: "90%" },
  ];

  const quickTips = [
    { icon: <Package className="h-4 w-4" />, text: "Use high-quality product images with multiple angles", color: "bg-blue-100 text-blue-800" },
    { icon: <MessageCircle className="h-4 w-4" />, text: "Respond to customer queries within 24 hours", color: "bg-green-100 text-green-800" },
    { icon: <Search className="h-4 w-4" />, text: "Optimize product titles with relevant keywords", color: "bg-purple-100 text-purple-800" },
    { icon: <BarChart className="h-4 w-4" />, text: "Create product bundles for better average order value", color: "bg-orange-100 text-orange-800" },
    { icon: <Award className="h-4 w-4" />, text: "Encourage customer reviews with follow-up emails", color: "bg-yellow-100 text-yellow-800" },
  ];

  const sellerResources = [
    { title: "Seller Success Guide", icon: <BookOpen className="h-5 w-5" />, href: "/vendor/guides", downloads: "1.2K" },
    { title: "Video Tutorials", icon: <Sparkles className="h-5 w-5" />, href: "/vendor/tutorials", downloads: "890" },
    { title: "Product Photo Templates", icon: <Download className="h-5 w-5" />, href: "/vendor/templates", downloads: "2.1K" },
    { title: "Pricing Calculator", icon: <BarChart className="h-5 w-5" />, href: "/vendor/tools", downloads: "1.5K" },
  ];

  const successStories = [
    { name: "Crafts Merchant", business: "African Crafts Category", growth: "425%", period: "6 months" },
    { name: "Electronics Brand", business: "Technology & Devices", growth: "312%", period: "4 months" },
    { name: "Fashion Retailer", business: "Apparel & Accessories", growth: "567%", period: "8 months" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-cyan-900 text-white py-20 md:py-28 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-8 animate-bounce">
              <Award className="h-4 w-4" />
              <span className="text-sm font-bold">SELLER SUCCESS CENTER</span>
            </div>

            {/* Main Title */}
            <div className="inline-flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl">
                <HelpCircle className="h-12 w-12" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-200">
                  Seller FAQ Hub
                </h1>
                <p className="text-lg md:text-xl text-blue-200 mt-3">Everything You Need to Succeed on Nyle</p>
              </div>
            </div>
            
            {/* Hero Description */}
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto mb-10 leading-relaxed">
              Master the art of selling with our comprehensive guide. From first listing to scaling your business, 
              we've got you covered with expert insights and proven strategies.
            </p>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">15K+</div>
                <div className="text-sm text-blue-200">Active Sellers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-sm text-blue-200">Satisfaction Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">24h</div>
                <div className="text-sm text-blue-200">Support Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">8%</div>
                <div className="text-sm text-blue-200">Lowest Commission</div>
              </div>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-50"></div>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask anything... (e.g., 'How to increase sales?', 'Payment schedule', 'Shipping options')"
                    className="w-full pl-14 pr-12 py-4 bg-white/95 backdrop-blur-lg text-gray-900 placeholder-gray-500 rounded-2xl border-2 border-white/30 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 text-lg shadow-xl"
                  />
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 p-1 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  ) : (
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <kbd className="px-2 py-1 text-xs border rounded">Enter</kbd>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  <button className="text-sm text-blue-200 hover:text-white transition">
                    <Sparkles className="inline h-4 w-4 mr-1" />
                    Trending: Commission Rates
                  </button>
                  <button className="text-sm text-blue-200 hover:text-white transition">
                    <TrendingUp className="inline h-4 w-4 mr-1" />
                    Hot: Shipping Updates
                  </button>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/vendor/signup" 
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all hover:scale-105 hover:from-cyan-600 hover:to-blue-700"
              >
                <Rocket className="inline mr-3 h-5 w-5 group-hover:animate-bounce" />
                Start Selling Free
                <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/vendor/support" 
                className="group px-8 py-4 bg-white/20 backdrop-blur-lg text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all"
              >
                <MessageSquare className="inline mr-3 h-5 w-5" />
                Live Chat Support
              </Link>
              <button 
                onClick={() => document.getElementById('resources').scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:shadow-xl transition-all hover:scale-105"
              >
                <Download className="inline mr-3 h-5 w-5" />
                Download Resources
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Results Banner */}
      {searchQuery && (
        <div className="container mx-auto px-6 -mt-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-2xl border border-white/20 p-6 mb-8 backdrop-blur-lg"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-white">
                    Found {filteredFaqs.length} answers for "
                    <span className="text-cyan-200">{searchQuery}</span>
                    "
                  </span>
                  <p className="text-sm text-blue-200">
                    Showing results from {faqCategories.length} categories
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
                >
                  Clear Search
                </button>
                <button className="px-4 py-2 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition">
                  <Filter className="inline h-4 w-4 mr-2" />
                  Filter Results
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "faqs" 
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg" 
              : "bg-white text-gray-700 hover:bg-gray-50 border"}`}
          >
            <HelpCircle className="inline h-5 w-5 mr-2" />
            All FAQs
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "categories" 
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg" 
              : "bg-white text-gray-700 hover:bg-gray-50 border"}`}
          >
            <BookOpen className="inline h-5 w-5 mr-2" />
            By Category
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "resources" 
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg" 
              : "bg-white text-gray-700 hover:bg-gray-50 border"}`}
          >
            <Download className="inline h-5 w-5 mr-2" />
            Resources
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Popular FAQs */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Trending Questions
                  </h3>
                  <span className="text-sm text-gray-500">{popularFaqs.length} hot topics</span>
                </div>
                
                <div className="space-y-3">
                  {popularFaqs.map((faq) => {
                    const faqData = allFaqs.find(f => f.id === faq.id);
                    return (
                      <button
                        key={faq.id}
                        onClick={() => {
                          const element = document.getElementById(`faq-${faq.id}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                            if (!expandedFaqs.includes(faq.id)) {
                              toggleFaq(faq.id);
                            }
                          }
                        }}
                        className="w-full text-left group"
                      >
                        <div className="p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all border border-transparent hover:border-blue-100">
                          <div className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">
                            {faq.question}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{faq.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3 text-green-500" />
                                <span className="text-xs text-green-600">{faq.helpful}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  Pro Seller Tips
                </h4>
                <div className="space-y-4">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${tip.color} bg-opacity-20 backdrop-blur-sm`}>
                        {tip.icon}
                      </div>
                      <span className="text-sm text-blue-100 flex-1">{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seller Success Stories */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Success Stories
                </h4>
                <div className="space-y-4">
                  {successStories.map((story, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900">{story.name}</span>
                        <span className="text-xs px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                          +{story.growth}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{story.business}</div>
                      <div className="text-xs text-gray-500 mt-1">in {story.period}</div>
                    </div>
                  ))}
                  <Link 
                    href="/vendor/success-stories" 
                    className="block text-center text-blue-600 hover:text-blue-700 font-medium mt-4"
                  >
                    View all success stories →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === "faqs" && (
              <>
                {/* Categories Filter */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`px-4 py-2 rounded-lg transition-all ${activeCategory === "all" 
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      All Categories
                    </button>
                    {faqCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${activeCategory === category.id 
                          ? `bg-gradient-to-r ${category.color} text-white` 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      >
                        <span>{category.icon}</span>
                        {category.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQs List */}
                <div className="space-y-6">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => {
                      const category = faqCategories.find(cat => 
                        cat.faqs.some(f => f.id === faq.id)
                      );
                      return (
                        <motion.div
                          key={faq.id}
                          id={`faq-${faq.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className={`p-2 rounded-lg ${category?.gradient}`}>
                                    <HelpCircle className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-bold text-xl text-gray-900">{faq.question}</h3>
                                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                        {faq.difficulty}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      {faq.tags.map((tag) => (
                                        <span 
                                          key={tag} 
                                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                      <span className="text-sm text-gray-500">
                                        <Clock className="inline h-3 w-3 mr-1" />
                                        {faq.readTime} read
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="p-2">
                                {expandedFaqs.includes(faq.id) ? (
                                  <ChevronUp className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </button>
                          
                          {expandedFaqs.includes(faq.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="px-6 pb-6"
                            >
                              <div className="pl-12 border-l-2 border-blue-200">
                                <p className="text-gray-700 mb-4 leading-relaxed">{faq.answer}</p>
                                <div className="flex items-center gap-4 pt-4 border-t">
                                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                                    <ThumbsUp className="h-4 w-4" />
                                    Helpful?
                                  </button>
                                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                                    <Share2 className="h-4 w-4" />
                                    Share
                                  </button>
                                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                                    <Bookmark className="h-4 w-4" />
                                    Save
                                  </button>
                                  <Link 
                                    href="/vendor/support" 
                                    className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    Need more help? Contact support →
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <HelpCircle className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600 mb-6">
                        We couldn't find any answers for "{searchQuery}". Try different keywords or contact our support team.
                      </p>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg transition"
                      >
                        Clear Search & Show All
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "categories" && (
              <div className="space-y-8">
                {faqCategories.map((category) => (
                  <div key={category.id} className={category.gradient + " rounded-2xl p-8"}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl text-white`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-gray-600">{category.faqs.length} FAQs in this category</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.faqs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-xl p-4 shadow-sm">
                          <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {faq.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab("faqs");
                              setActiveCategory(category.id);
                              setTimeout(() => {
                                const element = document.getElementById(`faq-${faq.id}`);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                  if (!expandedFaqs.includes(faq.id)) {
                                    toggleFaq(faq.id);
                                  }
                                }
                              }, 100);
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View answer →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "resources" && (
              <div id="resources">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
                  <h3 className="text-2xl font-bold mb-4">Seller Resources Hub</h3>
                  <p className="text-blue-100 mb-6">Download tools, guides, and templates to accelerate your growth</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {sellerResources.map((resource, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-lg rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg">
                            {resource.icon}
                          </div>
                          <div>
                            <h4 className="font-bold">{resource.title}</h4>
                            <p className="text-sm text-blue-200">{resource.downloads} downloads</p>
                          </div>
                        </div>
                        <Link 
                          href={resource.href}
                          className="inline-flex items-center gap-2 text-sm font-medium hover:text-cyan-200"
                        >
                          <Download className="h-4 w-4" />
                          Download Now
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Resources */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      Live Support Channels
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Phone Support</span>
                        </div>
                        <span className="text-sm font-medium text-blue-700">+254 700 123 456</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Email Support</span>
                        </div>
                        <span className="text-sm font-medium text-blue-700">vendors@nyle.co.ke</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <MessageCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Live Chat</span>
                        </div>
                        <span className="text-sm font-medium text-blue-700">24/7 Available</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      Community & Events
                    </h4>
                    <div className="space-y-3">
                      <Link href="/vendor/webinars" className="block p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow transition">
                        <div className="font-medium text-gray-900">Weekly Webinars</div>
                        <div className="text-sm text-gray-600">Every Wednesday, 2 PM EAT</div>
                      </Link>
                      <Link href="/vendor/forum" className="block p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow transition">
                        <div className="font-medium text-gray-900">Seller Forum</div>
                        <div className="text-sm text-gray-600">Connect with 15K+ sellers</div>
                      </Link>
                      <Link href="/vendor/training" className="block p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow transition">
                        <div className="font-medium text-gray-900">Training Program</div>
                        <div className="text-sm text-gray-600">Masterclass series</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Selling Journey?</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
            Join thousands of successful sellers who trust Nyle Store for their online business growth
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/vendor/signup" 
              className="group px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Rocket className="inline mr-3 h-6 w-6 group-hover:animate-bounce" />
              Start Selling Free Today
              <ArrowRight className="inline ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              href="/vendor/demo" 
              className="px-10 py-4 bg-white/20 backdrop-blur-lg text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all"
            >
              <Sparkles className="inline mr-3 h-6 w-6" />
              Request Platform Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
