import { CartProvider } from "./context/mobile-v2/CartContext";
import { SessionProviderWrapper } from "./components/mobile-app/SessionProviderWrapper";

export default function Providers({ children }) {
  return (
    <SessionProviderWrapper>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProviderWrapper>
  );
}
