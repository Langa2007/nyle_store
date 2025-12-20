"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";
import { 
  Truck, 
  MapPin, 
  Shield, 
  Clock, 
  Zap, 
  Package, 
  Globe, 
  DollarSign,
  CheckCircle,
  BarChart,
  TrendingUp,
  Users,
  Target,
  Award
} from "lucide-react";

export default function LogisticsPage() {
  const [activeTab, setActiveTab] = useState("domestic");
  const [selectedService, setSelectedService] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState("--");
  const [weight, setWeight] = useState("");
  const [distance, setDistance] = useState("");

  const logisticsStats = [
    { label: "Orders Delivered", value: "45K+", icon: Package, color: "text-blue-600", change: "+15%" },
    { label: "Avg Delivery Time", value: "2.3 days", icon: Clock, color: "text-green-600", change: "-20%" },
    { label: "Coverage Areas", value: "47", icon: MapPin, color: "text-purple-600", change: "+8" },
    { label: "Success Rate", value: "99.2%", icon: Award, color: "text-orange-600", change: "+0.5%" },
  ];

  const serviceTypes = [
    { 
      id: "express", 
      name: "Express Delivery", 
      description: "Same-day or next-day delivery",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      price: "From KES 500",
      features: ["Same-day delivery", "Real-time tracking", "Priority handling"]
    },
    { 
      id: "standard", 
      name: "Standard Delivery", 
      description: "2-4 business days",
      icon: Truck,
      color: "from-green-500 to-emerald-500",
      price: "From KES 300",
      features: ["2-4 day delivery", "Email updates", "Standard insurance"]
    },
    { 
      id: "freight", 
      name: "Freight & Bulk", 
      description: "Large quantity shipments",
      icon: Package,
      color: "from-orange-500 to-amber-500",
      price: "Custom quote",
      features: ["Pallet shipping", "Warehouse pickup", "Volume discounts"]
    },
    { 
      id: "international", 
      name: "International", 
      description: "Cross-border shipping",
      icon: Globe,
      color: "from-purple-500 to-pink-500",
      price: "From KES 1,500",
      features: ["Customs clearance", "Door-to-door", "Export documentation"]
    },
  ];

  const coverageAreas = [
    { region: "Nairobi Metro", delivery: "1-2 days", icon: "📍" },
    { region: "Mombasa & Coast", delivery: "2-3 days", icon: "🏖️" },
    { region: "Kisumu & Western", delivery: "3-4 days", icon: "🌊" },
    { region: "Nakuru & Rift Valley", delivery: "2-3 days", icon: "⛰️" },
    { region: "East Africa Region", delivery: "5-7 days", icon: "🌍" },
  ];

  const trackingSteps = [
    { step: 1, title: "Order Placed", description: "We receive your order details", status: "completed" },
    { step: 2, title: "Pickup Scheduled", description: "Driver assigned for collection", status: "completed" },
    { step: 3, title: "In Transit", description: "Package is on the way to hub", status: "current" },
    { step: 4, title: "Out for Delivery", description: "Final delivery to your location", status: "pending" },
    { step: 5, title: "Delivered", description: "Package received successfully", status: "pending" },
  ];

  const calculateCost = () => {
    if (weight && distance) {
      const base = 200;
      const weightCost = parseFloat(weight) * 50;
      const distanceCost = parseFloat(distance) * 20;
      const total = base + weightCost + distanceCost;
      setEstimatedCost(`KES ${total.toLocaleString()}`);
    }
  };

  useEffect(() => {
    calculateCost();
  }, [weight, distance]);

  return (
    <BuyerInfoLayout
      title="Logistics & Delivery"
      subtitle="From pickup to delivery — Nyle ensures smooth movement of your goods across Kenya and beyond."
      stats={logisticsStats}
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
                Reliable Logistics Solutions
              </h2>
              <p className="text-gray-600">
                We've partnered with Kenya's top logistics companies to ensure your goods move efficiently
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              Nyle coordinates with trusted logistics partners across Kenya and East Africa to 
              provide seamless shipping solutions. Whether you're moving goods locally or across 
              borders, we handle the coordination while you focus on growing your business.
            </p>
          </div>
        </motion.div>

        {/* Service Types */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Your Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceTypes.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedService(service.id)}
                className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${
                  selectedService === service.id 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.color} mb-3`}>
                  <service.icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <div className="text-lg font-bold text-gray-900 mb-3">{service.price}</div>
                <ul className="space-y-1 text-sm text-gray-600">
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

        {/* Cost Calculator */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Shipping Cost Estimator
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Weight (kg)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g., 5"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">kg</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance (km)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="e.g., 150"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">km</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all">
                      <option>Select service</option>
                      {serviceTypes.map(service => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{estimatedCost}</div>
                    <p className="text-gray-600 mb-4">Estimated Shipping Cost</p>
                    
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Base fee:</span>
                        <span className="font-medium">KES 200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight charge:</span>
                        <span className="font-medium">KES {weight ? (parseFloat(weight) * 50).toLocaleString() : '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance charge:</span>
                        <span className="font-medium">KES {distance ? (parseFloat(distance) * 20).toLocaleString() : '0'}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{estimatedCost}</span>
                      </div>
                    </div>

                    <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                      Schedule Pickup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coverage Areas */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Coverage Areas
              </h4>
              <div className="space-y-3">
                {coverageAreas.map((area, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{area.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{area.region}</div>
                        <div className="text-sm text-gray-600">Delivery: {area.delivery}</div>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-300" />
                Insurance Included
              </h4>
              <p className="text-blue-100 text-sm mb-4">
                All shipments include basic insurance coverage up to KES 50,000
              </p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors">
                Upgrade Coverage
              </button>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">How Tracking Works</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-4 md:ml-6" />
            
            <div className="space-y-8">
              {trackingSteps.map((step) => (
                <div key={step.step} className="relative flex items-start gap-4">
                  <div className={`relative z-10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === 'completed' ? 'bg-green-100 border-2 border-green-500' :
                    step.status === 'current' ? 'bg-blue-100 border-2 border-blue-500' :
                    'bg-gray-100 border-2 border-gray-300'
                  }`}>
                    <div className={`text-sm font-bold ${
                      step.status === 'completed' ? 'text-green-700' :
                      step.status === 'current' ? 'text-blue-700' :
                      'text-gray-500'
                    }`}>
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      {step.status === 'completed' && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Completed
                        </span>
                      )}
                      {step.status === 'current' && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Key Benefits
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Target className="h-4 w-4 text-green-500" />
                <span>Real-time tracking across Kenya and East Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Insurance included with every shipment</span>
              </li>
              <li className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-purple-500" />
                <span>Pay once — shipping and insurance included</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-orange-500" />
                <span>Export assistance for cross-border trade</span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="h-4 w-4 text-pink-500" />
                <span>Dedicated support for logistics queries</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <BarChart className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-bold text-gray-900">Reliable Business Growth</h4>
                <p className="text-sm text-gray-600">With Nyle, every order moves on time</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Reliable logistics = reliable business.</strong> Our 99.2% on-time 
              delivery rate ensures your customers stay happy and your business keeps growing.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Start Shipping Today
            </button>
          </div>
        </div>
      </div>
    </BuyerInfoLayout>
  );
}