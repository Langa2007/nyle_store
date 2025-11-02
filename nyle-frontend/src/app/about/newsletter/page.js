"use client";

import { useState } from "react";
import AboutInfoLayout from "@/components/about/AboutInfoLayout";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus(data.message || "error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <AboutInfoLayout
      title="Nyle Newsletter"
      subtitle="Stay ahead with insights, updates, and trade opportunities every week."
    >
      <p className="text-lg mb-6">
        Get first access to platform updates, trade events, vendor insights, and
        exclusive offers. Join a growing community of entrepreneurs and buyers
        shaping the digital future of Africa.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row items-center gap-3 mt-6 bg-blue-50 p-6 rounded-2xl shadow-inner"
      >
        <input
          type="email"
          required
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:flex-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full md:w-auto"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe Now"}
        </button>
      </form>

      {status === "success" && (
        <p className="text-green-600 font-medium mt-3">
          🎉 You’ve been subscribed to Nyle updates!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 font-medium mt-3">
          ⚠️ Something went wrong. Please try again later.
        </p>
      )}
    </AboutInfoLayout>
  );
}
