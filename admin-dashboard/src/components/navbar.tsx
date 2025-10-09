"use client"

export default function Navbar() {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Admin</span>
        <button className="px-3 py-1 text-sm bg-gray-200 rounded">Logout</button>
      </div>
    </header>
  )
}
