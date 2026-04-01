"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
const SHOP_ACTIVITY_SESSION_KEY = "shop_activity_session_id";

const ShopActivityContext = createContext(null);

const normalizeItems = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

const readExistingSessionId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SHOP_ACTIVITY_SESSION_KEY);
};

export function ShopActivityProvider({ children }) {
  const { data: session, status } = useSession();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [recentlyViewedLoading, setRecentlyViewedLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const getSessionId = useCallback(() => {
    if (typeof window === "undefined") return null;

    let sessionId = localStorage.getItem(SHOP_ACTIVITY_SESSION_KEY);
    if (!sessionId) {
      sessionId = `activity_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(SHOP_ACTIVITY_SESSION_KEY, sessionId);
    }

    return sessionId;
  }, []);

  const getUserId = useCallback(() => {
    if (status === "authenticated" && session?.user?.id) {
      return String(session.user.id);
    }

    if (typeof window === "undefined") return null;

    const userData = localStorage.getItem("user");
    if (!userData) return null;

    try {
      const parsed = JSON.parse(userData);
      return parsed?.id ? String(parsed.id) : null;
    } catch (error) {
      return null;
    }
  }, [session, status]);

  const buildParams = useCallback(() => {
    const params = new URLSearchParams();
    const userId = getUserId();

    if (userId) {
      params.append("user_id", userId);
    } else {
      const sessionId = getSessionId();
      if (sessionId) params.append("session_id", sessionId);
    }

    return params;
  }, [getSessionId, getUserId]);

  const fetchWishlist = useCallback(async () => {
    try {
      setWishlistLoading(true);
      const params = buildParams();
      const response = await fetch(`${API_URL}/api/wishlist?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch wishlist");
      const data = await response.json();
      setWishlistItems(normalizeItems(data));
      return normalizeItems(data);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
      setWishlistItems([]);
      return [];
    } finally {
      setWishlistLoading(false);
    }
  }, [buildParams]);

  const fetchRecentlyViewed = useCallback(async (limit = 8) => {
    try {
      setRecentlyViewedLoading(true);
      const params = buildParams();
      params.append("limit", String(limit));
      const response = await fetch(`${API_URL}/api/recently-viewed?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch recently viewed");
      const data = await response.json();
      setRecentlyViewedItems(normalizeItems(data));
      return normalizeItems(data);
    } catch (error) {
      console.error("Recently viewed fetch error:", error);
      setRecentlyViewedItems([]);
      return [];
    } finally {
      setRecentlyViewedLoading(false);
    }
  }, [buildParams]);

  const refreshActivity = useCallback(async () => {
    await Promise.all([fetchWishlist(), fetchRecentlyViewed()]);
  }, [fetchRecentlyViewed, fetchWishlist]);

  const toggleWishlist = useCallback(async (product) => {
    const productId = Number(product?.id || product?._id);
    if (!Number.isInteger(productId) || productId <= 0) {
      return { success: false, error: "Invalid product" };
    }

    try {
      const userId = getUserId();
      const sessionId = userId ? null : getSessionId();
      const response = await fetch(`${API_URL}/api/wishlist/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          user_id: userId,
          session_id: sessionId,
        }),
      });

      if (!response.ok) throw new Error("Failed to update wishlist");

      const data = await response.json();
      setWishlistItems((current) => {
        if (data.wishlisted) {
          const exists = current.some((item) => Number(item.id || item.product_id) === productId);
          if (exists) return current;
          return [{ ...product, product_id: productId }, ...current];
        }

        return current.filter((item) => Number(item.id || item.product_id) !== productId);
      });

      return { success: true, wishlisted: Boolean(data.wishlisted) };
    } catch (error) {
      console.error("Toggle wishlist error:", error);
      return { success: false, error: error.message };
    }
  }, [getSessionId, getUserId]);

  const removeFromWishlist = useCallback(async (productId) => {
    const normalizedId = Number(productId);
    if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
      return { success: false, error: "Invalid product" };
    }

    try {
      const params = buildParams();
      const response = await fetch(
        `${API_URL}/api/wishlist/items/${normalizedId}?${params.toString()}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to remove wishlist item");

      setWishlistItems((current) =>
        current.filter((item) => Number(item.id || item.product_id) !== normalizedId)
      );

      return { success: true };
    } catch (error) {
      console.error("Remove wishlist item error:", error);
      return { success: false, error: error.message };
    }
  }, [buildParams]);

  const trackRecentlyViewed = useCallback(async (product) => {
    const productId = Number(product?.id || product?._id || product);
    if (!Number.isInteger(productId) || productId <= 0) return { success: false };

    try {
      const userId = getUserId();
      const sessionId = userId ? null : getSessionId();

      const response = await fetch(`${API_URL}/api/recently-viewed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          user_id: userId,
          session_id: sessionId,
        }),
      });

      if (!response.ok) throw new Error("Failed to track recently viewed item");

      const normalizedProduct = typeof product === "object" ? product : { id: productId };
      setRecentlyViewedItems((current) => {
        const withoutItem = current.filter(
          (item) => Number(item.id || item.product_id) !== productId
        );
        return [{ ...normalizedProduct, product_id: productId }, ...withoutItem].slice(0, 8);
      });

      return { success: true };
    } catch (error) {
      console.error("Track recently viewed error:", error);
      return { success: false, error: error.message };
    }
  }, [getSessionId, getUserId]);

  const clearRecentlyViewed = useCallback(async () => {
    try {
      const params = buildParams();
      const response = await fetch(`${API_URL}/api/recently-viewed?${params.toString()}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to clear recently viewed items");

      setRecentlyViewedItems([]);
      return { success: true };
    } catch (error) {
      console.error("Clear recently viewed error:", error);
      return { success: false, error: error.message };
    }
  }, [buildParams]);

  const isWishlisted = useCallback(
    (productId) =>
      wishlistItems.some((item) => Number(item.id || item.product_id) === Number(productId)),
    [wishlistItems]
  );

  useEffect(() => {
    refreshActivity();
  }, [refreshActivity]);

  useEffect(() => {
    const userId = getUserId();
    const sessionId = readExistingSessionId();

    if (!userId || !sessionId || isSyncing) return;

    const syncGuestData = async () => {
      try {
        setIsSyncing(true);
        await Promise.all([
          fetch(`${API_URL}/api/wishlist/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, session_id: sessionId }),
          }),
          fetch(`${API_URL}/api/recently-viewed/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, session_id: sessionId }),
          }),
        ]);
      } catch (error) {
        console.error("Shop activity sync error:", error);
      } finally {
        setIsSyncing(false);
        refreshActivity();
      }
    };

    syncGuestData();
  }, [getUserId, isSyncing, refreshActivity]);

  const value = useMemo(() => ({
    wishlistItems,
    wishlistCount: wishlistItems.length,
    wishlistLoading,
    recentlyViewedItems,
    recentlyViewedCount: recentlyViewedItems.length,
    recentlyViewedLoading,
    fetchWishlist,
    fetchRecentlyViewed,
    refreshActivity,
    toggleWishlist,
    removeFromWishlist,
    isWishlisted,
    trackRecentlyViewed,
    clearRecentlyViewed,
  }), [
    clearRecentlyViewed,
    fetchRecentlyViewed,
    fetchWishlist,
    isWishlisted,
    recentlyViewedItems,
    recentlyViewedLoading,
    refreshActivity,
    removeFromWishlist,
    toggleWishlist,
    trackRecentlyViewed,
    wishlistItems,
    wishlistLoading,
  ]);

  return (
    <ShopActivityContext.Provider value={value}>
      {children}
    </ShopActivityContext.Provider>
  );
}

export const useShopActivity = () => useContext(ShopActivityContext);
