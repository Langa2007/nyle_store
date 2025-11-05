import PaymentLayout from "@/components/payments/PaymentLayout";

export default function RefundsReturns() {
  return (
    <PaymentLayout title="Refunds & Returns">
      <p className="mb-4">
        We value your trust. If a product doesn’t meet your expectations, our
        refund policy ensures fair handling.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Refunds are processed within 5–7 business days.</li>
        <li>Returns must be unopened and in original packaging.</li>
        <li>Refunds go back to the same payment method used.</li>
        <li>Digital products and services are non-refundable.</li>
      </ul>
    </PaymentLayout>
  );
}
