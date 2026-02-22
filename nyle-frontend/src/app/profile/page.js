"use client";

import { useEffect, useState } from "react";
import { User, LogOut, ShoppingBag, Settings, Mail, Calendar, Shield, CreditCard, MapPin, ChevronRight, Package, ExternalLink } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        async function getProfileData() {
            if (!session?.user?.id) return;
            try {
                setLoading(true);
                // Using existing cart style fetching logic or similar for orders if available
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/orders/user/${session.user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error("Failed to fetch profile data:", err);
            } finally {
                setLoading(false);
            }
        }

        if (status === "authenticated") {
            getProfileData();
        } else if (status === "unauthenticated") {
            setLoading(false);
        }
    }, [session, status]);

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                </div>
                <div className="max-w-md">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-600 mb-8">Please sign in to your Nyle Store account to view your order history and manage your personal informations.</p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/auth/login" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition transform hover:-translate-y-0.5">
                            Sign In Now
                        </Link>
                        <Link href="/" className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const userInitial = (session.user.name || session.user.email || 'U').charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20 pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-blue-200">
                                {userInitial}
                            </div>
                            <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 text-blue-600 hover:text-blue-700 transition transform hover:scale-110">
                                <Settings size={18} />
                            </button>
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 leading-tight">Hello, {session.user.name.split(' ')[0]}!</h1>
                            <div className="flex items-center gap-4 mt-1 text-gray-500 text-sm font-medium">
                                <span className="flex items-center gap-1.5"><Mail size={14} className="text-blue-500" /> {session.user.email}</span>
                                <span className="flex items-center gap-1.5"><Shield size={14} className="text-green-500" /> Verified Member</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-gray-700 font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-3 space-y-2">
                        {[
                            { id: "overview", label: "Overview", icon: User },
                            { id: "orders", label: "My Orders", icon: ShoppingBag },
                            { id: "payment", label: "Payment Info", icon: CreditCard },
                            { id: "addresses", label: "Shipping Addresses", icon: MapPin },
                            { id: "security", label: "Security & Privacy", icon: Shield },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                                        ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                                        : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <tab.icon size={20} />
                                    <span>{tab.label}</span>
                                </div>
                                {activeTab === tab.id && <ChevronRight size={18} />}
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            {activeTab === "overview" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    {/* Quick stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                                                <ShoppingBag size={24} />
                                            </div>
                                            <div className="text-2xl font-black text-gray-900">{orders.length}</div>
                                            <div className="text-gray-500 font-bold text-sm">Total Orders</div>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                                                <Package size={24} />
                                            </div>
                                            <div className="text-2xl font-black text-gray-900">{orders.filter(o => o.status === 'Delivered').length}</div>
                                            <div className="text-gray-500 font-bold text-sm">Items Delivered</div>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
                                                <Calendar size={24} />
                                            </div>
                                            <div className="text-2xl font-black text-gray-900">2026</div>
                                            <div className="text-gray-500 font-bold text-sm">Member Since</div>
                                        </div>
                                    </div>

                                    {/* Profile Info Details */}
                                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                            <h2 className="text-xl font-black text-gray-900">Personal Information</h2>
                                            <button className="text-blue-600 font-bold text-sm hover:underline">Edit Info</button>
                                        </div>
                                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Full Name</p>
                                                <p className="text-gray-900 font-semibold">{session.user.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email Address</p>
                                                <p className="text-gray-900 font-semibold">{session.user.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Phone Number</p>
                                                <p className="text-gray-900 font-semibold">+254 700 000 000</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Default Language</p>
                                                <p className="text-gray-900 font-semibold">English (US)</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "orders" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                                >
                                    <div className="px-8 py-6 border-b border-gray-50">
                                        <h2 className="text-xl font-black text-gray-900">Order History</h2>
                                    </div>
                                    <div className="p-8">
                                        {orders.length === 0 ? (
                                            <div className="text-center py-12">
                                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <ShoppingBag size={32} className="text-gray-300" />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
                                                <p className="text-gray-500 mb-6 font-medium">When you shop, your orders will appear here.</p>
                                                <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition">
                                                    Start Shopping
                                                    <ExternalLink size={16} />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {orders.map((order) => (
                                                    <div key={order.id} className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all hover:shadow-lg hover:shadow-blue-50">
                                                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                                                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold">
                                                                #{order.id}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">Order #{order.id}</p>
                                                                <p className="text-sm text-gray-500 font-medium">{order.date || 'Today'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between md:gap-12">
                                                            <div className="text-right">
                                                                <p className="text-lg font-black text-blue-600">Ksh {order.total}</p>
                                                                <p className="text-xs text-gray-400 font-bold uppercase">{order.items_count || 1} Item(s)</p>
                                                            </div>
                                                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                {order.status}
                                                            </div>
                                                            <button className="p-2 text-gray-400 hover:text-blue-600 transition">
                                                                <ChevronRight size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Other tabs placeholders */}
                            {(activeTab === "payment" || activeTab === "addresses" || activeTab === "security") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-20 rounded-3xl border border-gray-100 shadow-sm text-center"
                                >
                                    <Settings size={48} className="mx-auto text-gray-200 mb-6 animate-pulse" />
                                    <h2 className="text-2xl font-black text-gray-900 mb-2">Coming Soon</h2>
                                    <p className="text-gray-500 font-medium">We're working on making this feature available for you. Check back later!</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
