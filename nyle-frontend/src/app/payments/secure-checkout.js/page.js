import PaymentLayout from "@/components/PaymentLayout";

export default function SecureCheckout() {
  return (
    <PaymentLayout title="Secure Checkout">
      <p className="mb-4">
        Nyle guarantees a secure checkout experience powered by encrypted
        connections and verified gateways.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>256-bit SSL encryption for all transactions.</li>
        <li>Full PCI DSS compliance for card payments.</li>
        <li>We never store sensitive payment information.</li>
        <li>Real-time fraud monitoring and verification.</li>
      </ul>
    </PaymentLayout>
  );
}
