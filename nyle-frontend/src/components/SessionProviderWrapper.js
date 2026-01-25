"use client";

import { SessionProvider } from "next-auth/react";

/**
 * SessionProviderWrapper wraps the application with the NextAuth SessionProvider.
 * This is used in the RootLayout to provide session context to all client components.
 */
export function SessionProviderWrapper({ children }) {
    return <SessionProvider>{children}</SessionProvider>;
}
