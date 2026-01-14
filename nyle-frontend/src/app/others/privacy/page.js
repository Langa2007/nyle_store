"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Users, FileText, CheckCircle, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Users />,
      title: "Information We Collect",
      color: "from-blue-500 to-cyan-500",
      points: [
        "Personal information (name, email, phone) when you create an account",
        "Payment information for transactions (securely processed)",
        "Device and browser information for optimization",
        "Usage data to improve our services"
      ]
    },
    {
      icon: <Lock />,
      title: "How We Use Your Information",
      color: "from-blue-600 to-indigo-600",
      points: [
        "Process and fulfill your orders",
        "Provide customer support",
        "Send important updates about your account",
        "Improve our platform and services",
        "Prevent fraud and ensure security"
      ]
    },
    {
      icon: <Eye />,
      title: "Information Sharing",
      color: "from-indigo-600 to-purple-600",
      points: [
        "Only with your consent or as necessary for services",
        "With trusted payment processors",
        "With shipping partners for delivery",
        "When required by law or to protect rights"
      ]
    },
    {
      icon: <Shield />,
      title: "Your Rights & Choices",
      color: "from-cyan-500 to-blue-500",
      points: [
        "Access and update your personal information",
        "Opt-out of marketing communications",
        "Request data deletion (subject to legal requirements)",
        "Export your data in readable format"
      ]
    }
  ];

  const recentUpdates = [
    { date: "Jan 15, 2024", change: "Enhanced cookie consent controls" },
    { date: "Dec 1, 2023", change: "Updated data retention policies" },
    { date: "Oct 20, 2023", change: "Added biometric data protection" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMlM0Mi42MjcgMTggMzYgMTh6TTAgMGg2MHY2MEgweiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=')]"></div>
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
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Privacy Policy
              </h1>
            </div>
            
            <p className="text-xl text-blue-100/90 max-w-3xl mx-auto mb-8">
              We're committed to protecting your privacy and being transparent about how we handle your personal information.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all">
                <Download className="inline mr-2 h-5 w-5" />
                Download PDF Version
              </button>
              <Link href="/" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all">
                <ArrowLeft className="inline mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Sidebar - Quick Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Quick Navigation
              </h3>
              
              <nav className="space-y-3">
                {sections.map((section, index) => (
                  <a
                    key={index}
                    href={`#section-${index}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color}`}>
                      {section.icon}
                    </div>
                    <span className="font-medium">{section.title}</span>
                  </a>
                ))}
              </nav>

              {/* Last Updated */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Last Updated</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">January 15, 2024</p>
                <div className="text-xs text-gray-500">
                  This policy was last reviewed and updated to reflect current practices.
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Privacy</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At Nyle Store, we believe in building trust through transparency. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. We're committed to protecting your privacy and ensuring you have control over your personal data.
              </p>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">GDPR & Data Protection</h4>
                    <p className="text-gray-600">
                      We comply with global data protection regulations including GDPR, CCPA, and Kenya's Data Protection Act, 2019.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Policy Sections */}
            {sections.map((section, index) => (
              <motion.div
                key={index}
                id={`section-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${section.color} p-8 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{section.title}</h3>
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

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Shield className="h-8 w-8" />
                Contact Our Privacy Team
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3">Data Protection Officer</h4>
                  <p className="text-blue-100 mb-2">Email: privacy@nylestore.com</p>
                  <p className="text-blue-100">Phone: +254 700 000 000</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3">Mailing Address</h4>
                  <p className="text-blue-100">
                    Nyle Store Privacy Team<br />
                    P.O. Box 12345-00100<br />
                    Nairobi, Kenya
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