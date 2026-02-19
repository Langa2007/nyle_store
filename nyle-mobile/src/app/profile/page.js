"use client";

import { useEffect, useState } from "react";
import { User, LogOut, ShoppingBag, Settings } from "lucide-react";
import Link from "next/link";
import { fetchWithAuth, API_ENDPOINTS } from "../../lib/api";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfileData() {
      if (!session?.user?.id) return;

      try {
        setLoading(true);
        // Fetch orders if endpoint exists
        try {
          const ordersData = await fetchWithAuth(`/orders/user/${session.user.id}`);
          setOrders(ordersData);
        } catch (e) {
          console.warn("Orders fetch failed, might not be implemented yet");
          setOrders([]);
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

  if (status === "loading" || loading) return <p className="text-center mt-10 text-gray-400">Loading profile...</p>;

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
        <User size={64} className="text-gray-700" />
        <h1 className="text-2xl font-bold">Not Logged In</h1>
        <p className="text-gray-400">Please sign in to view your profile and orders.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    joined: "Member" // Or fetch from backend if available in session
  };

  return (
    <div className="min-h-screen pt-6 pb-24 space-y-8">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
        <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400">Joined {user.joined}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link
          href="/orders"
          className="bg-blue-100 text-blue-600 rounded-lg p-4 flex flex-col items-center hover:bg-blue-200 transition"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-sm mt-1">Orders</span>
        </Link>

        <Link
          href="/settings"
          className="bg-blue-100 text-blue-600 rounded-lg p-4 flex flex-col items-center hover:bg-blue-200 transition"
        >
          <Settings className="h-6 w-6" />
          <span className="text-sm mt-1">Settings</span>
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-100 text-red-600 rounded-lg p-4 flex flex-col items-center hover:bg-red-200 transition"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-sm mt-1">Logout</span>
        </button>
      </div>

      {/* Order History */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border"
              >
                <div>
                  <p className="font-medium text-gray-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total}</p>
                  <span
                    className={`text-sm px-2 py-1 rounded ${order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
