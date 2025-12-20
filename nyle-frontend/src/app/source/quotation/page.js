"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Shield, 
  DollarSign,
  Clock,
  Package,
  CheckCircle,
  Upload,
  FileText,
  BarChart,
  Zap,
  Target,
  Award,
  ShoppingBag,
  Filter,
  Star,
  ChevronRight,
  Send,
  Download
} from "lucide-react";

export default function QuotationPage() {
  const [rfqForm, setRfqForm] = useState({
    productName: "",
    quantity: "",
    category: "",
    description: "",
    budget: "",
    timeline: "",
    specifications: ""
  });
  const [activeRequests, setActiveRequests] = useState([]);
  const [receivedOffers, setReceivedOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quotationStats = [
    { label: "Active RFQs", value: "12", icon: MessageSquare, color: "text-blue-600", change: "+3" },
    { label: "Received Offers", value: "45", icon: DollarSign, color: "text-green-600", change: "+8" },
    { label: "Avg Response Time", value: "4.2h", icon: Clock, color: "text-purple-600", change: "-1.3h" },
    { label: "Success Rate", value: "92%", icon: TrendingUp, color: "text-orange-600", change: "+5%" },
  ];

  const categories = [
    { id: "electronics", label: "Electronics", icon: "📱", count: 24 },
    { id: "fashion", label: "Fashion & Apparel", icon: "👕", count: 18 },
    { id: "home", label: "Home & Garden", icon: "🏠", count: 15 },
    { id: "industrial", label: "Industrial Supplies", icon: "⚙️", count: 32 },
    { id: "food", label: "Food & Beverage", icon: "🍎", count: 12 },
    { id: "automotive", label: "Automotive", icon: "🚗", count: 9 },
  ];

  const sampleOffers = [
    {
      id: 1,
      supplier: "TechGadgets Ltd",
      product: "Wireless Earbuds",
      price: "$12.50/unit",
      moq: "500 units",
      delivery: "15 days",
      rating: 4.8,
      status: "best-match"
    },
    {
      id: 2,
      supplier: "Global Supplies Inc",
      product: "Wireless Earbuds",
      price: "$13.20/unit",
      moq: "300 units",
      delivery: "12 days",
      rating: 4.6,
      status: "competitive"
    },
    {
      id: 3,
      supplier: "AudioTech Corp",
      product: "Wireless Earbuds",
      price: "$11.80/unit",
      moq: "1000 units",
      delivery: "20 days",
      rating: 4.9,
      status: "lowest-price"
    },
  ];

  const activeRFQs = [
    {
      id: 1,
      product: "LED Smart Bulbs",
      category: "electronics",
      responses: 8,
      posted: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      product: "Organic Cotton T-Shirts",
      category: "fashion",
      responses: 15,
      posted: "1 day ago",
      status: "active"
    },
    {
      id: 3,
      product: "Stainless Steel Cookware",
      category: "home",
      responses: 6,
      posted: "3 days ago",
      status: "closing-soon"
    },
  ];

  const benefits = [
    {
      title: "Fast RFQ Submission",
      description: "Submit requests in minutes, get responses in hours",
      icon: Zap,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Verified Suppliers",
      description: "All suppliers are pre-vetted and rated",
      icon: Shield,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Real-time Comparison",
      description: "Compare offers side-by-side with transparent pricing",
      icon: BarChart,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Secure Communication",
      description: "Chat securely and finalize deals on-platform",
      icon: MessageSquare,
      color: "from-orange-500 to-amber-500"
    },
  ];

  const handleSubmitRFQ = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    
    // Add to active requests
    const newRFQ = {
      id: Date.now(),
      product: rfqForm.productName,
      category: rfqForm.category,
      responses: 0,
      posted: "Just now",
      status: "active"
    };
    
    setActiveRequests([newRFQ, ...activeRequests]);
    
    // Reset form
    setRfqForm({
      productName: "",
      quantity: "",
      category: "",
      description: "",
      budget: "",
      timeline: "",
      specifications: ""
    });
    
    // Show success message
    alert("RFQ submitted successfully! Suppliers will start responding soon.");
  };

  const downloadRfqTemplate = () => {
    // Create and download a sample RFQ template
    const template = `Product Name: ${rfqForm.productName || "[Product Name]"}
Quantity: ${rfqForm.quantity || "[Quantity]"}
Category: ${rfqForm.category || "[Category]"}
Description: ${rfqForm.description || "[Detailed Description]"}
Budget: ${rfqForm.budget || "[Budget Range]"}
Timeline: ${rfqForm.timeline || "[Delivery Timeline]"}
Specifications: ${rfqForm.specifications || "[Technical Specifications]"}`;
    
    const blob = new Blob([template], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rfq-template.txt';
    a.click();
  };

  return (
    <BuyerInfoLayout
      title="Get Quotation"
      subtitle="Post your sourcing request once — receive offers from verified suppliers instantly."
      stats={quotationStats}
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
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Smart Sourcing Platform
              </h2>
              <p className="text-gray-600">
                Connect with thousands of verified suppliers ready to fulfill your needs
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're a retailer, manufacturer, or startup, Nyle connects you 
              with pre-vetted suppliers ready to fulfill your product needs at competitive 
              prices. Post what you need, compare offers in real-time, and secure the 
              best deals—all within our secure platform.
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${benefit.color} mb-3`}>
                <benefit.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - RFQ Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Submit New RFQ
                </h3>
                <button
                  onClick={downloadRfqTemplate}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </button>
              </div>

              <form onSubmit={handleSubmitRFQ} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={rfqForm.productName}
                      onChange={(e) => setRfqForm({...rfqForm, productName: e.target.value})}
                      placeholder="e.g., Wireless Earbuds, Organic T-Shirts"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity *
                    </label>
                    <input
                      type="text"
                      value={rfqForm.quantity}
                      onChange={(e) => setRfqForm({...rfqForm, quantity: e.target.value})}
                      placeholder="e.g., 1000 units, 500 kg"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Category *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setRfqForm({...rfqForm, category: cat.label})}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          rfqForm.category === cat.label
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{cat.icon}</div>
                        <div className="font-medium text-gray-900 text-sm">{cat.label}</div>
                        <div className="text-xs text-gray-500">{cat.count} suppliers</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Detailed Description *
                  </label>
                  <textarea
                    value={rfqForm.description}
                    onChange={(e) => setRfqForm({...rfqForm, description: e.target.value})}
                    placeholder="Describe your product requirements in detail..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Budget Range
                    </label>
                    <input
                      type="text"
                      value={rfqForm.budget}
                      onChange={(e) => setRfqForm({...rfqForm, budget: e.target.value})}
                      placeholder="e.g., $10,000 - $15,000"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Delivery Timeline
                    </label>
                    <input
                      type="text"
                      value={rfqForm.timeline}
                      onChange={(e) => setRfqForm({...rfqForm, timeline: e.target.value})}
                      placeholder="e.g., 30 days, ASAP"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Specifications
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">
                        Drop files here or click to upload
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        PDF, DOC, JPG up to 10MB
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Technical Specifications
                  </label>
                  <textarea
                    value={rfqForm.specifications}
                    onChange={(e) => setRfqForm({...rfqForm, specifications: e.target.value})}
                    placeholder="Add any technical specifications, certifications, or quality requirements..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all min-h-[100px]"
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-500" />
                    Your RFQ will be shared with verified suppliers only
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Post RFQ Now
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Sample Offers */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sample Offers</h3>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Recent Offers for "Wireless Earbuds"</span>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View All Offers →
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {sampleOffers.map((offer) => (
                    <div key={offer.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{offer.supplier}</div>
                              <div className="text-sm text-gray-600">{offer.product}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {offer.price}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              MOQ: {offer.moq}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {offer.delivery}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{offer.rating}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            offer.status === 'best-match' ? 'bg-green-100 text-green-800' :
                            offer.status === 'lowest-price' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {offer.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Active RFQs & Categories */}
          <div className="space-y-6">
            {/* Active RFQs */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Active RFQs
              </h3>
              <div className="space-y-4">
                {activeRFQs.map((rfq) => (
                  <div key={rfq.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900">{rfq.product}</div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rfq.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {rfq.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>{rfq.responses} responses</span>
                      </div>
                      <span>{rfq.posted}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All RFQs →
              </button>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Tips for Better RFQs
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Be specific about quantities and quality requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Include clear technical specifications and certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Set realistic timelines to get competitive offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use the budget range to filter serious suppliers</span>
                </li>
              </ul>
            </div>

            {/* Success Rate Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Success Rate
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-100">RFQs Posted:</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-100">Orders Placed:</span>
                  <span className="font-bold">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-100">Success Rate:</span>
                  <span className="font-bold">92%</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-green-400/30">
                <div className="flex items-center justify-between">
                  <span className="text-green-100 text-sm">Avg. Savings:</span>
                  <span className="font-bold">15-20%</span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
              <h4 className="font-bold text-white text-lg mb-3">Need Urgent Quotation?</h4>
              <p className="text-orange-100 mb-4 text-sm">
                Get priority responses from top suppliers within 2 hours.
              </p>
              <button className="w-full py-3 bg-white text-orange-600 font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                <Zap className="h-5 w-5" />
                Express RFQ Service
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Start Sourcing Smarter Today
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Post your first sourcing request and see how fast Nyle connects you with 
            verified suppliers. With our platform, you're never sourcing alone.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:shadow-lg transition-shadow">
              <ShoppingBag className="h-5 w-5 inline mr-2" />
              Browse Suppliers
            </button>
            <button className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl backdrop-blur-sm transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </BuyerInfoLayout>
  );
}