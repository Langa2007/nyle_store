// services/heroServices.js
import { apiRequest } from "./api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export const getHeroSlides = () => apiRequest("/api/admin/hero-slides");

export const createHeroSlide = (formData) => {
  return fetch(`${BASE_URL}/api/admin/hero-slides`, {
    method: "POST",
    credentials: "include",
    body: formData, // FormData handles its own Content-Type for file uploads
  }).then(res => res.json());
};

export const updateHeroSlide = (id, data) => {
  const isFormData = data instanceof FormData;
  
  return fetch(`${BASE_URL}/api/admin/hero-slides/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? data : JSON.stringify(data),
  }).then(res => res.json());
};

export const deleteHeroSlide = (id) => apiRequest(`/api/admin/hero-slides/${id}`, { method: "DELETE" });
