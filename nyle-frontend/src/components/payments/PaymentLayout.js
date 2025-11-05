// components/PaymentLayout.js
import React from "react";
import Link from "next/link";

export default function PaymentLayout({ title, children }) {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      <div className="grid md:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="space-y-4">
          <h3 className="font-semibold text-lg">Nyle Payments</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/payments/policies" className="hover:underline">
                Payment Policies
              </Link>
            </li>
            <li>
              <Link href="/payments/refunds" className="hover:underline">
                Refunds & Returns
              </Link>
            </li>
            <li>
              <Link href="/payments/secure-checkout" className="hover:underline">
                Secure Checkout
              </Link>
            </li>
            <li>
              <Link href="/payments/methods" className="hover:underline">
                Accepted Methods
              </Link>
            </li>
            <li>
              <Link href="/payments/protection" className="hover:underline">
                Customer Protection
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <section className="md:col-span-3">{children}</section>
      </div>
    </div>
  );
}
