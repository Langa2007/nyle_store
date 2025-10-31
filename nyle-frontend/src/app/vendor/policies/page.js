"use client";
import { motion } from "framer-motion";
import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";

export default function SellerPoliciesPage() {
  return (
    <VendorInfoLayout
      title="Seller Policies"
      subtitle="We keep our marketplace fair, transparent, and empowering for every vendor."
    >
      <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center items-center px-6 py-16 text-gray-800">
        <motion.div
          className="max-w-4xl text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Fairness. Transparency. Trust.
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            At Nyle, we believe in creating a safe and fair trading environment.
            Our policies are designed to protect sellers’ rights while ensuring
            buyers enjoy consistent, quality experiences.
          </p>

          <ul className="space-y-4 text-gray-700 list-disc ml-6">
            <li>Maintain product authenticity and accurate descriptions.</li>
            <li>Ensure timely order fulfillment and transparent communication.</li>
            <li>No hidden costs — Nyle commissions are fair and disclosed upfront.</li>
            <li>Respect customer privacy and adhere to data protection laws.</li>
            <li>Follow ethical marketing and competitive pricing practices.</li>
          </ul>

          <p className="mt-10 text-gray-700">
            Our seller success team is always available to guide you through our
            policies and ensure your experience remains smooth and rewarding.
          </p>
        </motion.div>
      </section>
    </VendorInfoLayout>
  );
}
