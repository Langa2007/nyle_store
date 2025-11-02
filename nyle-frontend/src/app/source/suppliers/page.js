import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function SuppliersPage() {
  return (
    <BuyerInfoLayout
      title="Verified Suppliers"
      subtitle="Shop confidently with Nyle’s verified and trusted suppliers."
    >
      <p className="mb-6">
        Every supplier on Nyle undergoes strict verification to ensure
        authenticity, reliability, and performance — giving you peace of mind
        when placing orders.
      </p>
      <ul className="space-y-3">
        <li>✅ Verified business credentials and trade history</li>
        <li>✅ Customer reviews and supplier ratings</li>
        <li>✅ Consistent order fulfillment and communication</li>
        <li>✅ Dedicated supplier support from Nyle</li>
      </ul>
    </BuyerInfoLayout>
  );
}
