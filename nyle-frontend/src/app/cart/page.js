"use client";

import { useCart } from '@/context/CartContext/page';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart, getCartTotals } = useCart();
  const totals = getCartTotals();
  const isLoggedIn = localStorage.getItem('accessToken') || localStorage.getItem('userAccessToken');

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link
              href="/"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Items ({totals.itemCount})</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                >
                  <FiTrash2 className="mr-1" />
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id || item.product_id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src={item.image_url || item.product?.image_url}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-600 text-sm">Ksh {Number(item.price).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            Ksh {(Number(item.price) * item.quantity).toLocaleString()}
                          </div>
                          <button
                            onClick={() => removeItem(item.id || item.product_id)}
                            className="text-red-500 hover:text-red-700 text-sm mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id || item.product_id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus />
                          </button>
                          <span className="px-4 py-2 border-x">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id || item.product_id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-100"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        <div className="text-sm text-gray-600">
                          Stock: Available
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totals.itemCount} items)</span>
                  <span className="font-medium">Ksh {Number(totals.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {Number(totals.shipping) === 0 ? 'FREE' : `Ksh ${Number(totals.shipping).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (16%)</span>
                  <span className="font-medium">Ksh {Number(totals.tax).toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>Ksh {Number(totals.total).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {!isLoggedIn && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ <strong>Login required</strong> - Please login or create an account to proceed with checkout.
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <Link
                      href="/auth/login?redirect=/checkout"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register?redirect=/checkout"
                      className="flex-1 text-center border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg text-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Link
                  href={isLoggedIn ? "/checkout" : "/auth/login?redirect=/checkout"}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold"
                >
                  {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Link>

                <Link
                  href="/"
                  className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-center py-3 rounded-lg font-medium"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-3">We Accept</h3>
                <div className="flex space-x-2">
                  <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center">VISA</div>
                  <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center">MPESA</div>
                  <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center">MC</div>
                  <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center">PP</div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}