"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CartProvider } from "@/context/CartContext/page";
import { ShopActivityProvider } from "@/context/ShopActivityContext/page";

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

export default function ClientProviders({ children }) {
  const [client] = useState(createQueryClient);

  return (
    <QueryClientProvider client={client}>
      <CartProvider>
        <ShopActivityProvider>
          {children}
        </ShopActivityProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
