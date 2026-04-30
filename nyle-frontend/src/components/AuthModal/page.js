"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext/page';
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from 'react-icons/fa';
import GoogleIdentitySync from '@/components/GoogleIdentitySync';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, authAction, syncCartAfterLogin } = useCart();
  const [isLogin, setIsLogin] = useState(authAction === 'login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store auth data
      localStorage.setItem('accessToken', data.token || data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Sync cart after login
      if (data.user?.id) {
        await syncCartAfterLogin(data.user.id);
      }

      setShowAuthModal(false);
      setFormData({ email: '', password: '', name: '' });

      // Show success message
      alert(`Successfully ${isLogin ? 'logged in' : 'registered'}!`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (session) => {
    if (session?.accessToken) {
      localStorage.setItem('accessToken', session.accessToken);
      localStorage.setItem('userAccessToken', session.accessToken);
    }

    if (session?.user) {
      localStorage.setItem('user', JSON.stringify({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }));
    }

    if (session?.user?.id) {
      await syncCartAfterLogin(session.user.id);
    }

    setShowAuthModal(false);
    setFormData({ email: '', password: '', name: '' });
    window.location.reload();
  };

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Login to Continue' : 'Create Account'}
          </h2>
          <button
            onClick={() => setShowAuthModal(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            {error}
          </div>
        )}

        <div className="space-y-4">
          <GoogleIdentitySync
            context={isLogin ? 'signin' : 'signup'}
            text={isLogin ? 'signin_with' : 'signup_with'}
            className="w-full"
            onSuccess={handleGoogleSuccess}
            onError={(errorMessage) => {
              setError(errorMessage || 'Google sign-in failed');
            }}
          />

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Or use email</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
            {!isLogin && (
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  id="auth-modal-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  autoComplete="name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-900"
                  placeholder="Full Name"
                />
              </div>
            )}

            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                id="auth-modal-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-900"
                placeholder="Email Address"
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                id="auth-modal-password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete={isLogin ? "current-password" : "new-password"}
                autoCapitalize="none"
                autoCorrect="off"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-900"
                placeholder="Password"
                minLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <FaArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
