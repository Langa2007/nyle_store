"use client";
import { useState } from "react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent. Our team will get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <SupportInfoLayout
      title="Contact Us"
      subtitle="We’re here to help — reach out anytime."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-3 w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-3 w-full rounded"
          required
        />
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="border p-3 w-full rounded h-32"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold"
        >
          Send Message
        </button>
      </form>
    </SupportInfoLayout>
  );
}
