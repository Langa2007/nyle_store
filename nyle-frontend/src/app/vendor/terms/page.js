"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Scale, 
  Shield, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Building, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  BadgeCheck,
  Lock,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function VendorTermsPage() {
  const termsSections = [
    {
      icon: <Building />,
      title: "Seller Account Requirements",
      color: "from-blue-500 to-cyan-500",
      points: [
        "Must be 18+ years old or a registered business",
        "Valid business registration documents required",
        "Valid Kenyan phone number and email",
        "Tax PIN certificate (for VAT registered sellers)"
      ],
      important: true
    },
    {
      icon: <ShoppingBag />,
      title: "Product Listing Rules",
      color: "from-blue-600 to-indigo-600",
      points: [
        "Accurate product descriptions and images",
        "Clear pricing including all taxes",
        "Honest inventory quantities",
        "Compliance with Kenyan product safety standards"
      ],
      important: true
    },
    {
      icon: <DollarSign />,
      title: "Pricing & Commission",
      color: "from-indigo-600 to-purple-600",
      points: [
        "8% commission on successful sales",
        "Payouts processed every 14 days",
        "Refunds deducted from future payouts",
        "No hidden fees - transparent pricing"
      ],
      important: true
    },
    {
      icon: <Shield />,
      title: "Seller Responsibilities",
      color: "from-cyan-500 to-blue-500",
      points: [
        "Timely order processing (within 24 hours)",
        "Accurate shipping information",
        "Quality customer service",
        "Compliance with consumer protection laws"
      ],
      important: false
    }
  ];

  const vendorBenefits = [
    { icon: "", title: "Quick Approval", desc: "Get verified within 24-48 hours" },
    { icon: "", title: "Sales Dashboard", desc: "Real-time analytics and insights" },
    { icon: "", title: "Competitive Fees", desc: "Lowest commissions in Kenya" },
    { icon: "", title: "Seller Protection", desc: "Secure payment processing" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Scale className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Seller Terms & Conditions
                </h1>
                <p className="text-lg text-emerald-100 mt-2">For Nyle Store Vendors</p>
              </div>
            </div>
            
            <p className="text-xl text-emerald-100/90 max-w-3xl mx-auto mb-8">
              Guidelines and agreements for sellers operating on Nyle Store. These terms ensure a fair and successful marketplace for all.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/vendor/signup" 
                className="px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                <TrendingUp className="inline mr-2 h-5 w-5" />
                Start Selling
              </Link>
              <Link 
                href="/" 
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                <ArrowLeft className="inline mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="container mx-auto px-6 -mt-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Important Legal Agreement</h3>
              <p className="text-amber-100">
                By creating a seller account on Nyle Store, you enter into a legally binding agreement. 
                These terms govern your rights and responsibilities as a seller on our platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Vendor Benefits */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-emerald-600" />
                  Seller Benefits
                </h3>
                
                <div className="space-y-4">
                  {vendorBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                      <span className="text-2xl">{benefit.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-4">Seller Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Average Monthly Sales</span>
                    <span className="font-bold">Ksh 250K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seller Growth</span>
                    <span className="font-bold">+45% YoY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Reach</span>
                    <span className="font-bold">50K+ Buyers</span>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Seller Support</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Our dedicated seller support team is here to help you succeed.
                </p>
                <Link 
                  href="/vendor/support"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Contact Seller Support →
                </Link>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
                  <FileText className="text-white h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome to Nyle Seller Network</h2>
                  <p className="text-gray-600">Building Kenya's most trusted marketplace together</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                These Terms & Conditions outline the rules and guidelines for sellers operating on the Nyle Store platform. 
                By registering as a seller, you agree to comply with these terms, which are designed to ensure a fair, 
                secure, and successful marketplace for all participants.
              </p>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-gray-900">
                    <strong>Effective Date:</strong> January 1, 2024 | <strong>Last Updated:</strong> January 15, 2024
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Terms Sections */}
            {termsSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{section.title}</h3>
                        {section.important && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/30 backdrop-blur-sm text-white text-xs font-medium rounded-full mt-2">
                            <AlertTriangle className="h-3 w-3" />
                            Important Section
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <ul className="space-y-4">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <div className="p-1.5 bg-emerald-100 rounded-lg mt-1">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* Commission & Fees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <DollarSign className="h-8 w-8" />
                Commission Structure
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">8%</div>
                  <div className="text-emerald-100">Standard Commission</div>
                  <div className="text-sm text-emerald-200 mt-2">On all successful sales</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">14 Days</div>
                  <div className="text-emerald-100">Payout Cycle</div>
                  <div className="text-sm text-emerald-200 mt-2">Bi-weekly payments</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">0 KES</div>
                  <div className="text-emerald-100">Setup Fee</div>
                  <div className="text-sm text-emerald-200 mt-2">Free to join</div>
                </div>
              </div>
            </motion.div>

            {/* Agreement Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lock className="h-8 w-8 text-blue-600" />
                Agreement & Acceptance
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-gray-700">
                    By clicking "Agree & Continue" during seller registration, you acknowledge that you have read, 
                    understood, and agree to be bound by these Terms & Conditions.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/vendor/signup"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-center"
                  >
                    I Agree & Continue Registration
                  </Link>
                  <Link
                    href="/vendor/support"
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-center"
                  >
                    Need Clarification?
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-gray-900 to-emerald-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-emerald-300 mb-4">
               {new Date().getFullYear()} Nyle Store Seller Network. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-400">
              <Link href="/vendor/privacy" className="hover:text-white transition">Seller Privacy Policy</Link>
              <Link href="/vendor/support" className="hover:text-white transition">Seller Support</Link>
              <Link href="/vendor/faq" className="hover:text-white transition">Seller FAQs</Link>
              <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}