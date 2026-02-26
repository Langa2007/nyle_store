"use client";

import { useEffect, useState } from "react";
import { User, LogOut, ShoppingBag, Settings, MapPin, Navigation, Plus, Trash2 } from "lucide-react";
import useGeolocation from "@/hooks/useGeolocation";
import Link from "next/link";
import { fetchWithAuth, API_ENDPOINTS } from "@/lib/mobile-app/api";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const sessionObj = useSession();
  const session = sessionObj?.data;
  const status = sessionObj?.status;
  const [orders, setOrders] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Geolocation and New Location State
  const { getCoordinates, loading: geoLoading } = useGeolocation();
  const [newLocation, setNewLocation] = useState({ name: "", address: "", is_default: false });
  const [showAddForm, setShowAddForm] = useState(false);
  const [submittingLocation, setSubmittingLocation] = useState(false);

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
          console.warn("Orders fetch failed");
        }

        // Fetch locations
        try {
          const locData = await fetchWithAuth(`/location`);
          setLocations(locData.locations || []);
        } catch (e) {
          console.warn("Locations fetch failed");
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

      {/* Shipping Addresses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Shipping Addresses</h2>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="text-blue-600 text-sm font-bold flex items-center gap-1"
            >
              <Plus size={16} /> Add New
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-xl border-2 border-blue-100 space-y-4 shadow-sm">
            <input
              type="text"
              placeholder="Label (e.g. Home, Office)"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Full Address"
                value={newLocation.address}
                onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={async () => {
                  try {
                    const coords = await getCoordinates();
                    alert("Location detected! Please enter the address label.");
                    setNewLocation(prev => ({ ...prev, latitude: coords.latitude, longitude: coords.longitude }));
                  } catch (err) {
                    alert(err);
                  }
                }}
                disabled={geoLoading}
                className="p-3 bg-blue-50 text-blue-600 rounded-lg disabled:opacity-50"
              >
                <Navigation size={20} className={geoLoading ? "animate-pulse" : ""} />
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={newLocation.is_default}
                onChange={(e) => setNewLocation({ ...newLocation, is_default: e.target.checked })}
              />
              Set as default
            </label>
            <div className="flex gap-3 pt-2">
              <button
                disabled={submittingLocation}
                onClick={async () => {
                  if (!newLocation.address) return alert("Address is required");
                  setSubmittingLocation(true);
                  try {
                    const data = await fetchWithAuth(`/location`, {
                      method: "POST",
                      body: JSON.stringify(newLocation)
                    });
                    setLocations([data.location, ...locations]);
                    setShowAddForm(false);
                    setNewLocation({ name: "", address: "", is_default: false });
                  } catch (err) {
                    alert("Failed to save location");
                  } finally {
                    setSubmittingLocation(false);
                  }
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold disabled:opacity-50"
              >
                {submittingLocation ? "Saving..." : "Save Address"}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {locations.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No saved addresses.</p>
        ) : (
          <div className="space-y-3">
            {locations.map((loc) => (
              <div key={loc.id} className={`bg-white p-4 rounded-xl border flex items-start gap-4 ${loc.is_default ? 'border-blue-200 bg-blue-50/20' : 'border-gray-100'}`}>
                <div className={`p-2 rounded-lg ${loc.is_default ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{loc.name}</h3>
                    <button
                      onClick={async () => {
                        if (!confirm("Delete this address?")) return;
                        try {
                          await fetchWithAuth(`/location/${loc.id}`, { method: "DELETE" });
                          setLocations(locations.filter(l => l.id !== loc.id));
                        } catch (err) {
                          alert("Failed to delete");
                        }
                      }}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{loc.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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
