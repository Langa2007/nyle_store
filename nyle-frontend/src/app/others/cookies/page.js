"use client";

import { Cookie, Settings, Shield, Eye, Trash2, CheckCircle, RefreshCw } from "lucide-react";
import FooterInfoLayout from "@/components/footer/FooterInfoLayout";
import { useState } from "react";

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true
  });

  const cookieTypes = [
    {
      type: "necessary",
      name: "Strictly Necessary Cookies",
      icon: <Shield />,
      color: "from-blue-500 to-cyan-500",
      description: "Essential for website functionality",
      examples: ["Session management", "Security features", "Shopping cart"]
    },
    {
      type: "analytics",
      name: "Analytics Cookies",
      icon: <Eye />,
      color: "from-blue-600 to-indigo-600",
      description: "Help us understand how visitors interact",
      examples: ["Visitor counts", "Page views", "Bounce rates"]
    },
    {
      type: "marketing",
      name: "Marketing Cookies",
      icon: <Cookie />,
      color: "from-indigo-600 to-purple-600",
      description: "Used to deliver relevant advertisements",
      examples: ["Ad targeting", "Campaign measurement", "Social media integration"]
    },
    {
      type: "preferences",
      name: "Preference Cookies",
      icon: <Settings />,
      color: "from-cyan-500 to-blue-500",
      description: "Remember your settings and preferences",
      examples: ["Language selection", "Currency settings", "Theme preferences"]
    }
  ];

  const handleToggle = (type) => {
    if (type !== "necessary") {
      setCookiePreferences(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
    }
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify(cookiePreferences));
    alert('Cookie preferences saved!');
  };

  const handleReset = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: false,
      preferences: true
    });
  };

  return (
    <FooterInfoLayout
      title="Cookie Policy"
      subtitle="We use cookies to enhance your browsing experience. Learn about our cookie usage and manage your preferences."
      icon={<Cookie className="h-8 w-8" />}
      lastUpdated="January 15, 2026"
      category="Tracking & Preferences"
    >
      <div className="space-y-12">
        {/* Interactive Cookie Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cookie Settings</h2>
              <p className="text-gray-600">
                Customize your cookie preferences. Necessary cookies cannot be disabled.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie) => (
              <div
                key={cookie.type}
                className={`p-6 rounded-xl border-2 ${
                  cookie.type === "necessary" 
                    ? "border-blue-200 bg-blue-50" 
                    : "border-gray-200 hover:border-blue-300 transition-colors"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${cookie.color}`}>
                      {cookie.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{cookie.name}</h3>
                      <p className="text-sm text-gray-600">{cookie.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {cookie.type === "necessary" ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        Always On
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences[cookie.type]}
                          onChange={() => handleToggle(cookie.type)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-600"></div>
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cookie.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full border border-gray-200"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Are Cookies? */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain functionalities.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-3">How We Use Cookies</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Remember login sessions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Understand user preferences
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Improve website performance
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <h4 className="font-bold text-gray-900 mb-3">Cookie Lifespan</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Session cookies: Until browser close
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Persistent cookies: Up to 2 years
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Managing Cookies */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Managing Cookies
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">Browser Settings</h4>
              <p className="text-blue-100 mb-4">
                You can control cookies through your browser settings. Most browsers allow you to block or delete cookies.
              </p>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>Chrome: Settings → Privacy and Security → Cookies</li>
                <li>Firefox: Options → Privacy & Security → Cookies</li>
                <li>Safari: Preferences → Privacy → Cookies</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">Third-Party Cookies</h4>
              <p className="text-blue-100 mb-4">
                Some cookies are placed by third-party services like analytics and advertising partners.
              </p>
              <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:shadow transition">
                View Third Parties
              </button>
            </div>
          </div>
        </div>

        {/* Quick Guide & Clear Cookies */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Guide */}
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-blue-600" />
              Quick Guide
            </h3>
            
            <div className="space-y-4">
              {[
                { icon: "", text: "Cookies enhance your experience" },
                { icon: "", text: "You can manage preferences anytime" },
                { icon: "", text: "Settings sync across devices" },
                { icon: "", text: "Clear cookies via browser settings" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Cookies */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Trash2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Clear Cookies</h4>
                <p className="text-sm text-gray-600">Browser settings</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              You can clear all cookies stored by Nyle Store through your browser's settings.
            </p>
            <button className="w-full px-4 py-2 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition">
              Learn How
            </button>
          </div>
        </div>
      </div>
    </FooterInfoLayout>
  );
}