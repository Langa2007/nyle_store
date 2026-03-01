"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * SessionSync handles keeping the traditional "accessToken" and "user"
 * fields in localStorage in sync with the NextAuth session.
 * This ensures the Express backend remains compatible.
 */
export default function SessionSync() {
    const { data: session, status, update } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            // Check if the ID is a Google Provider ID (usually 21 purely numeric digits)
            // Normal CUIDs/UUIDs contain letters and dashes and will fail the regex test
            const isBadId = session.user?.id &&
                String(session.user.id).length > 20 &&
                /^\d+$/.test(String(session.user.id));

            if (isBadId) {
                console.warn("[SessionSync] Detected provider ID in session. Requesting migration...");
                // Clear any residue from localStorage to stop the backend error immediately
                localStorage.removeItem("user");
                // Trigger a session refresh to run the JWT migrator
                update();
                return;
            }

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
            // ... (rest of the logic)
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userAccessToken");
            localStorage.removeItem("user");
        }
    }, [session, status]);

    return null; // This component doesn't render anything
}
