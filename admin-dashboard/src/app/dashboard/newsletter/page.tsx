import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

export default function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get("https://nyle-store.onrender.com/api/newsletter/subscribers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscribers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendAnnouncement = async () => {
    if (!title || !message) return alert("Please fill all fields");
    setLoading(true);
    try {
      await axios.post(
        "https://nyle-store.onrender.com/api/newsletter/send",
        { title, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Announcement sent successfully!");
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Error sending announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Newsletter & Announcements</h1>

      <div className="mb-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Send Announcement</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full mb-3 p-2 rounded"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full mb-3 p-2 rounded h-32"
        />
        <Button onClick={sendAnnouncement} disabled={loading}>
          {loading ? "Sending..." : "Send Announcement"}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Subscribers</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.email}</td>
                <td className="p-2">{new Date(s.subscribed_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
