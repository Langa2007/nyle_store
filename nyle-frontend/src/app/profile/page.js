"use client";

import { useEffect, useState } from "react";
import { User, LogOut, ShoppingBag, Settings, Mail, Calendar, Shield, CreditCard, MapPin, ChevronRight, Package, ExternalLink, Plus, Trash2, Navigation } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import useGeolocation from "@/hooks/useGeolocation";
import { toast } from "react-hot-toast"; 

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    // Geolocation and New Location State
    const { getCoordinates, loading: geoLoading } = useGeolocation();
    const [newLocation, setNewLocation] = useState({ name: "", address: "", is_default: false });
    const [showAddForm, setShowAddForm] = useState(false);
    const [submittingLocation, setSubmittingLocation] = useState(false);
    const [userData, setUserData] = useState({ phone: "", language: "English (US)" });
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", phone: "" });
    const [updatingProfile, setUpdatingProfile] = useState(false);


    useEffect(() => {
        async function getProfileData() {
            if (!session?.user?.id) return;
            try {
                setLoading(true);
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
                // Fetch Profile Info
                try {
                    const profileRes = await fetch(`${baseUrl}/api/users/profile`, {
                        headers: { "Content-Type": "application/json" },
                        credentials: "include"
                    });
                    if (profileRes.ok) {
                        const data = await profileRes.json();
                        setUserData({
                            phone: data.phone || data.phone_number || "",
                            language: data.language || "English (US)"
                        });
                        setEditForm({
                            name: session.user.name,
                            phone: data.phone || data.phone_number || ""
                        });
                    }
                } catch (e) {
                    console.warn("Profile info fetch failed");
                }

                // Fetch Orders
                const ordersRes = await fetch(`${baseUrl}/api/orders/user/${session.user.id}`, { credentials: "include" });
                if (ordersRes.ok) setOrders(await ordersRes.json());

                // Fetch Locations
                const locRes = await fetch(`${baseUrl}/api/location`, {
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });
                if (locRes.ok) {
                    const data = await locRes.json();
                    setLocations(data.locations || []);
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
                                            {!isEditing ? (
                                                <button 
                                                    onClick={() => setIsEditing(true)}
                                                    className="text-blue-600 font-bold text-sm hover:underline"
                                                >
                                                    Edit Info
                                                </button>
                                            ) : (
                                                <div className="flex gap-3">
                                                    <button 
                                                        disabled={updatingProfile}
                                                        onClick={async () => {
                                                            setUpdatingProfile(true);
                                                            try {
                                                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                    },
                                                                    credentials: "include",
                                                                    body: JSON.stringify(editForm)
                                                                });
                                                                if (res.ok) {
                                                                    toast.success("Profile updated!");
                                                                    setUserData(prev => ({ ...prev, phone: editForm.phone }));
                                                                    setIsEditing(false);
                                                                } else {
                                                                    toast.error("Failed to update profile");
                                                                }
                                                            } catch (err) {
                                                                toast.error("Network error");
                                                            } finally {
                                                                setUpdatingProfile(false);
                                                            }
                                                        }}
                                                        className="text-blue-600 font-bold text-sm hover:underline disabled:opacity-50"
                                                    >
                                                        {updatingProfile ? "Saving..." : "Save"}
                                                    </button>
                                                    <button 
                                                        onClick={() => setIsEditing(false)}
                                                        className="text-gray-400 font-bold text-sm hover:underline"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Full Name</p>
                                                {isEditing ? (
                                                    <input 
                                                        type="text"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                ) : (
                                                    <p className="text-gray-900 font-semibold">{session.user.name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email Address</p>
                                                <p className="text-gray-900 font-semibold">{session.user.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Phone Number</p>
                                                {isEditing ? (
                                                    <input 
                                                        type="text"
                                                        placeholder="e.g. +254 700 000 000"
                                                        value={editForm.phone}
                                                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                ) : (
                                                    <p className={`font-semibold ${!userData.phone ? "text-gray-400 italic" : "text-gray-900"}`}>
                                                        {userData.phone || "number here"}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Default Language</p>
                                                <p className="text-gray-900 font-semibold">{userData.language}</p>
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

                            {activeTab === "addresses" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-left">
                                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                            <h2 className="text-xl font-black text-gray-900">Your Shipping Addresses</h2>
                                            {!showAddForm && (
                                                <button
                                                    onClick={() => setShowAddForm(true)}
                                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition"
                                                >
                                                    <Plus size={16} /> Add New
                                                </button>
                                            )}
                                        </div>

                                        {showAddForm && (
                                            <div className="p-8 bg-blue-50/30 border-b border-gray-50">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Label (e.g. Home, Office)"
                                                        value={newLocation.name}
                                                        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                                                        className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Full Address"
                                                            value={newLocation.address}
                                                            onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                                                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                        <button
                                                            onClick={async () => {
                                                                try {
                                                                    const coords = await getCoordinates();
                                                                    // In a real app we'd reverse geocode here. For now, we'll just log coords for the demo
                                                                    toast?.success || alert("Location detected! Please enter the address label.");
                                                                    setNewLocation(prev => ({ ...prev, latitude: coords.latitude, longitude: coords.longitude }));
                                                                } catch (err) {
                                                                    alert(err);
                                                                }
                                                            }}
                                                            disabled={geoLoading}
                                                            className="p-3 bg-white border border-gray-200 rounded-xl text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
                                                            title="Auto-detect location"
                                                        >
                                                            <Navigation size={20} className={geoLoading ? "animate-pulse" : ""} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mb-6">
                                                    <input
                                                        type="checkbox"
                                                        id="is_default"
                                                        checked={newLocation.is_default}
                                                        onChange={(e) => setNewLocation({ ...newLocation, is_default: e.target.checked })}
                                                    />
                                                    <label htmlFor="is_default" className="text-sm text-gray-600 font-medium">Set as default address</label>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        disabled={submittingLocation}
                                                        onClick={async () => {
                                                            if (!newLocation.address) return alert("Address is required");
                                                            setSubmittingLocation(true);
                                                            try {
                                                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/location`, {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                    },
                                                                    credentials: "include",
                                                                    body: JSON.stringify(newLocation)
                                                                });
                                                                if (res.ok) {
                                                                    const data = await res.json();
                                                                    setLocations([data.location, ...locations]);
                                                                    setShowAddForm(false);
                                                                    setNewLocation({ name: "", address: "", is_default: false });
                                                                }
                                                            } catch (err) {
                                                                alert("Failed to save location");
                                                            } finally {
                                                                setSubmittingLocation(false);
                                                            }
                                                        }}
                                                        className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
                                                    >
                                                        {submittingLocation ? "Saving..." : "Save Address"}
                                                    </button>
                                                    <button
                                                        onClick={() => setShowAddForm(false)}
                                                        className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-50 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-8">
                                            {locations.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <MapPin size={32} className="text-gray-300" />
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900">No addresses yet</h3>
                                                    <p className="text-gray-500 font-medium">Add a shipping address to speed up your checkout process.</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {locations.map((loc) => (
                                                        <div key={loc.id} className={`p-6 rounded-2xl border transition-all ${loc.is_default ? 'bg-blue-50/50 border-blue-200 shadow-lg shadow-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`p-2 rounded-lg ${loc.is_default ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                                        <MapPin size={18} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-bold text-gray-900">{loc.name}</h4>
                                                                        {loc.is_default && <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Default</span>}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={async () => {
                                                                        if (!confirm("Are you sure you want to delete this address?")) return;
                                                                        try {
                                                                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/location/${loc.id}`, {
                                                                                method: "DELETE",
                                                                                headers: { "Content-Type": "application/json" },
                                                                                credentials: "include"
                                                                            });
                                                                            if (res.ok) {
                                                                                setLocations(locations.filter(l => l.id !== loc.id));
                                                                            }
                                                                        } catch (err) {
                                                                            alert("Failed to delete address");
                                                                        }
                                                                    }}
                                                                    className="text-gray-400 hover:text-red-600 transition"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                            <p className="text-gray-600 text-sm font-medium leading-relaxed">{loc.address}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Other tabs placeholders */}
                            {(activeTab === "payment" || activeTab === "security") && (
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




