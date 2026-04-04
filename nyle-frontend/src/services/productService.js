// nyle-frontend/src/services/productService.js
import api from "./api";

//CUSTOMER PRODUCTS
export const getProducts = async (params = {}) => {
  const res = await api.get("/products", { params });
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// ADMIN PRODUCTS (new
export const getAdminProducts = async () => {
  const res = await api.get("/admin/products"); 
  return res.data;
};
