import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function TradeAssurancePage() {
  return (
    <BuyerInfoLayout
      title="Trade Assurance"
      subtitle="Your safety net for secure and guaranteed transactions."
    >
      <p className="mb-6">
        Trade Assurance is Nyle’s built-in protection program that ensures your
        orders are delivered on time and as described, or you get your money
        back.
      </p>
      <ul className="space-y-3">
        <li>✅ Secure payments held until you confirm receipt</li>
        <li>✅ Transparent order tracking</li>
        <li>✅ Full or partial refunds for valid disputes</li>
        <li>✅ Priority buyer support and resolution team</li>
      </ul>
    </BuyerInfoLayout>
  );
}
