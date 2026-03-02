"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Building2,
    Mail,
    Phone,
    Search,
    RefreshCw,
    Filter,
    User as FaUser
} from "lucide-react";

interface Lead {
    id: number;
    full_name: string;
    business_name: string;
    email: string;
    business_email: string;
    phone: string;
    business_phone: string;
    location: string;
    type: "kenyan" | "overseas";
    status: "interested" | "contacted" | "link_sent";
    created_at: string;
}

export default function VendorLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sendingLeadId, setSendingLeadId] = useState<number | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

    const getAuthHeaders = (): HeadersInit => {
        const token = typeof window !== "undefined" ? localStorage.getItem("adminAccessToken") : null;
        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    };

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/vendor-leads`, { headers: getAuthHeaders() });
            if (res.ok) {
                const data = await res.json();
                setLeads(data.leads || []);
            } else {
                toast.error("Failed to fetch leads");
            }
        } catch (err) {
            toast.error("Error loading leads");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`${API_URL}/api/vendor-leads/${id}`, {
                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus as any } : l));
                toast.success(`Lead marked as ${newStatus}`);
            }
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const sendSignupLink = async (id: number) => {
        try {
            setSendingLeadId(id);
            const res = await fetch(`${API_URL}/api/vendor-leads/${id}/send-link`, {
                method: "POST",
                headers: getAuthHeaders(),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || "Failed to send signup link");
            }

            setLeads(leads.map(l => l.id === id ? { ...l, status: "link_sent" } : l));
            toast.success("Signup link sent");
        } catch (err: any) {
            toast.error(err?.message || "Failed to send signup link");
        } finally {
            setSendingLeadId(null);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const filteredLeads = leads.filter(l =>
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.includes(searchQuery)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Building2 className="text-blue-500" />
                        Vendor Recruitment Leads
                    </h1>
                    <p className="text-gray-400 text-sm">Manage interested sellers and potential partners</p>
                </div>
                <button
                    onClick={fetchLeads}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative col-span-1 md:col-span-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by email or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition">
                    <Filter size={18} />
                    Filters
                </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Business Info</th>
                                <th className="px-6 py-4 font-semibold">Emails</th>
                                <th className="px-6 py-4 font-semibold">Contact & Location</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Recruit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold flex items-center gap-2">
                                                {lead.business_name || "New Vendor"}
                                            </span>
                                            <span className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                                                <FaUser size={12} className="text-gray-500" />
                                                {lead.full_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-white text-sm flex items-center gap-2">
                                                <Mail size={14} className="text-blue-400" />
                                                {lead.email}
                                            </span>
                                            <span className="text-gray-400 text-xs mt-1">
                                                Biz: {lead.business_email || "N/A"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-300 text-sm flex items-center gap-2">
                                                <Phone size={14} className="text-emerald-400" />
                                                {lead.phone}
                                            </span>
                                            <span className="text-gray-500 text-xs mt-1 italic max-w-[150px] truncate">
                                                {lead.location || "Unknown Location"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${lead.type === 'overseas' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            }`}>
                                            {lead.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${lead.status === 'link_sent' ? 'bg-emerald-500/10 text-emerald-400' :
                                            lead.status === 'contacted' ? 'bg-amber-500/10 text-amber-400' : 'bg-gray-500/10 text-gray-400'
                                            }`}>
                                            {lead.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => sendSignupLink(lead.id)}
                                                disabled={lead.status !== "contacted" || sendingLeadId === lead.id}
                                                className={`p-2 rounded-lg transition ${
                                                    lead.status !== "contacted" || sendingLeadId === lead.id
                                                        ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                                                        : "bg-gray-800 text-blue-500 hover:bg-blue-500 hover:text-white"
                                                }`}
                                                title={lead.status !== "contacted" ? "Mark as Contacted first" : "Send Signup Link"}
                                            >
                                                <Building2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(lead.id, 'contacted')}
                                                className="p-2 bg-gray-800 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition"
                                                title="Mark as Contacted"
                                            >
                                                <Phone size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredLeads.length === 0 && !loading && (
                        <div className="p-12 text-center">
                            <Building2 className="mx-auto text-gray-800 mb-4" size={48} />
                            <p className="text-gray-500">No recruitment leads found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
