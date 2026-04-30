// services/vendorService.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

/**
 * A generic helper to make authenticated API requests using cookies.
 */
export const apiRequest = async (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Authentication failed. Redirecting to login.");
        if (typeof window !== 'undefined') {
          window.location.href = "/login?reason=unauthorized";
        }
        throw new Error("Unauthorized access");
      }
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error.message);
    throw error;
  }
};