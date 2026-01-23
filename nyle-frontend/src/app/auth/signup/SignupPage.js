// app/auth/signup/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signup } from "../../../services/authService"; // adjust path if needed
import Link from "next/link";

function PasswordStrength({ password }) {
  if (!password) return null;
  const score = calculateScore(password);
  const label = score < 2 ? "Weak" : score === 2 ? "Fair" : score === 3 ? "Good" : "Strong";
  const bg = score < 2 ? "bg-red-500" : score === 2 ? "bg-yellow-400" : score === 3 ? "bg-green-400" : "bg-green-600";
  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
        <div className={`h-2 ${bg}`} style={{ width: `${(score / 4) * 100}%` }} />
      </div>
      <div className="text-xs text-gray-500 mt-1">Password strength: {label}</div>
    </div>
  );
}

function calculateScore(pw) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function SignupPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestedEmail, setSuggestedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Smart email attempt using Credential Management API (best-effort)
  useEffect(() => {
    const tryGetCredential = async () => {
      try {
        if (!("credentials" in navigator)) return;
        const cred = await navigator.credentials.get({ password: true, mediation: "optional" });
        if (cred && cred.id && cred.type === "password") {
          // cred.id is typically the email
          setSuggestedEmail(cred.id);
        }
      } catch (err) {
        // ignore — this API isn't supported everywhere
      }
    };
    tryGetCredential();
  }, []);

  const useSuggestedEmail = () => {
    setEmail(suggestedEmail);
    setSuggestedEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    // Validation
    if (!email || !password || !confirmPassword) {
      setMessage("Please fill all required fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    
    if (!termsAccepted) {
      setMessage("Please accept the Terms and Privacy Policy.");
      return;
    }
    
    setLoading(true);
    try {
      const data = await signup({ name, email, password });
      // Save token and user
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || {}));
      }
      // Redirect to previous or home
      router.push(next);
    } catch (err) {
      setMessage(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-lg w-full">
        {/* Header with back to home */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <svg 
              className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <div className="text-lg font-semibold text-gray-800">Nyle Store</div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Nyle Store</h1>
            <p className="text-gray-600">Create your account to start buying and selling</p>
          </div>

          {/* Smart email bar */}
          {suggestedEmail && (
            <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between animate-fade-in">
              <div>
                <div className="text-sm font-medium text-blue-800 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Suggested account found
                </div>
                <div className="text-xs text-blue-600 mt-1">{suggestedEmail}</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={useSuggestedEmail} 
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Use
                </button>
                <button 
                  onClick={() => setSuggestedEmail("")} 
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
                >
                  No thanks
                </button>
              </div>
            </div>
          )}

          {/* Continue with Google placeholder */}
          <div className="mb-6">
            <button
              type="button"
              disabled
              className="w-full p-3 rounded-xl border border-gray-300 flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded ml-2">Coming soon</span>
            </button>
            <div className="text-center text-xs text-gray-500 mt-2">
              Google sign-in will be available soon
            </div>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="px-4 text-sm text-gray-500">Or continue with email</div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Full name <span className="text-gray-400">(optional)</span></label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm Password</label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <div className="text-sm text-red-600 mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Passwords don't match
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                />
                <div className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a className="text-blue-600 hover:text-blue-800 underline transition-colors" href="/terms">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="text-blue-600 hover:text-blue-800 underline transition-colors" href="/privacy">
                    Privacy Policy
                  </a>
                  . I understand that Nyle Store may use my information in accordance with these documents.
                </div>
              </label>
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm ${message.includes("Please accept") || message.includes("failed") ? "bg-red-50 text-red-700 border border-red-200" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !termsAccepted}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating your account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors" href="/auth/login">
              Log in here
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Nyle Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}