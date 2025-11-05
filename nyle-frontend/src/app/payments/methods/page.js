import PaymentLayout from "@/components/payments/PaymentLayout";

export default function AcceptedMethods() {
  return (
    <PaymentLayout title="Accepted Payment Methods">
      <p className="mb-4">
        Nyle supports a variety of payment methods to make your shopping seamless.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Visa, MasterCard, and American Express</li>
        <li>M-Pesa, Airtel Money, and T-Kash</li>
        <li>Direct bank transfer (for bulk or verified buyers)</li>
        <li>Crypto (coming soon)</li>
        <li>Nyle Wallet (for returning users)</li>
      </ul>
    </PaymentLayout>
  );
}
