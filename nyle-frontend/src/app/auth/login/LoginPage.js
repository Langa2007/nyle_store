// app/auth/login/page.js
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "../../../services/authService";
import { 
  FaEnvelope, 
  FaLock, 
  FaArrowRight, 
  FaEye, 
  FaEyeSlash,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    
    try {
      const data = await login({ email, password });
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));
      }
      router.push(next);
    } catch (err) {
      setMsg(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setMsg("Please enter your email address");
      return;
    }

    setResetLoading(true);
    setMsg("");

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, user_type: "customer" }),
      });

      const data = await res.json();

      if (res.ok) {
        setResetSuccess(true);
        setMsg("Password reset link sent! Check your email.");
        setTimeout(() => {
          setShowResetForm(false);
          setResetEmail("");
          setResetSuccess(false);
          setMsg("");
        }, 5000);
      } else {
        setMsg(data.error || "Failed to send reset email");
      }
    } catch (err) {
      setMsg("Network error. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">N</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your Nyle Store account</p>
        </div>

        {/* Main Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {showResetForm ? (
              // Forgot Password Form
              <>
                <div className="mb-6">
                  <button
                    onClick={() => setShowResetForm(false)}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                  >
                    ← Back to Login
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
                <p className="text-gray-600 mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {resetSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <FaCheckCircle className="text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-green-800">Check your email!</p>
                          <p className="text-green-700 text-sm mt-1">
                            We've sent password reset instructions to {resetEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                      resetLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
                    }`}
                  >
                    {resetLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <FaExclamationTriangle className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      If you don't receive an email within a few minutes, check your spam folder.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // Login Form
              <>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowResetForm(true)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {msg && (
                    <div className={`p-4 rounded-lg ${msg.includes("sent") ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                      <div className="flex items-center">
                        {msg.includes("sent") ? (
                          <FaCheckCircle className="text-green-600 mr-3" />
                        ) : (
                          <FaExclamationTriangle className="text-red-600 mr-3" />
                        )}
                        <p className={`font-medium ${msg.includes("sent") ? "text-green-800" : "text-red-800"}`}>
                          {msg}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <FaArrowRight className="ml-3" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link 
                        href="/auth/signup" 
                        className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
                      >
                        Sign up here
                      </Link>
                    </p>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      Are you a vendor?{" "}
                      <Link 
                        href="/vendor/login" 
                        className="text-orange-600 font-medium hover:text-orange-800 hover:underline"
                      >
                        Vendor Login
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Security Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <FaLock className="text-green-600" />
              <span>Your login is secured with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}