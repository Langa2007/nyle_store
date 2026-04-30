"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Database, Lock, Users, Globe, Cookie, CheckCircle, FileText, Scale } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const privacySections = [
    {
      id: "overview",
      icon: <Shield className="h-6 w-6" />,
      title: "Executive Overview",
      color: "from-slate-800 to-slate-900",
      content: "Nyle Store operates with a commitment to the highest standards of data privacy and integrity. This document outlines our protocols for the acquisition, processing, and retention of personal data. We adhere strictly to the General Data Protection Regulation (GDPR) and the Data Protection Act of 2019 (Kenya), ensuring that your digital footprint remains secure and under your absolute control.",
      points: [
        "Commitment to data minimization and purpose limitation principles.",
        "Strict adherence to international data protection frameworks and local statutes.",
        "Transparent communication regarding all data processing activities.",
        "Establishment of robust technical and organizational measures to prevent unauthorized access."
      ]
    },
    {
      id: "data-collection",
      icon: <Database className="h-6 w-6" />,
      title: "Data Acquisition Protocols",
      color: "from-blue-700 to-indigo-800",
      content: "We collect specific categories of data necessary to provide a functional and secure marketplace experience. This includes both information provided voluntarily by the user and data collected through automated technical processes.",
      points: [
        "Identity Data: Full legal name, primary contact email, and verified shipping coordinates.",
        "Financial Data: Secure processing of transaction tokens; Nyle Store does not store raw credit card information on its primary servers.",
        "Technical Data: Internet Protocol (IP) addresses, browser telemetry, and system-level configuration data for session security.",
        "Behavioral Data: Aggregated usage patterns and product interaction history used for algorithmic service optimization."
      ]
    },
    {
      id: "data-use",
      icon: <Users className="h-6 w-6" />,
      title: "Information Processing Objectives",
      color: "from-teal-700 to-emerald-800",
      content: "Data processing is restricted to legitimate business interests and the fulfillment of contractual obligations between the user and the platform. We utilize advanced data handling techniques to ensure that all processing remains aligned with the original intent of collection.",
      points: [
        "Contractual Fulfillment: Execution of sales agreements, logistics coordination, and post-purchase support.",
        "Service Optimization: Enhancing platform performance through data-driven architectural improvements.",
        "Security & Compliance: Implementation of anti-fraud detection systems and verification of user authenticity.",
        "Marketing Governance: Distribution of service-related communications and promotional materials strictly upon explicit user opt-in."
      ]
    },
    {
      id: "data-protection",
      icon: <Lock className="h-6 w-6" />,
      title: "Security Architecture",
      color: "from-red-800 to-rose-950",
      content: "Nyle Store employs enterprise-grade security protocols to safeguard all information assets. Our defense-in-depth strategy ensures multiple layers of protection against evolving cyber threats.",
      points: [
        "Encryption: Mandatory 256-bit SSL/TLS encryption for all data in transit and at rest.",
        "Infrastructure Security: Hosting on SOC 2 Type II compliant cloud infrastructure with perimeter defense and real-time monitoring.",
        "Access Management: Role-based access control (RBAC) and mandatory multi-factor authentication (MFA) for administrative operations.",
        "Audit Protocols: Periodic penetration testing and security vulnerability assessments by independent third-party agencies."
      ]
    },
    {
      id: "compliance",
      icon: <Scale className="h-6 w-6" />,
      title: "Compliance & Governance",
      color: "from-amber-700 to-orange-900",
      content: "Nyle Store is fully compliant with global and regional data protection laws. Our operations are governed by a strict legal framework designed to protect user interests and ensure accountability.",
      points: [
        "GDPR Compliance: Full alignment with the European Union's General Data Protection Regulation for all users globally.",
        "Data Protection Act (2019): Compliance with Kenya's legislative framework for digital identity and data handling.",
        "International Standards: Adherence to ISO/IEC 27001 principles for information security management systems.",
        "Cross-Border Transfers: All international data transfers are protected by standard contractual clauses and adequacy findings."
      ]
    },
    {
      id: "your-rights",
      icon: <Globe className="h-6 w-6" />,
      title: "Statutory User Rights",
      color: "from-indigo-800 to-purple-950",
      content: "In accordance with data protection legislation, you are entitled to several rights regarding your personal information. Nyle Store provides direct tools within the user interface to exercise these rights autonomously.",
      points: [
        "Right of Access: Request a comprehensive report of all personal data currently stored in our systems.",
        "Right to Rectification: Correct any inaccuracies or update outdated information within your account profile.",
        "Right to Erasure: Exercise your 'right to be forgotten' by requesting permanent deletion of your account and associated data.",
        "Right to Portability: Export your data in a structured, commonly used, and machine-readable format.",
        "Right to Restriction: Temporarily suspend the processing of your data during legal or verification proceedings."
      ]
    },
    {
      id: "cookies",
      icon: <Cookie className="h-6 w-6" />,
      title: "Cookie Technology Policy",
      color: "from-slate-700 to-slate-900",
      content: "Our platform utilizes cookie technology and similar identifiers to ensure session stability and enhance site performance. Users may manage these settings through their browser or our centralized cookie preference center.",
      points: [
        "Strictly Necessary: Essential identifiers for security, session management, and shopping cart persistence.",
        "Analytical Tracking: Anonymous telemetry used to monitor site health and user navigation efficiency.",
        "Functional Preferences: Storage of user-selected settings such as language, currency, and display modes.",
        "Marketing Transparency: Zero use of third-party tracking cookies for advertising without explicit consent."
      ]
    }
  ];

  const securityFeatures = [
    { icon: <Lock className="h-5 w-5 text-blue-600" />, title: "Military-Grade Encryption", desc: "AES-256 encryption protocols for sensitive data" },
    { icon: <Scale className="h-5 w-5 text-blue-600" />, title: "Regulatory Compliance", desc: "Certified GDPR and Data Protection Act compliance" },
    { icon: <Shield className="h-5 w-5 text-blue-600" />, title: "Secure Infrastructure", desc: "Redundant, SOC-compliant cloud data centers" },
    { icon: <CheckCircle className="h-5 w-5 text-blue-600" />, title: "Privacy by Design", desc: "Security architecture integrated into core development" },
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
  }, [privacySections]);

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
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header Section */}
      <div className="bg-slate-900 text-white py-24 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <nav className="flex mb-8 text-slate-400 text-sm uppercase tracking-widest">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <span className="mx-3">/</span>
              <span className="text-white">Legal Documentation</span>
            </nav>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Privacy and Data Protection Policy
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
              This document establishes the legal framework for data handling within Nyle Store. 
              We prioritize the sovereignty of user information through rigorous security standards 
              and full compliance with international privacy mandates.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('overview')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all"
              >
                Read Policy
              </button>
              <Link 
                href="/terms" 
                className="border border-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-bold transition-all"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Enhanced Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">
                  Document Sections
                </h3>
                <nav className="space-y-1">
                  {privacySections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full group text-left px-4 py-4 rounded-xl transition-all flex items-center gap-4 ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className={`p-2 rounded-lg transition-colors ${
                        activeSection === section.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}>
                        {section.icon}
                      </span>
                      <span className="font-bold text-sm tracking-tight">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Compliance Badges */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                  Compliance Status
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-600 h-5 w-5" />
                    <span className="text-sm font-bold text-slate-900">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-600 h-5 w-5" />
                    <span className="text-sm font-bold text-slate-900">Data Protection Act (KE)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-blue-600 h-5 w-5" />
                    <span className="text-sm font-bold text-slate-900">SSL Encrypted</span>
                  </div>
                </div>
                <hr className="my-6 border-slate-200" />
                <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Request Certification
                </button>
              </div>
            </div>
          </aside>

          {/* Detailed Content Documents */}
          <main className="lg:w-3/4 space-y-20">
            {privacySections.map((section) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32 transition-opacity duration-500"
                style={{ opacity: activeSection === section.id ? 1 : 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${section.color} text-white shadow-lg`}>
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{section.title}</h2>
                    <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-xl text-slate-600 leading-relaxed mb-8">
                    {section.content}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    {section.points.map((point, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* Governance Information Section */}
            <section className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8">Global Data Governance</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl">
                  Nyle Store maintains a global perspective on data protection. We treat all user data with the rigor 
                  required by the General Data Protection Regulation (GDPR), regardless of the user's geographic location. 
                  This universal standard ensures that our Kenyan operations meet and exceed international expectations 
                  for digital safety and corporate accountability.
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="border-l-2 border-blue-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">Legal Representative</h4>
                    <p className="text-slate-400">Chief Information Security Officer<br/>Nyle Store Corporate Office</p>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-6">
                    <h4 className="font-bold text-xl mb-2">Audit Frequency</h4>
                    <p className="text-slate-400">Security audits conducted quarterly<br/>External legal review annually</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Contact Statement */}
            <div className="text-center py-10 border-t border-slate-100">
              <p className="text-slate-500 mb-6">
                Direct legal inquiries and data subject requests to our centralized privacy portal.
              </p>
              <div className="flex justify-center gap-6">
                <a href="mailto:legal@nylestore.com" className="text-blue-600 font-bold hover:underline">legal@nylestore.com</a>
                <span className="text-slate-300">|</span>
                <span className="text-slate-700 font-bold">Nairobi, Kenya</span>
              </div>
              <p className="mt-10 text-xs text-slate-400 uppercase tracking-widest">
                Last Document Revision: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Corporate Footer */}
      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-900 font-black text-2xl tracking-tighter">NYLE STORE</div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500">
              <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link href="/auth/privacy" className="hover:text-blue-600 transition-colors">Data Privacy</Link>
              <Link href="/others/cookies" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
              <Link href="/support" className="hover:text-blue-600 transition-colors">Support Center</Link>
            </div>
            <div className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Nyle Store Corporation.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
