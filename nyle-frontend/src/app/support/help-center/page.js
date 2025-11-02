import SupportInfoLayout from "@/components/support/SupportInfoLayout";

export default function HelpCenterPage() {
  return (
    <SupportInfoLayout
      title="Help Center"
      subtitle="Your one-stop destination for guidance, tutorials, and product support."
    >
      <p className="mb-6">
        Welcome to the Nyle Help Center — we’re here to make your selling and
        buying journey seamless. Find quick tutorials, get answers, or connect
        with our team to solve issues fast.
      </p>

      <ul className="space-y-3 text-gray-700">
        <li>📦 <strong>Orders & Shipping:</strong> Learn how to track, manage, and return your orders.</li>
        <li>🧾 <strong>Payments & Refunds:</strong> Understand how NylePay ensures safe and fast transactions.</li>
        <li>🛍️ <strong>Seller Support:</strong> Optimize your store with our growth and listing guides.</li>
      </ul>

      <div className="mt-8 text-center">
        <a
          href="/support/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-semibold"
        >
          Contact Support
        </a>
      </div>
    </SupportInfoLayout>
  );
}
