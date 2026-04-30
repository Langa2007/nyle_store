const getBaseUrl = () => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
    return envUrl.endsWith("/api") ? envUrl : `${envUrl.replace(/\/$/, "")}/api`;
};

const BASE_URL = getBaseUrl();

export async function fetchWithAuth(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const { authToken, headers: customHeaders = {}, ...fetchOptions } = options;

    // Tokens are now managed via secure HttpOnly cookies
    const validToken = authToken && authToken !== "undefined" && authToken !== "null" ? authToken : null;

    const headers = {
        "Content-Type": "application/json",
        ...customHeaders,
    };

    if (validToken) {
        headers["Authorization"] = `Bearer ${validToken}`;
    }

    const response = await fetch(url, { ...fetchOptions, headers, credentials: "include" });

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
