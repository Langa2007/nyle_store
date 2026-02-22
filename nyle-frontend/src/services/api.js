// nyle-frontend/src/services/api.js
import axios from "axios";

// Dynamically determine baseURL
let baseURL = "";

if (typeof window !== "undefined") {
  const hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    // 🖥️ Local development
    baseURL = "http://localhost:5000/api";
  } else {
    // 🌐 Production (Render, Vercel, etc.)
    const envUrl = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
    baseURL = envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`;
  }
} else {
  // ⚙️ Server-side fallback for SSR builds
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
  baseURL = envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`;
}

// Axios instance
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request/response interceptors for tokens, logging, etc.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
