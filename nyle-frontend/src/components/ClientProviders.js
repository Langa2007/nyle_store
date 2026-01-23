"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CartProvider } from "@/context/CartContext/page";

export default function ClientProviders({ children }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <CartProvider>
        {children}
      </CartProvider>
    </QueryClientProvider>
  );
}
