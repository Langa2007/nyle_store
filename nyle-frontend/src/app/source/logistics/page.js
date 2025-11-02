import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function LogisticsPage() {
  return (
    <BuyerInfoLayout
      title="Get Logistics"
      subtitle="Seamless delivery and logistics solutions for your orders."
    >
      <p className="mb-6">
        Nyle integrates with trusted logistics partners to make sure your goods
        arrive safely and on time — wherever you are.
      </p>
      <ul className="space-y-3">
        <li>✅ Real-time shipment tracking</li>
        <li>✅ Affordable local and international shipping</li>
        <li>✅ Door-to-door delivery options</li>
        <li>✅ Insurance coverage for valuable goods</li>
      </ul>
    </BuyerInfoLayout>
  );
}
