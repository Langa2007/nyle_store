"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import axios from "axios";

// Global axios configuration for secure HttpOnly cookie-based authentication.
// This ensures that credentials (cookies) are sent with every cross-origin request.
if (typeof window !== "undefined") {
  axios.defaults.withCredentials = true;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient once
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
