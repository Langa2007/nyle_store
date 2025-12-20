"use client";
import PaymentLayout from "@/components/payments/PaymentLayout";
import { 
  CreditCard, Smartphone, Building, Wallet, Bitcoin, 
  CheckCircle, Zap, Globe, Shield, Clock, TrendingUp, Award 
} from "lucide-react";
import { 
  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, 
  FaGooglePay, FaApplePay, FaAndroid, FaMobileAlt 
} from "react-icons/fa";

export default function AcceptedMethods() {
  // Custom M-Pesa icon component
  const MpesaIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
  );

  // Custom Airtel Money icon
  const AirtelIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );

  // Custom T-Kash icon
  const TKashIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );

  const paymentMethods = [
    {
      category: "Credit & Debit Cards",
      icon: <CreditCard />,
      color: "from-blue-500 to-cyan-500",
      methods: [
        { 
          name: "Visa", 
          icon: <FaCcVisa className="text-blue-700 text-2xl" />, 
          processing: "Instant", 
          fee: "2.5%", 
          available: true 
        },
        { 
          name: "Mastercard", 
          icon: <FaCcMastercard className="text-red-600 text-2xl" />, 
          processing: "Instant", 
          fee: "2.5%", 
          available: true 
        },
        { 
          name: "American Express", 
          icon: <FaCcAmex className="text-blue-900 text-2xl" />, 
          processing: "Instant", 
          fee: "3.0%", 
          available: true 
        },
      ],
      description: "Secure card payments with 3D Secure authentication"
    },
    {
      category: "Mobile Money",
      icon: <Smartphone />,
      color: "from-green-500 to-emerald-500",
      methods: [
        { 
          name: "M-Pesa", 
          icon: <MpesaIcon className="text-green-600 text-2xl w-8 h-8" />, 
          processing: "Instant", 
          fee: "1.5%", 
          available: true 
        },
        { 
          name: "Airtel Money", 
          icon: <AirtelIcon className="text-red-500 text-2xl w-8 h-8" />, 
          processing: "Instant", 
          fee: "1.5%", 
          available: true 
        },
        { 
          name: "T-Kash", 
          icon: <TKashIcon className="text-blue-500 text-2xl w-8 h-8" />, 
          processing: "Instant", 
          fee: "1.5%", 
          available: true 
        },
      ],
      description: "Popular mobile money services across Kenya"
    },
    {
      category: "Digital Wallets",
      icon: <Wallet />,
      color: "from-purple-500 to-pink-500",
      methods: [
        { 
          name: "PayPal", 
          icon: <FaCcPaypal className="text-blue-500 text-2xl" />, 
          processing: "Instant", 
          fee: "3.5%", 
          available: true 
        },
        { 
          name: "Google Pay", 
          icon: <FaGooglePay className="text-gray-800 text-2xl" />, 
          processing: "Instant", 
          fee: "2.0%", 
          available: true 
        },
        { 
          name: "Apple Pay", 
          icon: <FaApplePay className="text-black text-2xl" />, 
          processing: "Instant", 
          fee: "2.0%", 
          available: true 
        },
        { 
          name: "Nyle Wallet", 
          icon: <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">N</div>, 
          processing: "Instant", 
          fee: "0%", 
          available: true,
          badge: "Exclusive"
        },
      ],
      description: "Digital wallet payments for fast checkout"
    },
    {
      category: "Bank Transfers",
      icon: <Building />,
      color: "from-orange-500 to-amber-500",
      methods: [
        { 
          name: "Direct Bank Transfer", 
          icon: <Building className="text-blue-600" size={24} />, 
          processing: "1-2 hours", 
          fee: "1.0%", 
          available: true 
        },
        { 
          name: "RTGS", 
          icon: <TrendingUp className="text-green-600" size={24} />, 
          processing: "24 hours", 
          fee: "0.5%", 
          available: true 
        },
        { 
          name: "SWIFT", 
          icon: <Globe className="text-indigo-600" size={24} />, 
          processing: "2-3 days", 
          fee: "2.0%", 
          available: true 
        },
      ],
      description: "Ideal for bulk orders and corporate purchases"
    },
    {
      category: "Coming Soon",
      icon: <Zap />,
      color: "from-indigo-500 to-purple-500",
      methods: [
        { 
          name: "Cryptocurrency", 
          icon: <Bitcoin className="text-yellow-500" size={24} />, 
          processing: "Instant", 
          fee: "1.0%", 
          available: false,
          comingSoon: "Q2 2024"
        },
        { 
          name: "Buy Now, Pay Later", 
          icon: <CreditCard className="text-green-600" size={24} />, 
          processing: "Instant", 
          fee: "0%", 
          available: false,
          comingSoon: "Q3 2024"
        },
        { 
          name: "More Mobile Wallets", 
          icon: <FaAndroid className="text-green-500 text-2xl" />, 
          processing: "Instant", 
          fee: "1.5%", 
          available: false,
          comingSoon: "Q2 2024"
        },
      ],
      description: "Exciting new payment options launching soon"
    },
  ];

  // Rest of the component remains exactly the same...
  const keyFeatures = [
    {
      icon: <Shield />,
      title: "100% Secure",
      description: "Bank-level encryption and fraud protection"
    },
    {
      icon: <Zap />,
      title: "Instant Processing",
      description: "Most payments are confirmed instantly"
    },
    {
      icon: <Globe />,
      title: "Multi-Currency",
      description: "Accept payments in KES, USD, EUR, and more"
    },
    {
      icon: <CheckCircle />,
      title: "Money-Back Guarantee",
      description: "Full refunds for unauthorized transactions"
    },
  ];

  const countrySupport = [
    { country: "Kenya", methods: "All", status: "Fully Supported" },
    { country: "Uganda", methods: "Cards, Mobile Money", status: "Limited" },
    { country: "Tanzania", methods: "Cards, Mobile Money", status: "Limited" },
    { country: "Rwanda", methods: "Cards", status: "Limited" },
    { country: "International", methods: "Cards, PayPal", status: "Fully Supported" },
  ];

  return (
    <PaymentLayout 
      title="Accepted Payment Methods"
      subtitle="Choose from a wide range of secure payment options for seamless shopping"
    >
      {/* Intro Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Flexible Payment Options</h2>
        <p className="text-gray-700 text-lg mb-6">
          Nyle supports a comprehensive variety of payment methods to make your shopping experience 
          seamless, secure, and convenient. Whether you prefer cards, mobile money, or digital wallets, 
          we've got you covered.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {keyFeatures.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <div className="text-white">{feature.icon}</div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods by Category */}
      <div className="space-y-12">
        {paymentMethods.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-2xl border border-blue-100 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Category Header */}
            <div className="p-6 border-b border-blue-50 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <div className="text-white">{category.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>

            {/* Methods Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.methods.map((method, methodIndex) => (
                  <div 
                    key={methodIndex} 
                    className={`group relative rounded-xl border p-5 transition-all ${
                      method.available 
                        ? 'border-blue-100 hover:border-blue-300 hover:shadow-md' 
                        : 'border-gray-100 opacity-75'
                    }`}
                  >
                    {/* Coming Soon Overlay */}
                    {!method.available && (
                      <div className="absolute -top-2 -right-2">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {method.comingSoon}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900">{method.name}</h4>
                          {method.badge && (
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                              {method.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {method.available ? (
                            <>
                              <CheckCircle className="text-green-500" size={14} />
                              <span className="text-xs text-green-600">Available</span>
                            </>
                          ) : (
                            <>
                              <Clock className="text-gray-400" size={14} />
                              <span className="text-xs text-gray-500">Coming Soon</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Processing</span>
                        <span className="font-medium text-gray-900">{method.processing}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Transaction Fee</span>
                        <span className={`font-medium ${method.fee === '0%' ? 'text-green-600' : 'text-gray-900'}`}>
                          {method.fee}
                        </span>
                      </div>
                    </div>

                    {/* Exclusive Nyle Wallet Benefits */}
                    {method.name === "Nyle Wallet" && (
                      <div className="mt-4 pt-4 border-t border-blue-100">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="text-blue-600" size={14} />
                            <span className="text-blue-700 font-medium">No Transaction Fees</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Zap className="text-blue-600" size={14} />
                            <span className="text-blue-700 font-medium">Instant Withdrawals</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Support */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Globe className="text-blue-600" />
          Regional Availability
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Country</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Available Methods</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {countrySupport.map((region, index) => (
                <tr key={index} className="border-b border-blue-100 last:border-b-0">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{region.country}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{region.methods}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      region.status === "Fully Supported" 
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {region.status === "Fully Supported" ? (
                        <CheckCircle className="mr-1" size={14} />
                      ) : (
                        <Clock className="mr-1" size={14} />
                      )}
                      {region.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Tips & Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="text-blue-600" />
              Security First
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Always look for the lock icon in your browser</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Never share your OTP or PIN with anyone</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Use strong, unique passwords for payment accounts</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="text-blue-600" />
              Faster Checkout
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Save payment methods for quicker future purchases</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Use Nyle Wallet for zero-fee transactions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-700">Enable biometric authentication when available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Ready to Shop Securely?</h3>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            With multiple payment options, bank-level security, and instant processing, 
            you can shop with confidence on Nyle. Choose your preferred method and start 
            shopping today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              <CreditCard size={20} />
              Start Shopping Now
            </a>
            <a
              href="/support/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              <Shield size={20} />
              Payment Support
            </a>
          </div>
        </div>
      </div>
    </PaymentLayout>
  );
}