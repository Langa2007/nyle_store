"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Database, Lock, Users, Globe, Cookie, CheckCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const privacySections = [
    {
      id: "overview",
      icon: <Shield className="h-6 w-6" />,
      title: "Overview",
      color: "from-blue-500 to-cyan-500",
      points: [
        "We respect your privacy and are committed to protecting your personal data",
        "This policy explains how we collect, use, and safeguard your information",
        "By using Nyle Store, you agree to the collection and use of information in accordance with this policy"
      ]
    },
    {
      id: "data-collection",
      icon: <Database className="h-6 w-6" />,
      title: "Data Collection",
      color: "from-purple-500 to-pink-500",
      points: [
        "Personal information (name, email, shipping address)",
        "Payment information (processed securely via payment gateways)",
        "Usage data (pages visited, products viewed, time spent)",
        "Device information (browser type, IP address, operating system)"
      ]
    },
    {
      id: "data-use",
      icon: <Users className="h-6 w-6" />,
      title: "How We Use Your Data",
      color: "from-green-500 to-emerald-500",
      points: [
        "Process transactions and deliver your purchases",
        "Personalize your shopping experience",
        "Send order updates and promotional offers (with consent)",
        "Improve our platform and develop new features",
        "Prevent fraud and ensure platform security"
      ]
    },
    {
      id: "data-protection",
      icon: <Lock className="h-6 w-6" />,
      title: "Data Protection",
      color: "from-orange-500 to-red-500",
      points: [
        "256-bit SSL encryption for all data transmission",
        "Regular security audits and vulnerability testing",
        "Access controls and authentication protocols",
        "Secure data storage with backup systems"
      ]
    },
    {
      id: "your-rights",
      icon: <Globe className="h-6 w-6" />,
      title: "Your Rights",
      color: "from-indigo-500 to-purple-500",
      points: [
        "Access your personal data we hold",
        "Correct inaccurate or incomplete data",
        "Request deletion of your personal data",
        "Opt-out of marketing communications",
        "Data portability (get your data in a readable format)"
      ]
    },
    {
      id: "cookies",
      icon: <Cookie className="h-6 w-6" />,
      title: "Cookies & Tracking",
      color: "from-yellow-500 to-amber-500",
      points: [
        "Essential cookies for website functionality",
        "Analytics cookies to improve user experience",
        "Marketing cookies (only with your consent)",
        "You can manage cookie preferences in browser settings"
      ]
    }
  ];

  const securityFeatures = [
    { icon: <Lock className="h-6 w-6 text-blue-600" />, title: "Bank-Level Encryption", desc: "256-bit SSL encryption for all data" },
    { icon: <Shield className="h-6 w-6 text-blue-600" />, title: "GDPR Compliant", desc: "Adheres to international data protection standards" },
    { icon: <Database className="h-6 w-6 text-blue-600" />, title: "Transparent Practices", desc: "Clear and accessible privacy policies" },
    { icon: <CheckCircle className="h-6 w-6 text-blue-600" />, title: "Regular Updates", desc: "Continually improving security measures" },
  ];

  const faqs = [
    {
      question: "Can I delete my account and all my data?",
      answer: "Yes, you can request account deletion from your settings. We'll remove your personal data within 30 days, except for data we're legally required to retain."
    },
    {
      question: "Do you sell my personal information?",
      answer: "Never. We do not sell, trade, or rent your personal information to third parties for marketing purposes."
    },
    {
      question: "How long do you keep my data?",
      answer: "We retain personal data for as long as your account is active or as needed to provide services. After account closure, we retain data for legal obligations."
    },
    {
      question: "Can I opt-out of marketing emails?",
      answer: "Yes, you can unsubscribe from marketing emails at any time using the link in our emails or in your account settings."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = privacySections.map(s => s.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <span className="text-3xl"></span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-lg text-blue-100 mt-2">Your Privacy, Our Priority</p>
              </div>
            </div>
            
            <p className="text-xl text-blue-100/90 max-w-3xl mx-auto mb-8">
              We're committed to protecting your personal information with transparent practices 
              and enterprise-grade security measures.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/" 
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                ← Back to Home
              </Link>
              <Link 
                href="/terms" 
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                View Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="container mx-auto px-6 -mt-8 z-10 relative">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-[1.02] transition-transform">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <span className="text-2xl"></span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Data is Protected</h2>
                <p className="text-green-100">Industry-leading security measures keep your information safe</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="font-bold">A+ Rating</div>
                <div className="text-xs text-green-100">Security Score</div>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="font-bold">256-bit</div>
                <div className="text-xs text-green-100">Encryption</div>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="font-bold">24/7</div>
                <div className="text-xs text-green-100">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Navigation */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-blue-600"></span>
                  Quick Navigation
                </h3>
                
                <nav className="space-y-2">
                  {privacySections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border-l-4 border-blue-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span>{section.icon}</span>
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Security Features */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-green-600"></span>
                  Security Features
                </h3>
                
                <div className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <span className="text-xl mt-1">{feature.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Policy */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span></span>
                  Download Policy
                </h4>
                <p className="text-blue-100 mb-4 text-sm">
                  Save a copy of our Privacy Policy for your records.
                </p>
                <button className="w-full px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl"></span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Privacy Matters</h2>
                  <p className="text-gray-600">Transparent data practices for confident shopping</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                At Nyle Store, we believe that privacy is a fundamental right. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you visit our marketplace. 
                We're committed to protecting your personal data and giving you control over your information.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-2">Scope</h4>
                  <p className="text-sm text-gray-600">
                    Applies to all personal information collected from buyers on Nyle Store platform.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-bold text-gray-900 mb-2">Compliance</h4>
                  <p className="text-sm text-gray-600">
                    Adheres to data protection regulations including Kenya's Data Protection Act, 2019.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Sections */}
            {privacySections.map((section, index) => (
              <div
                key={index}
                id={section.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm text-2xl">
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{section.title}</h3>
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
              </div>
            ))}

            {/* FAQs */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span></span>
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <span></span>
                      {faq.question}
                    </h4>
                    <p className="text-blue-100">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Updates */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-blue-600"></span>
                Contact & Policy Updates
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Contact Our Privacy Team</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600"></span>
                      <span className="text-gray-700">Email: privacy@nylestore.com</span>
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
                    We may update this policy to reflect changes in our practices. 
                    We'll notify you of any significant changes via email and in-app notifications.
                  </p>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}<br/>
                      <strong>Version:</strong> 3.2.1
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-700">
                    By using Nyle Store, you acknowledge and agree to this Privacy Policy.
                  </p>
                  <Link
                    href="/auth/signup"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Join Securely
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Nyle Store</h4>
              <p className="text-blue-300">
                Kenya's trusted marketplace with your privacy at heart.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/terms" className="text-blue-300 hover:text-white transition">Terms of Service</Link>
                <Link href="/privacy" className="text-blue-300 hover:text-white transition">Privacy Policy</Link>
                <Link href="/support" className="text-blue-300 hover:text-white transition">Support Center</Link>
                <Link href="/faq" className="text-blue-300 hover:text-white transition">FAQs</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Trust & Safety</h4>
              <div className="text-sm text-blue-400">
                <p> Kenya Data Protection Act, 2019</p>
                <p> Secure Payment Processing</p>
                <p> Buyer Protection Program</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-blue-300">
               {new Date().getFullYear()} Nyle Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
