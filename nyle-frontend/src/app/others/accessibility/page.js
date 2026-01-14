"use client";

import { motion } from "framer-motion";
import { Accessibility, Eye, Ear, MousePointer, Keyboard, Smartphone, Globe, CheckCircle, Award, ArrowLeft, Volume2, ZoomIn } from "lucide-react";
import Link from "next/link";

export default function AccessibilityPage() {
  const features = [
    {
      icon: <Eye />,
      title: "Visual Accessibility",
      color: "from-blue-500 to-cyan-500",
      features: [
        "High contrast mode support",
        "Text resizing up to 200%",
        "Screen reader compatibility",
        "Color blindness friendly palette"
      ]
    },
    {
      icon: <Ear />,
      title: "Auditory Accessibility",
      color: "from-blue-600 to-indigo-600",
      features: [
        "Video captioning available",
        "Audio descriptions",
        "Volume control independence",
        "Visual alerts for sounds"
      ]
    },
    {
      icon: <MousePointer />,
      title: "Motor Accessibility",
      color: "from-indigo-600 to-purple-600",
      features: [
        "Keyboard navigation support",
        "Voice command compatibility",
        "Large clickable areas",
        "Reduced motion options"
      ]
    },
    {
      icon: <Smartphone />,
      title: "Cognitive Accessibility",
      color: "from-cyan-500 to-blue-500",
      features: [
        "Simple, consistent navigation",
        "Clear error messages",
        "Reading assistance tools",
        "Focus management"
      ]
    }
  ];

  const compliance = [
    { standard: "WCAG 2.1", level: "AA", status: "Fully Compliant", color: "bg-green-100 text-green-800" },
    { standard: "ADA Title III", level: "", status: "Compliant", color: "bg-green-100 text-green-800" },
    { standard: "Section 508", level: "", status: "Fully Compliant", color: "bg-green-100 text-green-800" },
    { standard: "EN 301 549", level: "", status: "Compliant", color: "bg-blue-100 text-blue-800" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white py-20 overflow-hidden">
        {/* Accessibility Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ♿
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Accessibility className="h-8 w-8" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Accessibility Statement
              </h1>
            </div>
            
            <p className="text-xl text-blue-100/90 max-w-3xl mx-auto mb-8">
              Nyle Store is committed to making our website accessible to everyone, regardless of ability or technology.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all">
                <ArrowLeft className="inline mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="container mx-auto px-6 -mt-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Accessibility Certified</h2>
                <p className="text-gray-600">We meet international accessibility standards</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {compliance.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-lg font-medium ${item.color}`}
                >
                  <div className="font-bold">{item.standard}</div>
                  <div className="text-xs">{item.level} {item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Features Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Accessibility Features
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <ul className="space-y-3">
                        {feature.features.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Globe className="h-8 w-8" />
                Quick Accessibility Settings
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Volume2 className="h-6 w-6" />
                    <h4 className="font-bold text-lg">Audio Settings</h4>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition">
                      Enable Audio Descriptions
                    </button>
                    <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition">
                      Adjust Volume Limits
                    </button>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ZoomIn className="h-6 w-6" />
                    <h4 className="font-bold text-lg">Visual Settings</h4>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition">
                      Increase Text Size
                    </button>
                    <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition">
                      High Contrast Mode
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Accessibility className="h-5 w-5 text-blue-600" />
                  Need Help?
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">Accessibility Team</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Our team is here to help you navigate our platform.
                    </p>
                    <a href="mailto:accessibility@nylestore.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      accessibility@nylestore.com
                    </a>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">Feedback</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Help us improve by sharing your accessibility experience.
                    </p>
                    <button className="w-full px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition">
                      Share Feedback
                    </button>
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Keyboard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Keyboard Shortcuts</h4>
                    <p className="text-sm text-gray-600">Navigate without a mouse</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span>Skip to main content</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Alt + 1</kbd>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span>Search products</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Alt + S</kbd>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span>Accessibility menu</span>
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Alt + A</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ongoing Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Ongoing Commitment
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Continuous Testing</h3>
              <p className="text-gray-600">
                We regularly test our platform with assistive technologies and user groups.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-4 bg-green-100 rounded-2xl mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Global Standards</h3>
              <p className="text-gray-600">
                We adhere to international accessibility standards and guidelines.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-4 bg-purple-100 rounded-2xl mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">User Feedback</h3>
              <p className="text-gray-600">
                We actively seek and implement feedback from users with disabilities.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}