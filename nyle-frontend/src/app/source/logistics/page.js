import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function LogisticsPage() {
  return (
    <BuyerInfoLayout
      title="Get Logistics"
      subtitle="From pickup to delivery — Nyle ensures smooth movement of your goods."
    >
      <p className="text-lg mb-6">
        We’ve partnered with Kenya’s top logistics and courier companies to make
        sourcing stress-free. Whether it’s local delivery or regional freight,
        Nyle handles the coordination while you focus on growth.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-10">
        <ul className="space-y-4 text-lg">
          <li>🚛 Instant freight quotes for your orders</li>
          <li>📦 Real-time tracking across Kenya and East Africa</li>
          <li>💳 Pay once — shipping and insurance included</li>
          <li>🌐 Export assistance for cross-border trade</li>
        </ul>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2303/2303703.png"
          alt="Logistics"
          className="w-64 mx-auto"
        />
      </div>

      <p className="text-lg">
        <strong>Reliable logistics = reliable business.</strong> With Nyle,
        every order moves on time.
      </p>
    </BuyerInfoLayout>
  );
}
