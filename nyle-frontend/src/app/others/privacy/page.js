"use client";

import { Shield, Lock, Eye, Users, CheckCircle, Download } from "lucide-react";
import FooterInfoLayout from "@/components/footer/FooterInfoLayout";

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
    <FooterInfoLayout
      title="Privacy Policy"
      subtitle="We're committed to protecting your privacy and being transparent about how we handle your personal information."
      icon={<Shield className="h-8 w-8" />}
      lastUpdated="January 15, 2024"
      category="Security & Privacy"
    >
      <div className="space-y-12">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
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

          {/* Download Button */}
          <div className="mt-6 text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              <Download className="h-5 w-5" />
              Download PDF Version
            </button>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              id={`section-${index}`}
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
            </div>
          ))}
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Updates</h2>
          <div className="space-y-4">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{update.change}</div>
                  <div className="text-sm text-gray-600 mt-1">{update.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
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
        </div>
      </div>
    </FooterInfoLayout>
  );
}