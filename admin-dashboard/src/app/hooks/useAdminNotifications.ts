import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from './useAdminAuth';

interface NotificationSummary {
    total: number;
    details: {
        pendingVendors: number;
        pendingPartners: number;
        pendingOrders: number;
        openSupportMessages: number;
        openReportedIssues: number;
    };
}

export function useAdminNotifications(pollingIntervalMs = 60000) {
    const { admin } = useAdminAuth();
    const isLoggedIn = !!admin;
    const [notifications, setNotifications] = useState<NotificationSummary>({
        total: 0,
        details: {
            pendingVendors: 0,
            pendingPartners: 0,
            pendingOrders: 0,
            openSupportMessages: 0,
            openReportedIssues: 0,
        }
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotifications = useCallback(async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;

        if (!isLoggedIn || !token) {
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com'}/api/admin/notifications/summary`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch admin notifications');
            }

            const data = await res.json();
            if (data.success) {
                setNotifications({
                    total: data.total,
                    details: data.details
                });
            }
        } catch (err) {
            console.error('Error fetching admin notifications:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchNotifications();

        let intervalId: NodeJS.Timeout;
        if (pollingIntervalMs > 0 && isLoggedIn) {
            intervalId = setInterval(fetchNotifications, pollingIntervalMs);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [fetchNotifications, pollingIntervalMs, isLoggedIn]);

    return {
        notifications,
        loading,
        error,
        refetch: fetchNotifications
    };
}
