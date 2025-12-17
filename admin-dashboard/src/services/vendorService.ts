// services/vendorService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export const getVendors = async () => {
  try {
    const res = await fetch(`${API_URL}/api/admin/vendors`, {
      credentials: "include"
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return [];
  }
};

export const getVendorById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/vendors/${id}`, {
      credentials: "include"
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return null;
  }
};