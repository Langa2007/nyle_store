// src/services/userservice.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

// Register a new user.
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }
  return res.json();
}

// Log in an existing user.
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }
  return res.json();
}

//Fetch current user profile.
export async function getUserProfile() {
  const res = await fetch(`${API_URL}/api/users/profile`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}
