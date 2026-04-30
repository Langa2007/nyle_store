"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import AdminLayout from "@/app/components/AdminLayout";
import { 
  FaExclamationTriangle, FaCheckCircle, FaFilter, FaSearch, 
  FaEnvelope, FaPhone, FaLink, FaCalendarAlt, FaUser, FaCheck
} from "react-icons/fa";

interface UserReport {
  id: number;
  reporter_name: string;
  reporter_email: string;
  reporter_phone: string;
  issue_category_id: number;
  issue_title: string;
  description: string;
  url: string;
  status: 'open' | 'resolved';
  resolution_message?: string;
  created_at: string;
}

const baseurl = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

const getAdminAuthHeaders = (): HeadersInit => {
  return {};
};

export default function UserReportsPage() {
  const [reports, setReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [selectedReport, setSelectedReport] = useState<UserReport | null>(null);
  const [resolutionMessage, setResolutionMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' ? `${baseurl}/api/reports` : `${baseurl}/api/reports?status=${filter}`;
      const res = await fetch(url, { 
        headers: getAdminAuthHeaders(),
        credentials: "include" 
      });
      if (res.ok) {
        setReports(await res.json());
      } else {
        toast.error("Failed to fetch reports");
      }
    } catch (err) {
      toast.error("An error occurred while fetching reports");
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async () => {
    if (!selectedReport || !resolutionMessage) {
        toast.error("Resolution message is required");
        return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${baseurl}/api/reports/${selectedReport.id}/resolve`, {
        method: "PUT",
        headers: {
          ...getAdminAuthHeaders(),
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ resolution_message: resolutionMessage })
      });

      if (res.ok) {
        toast.success("Issue resolved and user notified");
        setReports(prev => prev.map(r => r.id === selectedReport.id ? { ...r, status: 'resolved', resolution_message: resolutionMessage } : r));
        setSelectedReport(null);
        setResolutionMessage("");
      } else {
        toast.error("Failed to resolve issue");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FaExclamationTriangle className="mr-3 text-red-500" />
              User Reports
            </h1>
            <p className="text-gray-400 mt-1">Manage and resolve problems reported by users</p>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-900/50 p-1 rounded-xl border border-gray-800">
            {(['all', 'open', 'resolved'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* List Column */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading issues...</p>
              </div>
            ) : reports.length === 0 ? (
              <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center">
                <FaCheckCircle className="text-5xl text-gray-800 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No reports found</p>
              </div>
            ) : (
              reports.map((report) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedReport(report)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    selectedReport?.id === report.id
                      ? 'bg-blue-600/10 border-blue-500/50 ring-1 ring-blue-500/30'
                      : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${
                      report.status === 'open' 
                        ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                        : 'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      {report.status}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1.5 opacity-50" />
                      {new Date(report.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{report.issue_title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{report.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <FaUser className="mr-1.5 opacity-50" />
                      {report.reporter_name || 'Anonymous'}
                    </span>
                    <span className="flex items-center">
                      <FaEnvelope className="mr-1.5 opacity-50" />
                      {report.reporter_email}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Details Column */}
          <div className="lg:sticky lg:top-6 self-start">
            <AnimatePresence mode="wait">
              {selectedReport ? (
                <motion.div
                  key={selectedReport.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                >
                  {/* Decorative background circle */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                       <h2 className="text-2xl font-bold text-white">Issue Details</h2>
                       <button 
                        onClick={() => setSelectedReport(null)}
                        className="text-gray-500 hover:text-white"
                       >
                         Close
                       </button>
                    </div>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Complainant</label>
                          <div className="text-white font-medium">{selectedReport.reporter_name || 'Anonymous User'}</div>
                          <div className="text-sm text-blue-400">{selectedReport.reporter_email}</div>
                          {selectedReport.reporter_phone && (
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                                <FaPhone className="mr-1.5 opacity-50" />
                                {selectedReport.reporter_phone}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Issue Type</label>
                          <div className="text-white font-medium">{selectedReport.issue_title}</div>
                          <div className="text-xs text-gray-500 mt-1">Category ID: #{selectedReport.issue_category_id}</div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Description</label>
                        <div className="bg-gray-950/50 border border-gray-800 rounded-2xl p-4 text-gray-300 text-sm leading-relaxed">
                          {selectedReport.description}
                        </div>
                      </div>

                      {selectedReport.url && (
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Source URL</label>
                          <a 
                            href={selectedReport.url} 
                            target="_blank" 
                            className="bg-gray-800 hover:bg-gray-700 text-blue-400 px-3 py-2 rounded-xl text-xs inline-flex items-center transition-colors"
                          >
                            <FaLink className="mr-2" />
                            {selectedReport.url}
                          </a>
                        </div>
                      )}

                      <div className="pt-6 border-t border-gray-800">
                        {selectedReport.status === 'open' ? (
                          <div className="space-y-4">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Resolution Message</label>
                            <textarea
                              value={resolutionMessage}
                              onChange={(e) => setResolutionMessage(e.target.value)}
                              placeholder="Describe how the issue was resolved. The user will receive this message in their email."
                              className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none min-h-[120px]"
                            />
                            <button
                              disabled={!resolutionMessage || submitting}
                              onClick={handleResolve}
                              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                                !resolutionMessage || submitting
                                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                  : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
                              }`}
                            >
                              {submitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : <FaCheck />}
                              {submitting ? "Processing..." : "Mark as Resolved"}
                            </button>
                          </div>
                        ) : (
                          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 text-center">
                            <FaCheckCircle className="text-3xl text-green-500 mx-auto mb-3" />
                            <h4 className="text-green-500 font-bold mb-2">Issue Resolved</h4>
                            <p className="text-gray-400 text-sm italic">"{selectedReport.resolution_message}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center h-[600px] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gray-950 rounded-full flex items-center justify-center mb-6">
                    <FaEnvelope className="text-3xl text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-500">Select a report to view details</h3>
                  <p className="text-gray-600 max-w-xs mt-2">Comprehensive information and resolution tools will appear here.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
