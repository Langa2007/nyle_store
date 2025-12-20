"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
  Share2,
  Bookmark,
  Filter,
  Zap,
  Clock,
  ThumbsUp,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Star,
  Users
} from "lucide-react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqs, setExpandedFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [helpfulVotes, setHelpfulVotes] = useState({});
  const [bookmarkedFaqs, setBookmarkedFaqs] = useState([]);
  const searchRef = useRef(null);

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle, count: 28 },
    { id: "orders", label: "Orders & Shipping", icon: Clock, count: 8 },
    { id: "payments", label: "Payments", icon: Zap, count: 6 },
    { id: "vendor", label: "Vendor/Seller", icon: Users, count: 7 },
    { id: "account", label: "Account & Security", icon: TrendingUp, count: 5 },
    { id: "technical", label: "Technical Issues", icon: Star, count: 4 },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I track my order?",
      answer: "You can track your order in real-time from your dashboard under 'My Orders'. Each order includes a tracking number that provides live updates, estimated delivery time, and delivery notifications. You'll also receive SMS and email updates at every stage of delivery.",
      category: "orders",
      views: "45.2k",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      question: "How do I become a vendor?",
      answer: "Start your vendor journey by visiting our <a href='/vendor/signup' class='text-blue-600 hover:text-blue-700 font-medium'>Become a Seller</a> page. Complete the registration form, verify your identity, and set up your payment method. Once approved, you can list products, manage inventory, and start selling within 24-48 hours. Our onboarding guide will walk you through every step.",
      category: "vendor",
      views: "32.7k",
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      question: "What payment methods are supported?",
      answer: "Nyle supports multiple secure payment options: M-Pesa (direct integration), all major credit/debit cards (Visa, MasterCard, American Express), bank transfers via NylePay, and digital wallets. All transactions are encrypted and PCI DSS compliant for maximum security.",
      category: "payments",
      views: "28.9k",
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      question: "How do I return an item?",
      answer: "Returns can be initiated within 30 days of delivery. Go to 'My Orders', select the item, and click 'Return Item'. Choose your reason, print the prepaid return label, and drop off at any authorized location. Refunds are processed within 5-7 business days after we receive the item.",
      category: "orders",
      views: "24.3k",
      lastUpdated: "1 week ago"
    },
    {
      id: 5,
      question: "Is my payment information secure?",
      answer: "Absolutely. We use bank-level 256-bit SSL encryption and are fully PCI DSS compliant. Your payment details are tokenized and never stored on our servers. We also employ real-time fraud detection and two-factor authentication for added security.",
      category: "account",
      views: "19.8k",
      lastUpdated: "2 weeks ago"
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer: "You can reach our 24/7 support team through multiple channels: Live Chat (available on all pages), email at support@nyle.com, phone at +254 700 123 456, or via our <a href='/support/contact' class='text-blue-600 hover:text-blue-700 font-medium'>Contact Form</a>. Average response time is under 2 hours.",
      category: "account",
      views: "17.5k",
      lastUpdated: "1 month ago"
    },
    {
      id: 7,
      question: "What are the seller fees?",
      answer: "We offer competitive pricing: 5% transaction fee on sales, no listing fees, and optional premium features starting at $9.99/month. There are no hidden charges or setup fees. See our complete <a href='/pricing/sellers' class='text-blue-600 hover:text-blue-700 font-medium'>Seller Pricing</a> page for details.",
      category: "vendor",
      views: "22.1k",
      lastUpdated: "2 days ago"
    },
    {
      id: 8,
      question: "How long does shipping take?",
      answer: "Shipping times vary by location: Nairobi Metro (1-2 days), Other Major Cities (2-4 days), Remote Areas (5-7 days). We partner with multiple carriers including DHL, FedEx, and local providers for optimal delivery times. Express shipping options available.",
      category: "orders",
      views: "26.4k",
      lastUpdated: "1 week ago"
    },
  ];

  const trendingFaqs = faqs.sort((a, b) => parseFloat(b.views) - parseFloat(a.views)).slice(0, 3);

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id) => {
    if (expandedFaqs.includes(id)) {
      setExpandedFaqs(expandedFaqs.filter(faqId => faqId !== id));
    } else {
      setExpandedFaqs([...expandedFaqs, id]);
    }
  };

  const handleHelpfulVote = (id) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const toggleBookmark = (id) => {
    if (bookmarkedFaqs.includes(id)) {
      setBookmarkedFaqs(bookmarkedFaqs.filter(faqId => faqId !== id));
    } else {
      setBookmarkedFaqs([...bookmarkedFaqs, id]);
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  return (
    <SupportInfoLayout
      title="Frequently Asked Questions"
      subtitle={
        <div className="flex items-center gap-2">
          <span className="text-blue-100/90">Quick answers to common questions from our users</span>
          <Sparkles className="h-4 w-4 text-blue-200" />
        </div>
      }
    >
      <div className="space-y-8">
        {/* Hero Search */}
        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Find Answers Quickly</h1>
            <p className="text-blue-100/90 mb-8">
              Browse through our most commonly asked questions or search for specific topics
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you need help with?"
                  className="w-full pl-12 pr-24 py-4 bg-white text-gray-900 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none shadow-lg"
                />
                <button
                  onClick={() => searchRef.current.focus()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4 text-sm">
                <span className="text-blue-100/80">Popular:</span>
                {["track order", "return item", "seller fees", "payment methods"].map((term, i) => (
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
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-blue-100 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{faqs.length}</div>
            <div className="text-sm text-gray-600">Questions Answered</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-green-100 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">Resolution Rate</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-purple-100 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Support Available</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-orange-100 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">&lt;2h</div>
            <div className="text-sm text-gray-600">Avg. Response Time</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Categories */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                Browse by Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="h-4 w-4" />
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Questions */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Trending Questions
              </h3>
              <div className="space-y-4">
                {trendingFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white p-4 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 text-sm mb-2">{faq.question}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{faq.views} views</span>
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View answer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-white text-lg mb-3">Still Need Help?</h3>
              <p className="text-blue-100 mb-4">
                Can't find your answer? Our support team is here for you.
              </p>
              <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg flex items-center justify-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Support
              </button>
            </div>
          </div>

          {/* Right Column - FAQs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {activeCategory === "all" ? "All Questions" : categories.find(c => c.id === activeCategory)?.label}
                <span className="text-gray-500 text-sm font-normal ml-2">
                  ({filteredFaqs.length} questions)
                </span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="hidden md:inline">Sorted by:</span>
                <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1">
                  <option>Most Popular</option>
                  <option>Most Recent</option>
                  <option>Most Helpful</option>
                </select>
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredFaqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <h3 
                            className="font-semibold text-gray-900 text-lg"
                            dangerouslySetInnerHTML={{ 
                              __html: highlightText(faq.question, searchQuery) 
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 ml-8">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {faq.views} views
                          </span>
                          <span>Updated {faq.lastUpdated}</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {expandedFaqs.includes(faq.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedFaqs.includes(faq.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <div className="ml-8">
                            <div 
                              className="text-gray-600 leading-relaxed mb-4"
                              dangerouslySetInnerHTML={{ 
                                __html: highlightText(faq.answer, searchQuery) 
                              }}
                            />
                            
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                              <button
                                onClick={() => handleHelpfulVote(faq.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                              >
                                <ThumbsUp className="h-4 w-4" />
                                Helpful ({helpfulVotes[faq.id] || 0})
                              </button>
                              
                              <button
                                onClick={() => toggleBookmark(faq.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                  bookmarkedFaqs.includes(faq.id)
                                    ? 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700'
                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                <Bookmark className="h-4 w-4" />
                                {bookmarkedFaqs.includes(faq.id) ? 'Bookmarked' : 'Bookmark'}
                              </button>
                              
                              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors">
                                <Share2 className="h-4 w-4" />
                                Share
                              </button>
                              
                              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors">
                                <MessageSquare className="h-4 w-4" />
                                Comment
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Didn't find your answer?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is available 24/7 to help with any questions you might have.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Ask Our Support Team
                </button>
                <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Visit Help Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SupportInfoLayout>
  );
}

// Missing Eye icon component
const Eye = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);