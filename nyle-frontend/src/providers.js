"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          const status = error?.response?.status ?? error?.status;
          if (status === 429) return false;
          return failureCount < 1;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });

export default function Providers({ children }) {
  const [client] = useState(createQueryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}

