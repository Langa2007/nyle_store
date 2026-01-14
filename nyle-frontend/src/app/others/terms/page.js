"use client";

import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, BookOpen, Shield, Users, ShoppingBag, CreditCard, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const terms = [
    {
      icon: <Users />,
      title: "Account Terms",
      color: "from-blue-500 to-cyan-500",
      description: "Rules for creating and maintaining your Nyle Store account",
      points: [
        "You must be 18 years or older to create an account",
        "Provide accurate and complete information",
        "Maintain account security and confidentiality",
        "One account per individual or business"
      ]
    },
    {
      icon: <ShoppingBag />,
      title: "Buying & Selling",
      color: "from-blue-600 to-indigo-600",
      description: "Rules for transactions on our platform",
      points: [
        "All products must be accurately described",
        "Sellers must fulfill orders promptly",
        "Buyers must pay for purchased items",
        "Returns must follow our refund policy"
      ]
    },
    {
      icon: <CreditCard />,
      title: "Payments & Fees",
      color: "from-indigo-600 to-purple-600",
      description: "Financial terms and conditions",
      points: [
        "All prices are in Kenyan Shillings (KES)",
        "Transaction fees are non-refundable",
        "Payment processing is secure",
        "Taxes are the responsibility of sellers"
      ]
    },
    {
      icon: <Shield />,
      title: "User Conduct",
      color: "from-cyan-500 to-blue-500",
      description: "Expected behavior on our platform",
      points: [
        "No fraudulent activities",
        "Respect intellectual property rights",
        "No harassment or abuse",
        "Comply with all applicable laws"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzYgMThjLTIuMjA5IDAtNC4yODkuNjMtNiA3LjE3MVYyNGgtMnYzLjM0M0MyMy42NjYgMzAuMDIxIDIwLjM3NSAzMiAxNiAzMiA5LjM3MyAzMiA0IDI2LjYyNyA0IDIwczUuMzczLTEyIDEyLTEyYzQuMzc1IDAgNy42NjYgMS45NzkgMTAgNC42NTdWMjBoMnYtMS4xNzFDMy43MTEgMTguNjMgMzEuNzkxIDE4IDMwIDE4Yy0yLjIwOSAwLTQuMjg5LjYzLTYgMS43MTd2LTQuMzQzYzAtLjU1Mi40NDgtMSAxLTFoNHYtMmgtNGMtMS42NTQgMC0zIDEuMzQ2LTMgM3Y2LjM0M0MyMy42NjYgMjAuMDIxIDIwLjM3NSAyMiAxNiAyMiA5LjM3MyAyMiA0IDE2LjYyNyA0IDEwczUuMzczLTEyIDEyLTEyYzQuMzc1IDAgNy42NjYgMS45NzkgMTAgNC42NTd2LTEuMzQzYzAtMS42NTQgMS4zNDYtMyAzLTNoNHYyaC00Yy0uNTUyIDAtMSAuNDQ4LTEgMXY2LjM0M2MyLjcxMS0xLjA4NyA0Ljc5MS0xLjcxNyA3LTEuNzE3IDIuMjA5IDAgNC4yODkuNjMgNiAxLjcxN3Y0LjM0M2MwIC41NTItLjQ0OCAxLTEgMWgtNHYyaDRjMS42NTQgMCAzLTEuMzQ2IDMtM3YtNi4zNDNDNDguMzM0IDE5Ljk3OSA0NS4wNDMgMTggNDAuNjY3IDE4eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]"></div>
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
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Terms of Service
              </h1>
            </div>
            
            <p className="text-xl text-blue-100/90 max-w-3xl mx-auto mb-8">
              By using Nyle Store, you agree to these terms. Please read them carefully.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all">
                <BookOpen className="inline mr-2 h-5 w-5" />
                Read Important Updates
              </button>
              <Link href="/" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all">
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
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="h-8 w-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Important Legal Notice</h3>
              <p className="text-yellow-100">
                These terms constitute a legally binding agreement between you and Nyle Store. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quick Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Quick Summary
                </h3>
                
                <div className="space-y-4">
                  {[
                    "Agreement to terms by using platform",
                    "18+ years to create account",
                    "Accurate product listings required",
                    "Secure payment processing",
                    "Respect intellectual property"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Effective Date */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Effective Date</h4>
                    <p className="text-sm text-gray-600">January 1, 2024</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  These terms are effective for all users from January 1, 2024. Previous versions are archived and available upon request.
                </p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Nyle Store</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Nyle Store is Kenya's premier marketplace connecting buyers and sellers. These Terms of Service govern your access to and use of our website, services, and applications. By using Nyle Store, you agree to these terms and our policies.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-2">For Buyers</h4>
                  <p className="text-gray-600 text-sm">
                    Purchase goods from verified sellers with confidence. Your payments are protected.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-bold text-gray-900 mb-2">For Sellers</h4>
                  <p className="text-gray-600 text-sm">
                    Reach thousands of customers. We provide tools to manage your store effectively.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Terms Sections */}
            {terms.map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${term.color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      {term.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{term.title}</h3>
                      <p className="text-blue-100 mt-1">{term.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <ul className="space-y-4">
                    {term.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-1.5 bg-blue-100 rounded-lg mt-1">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* Dispute Resolution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Scale className="h-8 w-8" />
                Dispute Resolution
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3">Customer Support</h4>
                  <p className="text-blue-100 mb-4">
                    First, contact our support team. Most issues are resolved within 24 hours.
                  </p>
                  <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:shadow transition">
                    Contact Support
                  </button>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3">Legal Process</h4>
                  <p className="text-blue-100">
                    Unresolved disputes will be settled through arbitration in Nairobi, Kenya, in accordance with Kenyan law.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}