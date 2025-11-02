"use client";
import { useState } from "react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";

export default function ReportIssuePage() {
  const [issue, setIssue] = useState("");

  const handleReport = (e) => {
    e.preventDefault();
    alert("Your issue has been submitted. We’ll investigate immediately.");
    setIssue("");
  };

  return (
    <SupportInfoLayout
      title="Report an Issue"
      subtitle="Something not working right? Let us know."
    >
      <form onSubmit={handleReport} className="space-y-4">
        <textarea
          placeholder="Describe your issue..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="border p-3 w-full rounded h-32"
          required
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition font-semibold"
        >
          Submit Report
        </button>
      </form>
    </SupportInfoLayout>
  );
}
