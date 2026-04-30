"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, User, CreditCard, Truck, RotateCcw, Shield, CheckCircle, Scale, AlertCircle } from "lucide-react";

export default function TermsOfServicePage() {
  const [acceptedSections, setAcceptedSections] = useState([]);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const termsSections = [
    {
      id: "agreement",
      icon: <FileText className="h-6 w-6" />,
      title: "Contractual Agreement",
      color: "from-slate-800 to-slate-900",
      content: [
        "Utilization of the Nyle Store platform constitutes an unconditional acceptance of these Terms of Service.",
        "Failure to adhere to these provisions may result in the immediate suspension or termination of service access.",
        "These terms represent a legally binding agreement between the user and Nyle Store Corporation."
      ]
    },
    {
      id: "account",
      icon: <User className="h-6 w-6" />,
      title: "Account Governance",
      color: "from-blue-700 to-indigo-800",
      content: [
        "Users must possess full legal capacity and be of the age of majority in their jurisdiction.",
        "Account security is the sole responsibility of the user; unauthorized access must be reported immediately.",
        "Nyle Store reserves the right to audit accounts for compliance with our operational integrity standards.",
        "Provision of fraudulent information during registration is grounds for permanent account revocation."
      ]
    },
    {
      id: "purchases",
      icon: <CreditCard className="h-6 w-6" />,
      title: "Financial Transactions",
      color: "from-emerald-700 to-teal-800",
      content: [
        "All transactional values are denominated in Kenyan Shillings (KES) unless otherwise specified.",
        "Payment verification is a prerequisite for the initiation of order fulfillment protocols.",
        "We utilize industry-standard encryption for the processing of all electronic payments.",
        "Refund eligibility is determined strictly by our standardized Refund Policy framework."
      ]
    },
    {
      id: "shipping",
      icon: <Truck className="h-6 w-6" />,
      title: "Logistical Operations",
      color: "from-amber-700 to-orange-800",
      content: [
        "Delivery timelines provided at checkout are logistical estimates and do not constitute a guarantee.",
        "Logistics fees are calculated based on destination coordinates and volumetric weight.",
        "The transfer of risk occurs upon successful handover of the shipment to the designated carrier.",
        "Accurate provision of delivery coordinates is the absolute responsibility of the purchasing party."
      ]
    },
    {
      id: "returns",
      icon: <RotateCcw className="h-6 w-6" />,
      title: "Remedies & Restitutions",
      color: "from-rose-700 to-red-900",
      content: [
        "Return requests must be formally initiated within a seven-day window following delivery confirmation.",
        "Returned assets must remain in original, merchantable condition with all authentication tags intact.",
        "Restitution processing follows a strict verification cycle of five to ten business days.",
        "Logistical costs for returns are borne by the user, excluding cases of verified product non-conformity."
      ]
    },
    {
      id: "prohibited",
      icon: <Shield className="h-6 w-6" />,
      title: "Regulatory Prohibitions",
      color: "from-slate-700 to-slate-900",
      content: [
        "Usage of the platform for illicit activities or unauthorized commercial exploitation is strictly prohibited.",
        "Interference with the technical integrity or security architecture of the platform is a violation of these terms.",
        "Unauthorized data scraping or automated interaction with platform systems is forbidden.",
        "Violation of intellectual property rights through the platform will lead to immediate legal action."
      ]
    },
    {
      id: "intellectual",
      icon: <Scale className="h-6 w-6" />,
      title: "Intellectual Property Rights",
      color: "from-indigo-700 to-blue-900",
      content: [
        "Nyle Store and its associated visual identity are protected trademarks of the Corporation.",
        "All proprietary software, content, and algorithmic processes remain the exclusive property of Nyle Store.",
        "Users are granted a limited, non-exclusive license for personal usage of the platform interface.",
        "Reproduction or redistribution of any platform assets without written consent is strictly prohibited."
      ]
    },
    {
      id: "liability",
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Limitation of Liability",
      color: "from-gray-800 to-black",
      content: [
        "Nyle Store excludes liability for indirect, incidental, or consequential damages to the maximum extent permitted by law.",
        "Total aggregate liability is limited to the transactional value of the specific order in dispute.",
        "Platform services are provided on an 'as-is' and 'as-available' basis without warranties of any kind.",
        "Users indemnify Nyle Store against any claims arising from their misuse of the platform services."
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
    <div className="min-h-screen bg-white">
      {/* Executive Header */}
      <div className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <nav className="flex mb-8 text-slate-400 text-sm uppercase tracking-widest">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <span className="mx-3">/</span>
              <span className="text-white">Terms of Service</span>
            </nav>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Terms of Service Agreement
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
              This document serves as the definitive legal framework governing the relationship 
              between Nyle Store Corporation and its users. By accessing our services, you 
              formally acknowledge and agree to the following provisions.
            </p>
          </div>
        </div>
      </div>

      {/* Corporate Dashboard Style Review */}
      <div className="container mx-auto px-6 -mt-12">
        <div className={`rounded-3xl p-8 shadow-2xl transition-all duration-500 ${allAccepted ? 'bg-emerald-600' : 'bg-slate-800'} border border-white/10`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Compliance Review</h2>
                <p className="text-slate-300">Acknowledge each section to proceed with account formalization</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-white">
                <div className="text-3xl font-black">{acceptedSections.length} / {termsSections.length}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400">Sections Verified</div>
              </div>
              {allAccepted && (
                <button
                  onClick={() => setShowAcceptModal(true)}
                  className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105"
                >
                  Confirm Agreement
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legal Content Documents */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Progress Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Execution Progress</h3>
              <div className="space-y-4">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-700"
                    style={{ width: `${(acceptedSections.length / termsSections.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {Math.round((acceptedSections.length / termsSections.length) * 100)}% Verified
                </p>
              </div>

              <div className="mt-12 space-y-2">
                {termsSections.map((section, idx) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      const el = document.getElementById(section.id);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="w-full text-left py-2 text-sm flex items-center gap-3 group"
                  >
                    <div className={`w-2 h-2 rounded-full ${acceptedSections.includes(section.id) ? 'bg-emerald-500' : 'bg-slate-200 group-hover:bg-slate-400'}`}></div>
                    <span className={`transition-colors ${acceptedSections.includes(section.id) ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                      {section.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Sections */}
          <main className="lg:col-span-9 space-y-16">
            {termsSections.map((section, index) => {
              const isAccepted = acceptedSections.includes(section.id);
              
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className={`group bg-white rounded-3xl border-2 transition-all duration-500 ${
                    isAccepted ? 'border-emerald-100 shadow-sm' : 'border-slate-50 hover:border-slate-100 hover:shadow-xl'
                  }`}
                >
                  <div className={`p-8 border-b ${isAccepted ? 'border-emerald-50 bg-emerald-50/30' : 'border-slate-50 bg-slate-50/30'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${section.color} text-white shadow-lg`}>
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{section.title}</h3>
                          <span className="text-slate-500 text-xs uppercase tracking-widest font-black">Provision {index + 1}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleSectionAccept(section.id)}
                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                          isAccepted
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {isAccepted ? "Verified" : "Verify Section"}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-10">
                    <div className="grid sm:grid-cols-2 gap-8">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-4">
                          <CheckCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isAccepted ? 'text-emerald-500' : 'text-slate-200'}`} />
                          <p className="text-slate-600 leading-relaxed font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}

            {/* Legal Governance Footnote */}
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-3xl font-bold mb-8">Jurisdictional Governance</h3>
              <div className="grid md:grid-cols-2 gap-12 text-slate-400">
                <div>
                  <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Governing Statute</h4>
                  <p className="leading-relaxed">
                    This agreement is executed under the statutory laws of the Republic of Kenya. 
                    Any interpretation or enforcement of these provisions shall be conducted 
                    exclusively within the High Court of Kenya.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Dispute Resolution</h4>
                  <p className="leading-relaxed">
                    Parties agree to initiate formal mediation protocols prior to any litigation. 
                    Arbitration proceedings, if required, shall be conducted in accordance with 
                    the Nairobi Centre for International Arbitration (NCIA) rules.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Corporate Footer */}
      <footer className="bg-slate-50 py-20 border-t border-slate-200 mt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="text-slate-900 font-black text-2xl tracking-tighter mb-8">NYLE STORE</div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500 mb-12">
            <Link href="/auth/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link href="/auth/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="/others/cookies" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
            <Link href="/support/help-center" className="hover:text-blue-600 transition-colors">Help Center</Link>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Nyle Store Corporation. Document Version 4.0.1 (Stable)
          </p>
        </div>
      </footer>

      {/* Executive Acceptance Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 z-[200]">
          <div className="bg-white rounded-[2rem] max-w-lg w-full p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Agreement Finalized</h3>
              <p className="text-slate-500 text-lg">
                Your formal acceptance of the Nyle Store Terms of Service has been recorded.
              </p>
            </div>
            
            <div className="space-y-4 mb-10">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <ul className="text-sm text-slate-600 space-y-3 font-medium">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Full acknowledgement of legal provisions
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Acceptance of jurisdictional governance
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Verification of account responsibility
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 px-6 py-4 border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
              >
                Return to Review
              </button>
              <Link
                href="/"
                className="flex-1 px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black shadow-xl text-center transition-all"
              >
                Access Platform
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
