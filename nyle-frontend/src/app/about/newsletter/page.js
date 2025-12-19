// app/about/newsletter/page.js
"use client";

import { useState } from "react";
import AboutInfoLayout from "@/components/about/AboutInfoLayout";
import { Mail, Bell, TrendingUp, Users, Zap, Gift, CheckCircle, Clock, Globe, Target } from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [frequency, setFrequency] = useState("weekly");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, frequency }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
        // Reset status after 5 seconds
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(data.message || "error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const newsletterFeatures = [
    {
      icon: <TrendingUp />,
      title: "Market Trends",
      description: "Weekly analysis of Africa's eCommerce landscape",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap />,
      title: "Platform Updates",
      description: "First look at new features and tools",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users />,
      title: "Success Stories",
      description: "Real stories from thriving Nyle businesses",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Gift />,
      title: "Exclusive Offers",
      description: "Special discounts and early access deals",
      color: "from-orange-500 to-amber-500"
    },
  ];

  const recentIssues = [
    {
      title: "How Kenyan SMEs are Winning Online",
      date: "March 15, 2024",
      topic: "Success Stories",
      preview: "Discover how 5 local businesses grew 300%..."
    },
    {
      title: "Q1 2024 E-commerce Trends Report",
      date: "March 8, 2024",
      topic: "Market Analysis",
      preview: "Key insights from Africa's fastest-growing markets..."
    },
    {
      title: "New Payment Features Launched",
      date: "March 1, 2024",
      topic: "Platform Updates",
      preview: "Faster checkout and multi-currency support..."
    },
  ];

  return (
    <AboutInfoLayout
      title="Nyle Newsletter"
      subtitle="Stay ahead with insights, updates, and trade opportunities every week."
    >
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Mail className="text-white" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Africa's Commerce Intelligence</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Get first access to platform updates, trade events, vendor insights, and
                  exclusive offers. Join a growing community of 10,000+ entrepreneurs and buyers
                  shaping the digital future of Africa.
                </p>
                <p>
                  Our newsletter delivers actionable intelligence, success stories, and market
                  opportunities straight to your inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Bell className="text-blue-600" />
          What You'll Receive
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsletterFeatures.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl border border-blue-100 hover:shadow-xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50"></div>
              <div className="relative p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Form */}
      <div className="mb-12">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-10 text-white">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Subscribe to Weekly Insights</h3>
                <p className="text-blue-100 mb-6">
                  Join 10,000+ entrepreneurs getting Africa's commerce intelligence delivered weekly.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-blue-200 mb-2">Email Frequency</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "weekly", label: "Weekly Digest" },
                        { value: "biweekly", label: "Bi-weekly" },
                        { value: "monthly", label: "Monthly Report" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFrequency(option.value)}
                          className={`px-4 py-2 rounded-full transition-all ${
                            frequency === option.value
                              ? "bg-white text-blue-600 font-medium"
                              : "bg-white/20 hover:bg-white/30"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label className="block text-blue-200 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-white text-blue-700 px-6 py-4 rounded-lg font-bold hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Clock className="animate-spin" size={20} />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        Subscribe Now
                      </>
                    )}
                  </button>
                </form>

                {status === "success" && (
                  <div className="mt-4 p-4 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-400/30">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-300" size={20} />
                      <div>
                        <p className="font-medium text-white">🎉 Successfully Subscribed!</p>
                        <p className="text-green-200 text-sm mt-1">
                          Welcome to Nyle Insights! Check your inbox for confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="mt-4 p-4 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-400/30">
                    <div className="flex items-center gap-3">
                      <span className="text-red-300">⚠️</span>
                      <div>
                        <p className="font-medium text-white">Subscription Failed</p>
                        <p className="text-red-200 text-sm mt-1">
                          Please try again or contact support if issue persists.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Newsletter Issues</h3>
        <div className="space-y-4">
          {recentIssues.map((issue, index) => (
            <div key={index} className="group bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {issue.topic}
                          </span>
                          <span className="text-sm text-gray-500">{issue.date}</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {issue.title}
                        </h4>
                        <p className="text-gray-600 mt-2">{issue.preview}</p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Read Issue
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">10K+</div>
            <div className="text-gray-700 font-medium">Active Subscribers</div>
            <p className="text-sm text-gray-600 mt-1">Across 15 African countries</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">95%</div>
            <div className="text-gray-700 font-medium">Open Rate</div>
            <p className="text-sm text-gray-600 mt-1">Industry-leading engagement</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">4.8★</div>
            <div className="text-gray-700 font-medium">Reader Rating</div>
            <p className="text-sm text-gray-600 mt-1">Based on subscriber feedback</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">For Entrepreneurs</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span>Market trend analysis and predictions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span>Success stories and case studies</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span>Exclusive vendor opportunities</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span>Early access to platform features</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Globe className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">For Buyers</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span>Product updates and launches</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span>Exclusive discounts and offers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span>Buying guides and tips</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
              <span>Seasonal shopping insights</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Privacy Assurance */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="text-white" size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
            <p className="text-gray-700 mb-4">
              We respect your privacy. Your email is safe with us. We never share subscriber data,
              and you can unsubscribe anytime with one click. Our newsletter is 100% opt-in and GDPR compliant.
            </p>
            <div className="flex gap-4">
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                Privacy Policy
              </a>
              <a href="/unsubscribe" className="text-gray-600 hover:text-gray-800">
                Unsubscribe Anytime
              </a>
            </div>
          </div>
        </div>
      </div>
    </AboutInfoLayout>
  );
}