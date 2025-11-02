import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function SuppliersPage() {
  return (
    <BuyerInfoLayout
      title="Verified Suppliers"
      subtitle="We verify, you trade with confidence."
    >
      <p className="text-lg mb-6">
        Every supplier on Nyle undergoes identity verification, business
        registration checks, and quality screening. When you see the
        <span className="font-semibold text-blue-600"> “Verified”</span> badge,
        it means your supplier has earned trust — through performance.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center my-10">
        <ul className="space-y-4 text-lg">
          <li>✅ Verified business documents and trade licenses</li>
          <li>🌍 Transparent company profiles and reviews</li>
          <li>📈 Performance tracking and reliability scores</li>
          <li>🎯 Nyle dispute resolution for peace of mind</li>
        </ul>
        <img
          src="https://cdn-icons-png.flaticon.com/512/810/810354.png"
          alt="Verified Supplier"
          className="w-64 mx-auto"
        />
      </div>

      <p className="text-lg">
        Discover suppliers that care about long-term partnerships — not just
        quick sales.
      </p>
    </BuyerInfoLayout>
  );
}
