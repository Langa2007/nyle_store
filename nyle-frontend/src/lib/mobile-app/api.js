const getBaseUrl = () => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
    return envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`;
};

const BASE_URL = getBaseUrl();

export async function fetchWithAuth(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const { authToken, headers: customHeaders = {}, ...fetchOptions } = options;

    // Try to get token from localStorage (manual login) or NextAuth session (implicit via cookie)
    // For client-side calls, NextAuth handles cookies automatically.
    // However, the backend might still expect an Authorization header for some endpoints.
    const token = authToken || (
        typeof window !== 'undefined'
            ? (localStorage.getItem('accessToken') || localStorage.getItem('userAccessToken'))
            : null
    );
    const validToken = token && token !== "undefined" && token !== "null" ? token : null;

    const headers = {
        "Content-Type": "application/json",
        ...customHeaders,
    };

    if (validToken) {
        headers["Authorization"] = `Bearer ${validToken}`;
    }

    const response = await fetch(url, { ...fetchOptions, headers });

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
    LOCATION: "/location",
};
