// services/heroServices.js
import { apiRequest } from "./api";

export const getHeroSlides = () => apiRequest("/api/admin/hero-slides");

export const createHeroSlide = (formData) => {
  const token = localStorage.getItem("adminAccessToken");
  return fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com"}/api/admin/hero-slides`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // FormData handles its own Content-Type for file uploads
  }).then(res => res.json());
};

export const updateHeroSlide = (id, data) => {
  const token = localStorage.getItem("adminAccessToken");
  const isFormData = data instanceof FormData;
  
  return fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com"}/api/admin/hero-slides/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? data : JSON.stringify(data),
  }).then(res => res.json());
};

export const deleteHeroSlide = (id) => apiRequest(`/api/admin/hero-slides/${id}`, { method: "DELETE" });
