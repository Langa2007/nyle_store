import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function PoliciesPage() {
  return (
    <VendorInfoLayout
      title="Seller Policies"
      subtitle="Understand our marketplace guidelines for fair trade."
    >
      <p>
        To ensure trust and fairness, Nyle enforces clear seller policies that
        protect both vendors and buyers:
      </p>

      <ul>
        <li>✅ Honest product descriptions and transparent pricing</li>
        <li>✅ On-time order fulfillment</li>
        <li>✅ No counterfeit or restricted goods</li>
        <li>✅ Responsive communication with buyers</li>
      </ul>

      <p>
        Violations may lead to account suspension or removal. You can read the
        full Vendor Agreement in your dashboard under “Legal & Compliance.”
      </p>
    </VendorInfoLayout>
  );
}
