"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaStore, FaUser, FaEnvelope, FaPhone, FaBriefcase,
  FaCheckCircle, FaGlobe, FaClock, FaPaperPlane,
  FaHandshake, FaChartLine, FaShieldAlt, FaTruck
} from "react-icons/fa";
import countriesList from 'all-countries-list';

// Import flags
import * as Flags from 'country-flag-icons/react/3x2';

// Convert the countries data to our format
const countries = Object.values(countriesList).map(country => ({
  name: country.name,
  code: country.code,
  dialCode: country.dialCode
})).sort((a, b) => a.name.localeCompare(b.name));

export const dynamic = 'force-dynamic';

export default function VendorInterest() {
  const INACTIVITY_LIMIT_MS = 10 * 60 * 1000;
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    business_name: "",
    email: "",
    business_email: "",
    phone_number: "",
    business_phone: "",
    location_country: "",
    location_city: "",
    agree_terms: false,
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedBusinessCountry, setSelectedBusinessCountry] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [businessPhoneError, setBusinessPhoneError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const inactivityTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const hiddenAtRef = useRef(null);
  const hasExpiredRef = useRef(false);

  // Update personal phone when country changes
  useEffect(() => {
    if (selectedCountry) {
      setForm(prev => ({
        ...prev,
        phone_number: selectedCountry.dialCode
      }));
    }
  }, [selectedCountry]);

  // Update business phone when country changes
  useEffect(() => {
    if (selectedBusinessCountry) {
      setForm(prev => ({
        ...prev,
        business_phone: selectedBusinessCountry.dialCode
      }));
    }
  }, [selectedBusinessCountry]);

  useEffect(() => {
    const resetFormForSecurity = () => {
      setForm({
        full_name: "",
        business_name: "",
        email: "",
        business_email: "",
        phone_number: "",
        business_phone: "",
        location_country: "",
        location_city: "",
        agree_terms: false,
      });
      setSelectedCountry(null);
      setSelectedBusinessCountry(null);
      setPhoneError("");
      setBusinessPhoneError("");
    };

    const expireSession = () => {
      if (hasExpiredRef.current || success || loading) return;
      hasExpiredRef.current = true;

      resetFormForSecurity();
      setError("Session expired after 10 minutes of inactivity for your security. Redirecting to home...");

      setTimeout(() => {
        router.replace("/");
      }, 1800);
    };

    const resetInactivity = () => {
      if (success) return;
      lastActivityRef.current = Date.now();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(expireSession, INACTIVITY_LIMIT_MS);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        hiddenAtRef.current = Date.now();
        return;
      }

      const hiddenAt = hiddenAtRef.current;
      hiddenAtRef.current = null;
      if (hiddenAt && Date.now() - hiddenAt >= INACTIVITY_LIMIT_MS) {
        expireSession();
        return;
      }

      if (Date.now() - lastActivityRef.current >= INACTIVITY_LIMIT_MS) {
        expireSession();
        return;
      }

      resetInactivity();
    };

    const handleActivity = () => resetInactivity();

    const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click", "input"];
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, { passive: true });
    });
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleVisibility);
    resetInactivity();

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
    };
  }, [router, success, loading]);

  const handleCountryChange = (e, type) => {
    const countryName = e.target.value;
    const country = countries.find(c => c.name === countryName);

    if (type === 'personal') {
      setSelectedCountry(country);
      setForm({
        ...form,
        location_country: countryName
      });
    } else {
      setSelectedBusinessCountry(country);
    }
  };

  const handlePhoneChange = (e, type) => {
    let value = e.target.value;
    const selectedCountryObj = type === 'personal' ? selectedCountry : selectedBusinessCountry;
    const errorSetter = type === 'personal' ? setPhoneError : setBusinessPhoneError;

    if (selectedCountryObj) {
      const dialCode = selectedCountryObj.dialCode;
      // If user tries to delete or modify dial code, reset it
      if (!value.startsWith(dialCode)) {
        value = dialCode;
      } else {
        // Allow only numbers after the dial code
        const numberPart = value.slice(dialCode.length).replace(/[^0-9]/g, '');
        value = dialCode + numberPart;
      }
    }

    setForm({
      ...form,
      [type === 'personal' ? 'phone_number' : 'business_phone']: value
    });

    // Basic validation
    if (selectedCountryObj && value.length > selectedCountryObj.dialCode.length) {
      const numberWithoutCode = value.replace(selectedCountryObj.dialCode, "");
      if (numberWithoutCode.length < 4) {
        errorSetter("Phone number is too short");
      } else {
        errorSetter("");
      }
    }
  };

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

    if (phoneError || businessPhoneError) {
      setError("Please enter valid phone numbers.");
      return;
    }

    setLoading(true);

    // Combine country and city for location
    const fullLocation = `${form.location_city}, ${form.location_country}`;

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
          location: fullLocation,
          country: form.location_country,
          city: form.location_city,
          type: form.location_country === "Kenya" ? "kenyan" : "overseas"
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
        location_country: "",
        location_city: "",
        agree_terms: false,
      });
      setSelectedCountry(null);
      setSelectedBusinessCountry(null);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4">
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

              {/* Location - Country First */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaGlobe className="mr-2 text-blue-600" />
                  Country *
                </label>
                <select
                  name="location_country"
                  value={form.location_country}
                  onChange={(e) => handleCountryChange(e, 'personal')}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select Country</option>
                  {countries.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name} ({country.dialCode})
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaGlobe className="mr-2 text-blue-600" />
                  City *
                </label>
                <input
                  type="text"
                  name="location_city"
                  placeholder="e.g., Nairobi, London, New York"
                  value={form.location_city}
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
                <div className="relative">
                  {selectedCountry && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                      {(() => {
                        const Flag = Flags[selectedCountry.code];
                        return Flag ? <Flag className="w-6 h-4 mr-2" /> : null;
                      })()}
                    </div>
                  )}
                  <input
                    type="tel"
                    name="phone_number"
                    value={form.phone_number}
                    onChange={(e) => handlePhoneChange(e, 'personal')}
                    required
                    disabled={!selectedCountry}
                    placeholder={!selectedCountry ? "Select country first" : "Enter number after code"}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${selectedCountry ? 'pl-14' : ''
                      } ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                )}
                {!selectedCountry && (
                  <p className="mt-1 text-sm text-gray-500">Please select your country first</p>
                )}
              </div>

              {/* Business Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaPhone className="mr-2 text-blue-600" />
                  Business Phone Number *
                </label>
                <div className="relative">
                  {selectedBusinessCountry && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                      {(() => {
                        const Flag = Flags[selectedBusinessCountry.code];
                        return Flag ? <Flag className="w-6 h-4 mr-2" /> : null;
                      })()}
                    </div>
                  )}
                  <select
                    onChange={(e) => handleCountryChange(e, 'business')}
                    value={selectedBusinessCountry?.name || ""}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-24 opacity-0 cursor-pointer"
                  >
                    <option value="">Select</option>
                    {countries.map((country, i) => (
                      <option key={i} value={country.name}>
                        {country.name} ({country.dialCode})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="business_phone"
                    value={form.business_phone}
                    onChange={(e) => handlePhoneChange(e, 'business')}
                    required
                    disabled={!selectedBusinessCountry}
                    placeholder={!selectedBusinessCountry ? "Select country first" : "Enter number after code"}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${selectedBusinessCountry ? 'pl-14' : ''
                      } ${businessPhoneError ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {businessPhoneError && (
                  <p className="mt-1 text-sm text-red-600">{businessPhoneError}</p>
                )}
                {!selectedBusinessCountry && (
                  <p className="mt-1 text-sm text-gray-500">Please select your country first</p>
                )}
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
                  <a href="vendor/terms" className="text-blue-600 hover:underline font-medium">
                    Terms & Conditions
                  </a>
                  {" "}and{" "}
                  <a href="vendor/privacy" className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                  </a>
                  . I understand that Nyle will contact me within 3 business days.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !selectedCountry || !selectedBusinessCountry || phoneError || businessPhoneError}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center ${loading || !selectedCountry || !selectedBusinessCountry || phoneError || businessPhoneError
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
