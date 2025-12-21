"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Truck, 
  ArrowRight, 
  MapPin, 
  Clock, 
  DollarSign, 
  Package, 
  Shield, 
  Zap, 
  TrendingUp,
  Users,
  BarChart,
  Globe,
  CheckCircle,
  ChevronRight,
  Calculator,
  Download,
  MessageSquare,
  Eye,
  Bell,
  Award,
  Smartphone
} from "lucide-react";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function ShippingLogisticsPage() {
  const [selectedRegion, setSelectedRegion] = useState("nairobi");
  const [packageWeight, setPackageWeight] = useState(2);
  const [packageValue, setPackageValue] = useState(5000);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("1-2 days");
  const [activeTab, setActiveTab] = useState("domestic");

  const logisticsStats = [
    { label: "Orders Delivered", value: "45K+", icon: Truck, color: "text-blue-600", change: "+15%" },
    { label: "Avg Delivery Time", value: "2.3 days", icon: Clock, color: "text-green-600", change: "-20%" },
    { label: "Coverage Areas", value: "47", icon: MapPin, color: "text-purple-600", change: "+8" },
    { label: "Success Rate", value: "99.2%", icon: Award, color: "text-orange-600", change: "+0.5%" },
  ];

  const regions = [
    { id: "nairobi", name: "Nairobi Metro", delivery: "1-2 days", icon: "🏙️", baseCost: 300 },
    { id: "mombasa", name: "Mombasa & Coast", delivery: "2-3 days", icon: "🏖️", baseCost: 450 },
    { id: "kisumu", name: "Kisumu & Western", delivery: "3-4 days", icon: "🌊", baseCost: 500 },
    { id: "nakuru", name: "Nakuru & Rift Valley", delivery: "2-3 days", icon: "⛰️", baseCost: 400 },
    { id: "remote", name: "Remote Areas", delivery: "5-7 days", icon: "🗺️", baseCost: 600 },
    { id: "international", name: "East Africa", delivery: "7-14 days", icon: "🌍", baseCost: 1200 },
  ];

  const services = [
    {
      id: "standard",
      name: "Standard Delivery",
      description: "Economical shipping with tracking",
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      features: ["Door-to-door delivery", "Basic insurance", "Email updates"]
    },
    {
      id: "express",
      name: "Express Delivery",
      description: "Priority handling for urgent shipments",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      features: ["Next-day delivery", "Real-time tracking", "Phone notifications"]
    },
    {
      id: "premium",
      name: "Premium Logistics",
      description: "Full-service logistics solution",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      features: ["White-glove service", "Premium insurance", "Dedicated support"]
    },
    {
      id: "bulk",
      name: "Bulk Shipping",
      description: "Cost-effective for large volumes",
      icon: Truck,
      color: "from-orange-500 to-amber-500",
      features: ["Volume discounts", "Scheduled pickups", "Bulk tracking"]
    },
  ];

  const partners = [
    { name: "G4S Kenya", service: "Secure Logistics", coverage: "National", rating: 4.8 },
    { name: "DHL Kenya", service: "International", coverage: "Global", rating: 4.9 },
    { name: "Sendy", service: "Last-mile Delivery", coverage: "Urban", rating: 4.6 },
    { name: "Sahara Courier", service: "Domestic", coverage: "National", rating: 4.7 },
  ];

  const trackingSteps = [
    { step: 1, status: "Order Received", time: "9:00 AM", location: "Seller Warehouse", completed: true },
    { step: 2, status: "Package Collected", time: "11:30 AM", location: "Pickup Point", completed: true },
    { step: 3, status: "In Transit", time: "2:00 PM", location: "Sorting Hub", completed: false },
    { step: 4, status: "Out for Delivery", time: "Tomorrow", location: "Local Depot", completed: false },
    { step: 5, status: "Delivered", time: "Estimated", location: "Customer Address", completed: false },
  ];

  const calculateCost = () => {
    const region = regions.find(r => r.id === selectedRegion);
    let cost = region.baseCost;
    
    // Weight based calculation
    if (packageWeight <= 1) cost += 0;
    else if (packageWeight <= 5) cost += packageWeight * 50;
    else if (packageWeight <= 10) cost += packageWeight * 40;
    else cost += packageWeight * 30;
    
    // Insurance (0.5% of value)
    const insurance = packageValue * 0.005;
    
    // Service premium
    if (activeTab === "express") cost *= 1.5;
    else if (activeTab === "premium") cost *= 2;
    
    return Math.round(cost + insurance);
  };

  const calculateTime = () => {
    const region = regions.find(r => r.id === selectedRegion);
    let days = parseInt(region.delivery.split('-')[0]);
    
    if (activeTab === "express") days = Math.max(1, Math.floor(days / 2));
    if (packageWeight > 10) days += 1;
    
    return days === 1 ? "1 day" : `${days}-${days + 1} days`;
  };

  useEffect(() => {
    setEstimatedCost(calculateCost());
    setEstimatedTime(calculateTime());
  }, [selectedRegion, packageWeight, packageValue, activeTab]);

  return (
    <VendorInfoLayout
      title="Shipping & Logistics"
      subtitle="Simplify your delivery process with Nyle's smart logistics network."
      stats={logisticsStats}
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium mb-4">
            <Truck className="h-4 w-4" />
            Partnered with Kenya's Top Logistics Companies
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Seamless Deliveries. Happier Customers.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            We've partnered with trusted logistics providers to ensure your products reach customers 
            fast, safely, and affordably. Whether it's across the city or across Kenya — Nyle's 
            logistics system is built to scale with your growth.
          </p>
        </motion.div>

        {/* Cost Calculator */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            Shipping Cost Calculator
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Package Weight (kg)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0.5"
                      max="20"
                      step="0.5"
                      value={packageWeight}
                      onChange={(e) => setPackageWeight(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0.5 kg</span>
                      <span className="font-medium">{packageWeight} kg</span>
                      <span>20 kg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Package Value (KES)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={packageValue}
                      onChange={(e) => setPackageValue(parseInt(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>

              {/* Region Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Delivery Region
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region.id)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        selectedRegion === region.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{region.icon}</div>
                      <div className="font-medium text-gray-900 text-sm">{region.name}</div>
                      <div className="text-xs text-gray-600">{region.delivery}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Service Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveTab(service.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        activeTab === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${service.color} mb-2`}>
                        <service.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="font-medium text-gray-900 text-sm">{service.name}</div>
                      <div className="text-xs text-gray-600">{service.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  KES {estimatedCost.toLocaleString()}
                </div>
                <p className="text-gray-600">Estimated Shipping Cost</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Delivery Time:</span>
                  <span className="font-medium">{estimatedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Insurance:</span>
                  <span className="font-medium">KES {Math.round(packageValue * 0.005).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Region:</span>
                  <span className="font-medium">{regions.find(r => r.id === selectedRegion)?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Service:</span>
                  <span className="font-medium">{services.find(s => s.id === activeTab)?.name}</span>
                </div>
              </div>

              <div className="p-4 bg-white/50 rounded-xl border border-blue-100 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-gray-900">Included Features</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  {services.find(s => s.id === activeTab)?.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                Schedule Pickup
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Comprehensive Shipping Solutions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.color} mb-4`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {service.features.map((feature, i) => (
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

        {/* Partners Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Trusted Logistics Partners</h2>
              <p className="text-gray-600">We work with the best in the industry</p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <Globe className="h-5 w-5" />
              <span>National Coverage</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-gray-900">{partner.name}</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{partner.rating}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Package className="h-3 w-3 text-blue-500" />
                    <span>{partner.service}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-green-500" />
                    <span>{partner.coverage} Coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-purple-500" />
                    <span>Verified Partner</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Tracking Demo */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            Live Order Tracking
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-4 md:ml-6" />
            
            <div className="space-y-8">
              {trackingSteps.map((step) => (
                <div key={step.step} className="relative flex items-start gap-4">
                  <div className={`relative z-10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-gray-100 border-2 border-gray-300'
                  }`}>
                    <div className={`text-sm font-bold ${
                      step.completed ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">{step.status}</h4>
                      <span className="text-sm text-gray-500">{step.time}</span>
                    </div>
                    <p className="text-gray-600">{step.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Smartphone className="h-4 w-4" />
                <span>Track in real-time via vendor app</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                Get Support
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Scale Your Business</h3>
                <p className="text-gray-600">From local to nationwide shipping</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BarChart className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Volume Discounts</div>
                  <div className="text-sm text-gray-600">Save up to 40% on bulk shipments</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Dedicated Support</div>
                  <div className="text-sm text-gray-600">24/7 logistics assistance</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Fast Onboarding</div>
                  <div className="text-sm text-gray-600">Start shipping in 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6" />
              <div>
                <h3 className="text-xl font-bold text-white">Protected Shipments</h3>
                <p className="text-blue-100">Your goods are safe with us</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-blue-100">
                Every shipment includes basic insurance coverage up to KES 50,000. 
                Premium insurance options available for high-value items.
              </p>
              
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-white" />
                  <span className="font-semibold">Guaranteed Delivery</span>
                </div>
                <p className="text-sm text-blue-100">
                  99.2% on-time delivery rate with compensation for delays
                </p>
              </div>
              
              <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-shadow">
                View Insurance Options
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Simplify Your Shipping?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of vendors who trust Nyle for reliable, affordable, 
            and efficient logistics solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vendor/signup"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              <ArrowRight className="h-5 w-5" />
              Start Shipping with Nyle
            </Link>
            
            <button className="inline-flex items-center justify-center gap-3 bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all">
              <Download className="h-5 w-5" />
              Download Rate Card
            </button>
          </div>
          
          <p className="text-gray-500 text-sm mt-6">
            No setup fees • No minimum volume • Free pickup in major cities
          </p>
        </div>
      </div>
    </VendorInfoLayout>
  );
}

// Missing Star icon component
const Star = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);