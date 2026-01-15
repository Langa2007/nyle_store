// services/vendorApi.js
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com/api';

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

// Add response interceptor to handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('vendor_token');
      localStorage.removeItem('vendor_data');
      sessionStorage.removeItem('vendor_session');
      
      // Redirect to sign-in if we're in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/vendor/signin?error=session_expired';
      }
    }
    return Promise.reject(error);
  }
);

// New: Session verification function
export const verifyVendorSession = async () => {
  try {
    const token = localStorage.getItem('vendor_token');
    const vendorData = localStorage.getItem('vendor_data');
    
    if (!token) {
      return { 
        authenticated: false, 
        verified: false,
        message: 'No authentication token found'
      };
    }

    // Try to get vendor profile to verify session
    const response = await api.get('/vendor/profile');
    
    return {
      authenticated: true,
      verified: response.data?.vendor?.status === 'verified',
      vendor: response.data?.vendor || JSON.parse(vendorData || '{}')
    };
  } catch (error) {
    console.error('Session verification error:', error);
    
    // Clear invalid session data
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('vendor_token');
      localStorage.removeItem('vendor_data');
      sessionStorage.removeItem('vendor_session');
    }
    
    return { 
      authenticated: false, 
      verified: false,
      message: error.response?.data?.message || 'Session verification failed'
    };
  }
};

// Existing functions
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

// New: Get vendor profile
export const getVendorProfile = async () => {
  try {
    const response = await api.get('/vendor/profile');
    return response.data?.vendor || {};
  } catch (error) {
    console.error('Error fetching vendor profile:', error);
    throw error;
  }
};

// New: Login function (for your sign-in page)
export const vendorLogin = async (email, password) => {
  try {
    const response = await api.post('/vendor/auth/login', { email, password });
    
    if (response.data?.token) {
      localStorage.setItem('vendor_token', response.data.token);
      
      if (response.data?.vendor) {
        localStorage.setItem('vendor_data', JSON.stringify(response.data.vendor));
      }
      
      return response.data;
    }
    
    throw new Error('No token received');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// New: Logout function
export const vendorLogout = () => {
  localStorage.removeItem('vendor_token');
  localStorage.removeItem('vendor_data');
  sessionStorage.removeItem('vendor_session');
  
  // Redirect to sign-in page
  if (typeof window !== 'undefined') {
    window.location.href = '/vendor/signin';
  }
};

// New: Check if vendor is logged in (quick check)
export const isVendorLoggedIn = () => {
  const token = localStorage.getItem('vendor_token');
  const vendorData = localStorage.getItem('vendor_data');
  
  if (!token || !vendorData) {
    return false;
  }
  
  try {
    const vendor = JSON.parse(vendorData);
    return vendor.status === 'verified';
  } catch (error) {
    return false;
  }
};