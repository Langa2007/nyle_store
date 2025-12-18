// services/vendorService.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

/**
 * Fetch all active vendors for admin dropdown
 * @param {string} token - Admin access token (JWT)
 * @returns {Array} List of vendors
 */
async function getVendors(token) {
  try {
    const res = await fetch(`${API_URL}/api/admin/vendors`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error("Failed to fetch vendors:", res.status);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return [];
  }
}

/**
 * Fetch a single vendor by ID
 * @param {string} id - Vendor ID (UUID)
 * @param {string} token - Admin access token (JWT)
 * @returns {Object|null} Vendor object
 */
async function getVendorById(id, token) {
  try {
    const res = await fetch(`${API_URL}/api/admin/vendors/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error(`Failed to fetch vendor ${id}:`, res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return null;
  }
}

// Export as a module
module.exports = {
  getVendors,
  getVendorById
};
