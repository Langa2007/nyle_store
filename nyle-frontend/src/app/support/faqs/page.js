import SupportInfoLayout from "@/components/support/SupportInfoLayout";

export default function FaqPage() {
  return (
    <SupportInfoLayout
      title="Frequently Asked Questions"
      subtitle="Quick answers to common questions from our users."
    >
      <div className="space-y-6 text-gray-700">
        <div>
          <h3 className="font-semibold text-lg">How do I track my order?</h3>
          <p>You can track orders from your dashboard under “My Orders.”</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">How do I become a vendor?</h3>
          <p>Go to <a href="/vendor/signup" className="text-blue-600 hover:underline">Become a Seller</a> to start your journey.</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">What payment methods are supported?</h3>
          <p>We support M-Pesa, card payments, and bank transfers via NylePay.</p>
        </div>
      </div>
    </SupportInfoLayout>
  );
}
