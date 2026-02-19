const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com/api";

export async function fetchWithAuth(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;

    // Try to get token from localStorage (manual login) or NextAuth session (implicit via cookie)
    // For client-side calls, NextAuth handles cookies automatically.
    // However, the backend might still expect an Authorization header for some endpoints.
    const token = typeof window !== 'undefined'
        ? (localStorage.getItem('accessToken') || localStorage.getItem('userAccessToken'))
        : null;

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export const API_ENDPOINTS = {
    PRODUCTS: "/products",
    CATEGORIES: "/products/categories",
    CART: "/cart",
    USER: "/user",
    AUTH: "/auth",
};
