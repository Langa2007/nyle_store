"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext/page";
import { FiArrowLeft, FiMapPin, FiCreditCard, FiShoppingBag, FiNavigation } from "react-icons/fi";
import useGeolocation from "@/hooks/useGeolocation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function CheckoutPage() {
  const params = useSearchParams();
  const productId = params.get("productId");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cart, getCartTotals, fetchCart } = useCart();

  const [directProduct, setDirectProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { getCoordinates, loading: geoLoading } = useGeolocation();


  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      const redirectUrl = productId ? `/checkout?productId=${productId}` : "/checkout";
      router.push(`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }
    setIsLoggedIn(true);

      // Direct buy flow for a specific product
      fetch(`${API_URL}/api/products/${productId}`, {
        credentials: "include"
      })
        .then((r) => r.json())
        .then((d) => setDirectProduct(d))
        .finally(() => setLoading(false));
    } else {
      // Full cart checkout flow
      fetchCart().finally(() => setLoading(false));
    }

    // Fetch user saved locations
    if (status === "authenticated") {
      fetch(`${API_URL}/api/location`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.locations) {
            setLocations(data.locations);
            const defaultLoc = data.locations.find(l => l.is_default);
            if (defaultLoc) {
              setSelectedLocationId(defaultLoc.id);
              setAddress(defaultLoc.address);
            }
          }
        });
    }

  }, [productId, router, fetchCart, session, status]);

  const checkoutItems = useMemo(() => {
    if (productId && directProduct) {
      return [{
        product_id: directProduct.id,
        quantity: 1,
        name: directProduct.name,
        price: directProduct.price,
        image_url: directProduct.image_url
      }];
    }
    return cart.items.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      name: item.name || item.product?.name,
      price: item.price || item.product?.price,
      image_url: item.image_url || item.product?.image_url
    }));
  }, [productId, directProduct, cart.items]);

  const totals = useMemo(() => {
    if (productId && directProduct) {
      const subtotal = Number(directProduct.price);
      const shipping = subtotal > 5000 ? 0 : 300;
      const tax = subtotal * 0.16;
      return {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: (subtotal + shipping + tax).toFixed(2),
        itemCount: 1
      };
    }
    return getCartTotals();
  }, [productId, directProduct, getCartTotals]);

  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter a shipping address");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          items: checkoutItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity
          })),
          shipping_location_id: selectedLocationId,
          shipping_address: address, // text fallback
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");

      router.push(`/orders/confirmation?orderId=${data.orderId || data.id}`);
    } catch (err) {
      console.error("Order error:", err);
      alert(err.message || "Order failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your checkout...</p>
        </div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-4xl text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add components to your cart before proceeding to checkout.</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-8">
          <Link href="/cart" className="flex items-center text-blue-600 hover:text-blue-800 font-medium mr-4">
            <FiArrowLeft className="mr-2" /> Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <FiMapPin size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Shipping Address</h3>
              </div>

              {locations.length > 0 && (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setSelectedLocationId(loc.id);
                        setAddress(loc.address);
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${selectedLocationId === loc.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-100 hover:border-gray-200"
                        }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-gray-900">{loc.name}</span>
                        {loc.is_default && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-black uppercase">Default</span>}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{loc.address}</p>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedLocationId(null);
                      setAddress("");
                    }}
                    className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${!selectedLocationId
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-100 text-gray-500 hover:border-gray-200"
                      }`}
                  >
                    + Use Another Address
                  </button>
                </div>
              )}

              <div className="relative">
                <textarea
                  placeholder="Enter your full street address, apartment, city, and postal code..."
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (selectedLocationId) setSelectedLocationId(null);
                  }}
                  className="w-full h-32 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                />
                <button
                  onClick={async () => {
                    try {
                      const coords = await getCoordinates();
                      alert(`Location detected: ${coords.latitude}, ${coords.longitude}. Please enter the address label manually to supplement the GPS data.`);
                    } catch (err) {
                      alert(err);
                    }
                  }}
                  disabled={geoLoading}
                  className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg active:scale-95 disabled:opacity-50"
                  title="Detect my location"
                >
                  <FiNavigation size={18} className={geoLoading ? "animate-spin" : ""} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                We'll use this address for delivery. Please ensure it's accurate.
              </p>
            </div>

            {/* Payment Method (Mock) */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 opacity-60">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mr-4">
                  <FiCreditCard size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
              </div>
              <div className="p-4 border-2 border-blue-100 bg-blue-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-8 bg-white rounded border flex items-center justify-center font-bold text-xs mr-3">CASH</div>
                  <span className="font-medium text-gray-900">Pay on Delivery</span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 italic">
                Currently supporting Pay on Delivery. More options coming soon.
              </p>
            </div>

            {/* Item Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Review Items ({totals.itemCount})</h3>
              <div className="space-y-4">
                {checkoutItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image_url || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">Ksh {(Number(item.price) * item.quantity).toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Ksh {Number(item.price).toLocaleString()} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">Ksh {Number(totals.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">
                    {Number(totals.shipping) === 0 ? "FREE" : `Ksh ${Number(totals.shipping).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (16%)</span>
                  <span className="font-medium text-gray-900">Ksh {Number(totals.tax).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Order Total</span>
                  <span className="text-2xl font-extrabold text-blue-700">Ksh {Number(totals.total).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={submitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md active:scale-[0.98] ${submitting
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg shadow-blue-200"
                  }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  "Complete Order"
                )}
              </button>

              <div className="mt-6 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <FiCreditCard size={18} />
                  <span className="text-xs uppercase tracking-wider font-semibold">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
