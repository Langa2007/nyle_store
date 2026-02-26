"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useGeolocation from "@/hooks/useGeolocation";
import { toast } from "react-hot-toast";
import { FaPaperPlane, FaCompass } from "react-icons/fa";

export default function LeadForm({ type = "kenyan" }) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const { getCoordinates, loading: geoLoading } = useGeolocation();
    const [coords, setCoords] = useState(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

    useEffect(() => {
        // Auto-detect location on mount for better UX
        handleDetectLocation(true);
    }, []);

    const handleDetectLocation = async (silent = false) => {
        try {
            const location = await getCoordinates();
            setCoords(location);
            if (!silent) toast.success("Location detected!");
        } catch (err) {
            if (!silent) toast.error("Could not detect location. Please enter details manually.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !phone) return toast.error("Please fill in all fields");

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/vendor-leads/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    phone,
                    type,
                    latitude: coords?.latitude,
                    longitude: coords?.longitude,
                    country: coords?.country // Note: useGeolocation might not return country string directly, but we can store coords
                }),
            });

            if (!res.ok) throw new Error("Submission failed");

            toast.success("Interest captured! We will reach out soon.");
            setEmail("");
            setPhone("");
        } catch (err) {
            toast.error(err.message || "Failed to submit interest");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Register Your Interest
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Business Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setPhone}
                        defaultCountry={type === "kenyan" ? "KE" : undefined}
                        className="vendor-phone-input"
                    />
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`p-2 rounded-lg ${coords ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        <FaCompass className={geoLoading ? "animate-spin" : ""} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                            {coords ? "Location Captured" : "Location Detection"}
                        </p>
                        <p className="text-xs text-gray-500">
                            {coords
                                ? `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`
                                : "Help us know where you are based"}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleDetectLocation()}
                        disabled={geoLoading}
                        className="text-xs font-bold text-blue-600 hover:underline"
                    >
                        {coords ? "Redetect" : "Detect"}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group"
                >
                    {loading ? "Submitting..." : (
                        <>
                            Submit Interest
                            <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <style jsx global>{`
        .vendor-phone-input {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .vendor-phone-input input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          outline: none;
          transition: all 0.2s;
        }
        .vendor-phone-input input:focus {
          ring: 2px solid #2563eb;
        }
      `}</style>
        </div>
    );
}
