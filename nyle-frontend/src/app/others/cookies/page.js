"use client";

import { Cookie, Settings, Shield, Eye, Trash2, CheckCircle, RefreshCw, Lock, BarChart, ExternalLink } from "lucide-react";
import FooterInfoLayout from "@/components/footer/FooterInfoLayout";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true
  });

  const cookieTypes = [
    {
      type: "necessary",
      name: "Mandatory Operational Cookies",
      icon: <Shield />,
      color: "from-slate-700 to-slate-900",
      description: "Fundamental identifiers required for platform stability and security.",
      examples: ["Session Authentication", "Security Protocols", "Transactional Integrity"]
    },
    {
      type: "analytics",
      name: "Analytical Intelligence Cookies",
      icon: <BarChart />,
      color: "from-blue-700 to-indigo-800",
      description: "Telemetry data utilized for the optimization of platform performance.",
      examples: ["Visitor Telemetry", "Engagement Analytics", "Operational Health Monitoring"]
    },
    {
      type: "marketing",
      name: "Strategic Engagement Cookies",
      icon: <Lock />,
      color: "from-emerald-700 to-teal-800",
      description: "Facilitates the delivery of personalized service communications.",
      examples: ["Contextual Interaction", "Impact Assessment", "Client Engagement Metrics"]
    },
    {
      type: "preferences",
      name: "Functional Customization Cookies",
      icon: <Settings />,
      color: "from-amber-700 to-orange-800",
      description: "Preservation of user-specific configurations and interface parameters.",
      examples: ["Localization Settings", "Currency Alignment", "Interface Personalization"]
    }
  ];

  const handleToggle = (type) => {
    if (type !== "necessary") {
      setCookiePreferences(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
    }
  };

  const { data: session } = useSession();

  const handleSavePreferences = async () => {
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-preferences', JSON.stringify(cookiePreferences));
    
    if (session?.user?.id) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com'}/api/user/cookie-preferences`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ preferences: cookiePreferences }),
          credentials: 'include'
        });
      } catch (err) {
        console.error('Data synchronization failure:', err);
      }
    }
    
    alert('Cookie preferences have been updated and synchronized.');
  };

  const handleReset = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: false,
      preferences: true
    });
  };

  return (
    <FooterInfoLayout
      title="Cookie Governance Policy"
      subtitle="This document outlines the technical implementation and governance of tracking technologies utilized by Nyle Store to ensure an optimized and secure user experience."
      icon={<Cookie className="h-8 w-8" />}
      lastUpdated="January 30, 2026"
      category="Privacy & Governance"
    >
      <div className="space-y-16">
        {/* Executive Preference Center */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-10 border-b border-slate-50 bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Privacy Preference Center</h2>
                <p className="text-slate-600 text-lg">
                  Govern your data footprint by configuring the categories of tracking technologies permitted during your session.
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-white transition flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Restore Defaults
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-black shadow-lg transition-all"
                >
                  Authorize Settings
                </button>
              </div>
            </div>
          </div>

          <div className="p-10 grid md:grid-cols-2 gap-8">
            {cookieTypes.map((cookie) => (
              <div
                key={cookie.type}
                className={`group p-8 rounded-3xl border-2 transition-all duration-300 ${
                  cookie.type === "necessary" 
                    ? "border-slate-900 bg-slate-900 text-white shadow-xl" 
                    : "border-slate-50 hover:border-blue-100 hover:shadow-lg bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-5">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${cookie.color} text-white shadow-md`}>
                      {cookie.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${cookie.type === "necessary" ? 'text-white' : 'text-slate-900'}`}>{cookie.name}</h3>
                      <p className={`text-sm ${cookie.type === "necessary" ? 'text-slate-300' : 'text-slate-500'}`}>{cookie.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {cookie.type === "necessary" ? (
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full">
                        <Lock className="h-3 w-3" />
                        <span className="text-xs font-black uppercase tracking-widest">Mandatory</span>
                      </div>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences[cookie.type]}
                          onChange={() => handleToggle(cookie.type)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                      </label>
                    )}
                  </div>
                </div>
                
                <div className={`pt-6 border-t ${cookie.type === 'necessary' ? 'border-white/10' : 'border-slate-50'}`}>
                  <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${cookie.type === 'necessary' ? 'text-slate-400' : 'text-slate-400'}`}>Scope of Usage</h4>
                  <div className="flex flex-wrap gap-2">
                    {cookie.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-1.5 text-xs font-bold rounded-full border ${
                          cookie.type === 'necessary' 
                            ? 'bg-white/5 border-white/10 text-white' 
                            : 'bg-slate-50 border-slate-100 text-slate-700'
                        }`}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Justification */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-10 tracking-tight">Technical Implementation Justification</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4">Operational Continuity</h4>
              <p className="text-slate-600 leading-relaxed">
                Persistent identifiers allow our systems to maintain session state, ensuring that your navigational history and transactional data remain synchronized across various interface states.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4">Security Integrity</h4>
              <p className="text-slate-600 leading-relaxed">
                Security-focused cookies are deployed to mitigate CSRF (Cross-Site Request Forgery) attacks and verify the authenticity of user requests during high-stakes financial operations.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4">Algorithmic Refinement</h4>
              <p className="text-slate-600 leading-relaxed">
                Anonymized telemetry data gathered through analytical cookies provides the empirical foundation for our iterative platform enhancements and UX architectural decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Governance */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="max-w-4xl">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
              <Shield className="h-10 w-10 text-blue-500" />
              Regulatory Governance & External Entities
            </h3>
            <p className="text-slate-300 text-xl leading-relaxed mb-12">
              In accordance with international data sovereignty laws, Nyle Store provides full transparency regarding the deployment of third-party tracking technologies. All external partners are strictly audited for compliance with our internal privacy frameworks.
            </p>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-xl font-bold mb-4">Browser Configuration</h4>
                <p className="text-slate-400 mb-6">
                  Users may independently govern cookie acquisition via native browser settings. Most enterprise browsers provide granular control over domain-specific storage.
                </p>
                <div className="space-y-3 text-sm text-slate-300 font-medium">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span>Google Chrome</span>
                    <span className="text-blue-400">Privacy & Security</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span>Mozilla Firefox</span>
                    <span className="text-blue-400">Enhanced Tracking Protection</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Apple Safari</span>
                    <span className="text-blue-400">Intelligent Tracking Prevention</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-xl font-bold mb-4">Third-Party Disclosure</h4>
                <p className="text-slate-400 mb-6">
                  We maintain a comprehensive registry of all external entities that utilize tracking technologies through our platform.
                </p>
                <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-xl">
                  <ExternalLink className="h-5 w-5" />
                  Review Entity Registry
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Footer Callout */}
        <div className="text-center py-10">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Final Provision</p>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            By continuing to utilize the Nyle Store platform without modifying your configurations, 
            you acknowledge and consent to the technical implementation of tracking technologies 
            as established in this Cookie Governance Policy.
          </p>
          <p className="mt-8 text-slate-300 text-xs">
            Documentation Revision: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | Version 5.2.0
          </p>
        </div>
      </div>
    </FooterInfoLayout>
  );
}