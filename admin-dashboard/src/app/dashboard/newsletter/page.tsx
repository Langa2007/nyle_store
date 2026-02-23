"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";

//  Define the type for your subscriber object
interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

const API_BASE = "https://nyle-store.onrender.com";

function getAuthHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminAccessToken") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function NewsletterPage() {
  const [emails, setEmails] = useState<Subscriber[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  //  Fetch subscribed emails
  const fetchEmails = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(`${API_BASE}/api/newsletter/subscribers`, {
        headers: getAuthHeaders(),
      });
      setEmails(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      console.error("Failed to fetch emails:", err);
      setFetchError(err?.response?.data?.message || "Failed to load subscribers. Are you logged in as admin?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  //  Send a newsletter to all subscribers
  const handleSendNewsletter = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in both Subject and Message.");
      return;
    }
    setSending(true);
    try {
      const res = await axios.post(
        `${API_BASE}/api/newsletter/send`,
        { title: subject, message },
        { headers: getAuthHeaders() }
      );
      const data = res.data;
      const detail = data.sent !== undefined
        ? `\n\n📨 Sent: ${data.sent}  |  ❌ Failed: ${data.failed}${data.errors?.length ? `\n\nFirst error: ${data.errors[0]?.error}` : ""}`
        : "";
      alert(`✅ ${data.message}${detail}`);
      setSubject("");
      setMessage("");
    } catch (err: any) {
      console.error("Failed to send newsletter:", err);
      const errData = err?.response?.data;
      alert(`❌ ${errData?.message || "Failed to send newsletter"}\n\nDetails: ${errData?.details || "Unknown error"}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-4">Newsletter Management</h1>
      <p className="text-gray-600 mb-6">
        Send updates, announcements, and special offers to your subscribers.
      </p>

      {/* Stats Bar */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-6 py-4 mb-8 flex items-center gap-4">
        <div className="text-blue-700 font-bold text-2xl">{emails.length}</div>
        <div className="text-gray-600 text-sm">
          <div className="font-semibold text-gray-800">Total Subscribers</div>
          <div>People signed up for your newsletter</div>
        </div>
        <button
          onClick={fetchEmails}
          className="ml-auto text-sm text-blue-600 border border-blue-300 px-3 py-1.5 rounded hover:bg-blue-100 transition"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Create Newsletter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Newsletter</h2>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full mb-3 rounded h-40"
        />

        <Button
          onClick={handleSendNewsletter}
          disabled={sending}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Newsletter"}
        </Button>
      </div>

      {/* Subscriber List Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Subscribers List{" "}
            <span className="text-sm font-normal text-gray-500">
              ({emails.length} total)
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-500 py-6">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading subscribers...</span>
          </div>
        ) : fetchError ? (
          <div className="text-red-500 bg-red-50 border border-red-200 rounded p-4">
            <p className="font-semibold">Error loading subscribers</p>
            <p className="text-sm mt-1">{fetchError}</p>
            <button
              onClick={fetchEmails}
              className="mt-3 text-sm text-red-600 underline"
            >
              Try again
            </button>
          </div>
        ) : emails.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4">#</th>
                  <th className="pb-2 pr-4">Email</th>
                  <th className="pb-2">Subscribed At</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((subscriber, index) => (
                  <tr key={subscriber.id || index} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2 pr-4 text-gray-400">{index + 1}</td>
                    <td className="py-2 pr-4 text-gray-800 font-medium">{subscriber.email}</td>
                    <td className="py-2 text-gray-500 text-xs">
                      {subscriber.subscribed_at
                        ? new Date(subscriber.subscribed_at).toLocaleDateString("en-KE", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 py-6 text-center">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
}
