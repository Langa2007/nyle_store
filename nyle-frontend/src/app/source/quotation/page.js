import BuyerInfoLayout from "@/components/source/BuyerInfoLayout";

export default function QuotationPage() {
  return (
    <BuyerInfoLayout
      title="Get Quotation"
      subtitle="Post your sourcing request once — receive offers from verified suppliers instantly."
    >
      <p className="mb-6 text-lg leading-relaxed">
        Whether you’re a retailer, manufacturer, or startup, Nyle connects you
        with thousands of suppliers ready to fulfill your product needs at
        competitive prices. Post what you need, and let the suppliers come to
        you.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-10">
        <div>
          <h3 className="font-semibold text-xl mb-3">Why Use Nyle Quotation?</h3>
          <ul className="space-y-3">
            <li>⚡ Fast RFQ (Request For Quotation) submission</li>
            <li>🔍 Compare offers from verified suppliers in real-time</li>
            <li>💬 Chat securely and finalize deals within the platform</li>
            <li>💰 Transparent pricing and flexible payment methods</li>
          </ul>
        </div>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2597/2597051.png"
            alt="Quotation illustration"
            className="w-72 mx-auto"
          />
        </div>
      </div>

      <p className="text-lg">
        <strong>Post your first sourcing request</strong> today — and see how
        fast Nyle responds. With Nyle, you’re never sourcing alone.
      </p>
    </BuyerInfoLayout>
  );
}
