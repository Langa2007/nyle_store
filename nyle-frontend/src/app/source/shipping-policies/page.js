import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function ShippingPoliciesPage() {
  return (
    <BuyerInfoLayout
      title="Shipping Rates & Policies"
      subtitle="Clarity and reliability from checkout to delivery."
    >
      <p className="text-lg mb-6">
        Nyle provides predictable and fair shipping rates — with clear return
        and refund options. Every order includes detailed delivery timelines,
        and most regions enjoy next-day dispatch.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-10">
        <ul className="space-y-4 text-lg">
          <li>🚚 Transparent shipping fees before purchase</li>
          <li>🎁 Free delivery for bulk or premium-tier orders</li>
          <li>🔁 Easy return process under Nyle Buyer Protection</li>
          <li>📩 SMS & email delivery updates every step of the way</li>
        </ul>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
          alt="Shipping"
          className="w-64 mx-auto"
        />
      </div>

      <p className="text-lg">
        We value your time and trust — that’s why Nyle keeps shipping honest,
        fair, and fast.
      </p>
    </BuyerInfoLayout>
  );
}
