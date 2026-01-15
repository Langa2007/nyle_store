"use client";

import { 
  Shield, 
  Lock, 
  Key, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  FileText,
  Server,
  Fingerprint,
  Database,
  Globe,
  Clock,
  RefreshCw,
  Download,
  Mail,
  Smartphone,
  CreditCard,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VendorSecurityPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "All vendor data is encrypted in transit and at rest using AES-256 encryption.",
      status: "Active"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Two-Factor Authentication",
      description: "Optional 2FA using SMS, email, or authenticator apps for enhanced security.",
      status: "Recommended"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Secure Infrastructure",
      description: "AWS-backed infrastructure with DDoS protection and regular security audits.",
      status: "Active"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Isolation",
      description: "Vendor data is logically separated to prevent unauthorized access between accounts.",
      status: "Active"
    },
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: "Biometric Authentication",
      description: "Optional fingerprint or face recognition on supported mobile devices.",
      status: "Available"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Activity Monitoring",
      description: "Real-time monitoring of account activity with automated anomaly detection.",
      status: "Active"
    }
  ];

  const complianceStandards = [
    "GDPR Compliant for European vendors",
    "Kenya Data Protection Act 2019",
    "ISO 27001 Certified Infrastructure",
    "PCI DSS Level 1 for payment processing",
    "Regular third-party security audits"
  ];

  const securityTips = [
    "Use strong passwords with minimum 12 characters",
    "Enable two-factor authentication",
    "Never share your login credentials",
    "Log out from shared computers",
    "Regularly review account activity",
    "Keep your contact information updated",
    "Report suspicious activity immediately",
    "Use unique passwords for different platforms"
  ];

  const incidentResponse = [
    { step: 1, action: "Immediate account lock", icon: "🔒" },
    { step: 2, action: "Notification to vendor", icon: "📧" },
    { step: 3, action: "Security team investigation", icon: "🔍" },
    { step: 4, action: "Password reset required", icon: "🔄" },
    { step: 5, action: "Detailed report provided", icon: "📋" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Vendor Security Center</h1>
            </div>
            
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Protecting your business data with enterprise-grade security measures and compliance standards
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">AES-256 Encryption</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">GDPR Compliant</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">24/7 Monitoring</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === "overview" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Security Overview
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === "features" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Security Features
            </button>
            <button
              onClick={() => setActiveTab("compliance")}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === "compliance" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Compliance
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === "tips" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100 border"}`}
            >
              Security Tips
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Security Commitment</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Protection Layers</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Network-level security</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Application security</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Data encryption</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Access controls</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Monitoring & Response</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span>24/7 security monitoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <span>Real-time threat detection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-green-500" />
                        <span>Automated incident response</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-500" />
                        <span>Dedicated security team</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Incident Response */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Incident Response Protocol</h3>
                <div className="grid md:grid-cols-5 gap-4">
                  {incidentResponse.map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="text-sm font-medium">Step {item.step}</div>
                      <div className="text-xs text-blue-200">{item.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <div className="text-blue-600">{feature.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{feature.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          feature.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : feature.status === 'Recommended'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "compliance" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance Standards</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Standards</h3>
                    <ul className="space-y-3">
                      {complianceStandards.map((standard, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{standard}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Protection</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Global Standards</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          We adhere to international data protection standards ensuring your data is handled securely across all regions.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-5 h-5 text-green-600" />
                          <span className="font-medium">Payment Security</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          PCI DSS Level 1 compliance ensures all payment transactions are processed with maximum security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tips" && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Best Practices</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security Tips</h3>
                    <div className="space-y-3">
                      {securityTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-700 font-bold">{index + 1}</span>
                          </div>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                        <div className="flex items-center gap-3">
                          <Key className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Change Password</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-green-600" />
                          <span className="font-medium">Enable 2FA</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition">
                        <div className="flex items-center gap-3">
                          <Eye className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium">View Activity Log</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5 text-purple-600" />
                          <span className="font-medium">Download Security Guide</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Need Security Assistance?</h3>
                    <p className="text-blue-100">
                      Our security team is available 24/7 to help with any security concerns.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href="mailto:security@nyle.co.ke" 
                      className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Email Security Team
                    </a>
                    <a 
                      href="/vendor/support" 
                      className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/30 transition"
                    >
                      Open Support Ticket
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArrowRight(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}