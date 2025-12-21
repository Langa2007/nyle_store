// services/vendorApi.js
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com/api/v1';

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vendor_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getVendorProducts = async () => {
  try {
    const response = await api.get('/vendor/products');
    return response.data.products || [];
  } catch (error) {
    console.error('Error fetching vendor products:', error);
    throw error;
  }
};

export const getProductStats = async () => {
  try {
    const response = await api.get('/vendor/products/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching product stats:', error);
    throw error;
  }
};

export const createVendorProduct = async (productData) => {
  try {
    const formData = new FormData();
    
    // Append all product data
    Object.keys(productData).forEach(key => {
      if (key === 'gallery_images' && Array.isArray(productData[key])) {
        // Handle gallery images array
        productData[key].forEach((img, index) => {
          if (img instanceof File) {
            formData.append('gallery_images', img);
          }
        });
      } else if (key === 'main_image' && productData[key] instanceof File) {
        formData.append('main_image', productData[key]);
      } else if (productData[key] !== undefined && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.post('/vendor/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateVendorProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/vendor/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteVendorProduct = async (productId) => {
  try {
    const response = await api.delete(`/vendor/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const submitForApproval = async (productId) => {
  try {
    const response = await api.post(`/vendor/products/${productId}/submit`);
    return response.data;
  } catch (error) {
    console.error('Error submitting for approval:', error);
    throw error;
  }
};