// services/api.js (or api.ts)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

/**
 * A generic helper to make authenticated API requests.
 * @param {string} endpoint - The API endpoint (e.g., '/admin/vendors').
 * @param {object} options - Fetch options (method, body, etc.).
 * @returns {Promise} - The parsed JSON response.
 */
export const apiRequest = async (endpoint, options = {}) => {
  // 1. Get the admin token from localStorage (for client-side)
  const token = typeof window !== 'undefined' ? localStorage.getItem("adminAccessToken") : null;

  // 2. Set up default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers, // Allow custom headers to override
  };

  // 3. Add Authorization header if a token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // 4. Make the fetch request
  try {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
      ...options,
      headers,
      credentials: "include", // Keep if your backend uses sessions/cookies
    });

    // 5. Check if the response is OK (status 200-299)
    if (!response.ok) {
      // Handle specific errors like 401 (Unauthorized)
      if (response.status === 401) {
        console.error("Authentication failed. Redirecting to login.");
        // You might want to trigger a logout here
        if (typeof window !== 'undefined') {
          window.location.href = "/admin/login";
        }
        throw new Error("Unauthorized access");
      }
      // Throw a generic error for other status codes
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    // 6. Parse and return JSON for successful responses
    return await response.json();
  } catch (error) {
    // 7. Handle network errors or errors thrown above[citation:6][citation:10]
    console.error(`API call to ${endpoint} failed:`, error.message);
    
    // Re-throw the error so the calling function can handle it
    throw error;
  }
};