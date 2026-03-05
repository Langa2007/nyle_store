"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext/page';
import Link from 'next/link';
import { FiShoppingCart, FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('userAccessToken');
    setIsLoggedIn(!!token);
  }, []);

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm shadow-2xl"
        onClick={() => setShowCart(false)}
      />

      {/* Cart Panel */}
      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <div className="relative w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center space-x-3">
                <FiShoppingCart className="text-2xl text-blue-600" />
                <h2 className="text-xl font-bold">Your Shopping Cart</h2>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FiShoppingCart className="text-6xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some products to get started!</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id || item.product_id} className="flex space-x-4 p-3 border rounded-lg">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image_url || item.product?.image_url}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <button
                              onClick={() => removeItem(item.id || item.product_id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">Ksh {Number(item.price).toLocaleString()}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id || item.product_id, item.quantity - 1)}
                                className="px-3 py-1 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus />
                              </button>
                              <span className="px-4 py-1 border-x">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id || item.product_id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-gray-100"
                              >
                                <FiPlus />
                              </button>
                            </div>
                            <div className="font-bold">
                              Ksh {(Number(item.price) * item.quantity).toLocaleString()}
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
                      className="w-full py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t px-6 py-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
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
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>Ksh {Number(totals.total).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {!isLoggedIn && (
                    <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                      ⚠️ Login to save your cart and proceed to checkout
                    </div>
                  )}

                  <Link
                    href={isLoggedIn ? "/checkout" : "/auth/login?redirect=/checkout"}
                    onClick={() => setShowCart(false)}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold"
                  >
                    Proceed to Checkout
                  </Link>

                  <button
                    onClick={() => setShowCart(false)}
                    className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Free shipping on orders over Ksh 5,000
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}