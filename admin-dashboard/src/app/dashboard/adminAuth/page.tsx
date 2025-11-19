"use client";
import { useEffect } from "react";
import { useAdminAuth } from "@/app/hooks/useAdminAuth";

export default function DashboardPage() {
  const { admin, logout } = useAdminAuth();

  if (!admin) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {admin.email}</h1>
      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
