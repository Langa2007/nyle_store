"use client";

import { useCart } from "../../context/CartContext";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2);

  return (
    <div className="min-h-screen pt-6 pb-24">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ShoppingBag className="h-7 w-7 text-blue-600" />
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <Link
            href="/shop"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white shadow rounded-lg p-4 border"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
