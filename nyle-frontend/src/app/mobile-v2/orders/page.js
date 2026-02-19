"use client";

import MobileLayout from "../mobile-layout";

export default function OrdersPage() {
  return (
    <MobileLayout>
      <div className="pt-6 pb-24">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="text-center py-20 text-gray-400">
          <p>No orders yet. Start shopping!</p>
        </div>
      </div>
    </MobileLayout>
  );
}
