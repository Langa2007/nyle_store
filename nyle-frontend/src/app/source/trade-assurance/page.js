"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";
import { 
  Shield, 
  Lock, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  BarChart,
  Users,
  Award,
  FileText,
  Truck,
  Bell,
  Zap,
  Target,
  Heart,
  Globe,
  MessageSquare,
  Download,
  Eye,
  ChevronRight
} from "lucide-react";

export default function TradeAssurancePage() {
  const [activeTab, setActiveTab] = useState("protection");
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [claimStatus, setClaimStatus] = useState("none");
  const [protectedAmount, setProtectedAmount] = useState(25000);

  const assuranceStats = [
    { label: "Transactions Protected", value: "45K+", icon: Shield, color: "text-blue-600", change: "+2.3K" },
    { label: "Claims Resolved", value: "98.7%", icon: CheckCircle, color: "text-green-600", change: "+1.2%" },
    { label: "Avg Resolution Time", value: "2.1 days", icon: Clock, color: "text-purple-600", change: "-0.5 days" },
    { label: "Total Protected", value: "$24.5M", icon: DollarSign, color: "text-orange-600", change: "+$3.2M" },
  ];

  const protectionPlans = [
    {
      id: "basic",
      name: "Basic Protection",
      description: "Essential coverage for all transactions",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
      coverage: "Up to $10,000",
      fee: "Free",
      features: ["Escrow protection", "Order tracking", "Basic dispute resolution"]
    },
    {
      id: "premium",
      name: "Premium Protection",
      description: "Enhanced coverage for larger orders",
      icon: Lock,
      color: "from-purple-500 to-pink-500",
      coverage: "Up to $50,000",
      fee: "1.5% of order",
      features: ["Priority dispute resolution", "Dedicated support", "Extended coverage"]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom solutions for high-volume trading",
      icon: Award,
      color: "from-orange-500 to-amber-500",
      coverage: "Custom limits",
      fee: "Contact sales",
      features: ["Custom risk assessment", "24/7 support", "Bulk transaction coverage"]
    },
  ];

  const protectionFeatures = [
    {
      icon: Lock,
      title: "Escrow Protection",
      description: "Funds held securely until delivery is confirmed",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Truck,
      title: "Real-time Tracking",
      description: "Milestone notifications and delivery updates",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: BarChart,
      title: "Supplier History",
      description: "Documented performance and reliability scores",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Zap,
      title: "Quick Resolution",
      description: "Fast dispute resolution with guaranteed timelines",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
  ];

  const claimSteps = [
    { step: 1, title: "Report Issue", description: "Submit claim within 30 days", status: "completed" },
    { step: 2, title: "Review & Evidence", description: "Upload supporting documents", status: "completed" },
    { step: 3, title: "Investigation", description: "Our team reviews the case", status: "current" },
    { step: 4, title: "Resolution", description: "Decision within 48 hours", status: "pending" },
    { step: 5, title: "Settlement", description: "Funds released or refunded", status: "pending" },
  ];

  const protectedTransactions = [
    { id: 1, order: "#NYLE-24578", amount: "$2,450", status: "protected", date: "2 days ago" },
    { id: 2, order: "#NYLE-24561", amount: "$5,200", status: "delivered", date: "1 week ago" },
    { id: 3, order: "#NYLE-24542", amount: "$1,250", status: "protected", date: "2 weeks ago" },
    { id: 4, order: "#NYLE-24512", amount: "$3,750", status: "completed", date: "3 weeks ago" },
  ];

  const successStories = [
    {
      title: "Damaged Goods Refund",
      amount: "$1,850",
      resolution: "Full refund within 3 days",
      icon: "✅"
    },
    {
      title: "Late Delivery Compensation",
      amount: "$3,200",
      resolution: "20% compensation for delay",
      icon: "⚡"
    },
    {
      title: "Wrong Item Replacement",
      amount: "$750",
      resolution: "Correct item shipped overnight",
      icon: "🔄"
    },
  ];

  const calculateProtectionFee = () => {
    if (selectedPlan === "basic") return "Free";
    if (selectedPlan === "premium") {
      const fee = protectedAmount * 0.015;
      return `$${fee.toLocaleString()}`;
    }
    return "Custom Quote";
  };

  const getProtectionLimit = () => {
    if (selectedPlan === "basic") return "$10,000";
    if (selectedPlan === "premium") return "$50,000";
    return "Unlimited";
  };

  return (
    <BuyerInfoLayout
      title="Trade Assurance"
      subtitle="Confidence is built into every transaction."
      stats={assuranceStats}
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
                Trade with Complete Confidence
              </h2>
              <p className="text-gray-600">
                Your purchase is backed by our promise of quality and delivery
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              With Nyle's Trade Assurance, every purchase is protected by our 
              comprehensive guarantee. We ensure your goods arrive on time, exactly 
              as described, or you receive your money back. Trade isn't a risk—it's 
              a relationship built on trust.
            </p>
          </div>
        </motion.div>

        {/* Protection Plans */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Choose Your Protection Level</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {protectionPlans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${plan.color} mb-4`}>
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-xl mb-2">{plan.name}</h4>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Coverage:</span>
                    <span className="font-bold text-gray-900">{plan.coverage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Fee:</span>
                    <span className="font-bold text-gray-900">{plan.fee}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Protection Calculator */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Protection Calculator
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Order Value to Protect
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="1000"
                        value={protectedAmount}
                        onChange={(e) => setProtectedAmount(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>$1,000</span>
                        <span>$25,000</span>
                        <span>$50,000</span>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="text-3xl font-bold text-gray-900">
                        ${protectedAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Order Value</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Protection Plan
                    </label>
                    <div className="space-y-3">
                      {protectionPlans.map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            selectedPlan === plan.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{plan.name}</div>
                              <div className="text-sm text-gray-600">{plan.coverage}</div>
                            </div>
                            <div className="font-bold text-gray-900">
                              {plan.id === "basic" ? "Free" : 
                               plan.id === "premium" ? "1.5%" : 
                               "Custom"}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {calculateProtectionFee()}
                    </div>
                    <p className="text-gray-600">Protection Fee</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Order Value:</span>
                      <span className="font-medium">${protectedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Protection Plan:</span>
                      <span className="font-medium">
                        {protectionPlans.find(p => p.id === selectedPlan)?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Coverage Limit:</span>
                      <span className="font-medium">{getProtectionLimit()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Protected Amount:</span>
                      <span className="font-medium text-green-600">
                        ${Math.min(protectedAmount, selectedPlan === "basic" ? 10000 : 50000).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">What's Covered</span>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Non-delivery of goods</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Significant quality issues</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Major shipment delays</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                    Apply Protection Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Protected Transactions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Protected Transactions
              </h4>
              <div className="space-y-4">
                {protectedTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900">{transaction.order}</div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'protected' ? 'bg-blue-100 text-blue-800' :
                        transaction.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{transaction.amount}</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Transactions →
              </button>
            </div>

            {/* Success Stories */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Recent Success Stories
              </h4>
              <div className="space-y-4">
                {successStories.map((story, i) => (
                  <div key={i} className="p-4 bg-white/50 rounded-xl border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{story.icon}</div>
                      <div>
                        <div className="font-medium text-gray-900">{story.title}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {story.amount} • {story.resolution}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Protection Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {protectionFeatures.map((feature, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-3`}>
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Claim Process */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            How Claims Work
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-4 md:ml-6" />
            
            <div className="space-y-8">
              {claimSteps.map((step) => (
                <div key={step.step} className="relative flex items-start gap-4">
                  <div className={`relative z-10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === 'completed' ? 'bg-green-100 border-2 border-green-500' :
                    step.status === 'current' ? 'bg-blue-100 border-2 border-blue-500' :
                    'bg-gray-100 border-2 border-gray-300'
                  }`}>
                    <div className={`text-sm font-bold ${
                      step.status === 'completed' ? 'text-green-700' :
                      step.status === 'current' ? 'text-blue-700' :
                      'text-gray-500'
                    }`}>
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      {step.status === 'completed' && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Completed
                        </span>
                      )}
                      {step.status === 'current' && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Average claim resolution: 2.1 days</span>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                File a Claim
              </button>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-white" />
              <div>
                <h3 className="text-lg font-bold text-white">Built on Trust</h3>
                <p className="text-blue-100">Trade isn't a risk—it's a relationship</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-blue-100">
                Nyle's Trade Assurance transforms uncertainty into confidence. 
                By protecting both buyers and suppliers, we create an environment 
                where businesses can grow through secure, reliable transactions.
              </p>
              
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                  <span className="font-semibold">Trust Multiplier</span>
                </div>
                <p className="text-sm text-blue-100">
                  Protected transactions see 3x higher repeat business rates
                </p>
              </div>
              
              <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
                Learn About Supplier Protection
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-600" />
              Why Choose Trade Assurance?
            </h3>
            
            <div className="space-y-4">
              {[
                { icon: "🔒", title: "Escrow Protection", desc: "Funds held until delivery confirmation" },
                { icon: "📦", title: "Order Tracking", desc: "Milestone notifications at every step" },
                { icon: "🧾", title: "Performance History", desc: "Documented supplier reliability scores" },
                { icon: "⚖️", title: "Quick Resolution", desc: "Guaranteed timelines for claims and disputes" },
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
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Trading with Confidence Today
            </h3>
            <p className="text-purple-100 mb-6">
              Join thousands of businesses who trade securely with Nyle's Trade Assurance
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:shadow-lg transition-shadow">
                Get Protected Now
              </button>
              <button className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl backdrop-blur-sm transition-colors">
                Download Protection Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </BuyerInfoLayout>
  );
}