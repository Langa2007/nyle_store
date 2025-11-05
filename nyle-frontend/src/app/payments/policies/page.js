import PaymentLayout from "@/components/payments/PaymentLayout";

export default function PaymentPolicies() {
  return (
    <PaymentLayout title="Payment Policies">
      <p className="mb-4">
        At Nyle, we ensure every payment is processed securely and efficiently.
        These policies guide how transactions are handled and verified.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Payments must be made before order processing.</li>
        <li>Transactions use secure, encrypted connections.</li>
        <li>Automatic invoices are generated for all purchases.</li>
        <li>All payment activities are logged for transparency.</li>
      </ul>
    </PaymentLayout>
  );
}
