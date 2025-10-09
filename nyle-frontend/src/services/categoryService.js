import api from "./api";

export const getCategories = async () => {
  const res = await api.get("admin/categories");//added admin
  return res.data;
};
