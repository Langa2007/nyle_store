"use client";

import { useState } from "react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const [acceptedSections, setAcceptedSections] = useState([]);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const termsSections = [
    {
      id: "agreement",
      icon: "📝",
      title: "Agreement to Terms",
      color: "from-blue-500 to-cyan-500",
      content: [
        "By accessing and using Nyle Store, you accept and agree to be bound by these Terms of Service.",
        "If you disagree with any part of the terms, you may not access our platform.",
        "These terms apply to all visitors, users, and others who access or use Nyle Store."
      ]
    },
    {
      id: "account",
      icon: "👤",
      title: "User Accounts",
      color: "from-purple-500 to-pink-500",
      content: [
        "You must be at least 18 years old to create an account.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate and complete information during registration.",
        "You must notify us immediately of any unauthorized use of your account."
      ]
    },
    {
      id: "purchases",
      icon: "🛒",
      title: "Purchases & Payments",
      color: "from-green-500 to-emerald-500",
      content: [
        "All prices are in Kenyan Shillings (KES) and include VAT where applicable.",
        "Payment must be completed before order processing begins.",
        "We accept various payment methods including M-Pesa, credit/debit cards, and bank transfers.",
        "Refunds are processed according to our Refund Policy."
      ]
    },
    {
      id: "shipping",
      icon: "🚚",
      title: "Shipping & Delivery",
      color: "from-orange-500 to-amber-500",
      content: [
        "Delivery times are estimates and may vary based on location and product availability.",
        "Shipping costs are calculated at checkout based on your location and order size.",
        "Risk of loss and title for items pass to you upon delivery to the carrier.",
        "You are responsible for providing accurate shipping information."
      ]
    },
    {
      id: "returns",
      icon: "↩️",
      title: "Returns & Refunds",
      color: "from-red-500 to-pink-500",
      content: [
        "Returns must be initiated within 7 days of delivery.",
        "Items must be unused, in original packaging, and with all tags attached.",
        "Refunds are processed within 5-10 business days after receiving returned items.",
        "Shipping costs for returns are the responsibility of the buyer unless item is defective."
      ]
    },
    {
      id: "prohibited",
      icon: "🚫",
      title: "Prohibited Uses",
      color: "from-indigo-500 to-purple-500",
      content: [
        "Using the platform for any illegal or unauthorized purpose.",
        "Violating any laws in your jurisdiction (including copyright laws).",
        "Transmitting any worms, viruses, or any code of a destructive nature.",
        "Attempting to gain unauthorized access to our systems or networks."
      ]
    },
    {
      id: "intellectual",
      icon: "💡",
      title: "Intellectual Property",
      color: "from-cyan-500 to-blue-500",
      content: [
        "The Nyle Store logo and all related graphics are trademarks of Nyle Store.",
        "All content on the platform is protected by copyright and other intellectual property laws.",
        "You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the platform.",
        "User-generated content remains your property, but you grant us a license to use it."
      ]
    },
    {
      id: "liability",
      icon: "⚖️",
      title: "Limitation of Liability",
      color: "from-gray-600 to-gray-800",
      content: [
        "Nyle Store shall not be liable for any indirect, incidental, special, consequential or punitive damages.",
        "Our total liability for any claim shall not exceed the amount you paid for the product in question.",
        "We are not responsible for third-party products or services purchased through our platform.",
        "Some jurisdictions do not allow limitations on liability, so these may not apply to you."
      ]
    }
  ];

  const toggleSectionAccept = (sectionId) => {
    setAcceptedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const allAccepted = acceptedSections.length === termsSections.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <span className="text-3xl">⚖️</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Terms of Service
                </h1>
                <p className="text-lg text-orange-100 mt-2">The Rules of Shopping with Confidence</p>
              </div>
            </div>
            
            <p className="text-xl text-orange-100/90 max-w-3xl mx-auto mb-8">
              These terms govern your use of Nyle Store. Please read them carefully before making a purchase.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/" 
                className="px-6 py-3 bg-white text-orange-700 font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                ← Back to Home
              </Link>
              <Link 
                href="/privacy" 
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                View Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Acceptance Banner */}
      <div className="container mx-auto px-6 -mt-8 z-10 relative">
        <div className={`rounded-2xl p-6 shadow-2xl transition-all duration-300 ${allAccepted ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Interactive Terms Review</h2>
                <p className="text-white/90">
                  Mark each section as read to acknowledge understanding
                  {allAccepted && (
                    <span className="ml-2 inline-flex items-center">
                      <span className="mr-1">✅</span>
                      All sections reviewed!
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-white">
                <div className="text-lg font-bold">
                  {acceptedSections.length} / {termsSections.length}
                </div>
                <div className="text-sm text-white/80">Sections Reviewed</div>
              </div>
              {allAccepted && (
                <button
                  onClick={() => setShowAcceptModal(true)}
                  className="px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Accept All Terms
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="space-y-8">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Review Progress</span>
              <span className="font-semibold text-blue-600">
                {Math.round((acceptedSections.length / termsSections.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(acceptedSections.length / termsSections.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Terms Sections */}
          {termsSections.map((section, index) => {
            const isAccepted = acceptedSections.includes(section.id);
            
            return (
              <div
                key={section.id}
                id={section.id}
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  isAccepted 
                    ? 'border-green-200 bg-green-50/30' 
                    : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className={`bg-gradient-to-r ${section.color} p-6 text-white rounded-t-2xl`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm text-2xl">
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{section.title}</h3>
                        <span className="text-white/80 text-sm">Section {index + 1} of {termsSections.length}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleSectionAccept(section.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        isAccepted
                          ? 'bg-white/30 backdrop-blur-sm text-white'
                          : 'bg-white text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      {isAccepted ? '✓ Reviewed' : 'Mark as Read'}
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <ul className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-lg mt-1 ${isAccepted ? 'bg-green-100' : 'bg-blue-100'}`}>
                          <span className={`text-sm ${isAccepted ? 'text-green-600' : 'text-blue-600'}`}>
                            {isAccepted ? '✓' : '•'}
                          </span>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {isAccepted && (
                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✅</span>
                        <span className="font-medium">You've reviewed this section</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Important Notes */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span>⚠️</span>
              Important Legal Notes
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3">Governing Law</h4>
                <p className="text-orange-100">
                  These Terms shall be governed by and construed in accordance with the laws of Kenya, 
                  without regard to its conflict of law provisions.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold text-lg mb-3">Dispute Resolution</h4>
                <p className="text-orange-100">
                  Any disputes arising from these Terms will first attempt to be resolved through 
                  mediation. If unresolved, disputes will be settled in courts of Kenya.
                </p>
              </div>
            </div>
          </div>

          {/* Final Acceptance */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Shop with Confidence?
              </h2>
              
              <p className="text-gray-600 mb-8">
                By accepting these terms, you agree to abide by all rules and regulations 
                governing the use of Nyle Store. Your compliance ensures a safe and enjoyable 
                shopping experience for everyone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowAcceptModal(true)}
                  disabled={!allAccepted}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                    allAccepted
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {allAccepted ? 'Accept All Terms' : 'Review All Sections First'}
                </button>
                
                <Link
                  href="/auth/signup"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                >
                  Start Shopping Now
                </Link>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                Need help understanding these terms?{' '}
                <Link href="/support" className="text-blue-600 hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acceptance Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Terms Accepted!
              </h3>
              <p className="text-gray-600">
                You have successfully reviewed and accepted all Terms of Service.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">What this means:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• You agree to our terms and conditions</li>
                  <li>• You understand your rights and responsibilities</li>
                  <li>• You can now shop with confidence on Nyle Store</li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAcceptModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                >
                  Review Again
                </button>
                <Link
                  href="/"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg text-center"
                  onClick={() => setShowAcceptModal(false)}
                >
                  Continue to Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-orange-900 to-red-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Nyle Store</h4>
              <p className="text-orange-300">
                Where great deals meet fair terms and excellent service.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Legal</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/terms" className="text-orange-300 hover:text-white transition">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-orange-300 hover:text-white transition">
                  Privacy Policy
                </Link>
                <Link href="/refund" className="text-orange-300 hover:text-white transition">
                  Refund Policy
                </Link>
                <Link href="/shipping" className="text-orange-300 hover:text-white transition">
                  Shipping Policy
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Buyer Protection</h4>
              <div className="text-sm text-orange-400">
                <p>✅ Secure Payment Gateway</p>
                <p>✅ Money-Back Guarantee</p>
                <p>✅ 24/7 Customer Support</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-orange-300">
              © {new Date().getFullYear()} Nyle Store. All rights reserved. Version 2.1.3
            </p>
          </div>
        </div>
      </footer>

      {/* Add CSS for animation */}
      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}