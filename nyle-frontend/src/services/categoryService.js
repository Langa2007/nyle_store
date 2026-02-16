import api from "./api";

export const getCategories = async () => {
  const res = await api.get("products/categories");
  return res.data;
};
