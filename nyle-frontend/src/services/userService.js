// src/services/userservice.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

/**
 * Register a new user.
 */
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

/**
 * Log in an existing user.
 */
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

/**
 * Fetch current user profile.
 */
export async function getUserProfile(token) {
  const res = await fetch(`${API_URL}/api/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}
