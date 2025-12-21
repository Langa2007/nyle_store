"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Users, 
  DollarSign, 
  Clock, 
  Package, 
  TrendingUp,
  Shield,
  CheckCircle,
  MessageSquare,
  Download,
  ChevronRight,
  Zap,
  BarChart,
  Award,
  Star,
  Eye,
  Send,
  Building
} from "lucide-react";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function QuotationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRfq, setActiveRfq] = useState(null);

  const quotationStats = [
    { label: "Active RFQs", value: "48", icon: FileText, color: "text-blue-600", change: "+12" },
    { label: "Avg Response Time", value: "4.2h", icon: Clock, color: "text-green-600", change: "-1.3h" },
    { label: "Avg Order Value", value: "$2.5K", icon: DollarSign, color: "text-purple-600", change: "+$300" },
    { label: "Success Rate", value: "92%", icon: TrendingUp, color: "text-orange-600", change: "+5%" },
  ];

  const categories = [
    { id: "all", label: "All Categories", icon: "📦", count: 48 },
    { id: "electronics", label: "Electronics", icon: "📱", count: 12 },
    { id: "fashion", label: "Fashion & Apparel", icon: "👕", count: 8 },
    { id: "home", label: "Home & Garden", icon: "🏠", count: 7 },
    { id: "industrial", label: "Industrial", icon: "⚙️", count: 15 },
    { id: "food", label: "Food & Beverage", icon: "🍎", count: 6 },
  ];

  const sampleRFQs = [
    {
      id: 1,
      product: "Wireless Bluetooth Earbuds",
      category: "electronics",
      quantity: "5,000 units",
      budget: "$25,000 - $30,000",
      posted: "2 hours ago",
      responses: 8,
      urgency: "high",
      buyer: "Global Gadgets Inc.",
      description: "Looking for OEM manufacturer for bulk order of wireless earbuds with minimum 20-hour battery life and IPX7 rating."
    },
    {
      id: 2,
      product: "Organic Cotton T-Shirts",
      category: "fashion",
      quantity: "10,000 pieces",
      budget: "$15,000 - $18,000",
      posted: "1 day ago",
      responses: 15,
      urgency: "medium",
      buyer: "EcoWear Kenya",
      description: "Bulk order of organic cotton t-shirts for retail. Need samples first. Fair trade certification preferred."
    },
    {
      id: 3,
      product: "Stainless Steel Cookware Sets",
      category: "home",
      quantity: "2,500 sets",
      budget: "$45,000 - $50,000",
      posted: "3 days ago",
      responses: 6,
      urgency: "low",
      buyer: "Kitchen Solutions Ltd",
      description: "Complete cookware set including pots, pans, and utensils. Must be BPA-free and dishwasher safe."
    },
    {
      id: 4,
      product: "Industrial Safety Gloves",
      category: "industrial",
      quantity: "50,000 pairs",
      budget: "$30,000 - $35,000",
      posted: "5 hours ago",
      responses: 3,
      urgency: "high",
      buyer: "Safety First Corp",
      description: "Bulk order of industrial-grade safety gloves. Need CE certification and custom packaging."
    },
    {
      id: 5,
      product: "Organic Coffee Beans",
      category: "food",
      quantity: "2,000 kg",
      budget: "$12,000 - $15,000",
      posted: "2 days ago",
      responses: 10,
      urgency: "medium",
      buyer: "Brew Masters Kenya",
      description: "Premium organic Arabica coffee beans for retail packaging. Need export certification and quality samples."
    },
    {
      id: 6,
      product: "LED Smart Bulbs",
      category: "electronics",
      quantity: "8,000 units",
      budget: "$40,000 - $45,000",
      posted: "6 hours ago",
      responses: 4,
      urgency: "high",
      buyer: "Smart Homes Africa",
      description: "Wi-Fi enabled smart bulbs compatible with Google Home and Alexa. Need CE and RoHS certification."
    },
  ];

  const sellerTips = [
    {
      icon: Zap,
      title: "Fast Response",
      description: "Respond within 24 hours for higher chances",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Shield,
      title: "Verified Buyers",
      description: "All buyers are pre-vetted and verified",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Offer competitive but profitable rates",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: MessageSquare,
      title: "Clear Communication",
      description: "Provide detailed quotes with timelines",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
  ];

  const popularSearches = [
    "Smartphones",
    "Textiles",
    "Packaging",
    "Agricultural Products",
    "Construction Materials",
    "Medical Supplies"
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRfqs(sampleRFQs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRFQs = rfqs.filter(rfq => {
    if (selectedCategory !== "all" && rfq.category !== selectedCategory) return false;
    if (searchQuery && !rfq.product.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !rfq.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "latest") return new Date(b.posted) - new Date(a.posted);
    if (sortBy === "responses") return b.responses - a.responses;
    if (sortBy === "budget") {
      const aBudget = parseInt(a.budget.replace(/[^0-9]/g, ''));
      const bBudget = parseInt(b.budget.replace(/[^0-9]/g, ''));
      return bBudget - aBudget;
    }
    return 0;
  });

  const handleSubmitQuote = (rfqId) => {
    // Simulate quote submission
    alert(`Quote submitted for RFQ #${rfqId}! Buyer will review your offer.`);
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <VendorInfoLayout
      title="Seller Quotations"
      subtitle="Find competitive quotes and supplier deals through Nyle's vendor network."
      stats={quotationStats}
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
            <FileText className="h-4 w-4" />
            Connect with Verified Buyers
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connect. Compare. Collaborate.
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            Nyle helps you connect with trusted buyers and partners who offer 
            competitive RFQs for bulk and retail deals. Whether you need to supply 
            raw materials or finished goods, find profitable opportunities all in one place.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for RFQs by product, category, or keywords..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
              
              {/* Popular Searches */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-sm text-gray-600">Trending:</span>
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(term)}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="latest">Latest First</option>
                  <option value="responses">Most Responses</option>
                  <option value="budget">Highest Budget</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">Browse by Category</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.label}
                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Seller Tips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sellerTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className={`inline-flex p-2 rounded-lg ${tip.bgColor} mb-3`}>
                <tip.icon className={`h-5 w-5 ${tip.color}`} />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h4>
              <p className="text-xs text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>

        {/* RFQs List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Requests for Quotation
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredRFQs.length} of {rfqs.length} RFQs
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading RFQs...</p>
            </div>
          ) : filteredRFQs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No RFQs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRFQs.map((rfq) => (
                <motion.div
                  key={rfq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  {/* RFQ Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(rfq.urgency)}`}>
                            {rfq.urgency.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">{rfq.posted}</span>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                          {rfq.product}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <Building className="h-3 w-3" />
                          <span>{rfq.buyer}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {rfq.description}
                    </p>
                  </div>

                  {/* RFQ Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Quantity</div>
                        <div className="font-medium text-gray-900">{rfq.quantity}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Budget</div>
                        <div className="font-medium text-gray-900">{rfq.budget}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Category</div>
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          {categories.find(c => c.id === rfq.category)?.icon}
                          {categories.find(c => c.id === rfq.category)?.label}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Responses</div>
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {rfq.responses}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setActiveRfq(rfq.id)}
                        className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                      <button
                        onClick={() => handleSubmitQuote(rfq.id)}
                        className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Submit Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Quotations Work
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Browse RFQs",
                description: "Find relevant requests matching your products",
                icon: Search
              },
              {
                step: "2",
                title: "Submit Quote",
                description: "Provide detailed pricing and terms",
                icon: FileText
              },
              {
                step: "3",
                title: "Get Selected",
                description: "Buyer reviews and selects best offer",
                icon: Award
              },
              {
                step: "4",
                title: "Start Business",
                description: "Win the deal and grow your business",
                icon: TrendingUp
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits for Sellers */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-bold text-white">Benefits for Sellers</h3>
                <p className="text-blue-100">Grow your business with Nyle</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                "Access to verified buyers and bulk orders",
                "No commission on RFQ responses",
                "Secure payment protection",
                "Performance ratings and reviews",
                "Direct communication with buyers",
                "Regular new opportunities"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-300" />
                  <span className="text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
              View Seller Benefits
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              Success Metrics
            </h3>
            
            <div className="space-y-4">
              {[
                { label: "Average Win Rate", value: "32%", change: "+8%" },
                { label: "Avg Deal Size", value: "$4,200", change: "+$500" },
                { label: "Response Success", value: "68%", change: "+12%" },
                { label: "Repeat Business", value: "45%", change: "+5%" },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{metric.label}</div>
                    <div className="text-xs text-gray-600">Among active sellers</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{metric.value}</div>
                    <div className="text-xs text-green-600">{metric.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join thousands of successful sellers finding profitable opportunities 
              through Nyle's quotation system. Start responding to RFQs today and 
              grow your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105">
                <FileText className="h-5 w-5" />
                Start Responding to RFQs
              </button>
              
              <button className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold backdrop-blur-sm transition-all">
                <Download className="h-5 w-5" />
                Download RFQ Template
              </button>
            </div>
            
            <p className="text-blue-100/80 text-sm mt-6">
              No subscription fees • Verified buyers only • Secure transactions
            </p>
          </div>
        </div>
      </div>
    </VendorInfoLayout>
  );
}