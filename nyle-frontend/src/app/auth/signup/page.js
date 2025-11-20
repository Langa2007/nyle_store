// app/auth/signup/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../../services/authService"; // adjust path if needed

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestedEmail, setSuggestedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    if (!email || !password) {
      setMessage("Please fill email and password.");
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
      router.push("/"); // change to desired landing
    } catch (err) {
      setMessage(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Brand / Illustration */}
        <div className="hidden md:flex flex-col gap-6 p-8">
          <h2 className="text-4xl font-bold text-gray-900">Create your account</h2>
          <p className="text-gray-600">
            Join Nyle Store — buy and sell with trusted vendors. Fast signup.
          </p>
          <div className="mt-6">
            <img src="https://images.unsplash.com/photo-1522199710521-72d69614c702" alt="shop" className="rounded-lg shadow" />
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Sign up</h3>

          {/* Smart email bar */}
          {suggestedEmail && (
            <div className="mb-4 bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-800">Use your saved account</div>
                <div className="text-xs text-blue-600">{suggestedEmail}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={useSuggestedEmail} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Use</button>
                <button onClick={() => setSuggestedEmail("")} className="px-3 py-1 rounded border text-sm">No thanks</button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name (optional)"
                className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                required
                className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a password (min 6 chars)"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <PasswordStrength password={password} />
            </div>

            <div className="text-xs text-gray-500">
              By creating an account you agree to our <a className="text-blue-600 underline" href="/terms">Terms</a> & <a className="text-blue-600 underline" href="/privacy">Privacy</a>.
            </div>

            {message && <div className="text-sm text-red-600">{message}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <a className="text-blue-600 underline" href="/auth/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
