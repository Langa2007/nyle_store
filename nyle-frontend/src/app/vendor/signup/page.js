"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaStore, FaUser, FaEnvelope, FaPhone, FaBriefcase,
  FaCheckCircle, FaGlobe, FaClock, FaPaperPlane,
  FaHandshake, FaChartLine, FaShieldAlt, FaTruck
} from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default function VendorInterest() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    business_name: "",
    email: "",
    business_email: "",
    phone_number: "",
    business_phone: "",
    location: "",
    agree_terms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.agree_terms) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true);

    // Real API call
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com"}/api/vendor-leads/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name,
          business_name: form.business_name,
          email: form.email,
          business_email: form.business_email,
          phone: form.phone_number,
          business_phone: form.business_phone,
          location: form.location,
          type: form.location.toLowerCase().includes("kenya") ? "kenyan" : "overseas"
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Submission failed");
      }

      setSuccess(true);
      setForm({
        full_name: "",
        business_name: "",
        email: "",
        business_email: "",
        phone_number: "",
        business_phone: "",
        location: "",
        agree_terms: false,
      });

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-4xl text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-700 mb-4">
            We've received your interest to sell on Nyle.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <FaClock className="text-3xl text-blue-600 mx-auto mb-3" />
            <p className="text-gray-800 font-semibold mb-2">
              Nyle will get back to you within 3 business days
            </p>
            <p className="text-gray-600 text-sm">
              The signup link will be sent to your email based on your location.
              Our team will review your request and contact you shortly.
            </p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4 hidden md:block">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Benefits & Info */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sell on <span className="text-blue-600">Nyle</span>
            </h1>
            <p className="text-xl text-gray-600">
              Join Africa's fastest growing marketplace and reach millions of customers
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaHandshake className="mr-3" />
              Why Sell With Us?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <FaChartLine className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Reach Millions</h3>
                  <p className="text-blue-100">Access our growing customer base across Africa.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <FaTruck className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Logistics Support</h3>
                  <p className="text-blue-100">We help with delivery and shipping solutions.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <FaShieldAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Payments</h3>
                  <p className="text-blue-100">Get paid securely with multiple payment options.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">1</div>
                <p className="text-gray-700">Submit your interest form below</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">2</div>
                <p className="text-gray-700">Our team reviews your request (within 3 business days)</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">3</div>
                <p className="text-gray-700">We send you the signup link via email</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">4</div>
                <p className="text-gray-700">Complete your registration and start selling</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interest Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FaStore className="mr-3" />
              Express Your Interest
            </h2>
            <p className="text-blue-100">Fill in your details and we'll get back to you</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaUser className="mr-2 text-blue-600" />
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaBriefcase className="mr-2 text-blue-600" />
                  Business Name *
                </label>
                <input
                  type="text"
                  name="business_name"
                  placeholder="Enter your business name"
                  value={form.business_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Personal Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-blue-600" />
                  Your Personal Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Business Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-blue-600" />
                  Business Email *
                </label>
                <input
                  type="email"
                  name="business_email"
                  placeholder="business@company.com"
                  value={form.business_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Personal Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaPhone className="mr-2 text-blue-600" />
                  Your Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="+254 7XX XXX XXX"
                  value={form.phone_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Business Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaPhone className="mr-2 text-blue-600" />
                  Business Phone Number *
                </label>
                <input
                  type="tel"
                  name="business_phone"
                  placeholder="+254 7XX XXX XXX"
                  value={form.business_phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaGlobe className="mr-2 text-blue-600" />
                  Your Location (Country/City) *
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Nairobi, Kenya or London, UK"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">We'll send the appropriate signup link based on your location</p>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agree_terms"
                  id="agree_terms"
                  checked={form.agree_terms}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <label htmlFor="agree_terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline font-medium">
                    Terms & Conditions
                  </a>
                  {" "}and{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                  </a>
                  . I understand that Nyle will contact me within 3 business days.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                  } text-white`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Submit Interest
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-3xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Already have an account? <a href="/vendor/login" className="text-blue-600 hover:underline">Sign in here</a></p>
        <p className="mt-2">Need help? Contact us at <span className="text-blue-600">support@nyle.co.ke</span></p>
      </div>
    </div>
  );
}