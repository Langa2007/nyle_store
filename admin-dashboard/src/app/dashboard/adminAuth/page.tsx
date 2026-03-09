"use client";
import { useAdminAuth } from "@/app/hooks/useAdminAuth";

export default function DashboardPage() {
  const { admin, logout } = useAdminAuth();

  if (!admin) return <p>Loading...</p>;
  const adminEmail = typeof admin.email === "string" ? admin.email : "Admin";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {adminEmail}</h1>
      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
