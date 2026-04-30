"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Store,
  ArrowLeft,
  Home,
  AlertCircle,
  CheckCircle,
  Loader2,
  User,
  Shield,
  Key,
  Smartphone,
  LogIn,
  Check
} from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

function VendorLoginContent() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [otpRequired, setOtpRequired] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpResendLoading, setOtpResendLoading] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [resetStep, setResetStep] = useState("email"); // email, code, password
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [resetResendLoading, setResetResendLoading] = useState(false);
  const [resetCooldown, setResetCooldown] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/vendor/dashboard';
  const errorParam = searchParams.get('error');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  // Show error from URL parameter if exists
  useEffect(() => {
    if (errorParam) {
      switch (errorParam) {
        case 'session_expired':
          setLoginError('Your session has expired. Please log in again.');
          break;
        case 'auth_failed':
          setLoginError('Authentication failed. Please check your credentials.');
          break;
        case 'not_verified':
          setLoginError('Your account needs verification. Please check your email.');
          break;
        default:
          setLoginError('An error occurred. Please try again.');
      }
    }
  }, [errorParam]);

  // Cooldown timer for resending OTP
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => setOtpCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  useEffect(() => {
    if (resetCooldown <= 0) return;
    const timer = setInterval(() => setResetCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [resetCooldown]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (loginError) setLoginError(null);
  };

  // Enhanced Login handler with better error handling
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);

    // Basic validation
    if (!form.email || !form.password) {
      setLoginError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      console.log("DEBUG: Attempting login for:", form.email);

      const res = await fetch(`${API_URL}/api/vendor/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("DEBUG: Login response:", data);

      if (!res.ok) {
        // Handle different error scenarios
        setLoginAttempts(prev => prev + 1);

        switch (res.status) {
          case 401:
            setLoginError('Invalid email or password. Please check your credentials.');
            break;
          case 403:
            if (data?.message?.includes('not verified')) {
              setLoginError('Your account is not verified. Please check your email for verification link.');
            } else if (data?.message?.includes('suspended')) {
              setLoginError('Your account has been suspended. Contact support for assistance.');
            } else {
              setLoginError('Access denied. Your account may be restricted.');
            }
            break;
          case 429:
            setLoginError('Too many login attempts. Please wait a few minutes and try again.');
            break;
          case 404:
            setLoginError('No vendor account found with this email.');
            break;
          case 423:
            setLoginError('Your account is locked. Please reset your password or contact support.');
            break;
          default:
            setLoginError(data?.message || `Login failed. Please try again. (Error: ${res.status})`);
        }
        setLoading(false);
        return;
      }

      if (data?.otpRequired) {
        setOtpRequired(true);
        setOtpEmail(data.email || form.email);
        setSuccessMessage(data.message || "Login code sent to your email.");
        setLoading(false);
        return;
      }

      // Success - store token and redirect
      if (data.token) {
        localStorage.setItem('vendor_token', data.token);

        if (data.vendor) {
          localStorage.setItem('vendor_data', JSON.stringify(data.vendor));
          setSuccessMessage(`Welcome back, ${data.vendor.company_name || data.vendor.business_name || data.vendor.contact_person}!`);
        }

        // Show success message briefly before redirect
        setTimeout(() => {
          router.push(redirect);
        }, 1500);
      } else {
        setLoginError('Login successful but no token received. Please contact support.');
        setLoading(false);
      }

    } catch (err) {
      console.error("Login error:", err);
      setLoginError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode) {
      setLoginError("Please enter the verification code.");
      return;
    }

    setOtpLoading(true);
    setLoginError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/login/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail || form.email, code: otpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.message || "OTP verification failed. Please try again.");
        return;
      }

      if (data.token) {
        localStorage.setItem("vendor_token", data.token);
        if (data.vendor) {
          localStorage.setItem("vendor_data", JSON.stringify(data.vendor));
          setSuccessMessage(`Welcome back, ${data.vendor.company_name || data.vendor.business_name || data.vendor.contact_person}!`);
        }

        setTimeout(() => {
          router.push(redirect);
        }, 1200);
      } else {
        setLoginError("Verification succeeded but no token received. Please contact support.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setLoginError("Network error. Please check your connection and try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!otpEmail && !form.email) {
      setLoginError("Please enter your email address.");
      return;
    }

    setOtpResendLoading(true);
    setLoginError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/login/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail || form.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.message || "Failed to resend login code.");
        return;
      }

      setSuccessMessage("New login code sent. Please check your inbox.");
      setOtpCooldown(60);
    } catch (err) {
      console.error("Resend OTP error:", err);
      setLoginError("Network error. Please check your connection and try again.");
    } finally {
      setOtpResendLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setOtpRequired(false);
    setOtpCode("");
    setOtpEmail("");
    setResetRequested(false);
    setResetStep("email");
    setResetCode("");
    setNewPassword("");
    setResetToken("");
    setSuccessMessage(null);
    setLoginError(null);
  };

  // Enhanced Forgot Password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setLoginError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setLoginError('Please enter a valid email address');
      return;
    }

    setResetLoading(true);
    setLoginError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.error || data?.message || 'Failed to send reset code. Please try again.');
        return;
      }

      setSuccessMessage(data.message || "Verification code sent to your email.");
      setResetStep("code");
      setResetCooldown(60);
    } catch (err) {
      console.error("Forgot password error:", err);
      setLoginError('Network error. Please check your connection and try again.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleVerifyResetCode = async (e) => {
    e.preventDefault();
    if (!resetCode) {
      setLoginError("Please enter the verification code.");
      return;
    }

    setResetLoading(true);
    setLoginError(null);

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/verify-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, code: resetCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.error || data?.message || "Invalid or expired code.");
        return;
      }

      setResetToken(data.reset_token);
      setResetStep("password");
      setSuccessMessage("Code verified. Please set your new password.");
    } catch (err) {
      setLoginError("Network error. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setLoginError("Password must be at least 8 characters long.");
      return;
    }

    setResetLoading(true);
    setLoginError(null);

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reset_token: resetToken,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.error || data?.message || "Failed to reset password.");
        return;
      }

      setSuccessMessage("Password reset successful. You can now login.");
      setTimeout(() => {
        handleBackToLogin();
      }, 3000);
    } catch (err) {
      setLoginError("Network error. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResendResetCode = async () => {
    setResetResendLoading(true);
    setLoginError(null);

    try {
      const res = await fetch(`${API_URL}/api/vendor/auth/resend-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data?.error || data?.message || "Failed to resend code.");
        return;
      }

      setSuccessMessage("A new verification code has been sent.");
      setResetCooldown(60);
    } catch (err) {
      setLoginError("Network error. Please try again.");
    } finally {
      setResetResendLoading(false);
    }
  };

  const handleSwitchToBuyer = () => {
    // Save current path for potential return
    sessionStorage.setItem('intended_vendor_path', window.location.pathname);
    router.push('/auth/login');
  };

  const handleDemoLogin = () => {
    // Demo credentials for testing
    setForm({
      email: "demo@vendor.com",
      password: "demopassword123"
    });
    setSuccessMessage('Demo credentials loaded. Click Login to continue.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy5wMy5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmF5bX9mb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEuMTE4MDMzODMsODAuMjU0ODI3MTcgTDgwLjI1NDgyNzE3LC0xLjExODAzMzgzIE03OS4xMzY3OTMzNSw4MC4yNTQ4MjcxNyBMMTYwLjUwODgyNzIsLTEuMTE4MDMzODMiIHN0cm9rZT0iIzNiODJmNiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-30"></div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Vendor Login</h1>
                  <p className="text-blue-100 text-sm">Access your seller dashboard</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Messages */}
          {(loginError || successMessage) && (
            <div className={`px-6 pt-4 ${loginError ? 'animate-shake' : ''}`}>
              <div className={`p-3 rounded-lg ${loginError ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                <div className="flex items-start gap-2">
                  {loginError ? (
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${loginError ? 'text-red-800' : 'text-green-800'}`}>
                      {loginError || successMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => { setLoginError(null); setSuccessMessage(null); }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Warning after multiple failed attempts */}
          {loginAttempts >= 3 && (
            <div className="px-6 pt-4">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Multiple failed attempts detected
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Having trouble? Try resetting your password or contact support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            {/* LOGIN FORM */}
            {!resetRequested && !otpRequired ? (
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="your@business.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setResetRequested(true)}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Demo Login */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Try Demo Account
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Login to Dashboard
                    </>
                  )}
                </button>
              </form>
            ) : otpRequired ? (
              /* OTP FORM */
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Two-step verification</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter the 6-digit code sent to <span className="font-medium">{otpEmail || form.email}</span>.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={otpEmail || form.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    One-Time Code
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="Enter 6-digit code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      maxLength={6}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={otpLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {otpLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Verify & Sign In
                    </>
                  )}
                </button>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpResendLoading || otpCooldown > 0}
                    className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {otpResendLoading
                      ? "Resending..."
                      : otpCooldown > 0
                        ? `Resend available in ${otpCooldown}s`
                        : "Resend code"}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              /* PASSWORD RESET FLOW */
              <div className="space-y-5">
                {resetStep === "email" && (
                  <form onSubmit={handleForgotPassword} className="space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset Password</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Enter your registered email address. We'll send you a verification code to reset your password.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="your@business.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={resetLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {resetLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Key className="w-5 h-5" />
                            Send Reset Code
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleBackToLogin}
                        className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Login
                      </button>
                    </div>
                  </form>
                )}

                {resetStep === "code" && (
                  <form onSubmit={handleVerifyResetCode} className="space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Code</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Enter the 6-digit code sent to <span className="font-medium">{resetEmail}</span>.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Verification Code
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter 6-digit code"
                          value={resetCode}
                          onChange={(e) => setResetCode(e.target.value)}
                          maxLength={6}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={resetLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {resetLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Shield className="w-5 h-5" />
                            Verify Code
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleResendResetCode}
                        disabled={resetResendLoading || resetCooldown > 0}
                        className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {resetResendLoading
                          ? "Resending..."
                          : resetCooldown > 0
                            ? `Resend in ${resetCooldown}s`
                            : "Resend Code"}
                      </button>
                      <button
                        type="button"
                        onClick={handleBackToLogin}
                        className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Login
                      </button>
                    </div>
                  </form>
                )}

                {resetStep === "password" && (
                  <form onSubmit={handleResetPassword} className="space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">New Password</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Set your new secure password.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="At least 8 characters"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={resetLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {resetLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">Or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Alternative Actions */}
            <div className="space-y-3">
              {/* Buyer Login Button */}
              <button
                onClick={handleSwitchToBuyer}
                className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                Sign In as Buyer Instead
              </button>

              {/* Sign Up Button */}
              <Link
                href="/vendor/signup"
                className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition text-center"
              >
                Create Vendor Account
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <a
                  href="/support/help-center"
                  className="text-gray-600 hover:text-blue-600 hover:underline text-center py-2"
                >
                  Need Help?
                </a>
                <a
                  href="/vendor/support"
                  className="text-gray-600 hover:text-blue-600 hover:underline text-center py-2"
                >
                  Contact Support
                </a>
              </div>
            </div>

            {/* Vendor Benefits */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <Store className="w-4 h-4" />
                Vendor Benefits
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Dashboard with analytics</li>
                <li>• Manage products & inventory</li>
                <li>• View orders & customers</li>
                <li>• Premium seller features</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>Secure Login</span>
              </div>
              <div className="text-xs">
                Version 2.1.0
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            By logging in, you agree to our{" "}
            <a href="/vendor/terms" className="text-blue-600 hover:underline">Terms</a>{" "}
            and{" "}
            <a href="/vendor/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <a href="/vendor/security" className="hover:text-blue-600 hover:underline">Security</a>
            <a href="/vendor/faq" className="hover:text-blue-600 hover:underline">FAQ</a>
            <a href="/vendor/about" className="hover:text-blue-600 hover:underline">About</a>
          </div>
        </div>

        {/* Back to Home Button (Bottom) */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-600 font-medium rounded-full hover:bg-white hover:shadow-md transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VendorLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    }>
      <VendorLoginContent />
    </Suspense>
  );
}
