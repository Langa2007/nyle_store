import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to fetch and poll vendor notifications
 * @param {number} pollingIntervalMs - Interval to poll for updates (0 to disable)
 */
export function useVendorNotifications(pollingIntervalMs = 60000) {
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);
    const [summary, setSummary] = useState({ rejected: 0, pending: 0, approved_recent: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotifications = useCallback(async () => {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('vendor_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";
            const res = await fetch(`${API_URL}/api/vendor/auth/notification-summary`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                if (res.status === 401) {
                    // Token might be expired, handled by VendorApi interceptors usually
                    return;
                }
                throw new Error('Failed to fetch notifications');
            }

            const data = await res.json();
            setNotifications(data.notifications || []);
            setCount(data.count || 0);
            setSummary(data.summary || { rejected: 0, pending: 0, approved_recent: 0 });
            setError(null);
        } catch (err) {
            console.error('Error fetching vendor notifications:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();

        if (pollingIntervalMs > 0) {
            const intervalId = setInterval(fetchNotifications, pollingIntervalMs);
            return () => clearInterval(intervalId);
        }
    }, [fetchNotifications, pollingIntervalMs]);

    return {
        notifications,
        count,
        summary,
        loading,
        error,
        refetch: fetchNotifications
    };
}
