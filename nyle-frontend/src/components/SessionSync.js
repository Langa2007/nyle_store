"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

/**
 * SessionSync handles keeping the traditional "accessToken" and "user"
 * fields in localStorage in sync with the NextAuth session.
 * This ensures the Express backend remains compatible.
 */
export default function SessionSync() {
    const { data: session, status, update } = useSession();
    const migrationAttemptRef = useRef(null);

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            // Check if the ID is a Google Provider ID (usually 21 purely numeric digits)
            // Normal CUIDs/UUIDs contain letters and dashes and will fail the regex test
            const isBadId = session.user?.id &&
                String(session.user.id).length > 20 &&
                /^\d+$/.test(String(session.user.id));

            if (isBadId) {
                const migrationKey = `${session.user?.email || "unknown"}:${session.user?.id}`;
                if (migrationAttemptRef.current === migrationKey) {
                    return;
                }

                migrationAttemptRef.current = migrationKey;
                console.warn("[SessionSync] Detected provider ID in session. Requesting migration...");
                // Clear any residue from localStorage to stop the backend error immediately
                localStorage.removeItem("user");
                // Trigger a session refresh to run the JWT migrator
                void update();
                return;
            }

            migrationAttemptRef.current = null;

            // Tokens are now managed via secure HttpOnly cookies

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
            // Session cookies are cleared by the logout endpoint
            localStorage.removeItem("user");
            migrationAttemptRef.current = null;
        }
    }, [session, status, update]);

    return null; // This component doesn't render anything
}
