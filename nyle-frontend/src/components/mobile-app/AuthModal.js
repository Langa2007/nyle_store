"use client";

import { useState } from 'react';
import { useCart } from '../../context/CartContext/page';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaArrowRight } from 'react-icons/fa';

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

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            await signIn('google', { callbackUrl: window.location.href });
        } catch (err) {
            setError('Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    if (!showAuthModal) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <button
                        onClick={() => setShowAuthModal(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="text-3xl">&times;</span>
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-200 rounded-xl text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gray-800"></div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Or use email</span>
                        <div className="flex-1 h-px bg-gray-800"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="relative group">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-white placeholder:text-gray-500"
                                    placeholder="Full Name"
                                />
                            </div>
                        )}

                        <div className="relative group">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-white placeholder:text-gray-500"
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="relative group">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-white placeholder:text-gray-500"
                                placeholder="Password"
                                minLength="6"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-all disabled:opacity-50 mt-2"
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
                        className="text-blue-400 hover:text-blue-300 font-medium text-sm"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800/50">
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                        By continuing, you agree to our <Link href="/auth/terms" className="text-blue-400">Terms of Service</Link> and <Link href="/auth/privacy" className="text-blue-400">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
