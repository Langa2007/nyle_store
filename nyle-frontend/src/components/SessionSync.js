"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * SessionSync handles keeping the traditional "accessToken" and "user"
 * fields in localStorage in sync with the NextAuth session.
 * This ensures the Express backend remains compatible.
 */
export default function SessionSync() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            // Sync to localStorage for Express backend compatibility
            localStorage.setItem("accessToken", session.accessToken);
            localStorage.setItem("userAccessToken", session.accessToken);

            if (session.user) {
                localStorage.setItem("user", JSON.stringify({
                    id: session.user.id,
                    name: session.user.name,
                    email: session.user.email,
                    image: session.user.image
                }));
            }
        } else if (status === "unauthenticated") {
            // Clear if logged out via NextAuth
            // Note: only clear these if they look like they were set by this sync
            // to avoid conflicting with manual logins if any.
            // For simplicity, assume NextAuth is the primary driver.
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userAccessToken");
            localStorage.removeItem("user");
        }
    }, [session, status]);

    return null; // This component doesn't render anything
}
