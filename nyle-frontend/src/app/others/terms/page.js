"use client";

import { Scale, AlertCircle, BookOpen, Shield, Users, ShoppingBag, CreditCard, CheckCircle } from "lucide-react";
import FooterInfoLayout from "@/components/footer/FooterInfoLayout";

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
    <FooterInfoLayout
      title="Terms of Service"
      subtitle="By using Nyle Store, you agree to these terms. Please read them carefully."
      icon={<Scale className="h-8 w-8" />}
      lastUpdated="January 1, 2026"
      category="Legal"
    >
      <div className="space-y-12">
        {/* Important Notice */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-8 w-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Important Legal Notice</h3>
              <p className="text-yellow-100">
                These terms constitute a legally binding agreement between you and Nyle Store. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Nyle Store</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Nyle Store is Kenya's premier marketplace connecting buyers and sellers. These Terms of Service govern your access to and use of our website, services, and applications. By using Nyle Store, you agree to these terms and our policies.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-3">For Buyers</h4>
              <p className="text-gray-600">
                Purchase goods from verified sellers with confidence. Your payments are protected by our secure transaction system.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <h4 className="font-bold text-gray-900 mb-3">For Sellers</h4>
              <p className="text-gray-600">
                Reach thousands of customers. We provide tools to manage your store effectively and grow your business.
              </p>
            </div>
          </div>

          {/* Read Updates Button */}
          <div className="mt-6 text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              <BookOpen className="h-5 w-5" />
              Read Important Updates
            </button>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {terms.map((term, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>

        {/* Quick Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            Quick Summary
          </h3>
          
          <div className="space-y-4">
            {[
              "Agreement to terms by using platform",
              "18+ years to create account",
              "Accurate product listings required",
              "Secure payment processing",
              "Respect intellectual property rights",
              "Compliance with all applicable laws"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Scale className="h-8 w-8" />
            Dispute Resolution
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">Customer Support</h4>
              <p className="text-blue-100 mb-4">
                First, contact our support team. Most issues are resolved within 24 hours through our dedicated support channels.
              </p>
              <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:shadow transition">
                Contact Support
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">Legal Process</h4>
              <p className="text-blue-100">
                Unresolved disputes will be settled through arbitration in Nairobi, Kenya, in accordance with Kenyan law. We aim for fair and efficient resolution processes.
              </p>
            </div>
          </div>
        </div>

        {/* Effective Date */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Scale className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Effective Date & Updates</h4>
              <p className="text-sm text-gray-600">Effective: January 1, 2024 | Last Updated: January 15, 2024</p>
            </div>
          </div>
          <p className="text-gray-600">
            These terms are effective for all users from January 1, 2024. Previous versions are archived and available upon request. We regularly update our terms to reflect changes in our services and legal requirements.
          </p>
        </div>
      </div>
    </FooterInfoLayout>
  );
}