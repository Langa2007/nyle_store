"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  PlayCircle,
  Download,
  Share2,
  ThumbsUp,
  MessageSquare,
  Zap,
  TrendingUp,
  Shield,
  Globe,
  Smartphone,
  Tag,
  Truck,
  CreditCard,
  Store,
  Users,
  HelpCircle,
  Star,
  ArrowRight,
  Sparkles,
  Eye,
  Clock
} from "lucide-react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [trendingArticles, setTrendingArticles] = useState([
    { id: 1, title: "How to Set Up NylePay", views: "12.4k", category: "payments", icon: CreditCard },
    { id: 2, title: "Shipping Label Guide", views: "8.7k", category: "shipping", icon: Truck },
    { id: 3, title: "Store Optimization Tips", views: "15.2k", category: "seller", icon: Store },
    { id: 4, title: "Mobile App Features", views: "6.3k", category: "app", icon: Smartphone },
  ]);
  const [viewedArticles, setViewedArticles] = useState([]);
  const searchRef = useRef(null);

  const categories = [
    { id: "all", label: "All Topics", icon: Globe, color: "from-blue-500 to-cyan-500" },
    { id: "getting-started", label: "Getting Started", icon: Zap, color: "from-green-500 to-emerald-500" },
    { id: "payments", label: "Payments & Billing", icon: CreditCard, color: "from-purple-500 to-pink-500" },
    { id: "shipping", label: "Shipping & Orders", icon: Truck, color: "from-orange-500 to-red-500" },
    { id: "seller", label: "Seller Support", icon: Store, color: "from-indigo-500 to-blue-500" },
    { id: "app", label: "Mobile App", icon: Smartphone, color: "from-cyan-500 to-teal-500" },
    { id: "security", label: "Security & Privacy", icon: Shield, color: "from-gray-700 to-gray-900" },
  ];

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order from your dashboard. Go to 'My Orders' and click on the tracking number. You'll see real-time updates including estimated delivery time.",
      category: "shipping"
    },
    {
      question: "Is NylePay secure?",
      answer: "Yes! NylePay uses bank-level encryption and is PCI DSS compliant. We never store your full payment details on our servers.",
      category: "payments"
    },
    {
      question: "How do I become a verified seller?",
      answer: "Complete your profile verification, connect your payment method, and list your first 5 products. Our team will review and verify your account within 24-48 hours.",
      category: "seller"
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 30-day money-back guarantee on all purchases. Refunds are processed within 5-7 business days after receiving the returned item.",
      category: "payments"
    },
    {
      question: "How do I optimize my listings?",
      answer: "Use high-quality images, detailed descriptions, relevant keywords, and competitive pricing. Our algorithm boosts well-optimized listings in search results.",
      category: "seller"
    },
  ];

  const tutorials = [
    { title: "Complete Setup Guide", duration: "15 min", type: "article", icon: FileText },
    { title: "Video: First Sale Walkthrough", duration: "8 min", type: "video", icon: Video },
    { title: "Advanced SEO for Sellers", duration: "25 min", type: "article", icon: TrendingUp },
    { title: "Mobile App Masterclass", duration: "12 min", type: "video", icon: PlayCircle },
  ];

  const popularGuides = [
    { title: "Ultimate Seller Handbook", icon: BookOpen, downloads: "45k", rating: 4.9 },
    { title: "Payment Security Whitepaper", icon: Shield, downloads: "28k", rating: 4.8 },
    { title: "Shipping Best Practices", icon: Truck, downloads: "32k", rating: 4.7 },
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const handleArticleView = (id) => {
    if (!viewedArticles.includes(id)) {
      setViewedArticles([...viewedArticles, id]);
    }
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <SupportInfoLayout
      title="Help Center"
      subtitle={
        <div className="flex items-center gap-2">
          <span className="text-blue-100/90">Your one-stop destination for guidance, tutorials, and product support</span>
          <Sparkles className="h-4 w-4 text-blue-200" />
        </div>
      }
    >
      <div className="space-y-8">
        {/* Hero Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">How can we help you today?</h1>
            <p className="text-blue-100/90 mb-8">
              Search through thousands of articles, guides, and tutorials
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for answers, guides, or topics..."
                  className="w-full pl-12 pr-24 py-4 bg-white text-gray-900 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none shadow-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Search
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4 text-sm">
                <span className="text-blue-100/80">Try:</span>
                {["refund policy", "track order", "seller verification", "payment methods"].map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Articles", value: "2,500+", icon: FileText, color: "bg-blue-100 text-blue-600" },
            { label: "Video Guides", value: "450+", icon: Video, color: "bg-purple-100 text-purple-600" },
            { label: "Active Users", value: "500k+", icon: Users, color: "bg-green-100 text-green-600" },
            { label: "Solved Issues", value: "99.2%", icon: ThumbsUp, color: "bg-orange-100 text-orange-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-3`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`relative overflow-hidden rounded-xl p-5 text-left transition-all ${
                  activeCategory === category.id 
                    ? 'ring-2 ring-blue-500 shadow-lg' 
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r opacity-5 from-blue-500 to-cyan-500"
                    transition={{ type: "spring", bounce: 0.2 }}
                  />
                )}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-3`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.label}</h3>
                <ChevronRight className={`h-4 w-4 mt-2 ${
                  activeCategory === category.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - FAQs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Tutorials */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-600" />
                  Featured Tutorials
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {tutorials.map((tutorial, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl p-5 border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        tutorial.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <tutorial.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{tutorial.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          {tutorial.duration}
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Start Learning
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-gray-900">{faq.question}</span>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`} />
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-5 pb-5"
                          >
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            <div className="flex gap-3 mt-4">
                              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                Helpful
                              </button>
                              <button className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                Comment
                              </button>
                              <button className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1">
                                <Share2 className="h-4 w-4" />
                                Share
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column - Trending & Resources */}
          <div className="space-y-8">
            {/* Trending Articles */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Trending Articles
              </h3>
              <div className="space-y-4">
                {trendingArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    whileHover={{ x: 4 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      viewedArticles.includes(article.id)
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                    onClick={() => handleArticleView(article.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-lg">
                        <article.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{article.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Eye className="h-3 w-3" />
                          {article.views} views
                        </div>
                      </div>
                      {viewedArticles.includes(article.id) && (
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Popular Guides */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-300" />
                Popular Guides
              </h3>
              <div className="space-y-4">
                {popularGuides.map((guide, i) => (
                  <div key={i} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <guide.icon className="h-5 w-5 text-blue-300" />
                      <div>
                        <h4 className="font-medium text-white">{guide.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-300 mt-1">
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {guide.downloads}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400" />
                            {guide.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      Download PDF
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Help Card */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-white text-lg mb-3">Still Need Help?</h3>
              <p className="text-blue-100 mb-4">
                Can't find what you're looking for? Our support team is ready to help.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                Contact Support
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Start Your Journey with Nyle
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're buying or selling, our comprehensive guides and 24/7 support
            will help you succeed on our platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg"
            >
              Explore All Guides
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
            >
              Watch Tutorials
            </motion.button>
          </div>
        </motion.div>
      </div>
    </SupportInfoLayout>
  );
}