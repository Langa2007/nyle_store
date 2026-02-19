import { CartProvider } from "./context/CartContext";
import { SessionProviderWrapper } from "./components/SessionProviderWrapper";

export default function Providers({ children }) {
  return (
    <SessionProviderWrapper>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProviderWrapper>
  );
}
