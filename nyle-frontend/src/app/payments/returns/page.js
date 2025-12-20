// app/payments/refunds/page.js
import PaymentLayout from "@/components/payments/PaymentLayout";
import { 
  RefreshCw, Package, Clock, CheckCircle, AlertCircle, 
  Truck, CreditCard, FileText, Shield, Zap, Users, 
  Percent, Calendar, Mail, Phone, HelpCircle, 
  Ban, Award, TrendingUp, Download 
} from "lucide-react";

export default function RefundsReturns() {
  const refundCategories = [
    {
      type: "Standard Returns",
      icon: <Package />,
      color: "from-blue-500 to-cyan-500",
      timeframe: "30 days from delivery",
      condition: "Unopened, original packaging",
      processing: "5-7 business days",
      eligible: [
        "Wrong size or color received",
        "Changed your mind (seller approval required)",
        "Item doesn't match description"
      ],
      nonEligible: [
        "Personalized/custom items",
        "Perishable goods",
        "Intimate apparel (hygiene reasons)"
      ]
    },
    {
      type: "Defective Items",
      icon: <AlertCircle />,
      color: "from-red-500 to-orange-500",
      timeframe: "90 days from delivery",
      condition: "Manufacturing defects only",
      processing: "3-5 business days",
      eligible: [
        "Faulty electronics",
        "Broken/damaged on arrival",
        "Missing parts/components"
      ],
      nonEligible: [
        "Damage from improper use",
        "Normal wear and tear",
        "Accidental damage"
      ]
    },
    {
      type: "Non-Delivery",
      icon: <Truck />,
      color: "from-green-500 to-emerald-500",
      timeframe: "45 days from expected delivery",
      condition: "Tracking shows no delivery",
      processing: "1-2 business days",
      eligible: [
        "Lost in transit",
        "Wrong address (seller error)",
        "Never shipped by seller"
      ],
      nonEligible: [
        "Wrong address (buyer error)",
        "Refused delivery",
        "Failed delivery attempts"
      ]
    }
  ];

  const refundTimeline = [
    {
      step: "1",
      title: "Request Submission",
      description: "Submit refund request through your account",
      timeline: "Within 30 days of delivery",
      icon: <FileText />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "2",
      title: "Return Authorization",
      description: "Receive return label and instructions",
      timeline: "24-48 hours",
      icon: <CheckCircle />,
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "3",
      title: "Item Return",
      description: "Ship item back using provided label",
      timeline: "7 days to ship",
      icon: <Truck />,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "4",
      title: "Inspection & Processing",
      description: "We inspect and process your refund",
      timeline: "3-5 business days",
      icon: <Shield />,
      color: "from-orange-500 to-amber-500"
    },
    {
      step: "5",
      title: "Refund Issued",
      description: "Funds returned to original payment method",
      timeline: "5-7 business days",
      icon: <CreditCard />,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const refundMethods = [
    {
      method: "Original Payment Method",
      icon: <CreditCard />,
      timeframe: "5-7 business days",
      details: "Refunds go back to the same card/wallet used for purchase",
      notes: "International cards may take 10-14 business days"
    },
    {
      method: "Nyle Wallet Credit",
      icon: <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">N</div>,
      timeframe: "Instant",
      details: "Optional: Receive store credit to your Nyle Wallet",
      notes: "Get 10% bonus credit when choosing this option"
    },
    {
      method: "Bank Transfer",
      icon: <TrendingUp />,
      timeframe: "3-5 business days",
      details: "Available for bank transfer purchases only",
      notes: "Ksh 100 processing fee for bank transfers"
    }
  ];

  const nonRefundableItems = [
    { item: "Digital Products", reason: "Cannot be returned once accessed", icon: <Download /> },
    { item: "Services", reason: "Once rendered, services cannot be returned", icon: <Users /> },
    { item: "Gift Cards", reason: "Considered as cash equivalent", icon: <CreditCard /> },
    { item: "Personalized Items", reason: "Custom-made for specific buyer", icon: <Award /> },
    { item: "Perishable Goods", reason: "Quality degrades over time", icon: <Ban /> },
    { item: "Intimate Apparel", reason: "Hygiene and health regulations", icon: <Shield /> }
  ];

  const restockingFees = [
    { amount: "0%", condition: "Defective or wrong item received", note: "Free return shipping" },
    { amount: "10%", condition: "Changed mind (seller approved)", note: "Buyer pays return shipping" },
    { amount: "15%", condition: "Opened but undamaged items", note: "Original packaging required" },
    { amount: "25%", condition: "Used or damaged items", note: "At seller's discretion" }
  ];

  const quickRefundStats = [
    { value: "97%", label: "Refund Approval Rate", description: "For eligible returns" },
    { value: "4.2 Days", label: "Average Processing", description: "From receipt to refund" },
    { value: "30 Days", label: "Return Window", description: "Standard return period" },
    { value: "24/7", label: "Support Available", description: "Refund assistance" },
  ];

  return (
    <PaymentLayout 
      title="Refunds & Returns"
      subtitle="Clear, fair policies for when products don't meet your expectations"
    >
      {/* Introduction */}
      <div className="mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <RefreshCw className="text-white" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Satisfaction Guaranteed</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                We value your trust. If a product doesn't meet your expectations, our transparent
                refund and return policy ensures fair, prompt handling. Our goal is to make the
                process as smooth and hassle-free as possible.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {quickRefundStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-blue-100 text-center">
                    <div className="text-2xl font-bold text-blue-700 mb-1">{stat.value}</div>
                    <div className="font-medium text-gray-900">{stat.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Refund Categories & Conditions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {refundCategories.map((category, index) => (
            <div key={index} className="group bg-white rounded-2xl border border-blue-100 overflow-hidden hover:shadow-xl transition-all">
              <div className={`p-6 bg-gradient-to-r ${category.color}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <div className="text-white">{category.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.type}</h3>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <Clock size={14} />
                      {category.timeframe}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* Condition & Processing */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Condition Required:</span>
                    <span className="font-medium text-gray-900">{category.condition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Processing Time:</span>
                    <span className="font-medium text-blue-600">{category.processing}</span>
                  </div>
                </div>

                {/* Eligible Items */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    Eligible For Refund
                  </h4>
                  <ul className="space-y-2">
                    {category.eligible.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Non-Eligible Items */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Ban className="text-red-500" size={16} />
                    Not Eligible
                  </h4>
                  <ul className="space-y-2">
                    {category.nonEligible.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refund Timeline */}
      <div className="mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-8">The Refund Process Timeline</h3>
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-0 right-0 top-12 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {refundTimeline.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute lg:relative top-0 left-1/2 lg:left-auto transform lg:transform-none -translate-x-1/2 lg:translate-x-0 z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <div className="text-white">{step.icon}</div>
                  </div>
                </div>
                <div className="mt-20 lg:mt-0 pt-4 lg:pt-20 text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-2">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <div className="inline-flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <Clock size={12} />
                    {step.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-white/50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-3">
            <Zap className="text-blue-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Pro Tip:</span> Start your return process within 7 days of delivery 
                for fastest processing. Have your order number and photos of the item ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Methods */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">How You'll Receive Your Refund</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {refundMethods.map((method, index) => (
            <div key={index} className="group bg-white rounded-xl border border-blue-100 p-6 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  {method.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{method.method}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    {method.timeframe}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">{method.details}</p>
              <div className="pt-4 border-t border-blue-100">
                <div className="text-xs text-gray-500">{method.notes}</div>
                {method.method === "Nyle Wallet Credit" && (
                  <div className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <Percent size={12} />
                    10% Bonus Credit
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restocking Fees */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Restocking Fees & Charges</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Fee</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Applies When</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Additional Notes</th>
              </tr>
            </thead>
            <tbody>
              {restockingFees.map((fee, index) => (
                <tr key={index} className="border-b border-blue-100 last:border-b-0 hover:bg-blue-50/50">
                  <td className="py-4 px-4">
                    <div className="text-2xl font-bold text-blue-700">{fee.amount}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{fee.condition}</td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-600">{fee.note}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            <span className="font-medium">Note:</span> Restocking fees are deducted from your refund amount. 
            Original shipping costs are non-refundable unless the return is due to seller error.
          </p>
        </div>
      </div>

      {/* Non-Refundable Items */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Non-Refundable Items & Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nonRefundableItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-gray-600">{item.icon}</div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.item}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Reminders */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="text-blue-600" />
            Before You Return
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-700">Contact seller first for resolution options</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-700">Take photos/videos of the item and packaging</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-700">Keep all original tags and accessories</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-700">Use only approved return shipping methods</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="text-green-600" />
            Your Protection
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-700">Full refund if item is significantly not as described</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-700">Free returns for defective or wrong items</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-700">Dispute resolution if seller is unresponsive</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
              <span className="text-gray-700">Escalation to Nyle protection team after 3 days</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Need Help With a Return?</h3>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Our dedicated returns team is here to guide you through the process and ensure
            your experience is smooth and satisfactory. Get personalized assistance for
            your specific situation.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-blue-200">Online Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">30 Min</div>
              <div className="text-sm text-blue-200">Avg. Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">97%</div>
              <div className="text-sm text-blue-200">Satisfaction Rate</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              <Mail size={20} />
              Start a Return
            </a>
            <a
              href="/support/chat"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              <Phone size={20} />
              Live Chat Support
            </a>
          </div>

          <div className="mt-8 text-sm text-blue-200">
            <p>
              <span className="font-medium">Business Hours:</span> Mon-Fri 8AM-8PM EAT | Sat 9AM-6PM EAT
            </p>
            <p className="mt-1">
              <span className="font-medium">Email:</span> returns@nyle.com | 
              <span className="ml-4 font-medium">Phone:</span> +254 700 123 456
            </p>
          </div>
        </div>
      </div>

      {/* Policy Update */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          <span className="font-medium">Policy Last Updated:</span> March 15, 2024
        </p>
        <p className="text-sm text-gray-500 mt-1">
          These policies are subject to change. Major changes will be communicated 30 days in advance.
        </p>
      </div>
    </PaymentLayout>
  );
}