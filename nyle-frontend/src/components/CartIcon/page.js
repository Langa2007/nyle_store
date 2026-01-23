"use client";

import { useCart } from '@/context/CartContext/page';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartIcon() {
  const { cart, setShowCart, getCartTotals } = useCart();
  const totals = getCartTotals();

  return (
    <button
      onClick={() => setShowCart(true)}
      className="relative p-2 hover:bg-gray-100 rounded-full"
      aria-label="Shopping Cart"
    >
      <FiShoppingCart className="text-2xl" />

      {totals.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {totals.itemCount > 9 ? '9+' : totals.itemCount}
        </span>
      )}
    </button>
  );
}