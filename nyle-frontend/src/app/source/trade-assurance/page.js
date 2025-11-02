import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function TradeAssurancePage() {
  return (
    <BuyerInfoLayout
      title="Trade Assurance"
      subtitle="Confidence is built into every transaction."
    >
      <p className="text-lg mb-6">
        With Nyle’s Trade Assurance, every purchase is backed by a promise —
        that your goods will arrive on time, as described, or your money back.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center my-10">
        <ul className="space-y-4 text-lg">
          <li>🔒 Escrow protection — funds held until delivery is confirmed</li>
          <li>📦 Order tracking and milestone notifications</li>
          <li>🧾 Documented supplier performance history</li>
          <li>⚖️ Quick resolution for claims and disputes</li>
        </ul>
        <img
          src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
          alt="Assurance"
          className="w-64 mx-auto"
        />
      </div>

      <p className="text-lg">
        With Nyle, trade isn’t a risk — it’s a relationship built on trust.
      </p>
    </BuyerInfoLayout>
  );
}
