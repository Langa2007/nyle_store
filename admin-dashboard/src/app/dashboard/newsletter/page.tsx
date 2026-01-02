"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";

//  Define the type for your subscriber object
interface Subscriber {
  email: string;
}

export default function NewsletterPage() {
  const [emails, setEmails] = useState<Subscriber[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //  Fetch subscribed emails
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("https://nyle-store.onrender.com/api/newsletter");
        setEmails(res.data || []);
      } catch (err) {
        console.error("Failed to fetch emails:", err);
      }
    };
    fetchEmails();
  }, []);

  //  Send a newsletter to all subscribers
  const handleSendNewsletter = async () => {
    try {
      await axios.post("https://nyle-store.onrender.com/api/newsletter/send", {
        subject,
        message,
      });
      alert("✅ Newsletter sent successfully!");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send newsletter:", err);
      alert("❌ Failed to send newsletter");
    }
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-4">Newsletter Management</h1>
      <p className="text-gray-600 mb-6">
        Send updates, announcements, and special offers to your subscribers.
      </p>

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
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Send Newsletter
        </Button>
      </div>

      {/* Subscriber List Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Subscribers List</h2>
        {emails.length > 0 ? (
          <ul className="space-y-2">
            {emails.map((subscriber, index) => (
              <li key={index} className="border-b pb-1 text-gray-700">
                {subscriber.email}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
}
