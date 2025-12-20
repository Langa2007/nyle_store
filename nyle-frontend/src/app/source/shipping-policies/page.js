"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";
import { 
  Truck, 
  Shield, 
  Clock, 
  DollarSign, 
  Package, 
  RefreshCw, 
  Bell, 
  Globe,
  CheckCircle,
  XCircle,
  MapPin,
  Award,
  Percent,
  Users,
  TrendingUp,
  Heart,
  Zap
} from "lucide-react";

export default function ShippingPoliciesPage() {
  const [activeTab, setActiveTab] = useState("domestic");
  const [selectedWeight, setSelectedWeight] = useState("1-5");
  const [selectedRegion, setSelectedRegion] = useState("nairobi");
  const [isPremium, setIsPremium] = useState(false);

  const shippingStats = [
    { label: "On-Time Delivery", value: "99.2%", icon: Clock, color: "text-green-600", change: "+0.5%" },
    { label: "Free Shipping", value: "68%", icon: DollarSign, color: "text-blue-600", change: "+12%" },
    { label: "Avg Delivery", value: "2.1 days", icon: Truck, color: "text-purple-600", change: "-0.3 days" },
    { label: "Satisfaction", value: "4.8/5", icon: Award, color: "text-orange-600", change: "+0.2" },
  ];

  const shippingTiers = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "3-5 business days",
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      price: "KES 300",
      features: ["Email tracking updates", "Standard insurance", "Business days only"]
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "1-2 business days",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      price: "KES 600",
      features: ["Priority handling", "SMS notifications", "Real-time tracking"]
    },
    {
      id: "premium",
      name: "Premium Shipping",
      description: "Same-day/Next-day",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      price: "KES 900",
      features: ["Same-day delivery", "Dedicated support", "Premium insurance"]
    },
    {
      id: "free",
      name: "Free Shipping",
      description: "Order over KES 5,000",
      icon: Heart,
      color: "from-orange-500 to-amber-500",
      price: "FREE",
      features: ["Free for members", "4-7 business days", "Standard insurance"]
    },
  ];

  const weightCategories = [
    { id: "1-5", label: "1-5 kg", price: "KES 300-500" },
    { id: "6-10", label: "6-10 kg", price: "KES 500-800" },
    { id: "11-20", label: "11-20 kg", price: "KES 800-1,200" },
    { id: "21+", label: "21+ kg", price: "Custom quote" },
  ];

  const regions = [
    { id: "nairobi", name: "Nairobi Metro", delivery: "1-2 days", icon: "🏙️" },
    { id: "mombasa", name: "Mombasa & Coast", delivery: "2-3 days", icon: "🏖️" },
    { id: "kisumu", name: "Kisumu & Western", delivery: "3-4 days", icon: "🌊" },
    { id: "other", name: "Other Regions", delivery: "4-7 days", icon: "🗺️" },
  ];

  const policyPoints = [
    { 
      title: "Free Shipping Threshold", 
      description: "Free standard shipping on orders over KES 5,000",
      icon: Percent,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    { 
      title: "Next-Day Dispatch", 
      description: "Most orders dispatched within 24 hours",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    { 
      title: "Return Policy", 
      description: "30-day hassle-free returns under Buyer Protection",
      icon: RefreshCw,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    { 
      title: "Real-time Tracking", 
      description: "SMS & email updates at every step",
      icon: Bell,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
  ];

  const bulkDiscounts = [
    { threshold: "KES 10,000", discount: "5% shipping discount" },
    { threshold: "KES 25,000", discount: "10% shipping discount" },
    { threshold: "KES 50,000", discount: "Free express shipping" },
    { threshold: "KES 100,000", discount: "Free shipping + 5% order discount" },
  ];

  useEffect(() => {
    // Calculate if user qualifies for premium benefits
    const hasPremium = selectedWeight === "1-5" && selectedRegion === "nairobi";
    setIsPremium(hasPremium);
  }, [selectedWeight, selectedRegion]);

  const calculateShipping = () => {
    // Mock calculation based on selections
    let basePrice = 300;
    
    // Adjust by weight
    if (selectedWeight === "6-10") basePrice += 200;
    if (selectedWeight === "11-20") basePrice += 500;
    
    // Adjust by region
    if (selectedRegion === "mombasa") basePrice += 150;
    if (selectedRegion === "kisumu") basePrice += 200;
    if (selectedRegion === "other") basePrice += 300;
    
    // Apply premium discount if eligible
    if (isPremium) basePrice *= 0.9;
    
    return `KES ${basePrice.toLocaleString()}`;
  };

  return (
    <BuyerInfoLayout
      title="Shipping Rates & Policies"
      subtitle="Clarity and reliability from checkout to delivery across Kenya."
      stats={shippingStats}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Transparent & Fair Shipping
              </h2>
              <p className="text-gray-600">
                Know exactly what you're paying for with clear rates and reliable timelines
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              Nyle provides predictable and fair shipping rates with transparent costs up front. 
              Every order includes detailed delivery timelines, real-time tracking, and most 
              regions enjoy next-day dispatch. Your trust is our priority.
            </p>
          </div>
        </motion.div>

        {/* Shipping Tiers */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Shipping Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {shippingTiers.map((tier) => (
              <motion.div
                key={tier.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${tier.color} mb-3`}>
                  <tier.icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{tier.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                <div className={`text-lg font-bold mb-3 ${
                  tier.id === "free" ? "text-green-600" : "text-gray-900"
                }`}>
                  {tier.price}
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rate Calculator */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Estimate Your Shipping Cost
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Weight Selection */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Package Weight</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {weightCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedWeight(category.id)}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            selectedWeight === category.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{category.label}</div>
                          <div className="text-sm text-gray-600">{category.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Region Selection */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Delivery Region</h4>
                    <div className="space-y-3">
                      {regions.map((region) => (
                        <button
                          key={region.id}
                          onClick={() => setSelectedRegion(region.id)}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            selectedRegion === region.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{region.icon}</span>
                              <div>
                                <div className="font-medium text-gray-900">{region.name}</div>
                                <div className="text-sm text-gray-600">{region.delivery} delivery</div>
                              </div>
                            </div>
                            {selectedRegion === region.id && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calculation Results */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {calculateShipping()}
                    </div>
                    <p className="text-gray-600">Estimated Shipping Cost</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Weight:</span>
                      <span className="font-medium">{weightCategories.find(w => w.id === selectedWeight)?.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Region:</span>
                      <span className="font-medium">{regions.find(r => r.id === selectedRegion)?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Delivery:</span>
                      <span className="font-medium">{regions.find(r => r.id === selectedRegion)?.delivery}</span>
                    </div>
                    
                    {isPremium && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <Award className="h-4 w-4" />
                          <span className="font-medium">Premium Discount Applied!</span>
                        </div>
                        <p className="text-sm text-green-600 mt-1">
                          You qualify for 10% off for small packages in Nairobi
                        </p>
                      </div>
                    )}

                    <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Discounts */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Bulk Order Discounts
              </h4>
              <div className="space-y-3">
                {bulkDiscounts.map((discount, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">{discount.threshold}</div>
                    <div className="text-green-600 font-semibold">{discount.discount}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Free shipping automatically applied at checkout
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Nyle Buyer Protection
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>30-day hassle-free returns</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Full refund for damaged items</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free return shipping for defects</span>
                </li>
              </ul>
              <button className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Policy Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {policyPoints.map((policy, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className={`inline-flex p-3 rounded-lg ${policy.bgColor} mb-3`}>
                <policy.icon className={`h-5 w-5 ${policy.color}`} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{policy.title}</h4>
              <p className="text-sm text-gray-600">{policy.description}</p>
            </div>
          ))}
        </div>

        {/* Key Policies Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Delivery Policies
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Transparent Fees</h4>
                  <p className="text-gray-600 text-sm">
                    All shipping fees shown before purchase with no hidden charges
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Free Bulk Delivery</h4>
                  <p className="text-gray-600 text-sm">
                    Free standard shipping for bulk or premium-tier orders
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Easy Returns</h4>
                  <p className="text-gray-600 text-sm">
                    Simple return process under Nyle Buyer Protection
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Live Updates</h4>
                  <p className="text-gray-600 text-sm">
                    SMS & email delivery updates at every step of the way
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">We Value Your Trust</h3>
                <p className="text-gray-600">Honest, fair, and fast shipping</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                At Nyle, we believe that reliable shipping is the foundation of trust. 
                That's why we're committed to keeping our shipping policies transparent, 
                our rates fair, and our delivery timelines honest.
              </p>
              
              <div className="p-4 bg-white/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Our Promise</span>
                </div>
                <p className="text-sm text-gray-600">
                  If we don't deliver within the promised timeline, you get 20% off your next shipping.
                </p>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                View Full Shipping Policy
              </button>
            </div>
          </div>
        </div>

        {/* International Shipping */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">International Shipping</h3>
                <p className="text-blue-100">
                  Shipping to East Africa, Europe, and beyond
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
              Explore International Rates
            </button>
          </div>
        </div>
      </div>
    </BuyerInfoLayout>
  );
}