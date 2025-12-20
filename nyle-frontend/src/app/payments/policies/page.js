// app/payments/policies/page.js
import PaymentLayout from "@/components/payments/PaymentLayout";
import { 
  FileText, Shield, Clock, CheckCircle, AlertCircle, 
  Lock, RefreshCw, Bell, BarChart, Users, Zap, 
  TrendingUp, Globe, Award, HelpCircle 
} from "lucide-react";

export default function PaymentPolicies() {
  const policySections = [
    {
      title: "Payment Processing",
      icon: <Clock />,
      color: "from-blue-500 to-cyan-500",
      policies: [
        {
          title: "Pre-Payment Requirement",
          description: "All orders must be paid in full before processing and shipment",
          details: "Payment verification typically completes within 1-2 minutes for most methods",
          badge: "Mandatory"
        },
        {
          title: "Processing Time",
          description: "Payment confirmation timelines vary by method",
          details: "Instant for cards/mobile money, 1-2 hours for bank transfers",
          badge: "Timely"
        },
        {
          title: "Order Hold Period",
          description: "Unpaid orders are held for 24 hours before automatic cancellation",
          details: "You'll receive reminders at 6, 12, and 18 hour marks",
          badge: "Flexible"
        }
      ]
    },
    {
      title: "Security & Encryption",
      icon: <Lock />,
      color: "from-purple-500 to-pink-500",
      policies: [
        {
          title: "SSL/TLS Encryption",
          description: "All transactions use 256-bit SSL encryption",
          details: "Bank-level security compliant with PCI-DSS standards",
          badge: "Secure"
        },
        {
          title: "Fraud Detection",
          description: "Real-time fraud monitoring on all transactions",
          details: "Advanced AI algorithms flag suspicious activities",
          badge: "Protected"
        },
        {
          title: "Data Privacy",
          description: "Payment details are never stored on our servers",
          details: "Tokenized payments through certified gateways",
          badge: "Private"
        }
      ]
    },
    {
      title: "Documentation & Records",
      icon: <FileText />,
      color: "from-green-500 to-emerald-500",
      policies: [
        {
          title: "Automatic Invoicing",
          description: "E-invoices generated immediately after payment",
          details: "Includes itemized breakdown, taxes, and fees",
          badge: "Instant"
        },
        {
          title: "Transaction Logs",
          description: "Comprehensive audit trails for all payments",
          details: "Accessible for 7 years as per financial regulations",
          badge: "Transparent"
        },
        {
          title: "Receipt Generation",
          description: "Digital receipts sent to email and Nyle account",
          details: "Available for download in PDF format",
          badge: "Convenient"
        }
      ]
    },
    {
      title: "Compliance & Standards",
      icon: <Shield />,
      color: "from-orange-500 to-amber-500",
      policies: [
        {
          title: "Regulatory Compliance",
          description: "Adherence to Central Bank of Kenya regulations",
          details: "Licensed payment aggregator under Kenyan law",
          badge: "Compliant"
        },
        {
          title: "Anti-Money Laundering",
          description: "KYC verification for high-value transactions",
          details: "Threshold monitoring at Ksh 1,000,000 annually",
          badge: "Verified"
        },
        {
          title: "Consumer Protection",
          description: "Alignment with Consumer Protection Act",
          details: "Clear refund and dispute resolution processes",
          badge: "Protected"
        }
      ]
    }
  ];

  const importantNotes = [
    {
      icon: <AlertCircle />,
      title: "Payment Verification",
      description: "Some transactions may require additional verification. This helps protect your account from unauthorized access.",
      color: "bg-yellow-50 border-yellow-100"
    },
    {
      icon: <Bell />,
      title: "Notifications",
      description: "You'll receive email and SMS notifications for all payment activities, including successful payments and any issues.",
      color: "bg-blue-50 border-blue-100"
    },
    {
      icon: <RefreshCw />,
      title: "Failed Payments",
      description: "If a payment fails, funds are typically returned within 24-48 hours. Contact support if not resolved within 72 hours.",
      color: "bg-red-50 border-red-100"
    }
  ];

  const complianceMetrics = [
    { value: "99.95%", label: "Uptime", description: "Payment system availability" },
    { value: "< 2 Min", label: "Avg. Processing", description: "Transaction completion" },
    { value: "0.01%", label: "Fraud Rate", description: "Industry leading" },
    { value: "24/7", label: "Monitoring", description: "Security oversight" },
  ];

  const policyExceptions = [
    {
      scenario: "High-Value Transactions",
      threshold: "Over Ksh 500,000",
      requirement: "Additional verification and manual approval",
      timeline: "Additional 2-4 hours"
    },
    {
      scenario: "International Payments",
      threshold: "Cross-border transactions",
      requirement: "Currency conversion at market rates",
      timeline: "Additional 1-2 business days"
    },
    {
      scenario: "B2B Purchases",
      threshold: "Corporate accounts",
      requirement: "Invoice-based payment terms available",
      timeline: "Net 30 payment terms"
    }
  ];

  return (
    <PaymentLayout 
      title="Payment Policies"
      subtitle="Clear guidelines ensuring secure, transparent, and compliant payment processing"
    >
      {/* Introduction */}
      <div className="mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Secure Payments</h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            At Nyle, we ensure every payment is processed with the highest standards of security, 
            efficiency, and transparency. These comprehensive policies guide how transactions are 
            handled, verified, and protected to give you complete peace of mind.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {complianceMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-blue-100 text-center">
                <div className="text-2xl font-bold text-blue-700 mb-1">{metric.value}</div>
                <div className="font-medium text-gray-900">{metric.label}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-12">
        {policySections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
            {/* Section Header */}
            <div className="p-6 border-b border-blue-50 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                  <div className="text-white">{section.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                  <p className="text-gray-600">Policies governing this aspect of payment processing</p>
                </div>
              </div>
            </div>

            {/* Policies List */}
            <div className="p-6">
              <div className="space-y-6">
                {section.policies.map((policy, policyIndex) => (
                  <div key={policyIndex} className="group border border-blue-100 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          policy.badge === "Mandatory" ? "bg-red-100 text-red-800" :
                          policy.badge === "Secure" ? "bg-green-100 text-green-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {policy.badge}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-bold text-gray-900">{policy.title}</h4>
                          <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        </div>
                        <p className="text-gray-700 mb-3">{policy.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                          <Zap size={16} className="text-blue-600" />
                          <span className="font-medium">Detail:</span> {policy.details}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <AlertCircle className="text-blue-600" />
          Important Notes & Considerations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {importantNotes.map((note, index) => (
            <div key={index} className={`rounded-xl border p-6 ${note.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <div className="text-blue-600">{note.icon}</div>
                </div>
                <h4 className="font-bold text-gray-900">{note.title}</h4>
              </div>
              <p className="text-gray-700">{note.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Exceptions & Special Cases */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Policy Exceptions & Special Cases</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Scenario</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Threshold</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Special Requirement</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Extended Timeline</th>
              </tr>
            </thead>
            <tbody>
              {policyExceptions.map((exception, index) => (
                <tr key={index} className="border-b border-blue-100 last:border-b-0 hover:bg-white/50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{exception.scenario}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {exception.threshold}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{exception.requirement}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                      <Clock size={14} />
                      {exception.timeline}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 bg-white/50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-3">
            <HelpCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Note:</span> For any exceptions or special payment arrangements, 
                please contact our payment support team at least 48 hours before your intended transaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Responsibilities */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">User Responsibilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="text-blue-600" />
              Buyer Responsibilities
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Ensure sufficient funds in payment account</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Keep payment information up to date</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Report unauthorized transactions within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Verify transaction details before confirmation</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="text-blue-600" />
              Security Responsibilities
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Use secure, private networks for transactions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Keep login credentials confidential</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Enable two-factor authentication</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Regularly update account security settings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Policy Updates & Contact */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Policy Updates & Contact</h3>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Our payment policies are reviewed quarterly and updated to reflect changes in regulations, 
            technology, and best practices. You'll be notified of any significant changes 30 days in advance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">Quarterly</div>
              <div className="text-sm text-blue-200">Policy Reviews</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">30 Days</div>
              <div className="text-sm text-blue-200">Change Notice</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-blue-200">Policy Support</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              <HelpCircle size={20} />
              Policy Questions
            </a>
            <a
              href="/legal/terms"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              <FileText size={20} />
              View Full Terms
            </a>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          <span className="font-medium">Last Updated:</span> March 15, 2024
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium">Version:</span> 3.2.1 | 
          <span className="ml-2 font-medium">Effective:</span> April 1, 2024
        </p>
      </div>
    </PaymentLayout>
  );
}