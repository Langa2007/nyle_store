// nyle-frontend/src/services/productService.js
import api from "./api";

// ---------- CUSTOMER PRODUCTS ----------
export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// ---------- ADMIN PRODUCTS (new) ----------
export const getAdminProducts = async () => {
  const res = await api.get("/admin/products"); 
  return res.data;
};
