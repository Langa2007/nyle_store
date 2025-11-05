import PaymentLayout from "@/components/payments/PaymentLayout";

export default function CustomerProtection() {
  return (
    <PaymentLayout title="Customer Protection">
      <p className="mb-4">
        Your security is our top priority. Nyle ensures every buyer is protected
        from fraud or poor service through multiple safety layers.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Escrow-style payment release after delivery confirmation.</li>
        <li>Refunds for undelivered or counterfeit goods.</li>
        <li>24/7 dispute resolution center.</li>
        <li>Verified seller program for trusted sellers.</li>
      </ul>
    </PaymentLayout>
  );
}
