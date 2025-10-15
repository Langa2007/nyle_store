// config/api.js

let API_BASE_URL = "";

// Auto-detect environment
if (typeof window !== "undefined") {
  const hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    API_BASE_URL = "http://localhost:5000/api"; // Local backend
  } else {
    API_BASE_URL = "https://nyle-store.onrender.com/api"; // Replace with your actual Render backend URL
  }
} else {
  // SSR fallback
  API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com/api";
}

export default API_BASE_URL;
