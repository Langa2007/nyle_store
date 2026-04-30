"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Building, 
  FileText, 
  Eye, 
  Users, 
  CheckCircle, 
  Database,
  ArrowLeft,
  TrendingUp,
  BarChart,
  Key
} from "lucide-react";
import Link from "next/link";

export default function VendorPrivacyPage() {
  const privacySections = [
    {
      icon: <Database />,
      title: "Information We Collect",
      color: "from-blue-500 to-cyan-500",
      points: [
        "Business registration documents and licenses",
        "Tax PIN and VAT registration certificates",
        "Bank account details for payouts",
        "Business contact information and addresses"
      ],
      purpose: "Verification & Compliance"
    },
    {
      icon: <Eye />,
      title: "How We Use Your Data",
      color: "from-blue-600 to-indigo-600",
      points: [
        "Verify seller identity and business legitimacy",
        "Process payments and commission calculations",
        "Provide sales analytics and insights",
        "Ensure platform security and fraud prevention"
      ],
      purpose: "Platform Operations"
    },
    {
      icon: <Users />,
      title: "Data Sharing",
      color: "from-indigo-600 to-purple-600",
      points: [
        "Payment processors for transaction handling",
        "Shipping partners for order fulfillment",
        "Legal authorities when required by law",
        "With your consent for specific services"
      ],
      purpose: "Limited & Secure Sharing"
    },
    {
      icon: <Shield />,
      title: "Your Data Rights",
      color: "from-cyan-500 to-blue-500",
      points: [
        "Access and download your business data",
        "Request correction of inaccurate information",
        "Withdraw consent for marketing communications",
        "Request data deletion (subject to legal requirements)"
      ],
      purpose: "Seller Control"
    }
  ];

  const securityFeatures = [
    { icon: "", title: "256-bit Encryption", desc: "Bank-level security for all data" },
    { icon: "", title: "GDPR Compliant", desc: "International data protection standards" },
    { icon: "", title: "Access Control", desc: "Role-based data access" },
    { icon: "", title: "Regular Audits", desc: "Security compliance checks" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Seller Privacy Policy
                </h1>
                <p className="text-lg text-blue-100 mt-2">Protecting Your Business Data</p>
              </div>
            </div>
            
            <p className="text-xl text-blue-100/90 max-w-3xl mx-auto mb-8">
              We are committed to protecting your business information with enterprise-grade security 
              and transparent data practices.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/vendor/signup" 
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                <TrendingUp className="inline mr-2 h-5 w-5" />
                Join Securely
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

      {/* Security Badge */}
      <div className="container mx-auto px-6 -mt-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Lock className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Enterprise Security Certified</h2>
                <p className="text-green-100">Your business data is protected with industry-leading security</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="font-bold">ISO 27001</div>
                <div className="text-xs text-green-100">Certified</div>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="font-bold">GDPR</div>
                <div className="text-xs text-green-100">Compliant</div>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="font-bold">256-bit</div>
                <div className="text-xs text-green-100">Encryption</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Security Features */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Key className="h-5 w-5 text-blue-600" />
                  Security Features
                </h3>
                
                <div className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Control */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-4">Your Data Control</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Download your business data anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Control marketing preferences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Request data corrections</span>
                  </div>
                </div>
              </div>

              {/* Analytics Preview */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Data Analytics</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  We use your sales data to provide valuable insights and help grow your business.
                </p>
                <div className="text-xs text-blue-600">
                  All analytics are anonymized and aggregated
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Building className="text-white h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Business Data Protection</h2>
                  <p className="text-gray-600">Enterprise-grade security for your business information</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                This Privacy Policy explains how Nyle Store collects, uses, discloses, and safeguards 
                your business information when you register as a seller on our platform. We treat your 
                business data with the highest level of security and confidentiality.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-2">Scope</h4>
                  <p className="text-sm text-gray-600">
                    Applies to all business information collected from registered sellers on Nyle Store.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-bold text-gray-900 mb-2">Compliance</h4>
                  <p className="text-sm text-gray-600">
                    Adheres to Kenya's Data Protection Act, 2019 and international standards.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Privacy Sections */}
            {privacySections.map((section, index) => (
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
                        <span className="inline-block px-3 py-1 bg-white/30 backdrop-blur-sm text-white text-xs font-medium rounded-full mt-2">
                          {section.purpose}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <ul className="space-y-4">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
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

            {/* Data Retention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FileText className="h-8 w-8" />
                Data Retention Policy
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3">Active Accounts</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Business Documents</span>
                      <span className="font-semibold">7 Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transaction Records</span>
                      <span className="font-semibold">7 Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Communication Logs</span>
                      <span className="font-semibold">3 Years</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3">Inactive Accounts</h4>
                  <p className="text-blue-100 mb-4">
                    Business data is retained for 2 years after account closure, then securely anonymized or deleted.
                  </p>
                  <div className="text-sm text-blue-200">
                    Legal requirements may extend retention periods
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact & Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                Contact & Policy Updates
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Data Protection Officer</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600"></span>
                      <span className="text-gray-700">Email: privacy-sellers@nylestore.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600"></span>
                      <span className="text-gray-700">Phone: +254 700 123 456</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600"></span>
                      <span className="text-gray-700">Nairobi, Kenya</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Policy Updates</h4>
                  <p className="text-gray-700 mb-4">
                    We may update this policy periodically. Significant changes will be communicated via email and dashboard notifications.
                  </p>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Last Updated:</strong> January 15, 2024<br/>
                      <strong>Next Review:</strong> July 15, 2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-700">
                    By using Nyle Store as a seller, you acknowledge and agree to this Privacy Policy.
                  </p>
                  <Link
                    href="/vendor/signup"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Continue Registration
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Nyle Seller Network</h4>
              <p className="text-blue-300">
                Building Kenya's most secure and successful marketplace for sellers.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/vendor/terms" className="text-blue-300 hover:text-white transition">Seller Terms</Link>
                <Link href="/vendor/privacy" className="text-blue-300 hover:text-white transition">Seller Privacy</Link>
                <Link href="/vendor/support" className="text-blue-300 hover:text-white transition">Seller Support</Link>
                <Link href="/vendor/faq" className="text-blue-300 hover:text-white transition">Seller FAQs</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Compliance</h4>
              <div className="text-sm text-blue-400">
                <p> Kenya Data Protection Act, 2019</p>
                <p> GDPR Compliant</p>
                <p> ISO 27001 Certified</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-blue-300">
               {new Date().getFullYear()} Nyle Store Seller Network. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}