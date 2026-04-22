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
import Image from "next/image";
import NyleLogo from "@/components/branding/NyleLogo.png";
import { useAuthPopup } from "@/hooks/useAuthPopup";


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
  const { signInWithPopup, isAuthenticating } = useAuthPopup();


  const RAW_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
  const API_URL = RAW_URL.endsWith("/api") ? RAW_URL.slice(0, -4) : RAW_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      // We still support original login for backward compatibility or direct access
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

  const handleGoogleSignIn = async () => {
    setMsg("");
    await signInWithPopup("google", {
      onSuccess: () => {
        window.location.href = next;
      },
      onError: (errorMessage) => {
        setMsg(errorMessage);
      },
    });
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
          <div className="mb-4 flex justify-center">
            <Image
              src={NyleLogo}
              alt="Nyle logo"
              width={84}
              height={84}
              priority
              className="h-20 w-20 drop-shadow-[0_14px_30px_rgba(245,158,11,0.28)]"
            />
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
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition ${resetLoading
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
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isAuthenticating}
                    className="w-full p-3 rounded-xl border border-gray-300 flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow"
                  >
                    {isAuthenticating ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting to Google...
                      </span>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign in with Google
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <div className="px-4 text-sm text-gray-500 font-medium">Or continue with email</div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

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
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center ${loading
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

      {/* Back to Home Button (Bottom) */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-600 font-medium rounded-full hover:bg-white hover:shadow-md transition-all group"
        >
          <div className="transform rotate-180">
            <FaArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Home
        </Link>
      </div>
    </div>

  );
}
