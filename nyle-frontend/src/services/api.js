// nyle-frontend/src/services/api.js
import axios from "axios";

// Dynamically determine baseURL
const envUrl = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
const baseURL = envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`;

// Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true,
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
