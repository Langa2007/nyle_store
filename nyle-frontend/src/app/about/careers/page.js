import AboutInfoLayout from "@/components/about/AboutInfoLayout";

export default function CareersPage() {
  return (
    <AboutInfoLayout
      title="Careers at Nyle"
      subtitle="Join a team shaping the next generation of commerce in Africa."
    >
      <p>
        At Nyle, we don’t just build products — we build possibilities. We’re
        engineers, designers, and visionaries solving real problems with global
        impact.
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>🌍 Work remotely or in our innovation hubs</li>
        <li>🚀 Tackle high-impact challenges in logistics, trade, and tech</li>
        <li>💡 Innovate freely in a creative, fast-moving environment</li>
        <li>🤝 Be part of a culture that values growth, learning, and purpose</li>
      </ul>

      <p className="pt-4">
        <a
          href="/careers/apply"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Explore Open Roles
        </a>
      </p>
    </AboutInfoLayout>
  );
}
