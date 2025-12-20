// app/payments/protection/page.js
import PaymentLayout from "@/components/payments/PaymentLayout";
import { 
  Shield, Lock, CheckCircle, AlertTriangle, Clock, 
  Package, Truck, Users, Award, Zap, FileText, 
  MessageSquare, DollarSign, Headphones, Globe, 
  TrendingUp, Heart, Star, Flag 
} from "lucide-react";

export default function CustomerProtection() {
  const protectionFeatures = [
    {
      title: "Escrow Payment System",
      icon: <Lock />,
      color: "from-blue-500 to-cyan-500",
      description: "Funds are held securely until delivery confirmation",
      details: [
        "Payment released only after you confirm receipt",
        "14-day automatic hold period for dispute filing",
        "Real-time payment status tracking"
      ],
      coverage: "100% of transaction value"
    },
    {
      title: "Money-Back Guarantee",
      icon: <DollarSign />,
      color: "from-green-500 to-emerald-500",
      description: "Full refunds for undelivered or misrepresented goods",
      details: [
        "30-day return window for eligible items",
        "No-questions-asked refunds for fraud",
        "Counterfeit goods receive 200% compensation"
      ],
      coverage: "Up to Ksh 500,000 per transaction"
    },
    {
      title: "24/7 Dispute Resolution",
      icon: <MessageSquare />,
      color: "from-purple-500 to-pink-500",
      description: "Round-the-clock support for payment issues",
      details: [
        "Average 4-hour response time for disputes",
        "Mediation by trained Nyle protection officers",
        "Escalation to legal team for complex cases"
      ],
      coverage: "All transactions regardless of amount"
    },
    {
      title: "Verified Seller Program",
      icon: <Award />,
      color: "from-orange-500 to-amber-500",
      description: "Extra protection when buying from verified partners",
      details: [
        "Identity-verified sellers with track records",
        "Higher transaction limits for trusted sellers",
        "Priority support for verified seller disputes"
      ],
      coverage: "Enhanced protection tier available"
    }
  ];

  const protectionStats = [
    { value: "99.7%", label: "Dispute Resolution Rate", description: "Cases resolved favorably" },
    { value: "< 24 Hrs", label: "Average Resolution Time", description: "For standard disputes" },
    { value: "Ksh 250M+", label: "Protected Annually", description: "Total transaction value" },
    { value: "50K+", label: "Protected Buyers", description: "Served this year" },
  ];

  const disputeProcess = [
    {
      step: "1",
      title: "File a Dispute",
      description: "Report issues within 14 days of delivery",
      icon: <Flag />,
      timeline: "Within 14 days",
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "2",
      title: "Case Review",
      description: "Our team investigates with both parties",
      icon: <FileText />,
      timeline: "24-48 hours",
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "3",
      title: "Evidence Collection",
      description: "Gather photos, messages, and documentation",
      icon: <Package />,
      timeline: "2-3 days",
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "4",
      title: "Resolution & Action",
      description: "Refund, replacement, or mediation outcome",
      icon: <CheckCircle />,
      timeline: "Immediate after decision",
      color: "from-orange-500 to-amber-500"
    }
  ];

  const coverageScenarios = [
    {
      scenario: "Item Not Received",
      protection: "Full refund + shipping costs",
      timeframe: "30 days from expected delivery",
      icon: <Package className="text-red-500" />
    },
    {
      scenario: "Wrong Item Received",
      protection: "Free return + correct item or refund",
      timeframe: "14 days from delivery",
      icon: <AlertTriangle className="text-yellow-500" />
    },
    {
      scenario: "Damaged Goods",
      protection: "Replacement or full refund",
      timeframe: "7 days from delivery",
      icon: <Package className="text-orange-500" />
    },
    {
      scenario: "Counterfeit Products",
      protection: "200% compensation + seller penalty",
      timeframe: "90 days from purchase",
      icon: <Shield className="text-green-500" />
    },
    {
      scenario: "Quality Issues",
      protection: "Partial refund based on assessment",
      timeframe: "30 days from delivery",
      icon: <Star className="text-blue-500" />
    },
    {
      scenario: "Seller Non-Communication",
      protection: "Full refund + account review",
      timeframe: "72 hours of no response",
      icon: <MessageSquare className="text-purple-500" />
    }
  ];

  const successStories = [
    {
      user: "Sarah K., Nairobi",
      issue: "Received counterfeit headphones",
      resolution: "Received 200% refund within 3 days",
      quote: "Nyle's protection made me feel safe shopping online again."
    },
    {
      user: "James M., Mombasa",
      issue: "Package never arrived",
      resolution: "Full refund + Ksh 2,000 compensation",
      quote: "The dispute process was straightforward and fair."
    },
    {
      user: "Amina W., Kisumu",
      issue: "Wrong size clothing delivered",
      resolution: "Free exchange + Ksh 500 shopping credit",
      quote: "Customer protection actually works here!"
    }
  ];

  const tipsForBuyers = [
    {
      title: "Document Everything",
      tips: [
        "Take unboxing videos for high-value items",
        "Save all communication with sellers",
        "Keep original packaging for 14 days"
      ]
    },
    {
      title: "Know Your Rights",
      tips: [
        "You have 14 days to file a dispute",
        "Sellers must respond within 72 hours",
        "Free returns for misrepresented items"
      ]
    },
    {
      title: "Shop Smart",
      tips: [
        "Check seller ratings and reviews",
        "Use Nyle Wallet for faster refunds",
        "Verify product details before purchase"
      ]
    }
  ];

  return (
    <PaymentLayout 
      title="Customer Protection"
      subtitle="Comprehensive safeguards ensuring your shopping safety and peace of mind"
    >
      {/* Hero Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop with Confidence</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Your security is our top priority. Nyle ensures every buyer is protected
                from fraud, poor service, or delivery issues through multiple layers of 
                advanced safety measures and comprehensive guarantees.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {protectionStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-blue-100 text-center">
                    <div className="text-2xl font-bold text-blue-700 mb-1">{stat.value}</div>
                    <div className="font-medium text-gray-900">{stat.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protection Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Protection Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {protectionFeatures.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl border border-blue-100 overflow-hidden hover:shadow-xl transition-all">
              <div className={`p-6 bg-gradient-to-r ${feature.color}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-blue-100">{feature.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900">Coverage Details</h4>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {feature.coverage}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-blue-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="text-blue-600" size={16} />
                    <span className="font-medium">Activation:</span> Automatic on all eligible purchases
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispute Resolution Process */}
      <div className="mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-8">Dispute Resolution Process</h3>
        <div className="relative">
          {/* Process Line */}
          <div className="hidden lg:block absolute left-0 right-0 top-12 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {disputeProcess.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute lg:relative top-0 left-1/2 lg:left-auto transform lg:transform-none -translate-x-1/2 lg:translate-x-0 z-10">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <div className="text-white">{step.icon}</div>
                  </div>
                </div>
                <div className="mt-24 lg:mt-0 pt-4 lg:pt-24 text-center">
                  <div className="text-2xl font-bold text-blue-700 mb-2">Step {step.step}</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    {step.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-white/50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-3">
            <Headphones className="text-blue-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Need Help?</span> Our protection team is available 24/7 to guide you 
                through any dispute. Average response time is under 30 minutes during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Scenarios */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">What's Covered & Timeframes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverageScenarios.map((scenario, index) => (
            <div key={index} className="group bg-white rounded-xl border border-blue-100 p-6 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {scenario.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{scenario.scenario}</h4>
                  <div className="mt-2">
                    <div className="text-sm font-medium text-green-600">{scenario.protection}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <Clock className="inline mr-1" size={12} />
                      {scenario.timeframe}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-blue-100">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1">
                  Learn more about this coverage
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Heart className="text-red-500" />
          Success Stories from Protected Buyers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  {story.user.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{story.user}</div>
                  <div className="text-xs text-gray-500">{story.issue}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  {story.resolution}
                </div>
              </div>
              <blockquote className="text-gray-700 italic border-l-4 border-blue-400 pl-4 py-2">
                "{story.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      {/* Buyer Tips */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Tips for Maximum Protection</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tipsForBuyers.map((tipSection, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="text-blue-600" />
                {tipSection.title}
              </h4>
              <ul className="space-y-3">
                {tipSection.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations & Exclusions */}
      <div className="mb-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <AlertTriangle className="text-yellow-600" />
          Limitations & Exclusions
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">What's Not Covered</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Buyer's remorse (change of mind) without seller approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Damage caused by improper use or installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Items purchased outside the Nyle platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Disputes filed after 14-day window without exceptional circumstances</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Protected Shopping Starts Here</h3>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            With Nyle's comprehensive customer protection, you can shop confidently knowing 
            your purchases are backed by multiple layers of security, guarantees, and 
            dedicated support.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-blue-200">Protection Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-blue-200">Money-Back Guarantee</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">Ksh 500K</div>
              <div className="text-sm text-blue-200">Maximum Coverage</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              <Shield size={20} />
              Shop Protected Now
            </a>
            <a
              href="/support/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              <Headphones size={20} />
              Protection Support
            </a>
          </div>
        </div>
      </div>
    </PaymentLayout>
  );
}