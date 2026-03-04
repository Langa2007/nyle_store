// admin-dashboard/src/app/dashboard/partners/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
    Handshake,
    Search,
    Filter,
    MoreVertical,
    CheckCircle,
    XCircle,
    Clock,
    Mail,
    Phone,
    Globe,
    Building2,
    ChevronRight,
    ExternalLink,
    Download,
    MapPin,
    User,
    Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface PartnerApplication {
    id: number;
    partner_type: string;
    partnership_tier: string;
    organization_name: string;
    full_name: string;
    email: string;
    phone: string;
    status: string;
    created_at: string;
    country: string;
    city: string;
    address?: string;
    registration_number?: string;
    year_established?: string;
    business_size?: string;
    annual_revenue?: string;
    website?: string;
    linkedin?: string;
    description?: string;
    key_clients?: string;
    services?: string | string[];
    target_markets?: string | string[];
    countries_of_operation?: string | string[];
    partnership_goals?: string;
    expected_volume?: string;
    integration_timeline?: string;
    additional_info?: string;
    job_title?: string;
    alternative_phone?: string;
}

export default function PartnersPage() {
    const [applications, setApplications] = useState<PartnerApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partners/applications`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminAccessToken')}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setApplications(data.data);
            }
        } catch (error) {
            console.error("Fetch errors:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partners/applications/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminAccessToken')}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await response.json();
            if (data.success) {
                toast.success(`Application ${newStatus}`);
                fetchApplications();
                if (selectedApp?.id === id) {
                    setSelectedApp({ ...selectedApp, status: newStatus });
                }
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const filteredApps = applications.filter(app => {
        const matchesSearch =
            app.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === "all" || app.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
        }
    };

    const getTierColor = (tier: string) => {
        switch (tier?.toLowerCase()) {
            case 'platinum': return 'from-blue-600 to-cyan-600';
            case 'gold': return 'from-purple-500 to-pink-500';
            case 'silver': return 'from-green-500 to-emerald-500';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Handshake className="text-blue-500" />
                        Partner Applications
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Manage and review incoming partnership requests</p>
                </div>
                <div className="flex items-center gap-3">
                    <button title ="Refresh"
                        onClick={fetchApplications}
                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors border border-gray-700"
                    >
                        <Clock size={18} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20">
                        <Download size={18} />
                        Export data
                    </button>
                </div>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Applications", value: applications.length, color: "blue" },
                    { label: "Pending Review", value: applications.filter(a => a.status === 'pending').length, color: "amber" },
                    { label: "Approved Partners", value: applications.filter(a => a.status === 'approved').length, color: "emerald" },
                    { label: "Conversion Rate", value: `${applications.length ? ((applications.filter(a => a.status === 'approved').length / applications.length) * 100).toFixed(1) : 0}%`, color: "purple" }
                ].map((stat, i) => (
                    <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                        <p className={`text-2xl font-bold mt-1 text-${stat.color}-500`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by company, contact or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1">
                        {['all', 'pending', 'approved', 'rejected'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filterStatus === status
                                    ? 'bg-gray-800 text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <button title = "Filter Applications" className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800/50 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Organization</th>
                                <th className="px-6 py-4">Contact Person</th>
                                <th className="px-6 py-4">Tier</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-gray-500 text-sm">Loading applications...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredApps.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No applications found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredApps.map((app) => (
                                    <tr
                                        key={app.id}
                                        className="hover:bg-gray-800/30 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedApp(app)}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-blue-500/50 transition-colors">
                                                    <Building2 size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{app.organization_name}</p>
                                                    <p className="text-xs text-gray-500 capitalize">{app.partner_type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-300 font-medium">{app.full_name}</p>
                                            <p className="text-xs text-gray-500">{app.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${getTierColor(app.partnership_tier)}`}>
                                                {app.partnership_tier?.toUpperCase() || 'STANDARD'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium capitalize ${getStatusColor(app.status)}`}>
                                                {app.status === 'approved' ? <CheckCircle size={12} /> : app.status === 'rejected' ? <XCircle size={12} /> : <Clock size={12} />}
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-gray-500">{new Date(app.created_at).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button title="View Details" className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Side Panel for Details */}
            <AnimatePresence>
                {selectedApp && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedApp(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 w-full max-w-lg h-full bg-gray-900 border-l border-gray-800 z-50 overflow-y-auto p-8 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-white">Application Details</h2>
                                <button title= "Close Details"
                                    onClick={() => setSelectedApp(null)}
                                    className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Status Actions */}
                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl border border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-3 h-3 rounded-full animate-pulse ${selectedApp.status === 'approved' ? 'bg-emerald-500' : selectedApp.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                                            }`}></span>
                                        <p className="text-sm font-medium text-gray-200 capitalize">Currently {selectedApp.status}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {selectedApp.status !== 'approved' && (
                                            <button
                                                onClick={() => handleStatusUpdate(selectedApp.id, 'approved')}
                                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {selectedApp.status !== 'rejected' && (
                                            <button
                                                onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
                                                className="px-4 py-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 text-xs font-bold rounded-lg transition-all"
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Company Info */}
                                <section>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Organization Information</h3>
                                    <div className="grid grid-cols-2 gap-6 bg-gray-800/30 p-6 rounded-2xl border border-gray-800/50">
                                        <div className="col-span-2">
                                            <p className="text-xs text-gray-500 mb-1">Legal Name</p>
                                            <p className="text-white font-semibold">{selectedApp.organization_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Registration #</p>
                                            <p className="text-gray-200 text-sm">{selectedApp.registration_number || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Established</p>
                                            <p className="text-gray-200 text-sm">{selectedApp.year_established || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Partner Type</p>
                                            <p className="text-gray-200 text-sm capitalize">{selectedApp.partner_type}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Business Size</p>
                                            <p className="text-gray-200 text-sm">{selectedApp.business_size || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Selected Tier</p>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${getTierColor(selectedApp.partnership_tier)}`}>
                                                {selectedApp.partnership_tier?.toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Annual Revenue</p>
                                            <p className="text-gray-200 text-sm">{selectedApp.annual_revenue || 'N/A'}</p>
                                        </div>
                                        {selectedApp.website && (
                                            <div className="col-span-2">
                                                <p className="text-xs text-gray-500 mb-1">Website</p>
                                                <a href={selectedApp.website} target="_blank" className="text-blue-400 text-sm flex items-center gap-1 hover:underline">
                                                    {selectedApp.website} <ExternalLink size={14} />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Business Profile */}
                                <section>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Business Profile</h3>
                                    <div className="space-y-4 bg-gray-800/30 p-6 rounded-2xl border border-gray-800/50">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1 text-blue-500">Core Services</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(Array.isArray(selectedApp.services) ? selectedApp.services : JSON.parse(selectedApp.services || '[]')).map((s: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-medium border border-blue-500/20">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1 text-emerald-500">Target Markets</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(Array.isArray(selectedApp.target_markets) ? selectedApp.target_markets : JSON.parse(selectedApp.target_markets || '[]')).map((m: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">{m}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1 text-purple-500">Operational Countries</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(Array.isArray(selectedApp.countries_of_operation) ? selectedApp.countries_of_operation : JSON.parse(selectedApp.countries_of_operation || '[]')).map((c: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-[10px] font-medium border border-purple-500/20">{c}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Business Description</p>
                                            <p className="text-gray-300 text-sm leading-relaxed italic">"{selectedApp.description || 'No description provided.'}"</p>
                                        </div>
                                        {selectedApp.key_clients && (
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Key Clients</p>
                                                <p className="text-gray-300 text-sm">{selectedApp.key_clients}</p>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Partnership Goals */}
                                <section>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Partnership Intent</h3>
                                    <div className="space-y-4 bg-gray-800/30 p-6 rounded-2xl border border-gray-800/50">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Partnership Goals</p>
                                            <p className="text-gray-300 text-sm leading-relaxed capitalize">{selectedApp.partnership_goals || 'Not specified'}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Exp. Volume</p>
                                                <p className="text-gray-200 text-sm capitalize">{selectedApp.expected_volume || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Go-live Timeline</p>
                                                <p className="text-gray-200 text-sm capitalize">{selectedApp.integration_timeline || 'N/A'}</p>
                                            </div>
                                        </div>
                                        {selectedApp.additional_info && (
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Additional Info</p>
                                                <p className="text-gray-400 text-xs italic">{selectedApp.additional_info}</p>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Contact Info */}
                                <section>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Primary Contact</h3>
                                    <div className="space-y-4 bg-gray-800/30 p-6 rounded-2xl border border-gray-800/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{selectedApp.full_name}</p>
                                                <p className="text-gray-400 text-xs">{selectedApp.job_title || 'Representative'}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 pt-2 border-t border-gray-800">
                                            <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                                                <Mail size={16} className="text-gray-500" />
                                                {selectedApp.email}
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                                <Phone size={16} className="text-gray-500" />
                                                {selectedApp.phone}
                                                {selectedApp.alternative_phone && <span className="text-gray-600 text-[10px]">/ {selectedApp.alternative_phone}</span>}
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                                <Globe size={16} className="text-gray-500" />
                                                {selectedApp.city}, {selectedApp.country}
                                            </div>
                                            {selectedApp.address && (
                                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                                    <MapPin size={16} className="text-gray-500" />
                                                    {selectedApp.address}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                {/* Date */}
                                <div className="pt-8 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
                                    <p>Application ID: #PA-{selectedApp.id.toString().padStart(4, '0')}</p>
                                    <p>Submitted on {new Date(selectedApp.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
