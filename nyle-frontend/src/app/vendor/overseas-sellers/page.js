"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaBuilding, FaUser, FaEnvelope, FaPhone, FaGlobe,
    FaLock, FaCheckCircle, FaStore, FaShieldAlt, FaTruck,
    FaChartLine, FaHandshake
} from "react-icons/fa";

const countries = [
    "United States", "United Kingdom", "China", "India", "Germany", "Japan",
    "France", "Canada", "Australia", "United Arab Emirates", "Turkey",
    "South Africa", "Nigeria", "Tanzania", "Uganda", "Rwanda", "Egypt",
    "Italy", "Spain", "Netherlands", "Singapore", "Malaysia", "Brazil"
];

const businessTypes = [
    "Electronics & Accessories", "Home & Garden", "Cutleries", "Beauty Products",
    "Construction, Building & Machinery", "Groceries", "Office Supplies",
    "Luggage & Bags", "Men's Wear", "Children's Wear", "Women's Outfit",
    "Sports Gears", "Farm Clothing", "Farm Equipment", "Computers", "Baby Products",
    "Household Items", "Phones & Tablets", "Other"
];

export const dynamic = 'force-dynamic';

export default function OverseasVendorSignup() {
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
                    type: 'overseas' // Flagging for backend
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

            alert("International Signup successful! A verification code has been sent to your business email.");
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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-8 px-4 hidden md:block">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Nyle Store <span className="text-blue-600">Global Vendor</span> Program
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Scale your international brand in the Kenyan market. We provide the platform, logistics, and customer base for overseas excellence.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Benefits */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <FaHandshake className="mr-3" />
                            Why Partner Globally?
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <FaChartLine className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Cross-Border Growth</h3>
                                    <p className="text-blue-100">Direct access to millions of East African consumers.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <FaTruck className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Global Logistics</h3>
                                    <p className="text-blue-100">Specialized fulfillment for international inventory.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <FaShieldAlt className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Secure Transacting</h3>
                                    <p className="text-blue-100">Multi-currency payment settlements and security.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <FaGlobe className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Market Expertise</h3>
                                    <p className="text-blue-100">Insights into local trends and regulatory compliance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Column - Signup Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                <FaBuilding className="mr-3" />
                                Global Seller Registration
                            </h2>
                            <p className="text-blue-100">Provide your international business credentials</p>
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
                                            Legal Business Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="legal_name"
                                            placeholder="Enter legal entity name"
                                            value={form.legal_name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                            <FaStore className="mr-2 text-blue-600" />
                                            Trade Name / Brand *
                                        </label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            placeholder="Enter your brand name"
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
                                            Main Contact Person *
                                        </label>
                                        <input
                                            type="text"
                                            name="contact_person"
                                            placeholder="Full name of representative"
                                            value={form.contact_person}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                            <FaEnvelope className="mr-2 text-blue-600" />
                                            Business Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="partner@global-brand.com"
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
                                            International Phone *
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="+1 / +44 / +86 ..."
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                            <FaGlobe className="mr-2 text-blue-600" />
                                            Origin Country *
                                        </label>
                                        <select
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            title="Select your base country"
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map((country, i) => (
                                                <option key={i} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Address & Business Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                        <FaBuilding className="mr-2 text-blue-600" />
                                        Global Headquarters Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Street, City, Province, Zip"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Primary Product Category *
                                    </label>
                                    <select
                                        name="business_type"
                                        value={form.business_type}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        title="Select your primary niche"
                                    >
                                        <option value="">Select Product Type</option>
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
                                            Portal Password *
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Secure your account"
                                            value={form.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />

                                        {form.password && (
                                            <div className="mt-2">
                                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                                        style={{ width: `${passwordStrength}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                            <FaCheckCircle className="mr-2 text-blue-600" />
                                            Confirm Portal Password *
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            placeholder="Repeat password"
                                            value={form.confirm_password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
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
                                        <a href="/vendor/terms" className="text-blue-600 hover:underline font-medium">Global Seller Agreement</a>
                                        {" "}and{" "}
                                        <a href="/vendor/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                                        . I confirm all provided data is accurate for international trading.
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading || !acceptTerms}
                                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${loading || !acceptTerms
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-black shadow-lg hover:shadow-xl"
                                        } text-white`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            Verifying Credentials...
                                        </span>
                                    ) : (
                                        "Register as Global Seller"
                                    )}
                                </button>

                                {/* Login Link */}
                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-gray-600">
                                        Already a registered global partner?{" "}
                                        <a href="/vendor/login" className="text-blue-600 font-semibold hover:underline">
                                            Global Sign In
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
                <p>Global accounts undergo specialized verification for import/export compliance. This may take 3-5 business days.</p>
                <p className="mt-2">International Support: <span className="text-blue-600">global-support@nyle.co.ke</span></p>
            </div>
        </div>
    );
}
