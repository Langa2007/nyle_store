"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaLock, FaCheckCircle, FaStore, FaShieldAlt, FaTruck, 
  FaChartLine, FaHandshake 
} from "react-icons/fa";

const counties = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Uasin Gishu", "Kericho",
  "Nyeri", "Meru", "Machakos", "Kakamega", "Bungoma", "Kisii", "Migori", "Embu",
  "Kitui", "Laikipia", "Garissa", "Mandera", "Wajir", "Marsabit", "Turkana",
  "Samburu", "Narok", "Kajiado", "Bomet", "Siaya", "Homa Bay", "Vihiga",
  "Busia", "Trans Nzoia", "Elgeyo Marakwet", "West Pokot", "Nandi",
  "Baringo", "Tharaka-Nithi", "Isiolo", "Tana River", "Kilifi", "Kwale",
  "Lamu", "Taita-Taveta", "Murang'a", "Nyandarua", "Kirinyaga"
];

const businessTypes = [
  "Electronics & Accessories", "Home & Garden", "Cutleries", "Beauty Products",
  "Construction, Building & Machinery", "Groceries", "Office Supplies",
  "Luggage & Bags", "Men's Wear", "Children's Wear", "Women's Outfit",
  "Sports Gears", "Farm Clothing", "Farm Equipment", "Computers", "Baby Products",
  "Household Items", "Phones & Tablets", "Other"
];

export const dynamic = 'force-dynamic';

export default function VendorSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    legal_name: "",
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    business_type: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[@$!%*?&]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(form.password)) {
      setError("Password must be at least 8 characters, contain uppercase, lowercase, numbers, and one special character.");
      return;
    }

    const urlToCall = `${process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com"}/api/vendor/auth/signup`;

    try {
      setLoading(true);

      const res = await fetch(urlToCall, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          legal_name: form.legal_name,
          company_name: form.company_name,
          contact_person: form.contact_person,
          email: form.email,
          phone: form.phone,
          address: form.address,
          country: form.country,
          business_type: form.business_type,
          password: form.password,
        }),
      });

      const raw = await res.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch (parseErr) {
        throw new Error(`Invalid JSON response from server: ${raw}`);
      }

      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Signup successful! A verification code has been sent to your email.");
      router.push(`/vendor/verify?email=${encodeURIComponent(form.email)}`);
      localStorage.setItem("vendorSignupEmail", form.email);
      
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-8 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Join <span className="text-blue-600">Nyle Store</span> Marketplace
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sell to thousands of customers, manage your business with powerful tools, 
          and grow your brand with Kenya's fastest-growing e-commerce platform.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Benefits */}
        <div className="lg:col-span-1 space-y-6">
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
                  <p className="text-blue-100">Access our growing customer base across Kenya.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <FaTruck className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Logistics Support</h3>
                  <p className="text-blue-100">Partner with trusted delivery services.</p>
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
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <FaStore className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Easy Management</h3>
                  <p className="text-blue-100">Powerful dashboard to manage orders and inventory.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Marketplace Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Active Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2K+</div>
                <div className="text-sm text-gray-600">Active Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Seller Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24h</div>
                <div className="text-sm text-gray-600">Support Response</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Signup Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <FaBuilding className="mr-3" />
                Seller Registration
              </h2>
              <p className="text-blue-100">Fill in your business details to get started</p>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaUser className="mr-2 text-blue-600" />
                      Legal Name *
                    </label>
                    <input
                      type="text"
                      name="legal_name"
                      placeholder="Enter legal business name"
                      value={form.legal_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaStore className="mr-2 text-blue-600" />
                      Company / Store Name *
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      placeholder="Enter your store name"
                      value={form.company_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaUser className="mr-2 text-blue-600" />
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contact_person"
                      placeholder="Full name of contact person"
                      value={form.contact_person}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaEnvelope className="mr-2 text-blue-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="business@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaPhone className="mr-2 text-blue-600" />
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+254 7XX XXX XXX"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      County *
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      title="Select your business county"
                    >
                      <option value="">Select County</option>
                      {counties.map((county, i) => (
                        <option key={i} value={county}>{county}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address & Business Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-600" />
                    Business Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street, Building, Town"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Category *
                  </label>
                  <select
                    name="business_type"
                    value={form.business_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    title="Select your business category"
                  >
                    <option value="">Select Business Type</option>
                    {businessTypes.map((type, i) => (
                      <option key={i} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Password Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaLock className="mr-2 text-blue-600" />
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    
                    {/* Password Strength Meter */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Password Strength</span>
                          <span>{passwordStrength}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                          <li className={form.password.length >= 8 ? "text-green-600" : ""}>
                            • At least 8 characters
                          </li>
                          <li className={/[A-Z]/.test(form.password) ? "text-green-600" : ""}>
                            • One uppercase letter
                          </li>
                          <li className={/[0-9]/.test(form.password) ? "text-green-600" : ""}>
                            • One number
                          </li>
                          <li className={/[@$!%*?&]/.test(form.password) ? "text-green-600" : ""}>
                            • One special character (@$!%*?&)
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <FaCheckCircle className="mr-2 text-blue-600" />
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      placeholder="Re-enter your password"
                      value={form.confirm_password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    {form.confirm_password && form.password === form.confirm_password && (
                      <p className="text-green-600 text-sm mt-2">✓ Passwords match</p>
                    )}
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="/vendor/terms" className="text-blue-600 hover:underline font-medium">
                      Terms & Conditions
                    </a>
                    {" "}and{" "}
                    <a href="/vendor/privacy" className="text-blue-600 hover:underline font-medium">
                      Privacy Policy
                    </a>
                    . I confirm that all information provided is accurate.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !acceptTerms}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                    loading || !acceptTerms
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                  } text-white`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Creating Your Seller Account...
                    </span>
                  ) : (
                    "Start Selling on Nyle"
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    Already have a seller account?{" "}
                    <a href="/vendor/login" className="text-blue-600 font-semibold hover:underline">
                      Sign in here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-3xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Your account will be verified within 24-48 hours. You'll receive access to your seller dashboard upon verification.</p>
        <p className="mt-2">Need help? Contact our seller support at <span className="text-blue-600">support@nyle.co.ke</span></p>
      </div>
    </div>
  );
}