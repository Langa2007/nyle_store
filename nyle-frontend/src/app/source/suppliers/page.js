"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";
import { 
  Shield, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp,
  Award,
  MapPin,
  Clock,
  ShoppingBag,
  Filter,
  Search,
  ChevronRight,
  Eye,
  MessageSquare,
  Bookmark,
  Heart,
  Globe,
  Package,
  Truck,
  DollarSign,
  BarChart,
  Zap
} from "lucide-react";

export default function SuppliersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [minRating, setMinRating] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedSuppliers, setBookmarkedSuppliers] = useState([1, 3]);
  const [sortBy, setSortBy] = useState("rating");

  const supplierStats = [
    { label: "Verified Suppliers", value: "2.4K+", icon: Shield, color: "text-blue-600", change: "+120" },
    { label: "Avg Rating", value: "4.7/5", icon: Star, color: "text-yellow-600", change: "+0.1" },
    { label: "Active Buyers", value: "45K+", icon: Users, color: "text-green-600", change: "+2.3K" },
    { label: "Success Rate", value: "98.5%", icon: TrendingUp, color: "text-purple-600", change: "+1.2%" },
  ];

  const categories = [
    { id: "all", label: "All Categories", icon: "📦", count: 2400 },
    { id: "electronics", label: "Electronics", icon: "📱", count: 450 },
    { id: "fashion", label: "Fashion & Apparel", icon: "👕", count: 380 },
    { id: "home", label: "Home & Garden", icon: "🏠", count: 320 },
    { id: "industrial", label: "Industrial", icon: "⚙️", count: 560 },
    { id: "food", label: "Food & Beverage", icon: "🍎", count: 290 },
    { id: "health", label: "Health & Beauty", icon: "💄", count: 210 },
    { id: "automotive", label: "Automotive", icon: "🚗", count: 190 },
  ];

  const regions = [
    { id: "all", label: "All Regions", count: 2400 },
    { id: "nairobi", label: "Nairobi", count: 850 },
    { id: "mombasa", label: "Mombasa & Coast", count: 420 },
    { id: "kisumu", label: "Kisumu & Western", count: 380 },
    { id: "international", label: "International", count: 750 },
  ];

  const suppliers = [
    {
      id: 1,
      name: "TechGadgets Ltd",
      category: "electronics",
      region: "nairobi",
      rating: 4.8,
      reviews: 128,
      minOrder: "$500",
      delivery: "3-5 days",
      verified: true,
      premium: true,
      description: "Leading electronics manufacturer specializing in smart devices",
      tags: ["ISO Certified", "Bulk Discounts", "OEM Available"],
      responseTime: "1 hour"
    },
    {
      id: 2,
      name: "Global Textiles Corp",
      category: "fashion",
      region: "international",
      rating: 4.6,
      reviews: 89,
      minOrder: "$1,000",
      delivery: "7-14 days",
      verified: true,
      premium: false,
      description: "Premium textile supplier with global shipping",
      tags: ["Organic Cotton", "Custom Prints", "Fast Delivery"],
      responseTime: "2 hours"
    },
    {
      id: 3,
      name: "AgroHarvest Kenya",
      category: "food",
      region: "nairobi",
      rating: 4.9,
      reviews: 215,
      minOrder: "$300",
      delivery: "2-4 days",
      verified: true,
      premium: true,
      description: "Organic farm produce and processed foods",
      tags: ["Organic Certified", "Export Ready", "Bulk Pricing"],
      responseTime: "30 minutes"
    },
    {
      id: 4,
      name: "HomeDecor Solutions",
      category: "home",
      region: "mombasa",
      rating: 4.5,
      reviews: 67,
      minOrder: "$250",
      delivery: "5-7 days",
      verified: true,
      premium: false,
      description: "Quality home furnishing and decor items",
      tags: ["Custom Designs", "Wholesale", "Local Delivery"],
      responseTime: "3 hours"
    },
    {
      id: 5,
      name: "Industrial Parts Ltd",
      category: "industrial",
      region: "international",
      rating: 4.7,
      reviews: 142,
      minOrder: "$2,000",
      delivery: "10-20 days",
      verified: true,
      premium: true,
      description: "Heavy machinery and industrial equipment",
      tags: ["Quality Certified", "Technical Support", "Export"],
      responseTime: "4 hours"
    },
    {
      id: 6,
      name: "AutoParts Kenya",
      category: "automotive",
      region: "kisumu",
      rating: 4.4,
      reviews: 45,
      minOrder: "$150",
      delivery: "4-6 days",
      verified: true,
      premium: false,
      description: "Automotive parts and accessories supplier",
      tags: ["Genuine Parts", "Fast Shipping", "Warranty"],
      responseTime: "2 hours"
    },
  ];

  const verificationBadges = [
    { label: "Business Verified", icon: Shield, description: "Company registration verified" },
    { label: "Quality Certified", icon: Award, description: "Quality standards certified" },
    { label: "Fast Responder", icon: Clock, description: "Avg response < 2 hours" },
    { label: "Top Rated", icon: Star, description: "4.5+ average rating" },
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    // Category filter
    if (selectedCategory !== "all" && supplier.category !== selectedCategory) {
      return false;
    }
    // Region filter
    if (selectedRegion !== "all" && supplier.region !== selectedRegion) {
      return false;
    }
    // Rating filter
    if (supplier.rating < minRating) {
      return false;
    }
    // Search filter
    if (searchQuery && !supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !supplier.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    if (sortBy === "response") return a.responseTime.localeCompare(b.responseTime);
    return 0;
  });

  const toggleBookmark = (id) => {
    if (bookmarkedSuppliers.includes(id)) {
      setBookmarkedSuppliers(bookmarkedSuppliers.filter(supplierId => supplierId !== id));
    } else {
      setBookmarkedSuppliers([...bookmarkedSuppliers, id]);
    }
  };

  return (
    <BuyerInfoLayout
      title="Verified Suppliers"
      subtitle="We verify, you trade with confidence."
      stats={supplierStats}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Trade with Confidence
              </h2>
              <p className="text-gray-600">
                Every supplier undergoes rigorous verification and quality screening
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              Every supplier on Nyle undergoes comprehensive identity verification, 
              business registration checks, and quality screening. When you see the{" "}
              <span className="font-semibold text-blue-600">"Verified"</span> badge, 
              it means your supplier has earned trust through proven performance and 
              reliability.
            </p>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search suppliers by name, product, or category..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="response">Fastest Response</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedCategory === cat.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="font-medium text-gray-900 text-sm">{cat.label}</div>
                    <div className="text-xs text-gray-500">{cat.count}</div>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setSelectedCategory("all")}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all categories →
              </button>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Region</label>
              <div className="space-y-2">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                      selectedRegion === region.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{region.label}</span>
                    <span className="text-sm text-gray-500">{region.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Minimum Rating: {minRating}+
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="3"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>3.0+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>4.0+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>4.5+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {verificationBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className="inline-flex p-3 rounded-lg bg-blue-100 mb-3">
                <badge.icon className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{badge.label}</h4>
              <p className="text-xs text-gray-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Suppliers Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Verified Suppliers ({filteredSuppliers.length})
            </h3>
            <div className="text-sm text-gray-600">
              Showing {filteredSuppliers.length} of {suppliers.length} suppliers
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Supplier Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{supplier.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{supplier.rating}</span>
                            <span className="text-sm text-gray-500">({supplier.reviews})</span>
                          </div>
                          {supplier.verified && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBookmark(supplier.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Bookmark className={`h-5 w-5 ${
                        bookmarkedSuppliers.includes(supplier.id)
                          ? 'text-blue-600 fill-blue-600'
                          : 'text-gray-400'
                      }`} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{supplier.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {supplier.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Supplier Details */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Min Order</div>
                      <div className="font-medium text-gray-900">{supplier.minOrder}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Delivery</div>
                      <div className="font-medium text-gray-900">{supplier.delivery}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Response Time</div>
                      <div className="font-medium text-gray-900 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-green-500" />
                        {supplier.responseTime}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-medium text-gray-900 flex items-center gap-1">
                        {categories.find(c => c.id === supplier.category)?.icon}
                        {categories.find(c => c.id === supplier.category)?.label}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Contact Supplier
                    </button>
                    <button className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No suppliers found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedRegion("all");
                  setMinRating(4);
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Key Benefits */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Verification Process
            </h3>
            
            <div className="space-y-4">
              {[
                { icon: "✅", title: "Business Documents", desc: "Company registration and trade licenses verified" },
                { icon: "🌍", title: "Transparent Profiles", desc: "Complete company profiles with reviews and ratings" },
                { icon: "📈", title: "Performance Tracking", desc: "Real-time reliability scores and transaction history" },
                { icon: "🎯", title: "Dispute Resolution", desc: "Nyle's mediation for secure transactions" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-white" />
              <div>
                <h3 className="text-lg font-bold text-white">Partnership Focused</h3>
                <p className="text-blue-100">Long-term relationships over quick sales</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-blue-100">
                Discover suppliers committed to quality, reliability, and building 
                lasting partnerships. Our verified network prioritizes your success 
                through consistent performance and transparent operations.
              </p>
              
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                  <span className="font-semibold">Trust Score Impact</span>
                </div>
                <p className="text-sm text-blue-100">
                  Verified suppliers maintain an average 98% satisfaction rate
                </p>
              </div>
              
              <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
                Apply to Become a Verified Supplier
              </button>
            </div>
          </div>
        </div>

        {/* Premium Suppliers CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-2">Premium Suppliers Network</h3>
              <p className="text-purple-100">
                Access our exclusive network of top-rated, premium verified suppliers
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
                View Premium Suppliers
              </button>
              <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl backdrop-blur-sm transition-colors">
                Request Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </BuyerInfoLayout>
  );
}