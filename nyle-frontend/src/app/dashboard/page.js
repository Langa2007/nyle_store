"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag, Package, Heart, MapPin, CreditCard, Bell, ChevronRight,
  LogOut, Settings, Star, Gift, Zap, TrendingUp, Clock, Shield, Crown,
  ArrowRight, BarChart3, Tag, Truck, CheckCircle
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login?next=/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;

    const fetchDashboardData = async () => {
      try {
        setLoadingData(true);
        const [ordersRes, wishlistRes] = await Promise.all([
          fetch(`${API_URL}/api/orders/user/${session.user.id}`),
          fetch(`${API_URL}/api/wishlist?user_id=${session.user.id}`),
        ]);

        if (ordersRes.ok) {
          const data = await ordersRes.json();
          setOrders(Array.isArray(data) ? data : []);
        }
        if (wishlistRes.ok) {
          const data = await wishlistRes.json();
          const items = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
          setWishlistCount(items.length);
        }
      } catch (e) {
        console.error("Dashboard data fetch error:", e);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#030b1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-blue-300 font-semibold tracking-wider text-sm uppercase">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const firstName = session.user?.name?.split(" ")[0] || session.user?.email?.split("@")[0] || "there";
  const userInitial = (session.user?.name || session.user?.email || "U").charAt(0).toUpperCase();
  const totalSpent = orders.reduce((sum, o) => sum + parseFloat(o.total || o.total_amount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "processing").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered" || o.status === "Delivered").length;

  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "from-blue-600 to-blue-400", glow: "shadow-blue-500/30" },
    { label: "Delivered", value: deliveredOrders, icon: CheckCircle, color: "from-emerald-600 to-emerald-400", glow: "shadow-emerald-500/30" },
    { label: "Wishlist", value: wishlistCount, icon: Heart, color: "from-pink-600 to-pink-400", glow: "shadow-pink-500/30" },
    { label: "Total Spent", value: `Ksh ${Math.round(totalSpent).toLocaleString()}`, icon: CreditCard, color: "from-purple-600 to-purple-400", glow: "shadow-purple-500/30" },
  ];

  const quickLinks = [
    { label: "My Orders", desc: `${orders.length} total orders`, icon: Package, href: "/profile?tab=orders", color: "blue" },
    { label: "Wishlist", desc: `${wishlistCount} saved items`, icon: Heart, href: "/wishlist", color: "pink" },
    { label: "Addresses", desc: "Manage delivery locations", icon: MapPin, href: "/profile?tab=addresses", color: "indigo" },
    { label: "Profile Settings", desc: "Update your information", icon: Settings, href: "/profile", color: "slate" },
    { label: "Hot Deals", desc: "Exclusive member offers", icon: Zap, href: "/deals", color: "amber" },
    { label: "Browse Products", desc: "Discover new arrivals", icon: TrendingUp, href: "/products", color: "cyan" },
  ];

  const getStatusBadge = (status) => {
    const map = {
      pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      processing: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      delivered: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      Delivered: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      cancelled: "bg-red-500/10 text-red-400 border border-red-500/20",
    };
    return map[status] || "bg-slate-500/10 text-slate-400 border border-slate-500/20";
  };

  return (
    <div className="min-h-screen bg-[#030b1a] text-white">
      {/* ── Background glow orbs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* ── Hero Header ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              {session.user?.image ? (
                <Image src={session.user.image} alt={firstName} width={72} height={72}
                  className="w-[72px] h-[72px] rounded-2xl object-cover ring-2 ring-blue-500/50" />
              ) : (
                <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-black shadow-2xl shadow-blue-900/50">
                  {userInitial}
                </div>
              )}
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#030b1a]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Member Dashboard</span>
                <Crown className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Welcome back, <span className="text-blue-400">{firstName}</span>!
              </h1>
              <p className="text-slate-400 text-sm mt-1">{session.user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2.5 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all font-semibold text-sm self-start md:self-auto"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {loadingData ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
            ))
          ) : (
            stats.map((s) => (
              <div key={s.label}
                className={`relative bg-white/5 border border-white/8 rounded-2xl p-5 overflow-hidden group hover:border-white/15 transition-all duration-300 shadow-lg ${s.glow}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">{s.label}</div>
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Quick Access ── */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Quick Access</h2>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/8 rounded-2xl hover:bg-white/8 hover:border-blue-500/30 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${link.color}-500/10 border border-${link.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <link.icon className={`w-5 h-5 text-${link.color}-400`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm">{link.label}</p>
                  <p className="text-xs text-slate-400 truncate">{link.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* ── Recent Orders ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Recent Orders</h2>
              <Link href="/profile?tab=orders" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {loadingData ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
                ))
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white/5 border border-white/8 rounded-2xl text-center">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">No orders yet</h3>
                  <p className="text-slate-400 text-sm mb-6">Start shopping and your orders will appear here</p>
                  <Link href="/products"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/40">
                    Browse Products <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <div key={order.id}
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/8 rounded-2xl hover:border-white/15 transition-all group">
                    <div className="w-12 h-12 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 font-black text-sm flex-shrink-0">
                      #{order.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm truncate">Order #{order.id}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <p className="text-xs text-slate-400">{order.created_at ? new Date(order.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }) : "—"}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-black text-white text-sm">Ksh {parseFloat(order.total || order.total_amount || 0).toLocaleString()}</p>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 capitalize ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ── Exclusive member perks banner ── */}
            <div className="mt-6 relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-blue-600/20 border border-blue-500/20 rounded-2xl p-6">
              <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.03)_50%,transparent_70%)] animate-[shimmer_4s_infinite]" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/30 rounded-2xl flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                  <Gift className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="font-black text-white text-sm">Nyle Member Perks</p>
                  <p className="text-xs text-blue-300/80 mt-0.5">Unlock exclusive deals, early access to flash sales, and free shipping on every order over Ksh 2,000.</p>
                </div>
                <Link href="/deals" className="ml-auto flex-shrink-0 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap">
                  Claim <Zap className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
