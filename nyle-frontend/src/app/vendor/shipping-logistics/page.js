import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function ShippingLogisticsPage() {
  return (
    <VendorInfoLayout
      title="Shipping & Logistics"
      subtitle="We simplify deliveries for you and your customers."
    >
      <p>
        Nyle partners with trusted logistics providers to handle nationwide
        shipping and delivery at competitive rates. You can choose between:
      </p>

      <ul>
        <li>🚚 Standard delivery (1–3 business days)</li>
        <li>🚀 Express delivery for urgent orders</li>
        <li>🏬 Pickup stations in major towns</li>
      </ul>

      <p>
        Tracking numbers are automatically shared with your buyers for
        transparency and confidence.
      </p>
    </VendorInfoLayout>
  );
}
