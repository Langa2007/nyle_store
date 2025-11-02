import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function QuotationPage() {
  return (
    <BuyerInfoLayout
      title="Get Quotation"
      subtitle="Request competitive quotes from verified suppliers on Nyle."
    >
      <p className="mb-6">
        Need bulk orders or special pricing? Nyle lets you post your product
        requirements and instantly get custom quotes from trusted suppliers
        across Kenya and beyond.
      </p>
      <ul className="space-y-3">
        <li>✅ Post your sourcing request in minutes</li>
        <li>✅ Receive multiple offers from verified sellers</li>
        <li>✅ Compare prices and delivery times with ease</li>
        <li>✅ Secure communication through Nyle chat</li>
      </ul>
      <p className="mt-6">
        Get started today and source smarter with Nyle’s buyer assurance tools.
      </p>
    </BuyerInfoLayout>
  );
}
