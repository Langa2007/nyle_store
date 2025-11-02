import AboutInfoLayout from "@/components/about/AboutInfoLayout";

export default function NewsletterPage() {
  return (
    <AboutInfoLayout
      title="Nyle Newsletter"
      subtitle="Stay ahead with insights, updates, and trade opportunities every week."
    >
      <p>
        Get first access to platform updates, trade events, vendor insights, and
        exclusive offers. Join a growing community of entrepreneurs and buyers
        shaping the digital future of Africa.
      </p>

      <p className="pt-4">
        <a
          href="/newsletter/subscribe"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Subscribe Now
        </a>
      </p>
    </AboutInfoLayout>
  );
}
