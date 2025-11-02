"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
      <nav className="p-4 space-y-2">
        <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>
        <Link href="/dashboard/vendors" className="block p-2 rounded hover:bg-gray-100">
          Vendors
        </Link>
        <Link href="/dashboard/products" className="block p-2 rounded hover:bg-gray-100">
          Products
        </Link>
        <Link href="/dashboard/orders" className="block p-2 rounded hover:bg-gray-100">
          Orders
        </Link>
          <Link href="/dashboard/settings" className="block p-2 rounded hover:bg-gray-100">
          Settings
        </Link>
        <Link href="/dashboard/newsletter" className="block p-2 rounded hover:bg-gray-100">
          Newsletter
        </Link>
      </nav>
    </aside>
  )
}
