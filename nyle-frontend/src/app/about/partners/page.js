import AboutInfoLayout from "@/components/about/AboutInfoLayout";

export default function PartnersPage() {
  return (
    <AboutInfoLayout
      title="Our Partners"
      subtitle="Together, we’re building the backbone of African trade."
    >
      <p>
        We collaborate with logistics firms, fintech innovators, and local
        suppliers to make eCommerce accessible, fast, and transparent for
        everyone.
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>📦 Trusted logistics and delivery networks</li>
        <li>💳 Secure payment gateways and fintech partners</li>
        <li>🏪 Verified local and international vendors</li>
      </ul>

      <p className="pt-4">
        Interested in partnering with Nyle?{" "}
        <a
          href="/partner/apply"
          className="text-blue-600 font-semibold hover:underline"
        >
          Join our ecosystem today
        </a>
        .
      </p>
    </AboutInfoLayout>
  );
}
