import PaymentLayout from "@/components/payments/PaymentLayout";
import { Shield, Lock, CreditCard, EyeOff, CheckCircle } from "lucide-react";

export default function SecureCheckout() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "256-bit SSL Encryption",
      description: "Military-grade encryption for all transactions",
      color: "text-blue-600"
    },
    {
      icon: Lock,
      title: "PCI DSS Compliance",
      description: "Full compliance with payment card industry standards",
      color: "text-blue-500"
    },
    {
      icon: EyeOff,
      title: "No Sensitive Data Stored",
      description: "We never store your payment information",
      color: "text-blue-400"
    },
    {
      icon: CheckCircle,
      title: "Real-time Fraud Monitoring",
      description: "24/7 automated fraud detection and prevention",
      color: "text-blue-700"
    }
  ];

  return (
    <PaymentLayout title="Secure Checkout">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-blue-100">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Your Security is Our Priority
              </h1>
              <p className="text-gray-600 mt-1">
                Nyle guarantees a secure checkout experience with bank-level protection
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed">
              Every transaction on Nyle is protected by multiple layers of security, 
              powered by encrypted connections and verified payment gateways. 
              Shop with confidence knowing your data is always safe.
            </p>
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Advanced Security Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${feature.color.replace('text', 'bg')}/10 group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Security Info */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Industry-Leading Protection
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>End-to-end encrypted payment processing</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Multi-factor authentication for all sensitive operations</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Compliance with global privacy regulations (GDPR, CCPA)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Protected by Nyle Security
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Version 2.4 • Last updated today
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500 mb-6">
            Trusted by thousands of customers worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
            <div className="text-center">
              <div className="h-10 w-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-gray-500">PCI DSS</span>
            </div>
            <div className="text-center">
              <div className="h-10 w-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-gray-500">SSL Secure</span>
            </div>
            <div className="text-center">
              <div className="h-10 w-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-gray-500">GDPR Ready</span>
            </div>
            <div className="text-center">
              <div className="h-10 w-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-gray-500">3D Secure</span>
            </div>
          </div>
        </div>
      </div>
    </PaymentLayout>
  );
}