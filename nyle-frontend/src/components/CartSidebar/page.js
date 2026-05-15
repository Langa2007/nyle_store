"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext/page';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FiShoppingCart, FiX, FiTrash2, FiPlus, FiMinus, FiTruck, FiShield, FiChevronRight } from 'react-icons/fi';

export default function CartSidebar() {
  const {
    cart,
    showCart,
    setShowCart,
    updateQuantity,
    removeItem,
    getCartTotals,
    clearCart
  } = useCart();

  const totals = getCartTotals();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const freeShippingTarget = 5000;
  const subtotal = Number(totals.subtotal) || 0;
  const freeShippingRemaining = Math.max(0, freeShippingTarget - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingTarget) * 100);

  useEffect(() => {
    if (!showCart) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCart]);

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]"
        onClick={() => setShowCart(false)}
      />

      {/* Cart Panel */}
      <div className="absolute inset-y-0 right-0 flex max-w-full p-3 sm:p-5">
        <div className="relative w-screen max-w-xl">
          <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl border border-slate-100">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100">
                    <FiShoppingCart className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Your Bag</h2>
                    <p className="text-sm text-slate-500">{totals.itemCount} selected item{totals.itemCount === 1 ? '' : 's'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-white rounded-full text-slate-500 hover:text-slate-900 transition"
                  aria-label="Close cart"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              {cart.items.length > 0 && (
                <div className="mt-5 rounded-2xl bg-white/80 border border-blue-100 p-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <FiTruck className="text-blue-600" />
                      {freeShippingRemaining === 0 ? "Free shipping unlocked" : `Ksh ${freeShippingRemaining.toLocaleString()} to free shipping`}
                    </span>
                    <span className="text-xs font-bold text-blue-600">{Math.round(freeShippingProgress)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-5 bg-slate-50/70">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                    <FiShoppingCart className="text-5xl text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Your bag is empty</h3>
                  <p className="text-slate-500 mb-6 max-w-xs">Add a product and it will appear here with checkout details ready.</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="bg-blue-600 text-white px-7 py-3 rounded-2xl font-bold hover:bg-blue-700 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-widest font-black text-slate-400 mb-3">Selected products</p>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {cart.items.map((item) => (
                        <div key={`thumb-${item.id || item.product_id}`} className="relative flex-shrink-0">
                          <img
                            src={item.image_url || item.product?.image_url || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80"}
                            alt={item.name || item.product?.name || "Cart item"}
                            className="w-16 h-16 rounded-2xl object-cover border border-white shadow-sm"
                          />
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.id || item.product_id} className="flex gap-4 p-4 border border-slate-100 rounded-3xl bg-white shadow-sm">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image_url || item.product?.image_url || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80"}
                            alt={item.name || item.product?.name || "Cart item"}
                            className="w-24 h-24 object-cover rounded-2xl"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-3">
                            <div>
                              <h4 className="font-black text-slate-900 line-clamp-2">{item.name || item.product?.name}</h4>
                              <p className="text-slate-500 text-sm mt-1">Ksh {Number(item.price || item.product?.price).toLocaleString()} each</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id || item.product_id)}
                              className="w-9 h-9 flex-shrink-0 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition flex items-center justify-center"
                              aria-label="Remove item"
                            >
                              <FiTrash2 />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
                            <div className="flex items-center bg-slate-100 rounded-2xl p-1">
                              <button
                                onClick={() => updateQuantity(item.id || item.product_id, item.quantity - 1)}
                                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white transition disabled:opacity-40"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <FiMinus />
                              </button>
                              <span className="w-10 text-center font-black text-slate-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id || item.product_id, item.quantity + 1)}
                                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white transition"
                                aria-label="Increase quantity"
                              >
                                <FiPlus />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="font-black text-blue-700">
                                Ksh {(Number(item.price || item.product?.price) * item.quantity).toLocaleString()}
                              </div>
                              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Line total</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Clear Cart Button */}
                  <div className="mt-4">
                    <button
                      onClick={clearCart}
                      className="w-full py-3 border border-rose-200 text-rose-500 rounded-2xl hover:bg-rose-50 font-bold transition"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-slate-100 px-6 py-5 bg-white">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3 flex gap-2">
                    <FiTruck className="text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-black text-emerald-900">Fast delivery</p>
                      <p className="text-[11px] text-emerald-700">Tracked doorstep shipping</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-3 flex gap-2">
                    <FiShield className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-black text-blue-900">Protected</p>
                      <p className="text-[11px] text-blue-700">Secure checkout</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-bold text-slate-900">Ksh {Number(totals.subtotal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-bold text-emerald-600">
                      {Number(totals.shipping) === 0 ? 'FREE' : `Ksh ${Number(totals.shipping).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tax (16%)</span>
                    <span className="font-bold text-slate-900">Ksh {Number(totals.tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-3 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-blue-700">Ksh {Number(totals.total).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {!isLoggedIn && (
                    <div className="text-sm text-amber-700 bg-amber-50 border border-amber-100 p-3 rounded-2xl">
                      Login to save your cart and proceed to checkout.
                    </div>
                  )}

                  <Link
                    href={isLoggedIn ? "/checkout" : "/auth/login?redirect=/checkout"}
                    onClick={() => setShowCart(false)}
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-black transition shadow-lg shadow-blue-100"
                  >
                    Proceed to Checkout
                    <FiChevronRight />
                  </Link>

                  <button
                    onClick={() => setShowCart(false)}
                    className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-2xl font-bold transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
