// services/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token"); // admin JWT

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};
