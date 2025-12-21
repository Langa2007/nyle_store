"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Download, 
  Bell, 
  BarChart, 
  MessageSquare, 
  Package, 
  Truck, 
  Zap,
  Shield,
  Clock,
  CheckCircle,
  QrCode,
  Apple,
  Play,
  ChevronRight,
  Sparkles,
  Users,
  Globe,
  Award
} from "lucide-react";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function VendorAppPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [downloadStats, setDownloadStats] = useState({
    downloads: "15K+",
    activeUsers: "8.5K+",
    rating: "4.8/5",
    countries: "3"
  });
  const [appVersion, setAppVersion] = useState("2.4.1");
  const [isComingSoon, setIsComingSoon] = useState(true);
  const [countdown, setCountdown] = useState("Q1 2024");

  const appFeatures = [
    {
      icon: BarChart,
      title: "Real-time Analytics",
      description: "Track sales, views, and performance metrics in real-time",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Update stock, add products, and manage listings on the go",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageSquare,
      title: "Customer Chat",
      description: "Instant messaging with buyers and order inquiries",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Bell,
      title: "Push Notifications",
      description: "Get instant alerts for new orders and messages",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Truck,
      title: "Shipping Management",
      description: "Track deliveries and update shipping status",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Monitor payments and settlements securely",
      color: "from-red-500 to-rose-500"
    },
  ];

  const platformStats = [
    { platform: "iOS", users: "4.2K", rating: "4.9", icon: Apple },
    { platform: "Android", users: "4.3K", rating: "4.7", icon: Play },
  ];

  const comingSoonFeatures = [
    { feature: "AI Sales Predictions", status: "In Development" },
    { feature: "Bulk Upload via CSV", status: "Coming Soon" },
    { feature: "Multi-store Management", status: "Planned" },
    { feature: "Advanced Reporting", status: "In Development" },
  ];

  const testimonials = [
    {
      name: "David Kimani",
      business: "Fashion Store Nairobi",
      quote: "The app cut my order processing time by 70%",
      rating: 5
    },
    {
      name: "Sarah Chen",
      business: "Tech Gadgets Ltd",
      quote: "Managing inventory on my phone has been a game-changer",
      rating: 5
    },
    {
      name: "James Omondi",
      business: "Organic Foods Kenya",
      quote: "Real-time notifications help me never miss an order",
      rating: 4
    },
  ];

  const faqs = [
    {
      question: "Is the app free to download?",
      answer: "Yes, the Nyle Vendor App is completely free for all registered sellers."
    },
    {
      question: "What devices are supported?",
      answer: "iOS 13+ and Android 8.0+ devices are fully supported."
    },
    {
      question: "Can I use the app offline?",
      answer: "Basic features work offline, with sync when you're back online."
    },
    {
      question: "How secure is the app?",
      answer: "Bank-level encryption and biometric login keep your data safe."
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % appFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VendorInfoLayout
      title="Vendor Mobile App"
      subtitle="Manage your business from anywhere, anytime with powerful mobile tools."
      stats={[
        { label: "App Downloads", value: downloadStats.downloads, icon: Download, color: "text-blue-600" },
        { label: "Active Users", value: downloadStats.activeUsers, icon: Users, color: "text-green-600" },
        { label: "App Rating", value: downloadStats.rating, icon: Award, color: "text-yellow-600" },
        { label: "Countries", value: downloadStats.countries, icon: Globe, color: "text-purple-600" },
      ]}
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Version {appVersion} Available Soon
            </div>

            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <Smartphone className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-4 md:right-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  📱
                </motion.div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Run Your Business on the Go
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
              The Nyle Vendor App gives you full control of your business — manage inventory, 
              respond to customers, track sales in real-time, and process orders from anywhere. 
              Stay connected, stay efficient, stay profitable.
            </p>

            {/* Download Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
              {Object.entries(downloadStats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                >
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Showcase */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Everything You Need in One App
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Features List */}
            <div className="space-y-4">
              {appFeatures.map((feature, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ x: 5 }}
                  className={`w-full p-5 rounded-xl border text-left transition-all ${
                    activeFeature === index
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    <ChevronRight className={`h-5 w-5 ${
                      activeFeature === index ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feature Preview */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <appFeaturesactiveFeature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {appFeatures[activeFeature].title}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {appFeatures[activeFeature].description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-300" />
                    <span className="text-blue-100">Instant updates and notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-300" />
                    <span className="text-blue-100">Bank-level security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-300" />
                    <span className="text-blue-100">24/7 availability</span>
                  </div>
                </div>

                {/* Mock Phone Display */}
                <div className="relative mx-auto w-48 h-96 bg-gray-900 rounded-3xl border-8 border-gray-700 overflow-hidden">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
                  
                  <div className="h-full pt-10 px-4">
                    <div className="space-y-4">
                      <div className="h-3 bg-blue-500/30 rounded-full"></div>
                      <div className="h-3 bg-blue-500/20 rounded-full w-3/4"></div>
                      <div className="h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-700 rounded-full"></div>
                        <div className="h-2 bg-gray-700 rounded-full"></div>
                        <div className="h-2 bg-gray-700 rounded-full w-1/2"></div>
                      </div>
                      <div className="h-6 bg-green-500/20 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid md:grid-cols-2 gap-8">
          {platformStats.map((platform, index) => {
            const PlatformIcon = platform.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <PlatformIcon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{platform.platform}</h3>
                      <p className="text-sm text-gray-600">Platform</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{platform.users}</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">App Rating</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${
                            i < Math.floor(parseFloat(platform.rating)) 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-gray-300'
                          }`} />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">{platform.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Download Size</span>
                    <span className="font-bold text-gray-900">
                      {platform.platform === "iOS" ? "85 MB" : "78 MB"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon Features */}
        {isComingSoon && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Coming Soon</h3>
                <p className="text-gray-600">Launching {countdown}</p>
              </div>
              <div className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                Beta Testing Open
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {comingSoonFeatures.map((feature, index) => (
                <div key={index} className="bg-white/50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{feature.feature}</span>
                    <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {feature.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>Expected Q1 2024</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                <Bell className="h-5 w-5" />
                Notify Me When Launched
              </button>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            What Sellers Are Saying
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${
                        i < testimonial.rating 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300'
                      }`} />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.business}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get the App Today
            </h2>
            
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join thousands of successful sellers managing their businesses smarter 
              with the Nyle Vendor App. Download now and transform how you run your 
              online store.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105">
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg">App Store</div>
                </div>
              </button>
              
              <button className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105">
                <Play className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg">Google Play</div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <QrCode className="h-12 w-12 mx-auto mb-2 text-blue-200" />
                <div className="text-sm text-blue-100">Scan QR Code</div>
              </div>
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 text-blue-200" />
                <div className="text-sm text-blue-100">Get SMS Link</div>
              </div>
              <div className="text-center">
                <Download className="h-12 w-12 mx-auto mb-2 text-blue-200" />
                <div className="text-sm text-blue-100">Direct Download</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
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