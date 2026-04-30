// services/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export const apiRequest = async (endpoint, options = {}) => {
  // We now use HttpOnly cookies for authentication
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};
