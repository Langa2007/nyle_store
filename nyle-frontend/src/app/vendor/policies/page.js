"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Scale, 
  Users, 
  Clock, 
  DollarSign,
  TrendingUp,
  Zap,
  BookOpen,
  MessageSquare,
  Download,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Star,
  Award,
  Eye
} from "lucide-react";

export default function SellerPoliciesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [complianceScore, setComplianceScore] = useState(92);
  const [lastUpdated, setLastUpdated] = useState("2024-03-15");

  const policyStats = [
    { label: "Policy Compliance", value: `${complianceScore}%`, icon: Shield, color: "text-green-600", change: "+3%" },
    { label: "Last Updated", value: "Mar 15, 2024", icon: Clock, color: "text-blue-600", change: "Recent" },
    { label: "Total Policies", value: "24", icon: FileText, color: "text-purple-600", change: "+2" },
    { label: "Violation Rate", value: "0.8%", icon: AlertCircle, color: "text-orange-600", change: "-0.2%" },
  ];

  const policyCategories = [
    { id: "all", label: "All Policies", icon: BookOpen, count: 24 },
    { id: "product", label: "Product Policies", icon: CheckCircle, count: 8 },
    { id: "pricing", label: "Pricing Policies", icon: DollarSign, count: 5 },
    { id: "shipping", label: "Shipping Policies", icon: TrendingUp, count: 6 },
    { id: "communication", label: "Communication", icon: MessageSquare, count: 3 },
    { id: "legal", label: "Legal & Compliance", icon: Scale, count: 2 },
  ];

  const policies = [
    {
      id: 1,
      title: "Product Authenticity & Descriptions",
      category: "product",
      severity: "high",
      description: "All products must be authentic and accurately described",
      fullText: "Sellers must ensure that all products listed are authentic and not counterfeit. Product descriptions must accurately represent the item's condition, features, and specifications. Any defects or variations must be clearly disclosed. False advertising is strictly prohibited.",
      lastUpdated: "2024-03-10",
      compliance: "Required",
      penalty: "Account suspension"
    },
    {
      id: 2,
      title: "Timely Order Fulfillment",
      category: "shipping",
      severity: "medium",
      description: "Orders must be processed and shipped within specified timeframes",
      fullText: "Sellers must process and ship orders within the promised timeframe. Same-day dispatch is required for orders placed before 2 PM. Shipping delays must be communicated promptly to buyers. Failure to fulfill orders may result in penalties.",
      lastUpdated: "2024-02-28",
      compliance: "Required",
      penalty: "Fee penalties"
    },
    {
      id: 3,
      title: "Transparent Commission Structure",
      category: "pricing",
      severity: "low",
      description: "Clear disclosure of all fees and commissions",
      fullText: "Nyle's commission structure is transparent with no hidden fees. Sellers pay 5% commission on each successful sale. Payment processing fees are additional but clearly displayed. All fees are deducted before settlement.",
      lastUpdated: "2024-03-01",
      compliance: "Required",
      penalty: "Warning"
    },
    {
      id: 4,
      title: "Customer Privacy Protection",
      category: "legal",
      severity: "high",
      description: "Strict adherence to data protection regulations",
      fullText: "Sellers must protect customer data and comply with all applicable privacy laws. Customer information can only be used for order fulfillment. Sharing customer data with third parties is strictly prohibited.",
      lastUpdated: "2024-01-15",
      compliance: "Required",
      penalty: "Legal action"
    },
    {
      id: 5,
      title: "Ethical Marketing Practices",
      category: "communication",
      severity: "medium",
      description: "Fair competition and truthful advertising",
      fullText: "All marketing must be truthful and not misleading. Sellers cannot engage in deceptive practices or false comparisons. Competitive pricing is encouraged but price fixing is prohibited.",
      lastUpdated: "2024-02-20",
      compliance: "Required",
      penalty: "Listing removal"
    },
    {
      id: 6,
      title: "Quality Standards & Returns",
      category: "product",
      severity: "high",
      description: "Maintain product quality and handle returns professionally",
      fullText: "Products must meet quality standards. Defective items must be replaced or refunded. Return requests must be processed within 7 business days. Return shipping costs are seller's responsibility for defective items.",
      lastUpdated: "2024-03-05",
      compliance: "Required",
      penalty: "Account review"
    },
  ];

  const filteredPolicies = policies.filter(policy => {
    if (activeCategory !== "all" && policy.category !== activeCategory) return false;
    if (searchQuery && !policy.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !policy.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <VendorInfoLayout
      title="Seller Policies"
      subtitle="We keep our marketplace fair, transparent, and empowering for every vendor."
      stats={policyStats}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium mb-4">
            <Scale className="h-4 w-4" />
            Last Updated: {lastUpdated}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fairness. Transparency. Trust.
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            At Nyle, we believe in creating a safe and fair trading environment. 
            Our policies are designed to protect sellers' rights while ensuring 
            buyers enjoy consistent, quality experiences.
          </p>

          {/* Compliance Score */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Your Compliance Score</div>
                    <div className={`text-3xl font-bold ${getComplianceColor(complianceScore)}`}>
                      {complianceScore}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600 font-medium">Excellent</div>
                  <div className="text-xs text-gray-500">Top 15% of sellers</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${complianceScore}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search policies by keyword..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {policyCategories.slice(1).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label} ({cat.count})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">Browse by Category</div>
            <div className="flex flex-wrap gap-2">
              {policyCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      activeCategory === category.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                    <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Policies List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Policies & Guidelines
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredPolicies.length} of {policies.length} policies
            </div>
          </div>

          <div className="space-y-4">
            {filteredPolicies.map((policy) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
              >
                <button
                  onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                  className="w-full p-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`p-2 rounded-lg ${getSeverityColor(policy.severity)}`}>
                          {policy.severity === 'high' ? <AlertCircle className="h-5 w-5" /> :
                           policy.severity === 'medium' ? <Clock className="h-5 w-5" /> :
                           <CheckCircle className="h-5 w-5" />}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{policy.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(policy.severity)}`}>
                            {policy.severity.charAt(0).toUpperCase() + policy.severity.slice(1)} Priority
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{policy.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {policyCategories.find(c => c.id === policy.category)?.label}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Updated: {policy.lastUpdated}
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Compliance: {policy.compliance}
                          </span>
                          <span className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Penalty: {policy.penalty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0">
                    {expandedPolicy === policy.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedPolicy === policy.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="pl-14">
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Policy Details</h4>
                        <p className="text-gray-700 leading-relaxed mb-4">{policy.fullText}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="font-medium text-blue-900 mb-2">Your Responsibilities</div>
                            <ul className="space-y-1 text-sm text-blue-700">
                              <li className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                Ensure accurate product descriptions
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                Maintain timely order fulfillment
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                Provide excellent customer service
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-red-50 p-4 rounded-lg">
                            <div className="font-medium text-red-900 mb-2">What to Avoid</div>
                            <ul className="space-y-1 text-sm text-red-700">
                              <li className="flex items-start gap-2">
                                <AlertCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                False advertising or misrepresentation
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                Delayed order processing
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                Poor customer communication
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            View Related Documents
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download Policy PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No policies found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
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
        </div>

        {/* Key Principles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: CheckCircle,
              title: "Product Authenticity",
              description: "Accurate descriptions and genuine products",
              color: "bg-green-100 text-green-600"
            },
            {
              icon: Clock,
              title: "Timely Fulfillment",
              description: "On-time order processing and shipping",
              color: "bg-blue-100 text-blue-600"
            },
            {
              icon: DollarSign,
              title: "Transparent Pricing",
              description: "No hidden costs, fair commissions",
              color: "bg-purple-100 text-purple-600"
            },
            {
              icon: Shield,
              title: "Privacy Protection",
              description: "Customer data security and compliance",
              color: "bg-orange-100 text-orange-600"
            },
          ].map((principle, index) => (
            <div key={index} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className={`inline-flex p-3 rounded-lg ${principle.color} mb-3`}>
                <principle.icon className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{principle.title}</h4>
              <p className="text-sm text-gray-600">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Support & Resources */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-bold text-white">Need Help Understanding Policies?</h3>
                <p className="text-blue-100">Our seller success team is here for you</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-blue-100">
                Our dedicated seller success team is available 24/7 to guide you through our 
                policies and ensure your experience remains smooth and rewarding.
              </p>
              
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-white" />
                  <span className="font-semibold">Quick Assistance</span>
                </div>
                <p className="text-sm text-blue-100">
                  Average response time: 15 minutes
                </p>
              </div>
              
              <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
                Contact Support Team
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Policy Resources
            </h3>
            
            <div className="space-y-4">
              {[
                { title: "Complete Policy Handbook", action: "Download PDF", icon: Download },
                { title: "Compliance Checklist", action: "View Checklist", icon: CheckCircle },
                { title: "Policy Updates Newsletter", action: "Subscribe", icon: Bell },
                { title: "Training Webinars", action: "Register", icon: Video },
              ].map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="font-medium text-gray-900">{resource.title}</div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <resource.icon className="h-4 w-4" />
                    {resource.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Compliant, Stay Successful
            </h3>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Understanding and following our policies ensures a smooth selling experience 
              and builds trust with your customers. Review our complete policy handbook 
              for detailed guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105">
                <Download className="h-5 w-5" />
                Download Policy Handbook
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold backdrop-blur-sm transition-all">
                <Eye className="h-5 w-5" />
                View Compliance Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorInfoLayout>
  );
}

// Missing icons
const Bell = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const Video = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);