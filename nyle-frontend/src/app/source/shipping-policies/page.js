import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function ShippingPoliciesPage() {
  return (
    <BuyerInfoLayout
      title="Shipping Rates & Policies"
      subtitle="Transparent and reliable shipping across Kenya and beyond."
    >
      <p className="mb-6">
        We partner with leading logistics providers to deliver fair shipping
        rates and consistent delivery times. Our policies are designed for
        simplicity and fairness.
      </p>
      <ul className="space-y-3">
        <li>✅ Clear pricing before checkout</li>
        <li>✅ Free shipping on eligible bulk orders</li>
        <li>✅ Returns accepted under buyer protection</li>
        <li>✅ Delivery updates via SMS & email</li>
      </ul>
    </BuyerInfoLayout>
  );
}
