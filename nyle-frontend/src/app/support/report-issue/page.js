"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Send,
  CheckCircle,
  XCircle,
  HelpCircle,
  Phone,
  Mail,
  User,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";
import { toast } from "sonner";

/**
 * Predefined Issue Categories as per requirement
 */
const ISSUE_CATEGORIES = [
  { id: 1, label: "Website Bug" },
  { id: 2, label: "Payment Issue" },
  { id: 3, label: "Vendor Problem" },
  { id: 4, label: "Delivery Delay" },
  { id: 5, label: "Account Access" },
  { id: 6, label: "Other" }
];

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://nyle-store.onrender.com";

export default function ReportIssuePage() {
  const [form, setForm] = useState({
    reporter_name: "",
    reporter_email: "",
    reporter_phone: "",
    issue_category_id: "",
    description: "",
    url: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${baseurl}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          issue_category_id: parseInt(form.issue_category_id)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Report submitted successfully!");
      } else {
        setError(data.message || "Failed to submit report. Please try again.");
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      setError("A connection error occurred. Please check your internet.");
      toast.error("Connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <SupportInfoLayout title="Report Received" subtitle="We've got your back">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-white rounded-3xl p-12 text-center shadow-2xl border border-green-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Successful</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for reporting this issue. We have sent a confirmation email to <strong>{form.reporter_email}</strong>. 
            Our support team will investigate and notify you once it's resolved.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
          >
            Submit Another Report
          </button>
        </motion.div>
      </SupportInfoLayout>
    );
  }

  return (
    <SupportInfoLayout 
      title="Problem Reporting" 
      subtitle="Help us improve your experience by reporting any issues you encounter"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input 
                        type="text" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none"
                        placeholder="John Doe"
                        value={form.reporter_name}
                        onChange={(e) => setForm({...form, reporter_name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input 
                        type="email" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none"
                        placeholder="john@example.com"
                        value={form.reporter_email}
                        onChange={(e) => setForm({...form, reporter_email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Phone Number (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input 
                      type="tel" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none"
                      placeholder="+254 700 000000"
                      value={form.reporter_phone}
                      onChange={(e) => setForm({...form, reporter_phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Issue Category</label>
                  <div className="relative">
                    <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select 
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none appearance-none"
                      value={form.issue_category_id}
                      onChange={(e) => setForm({...form, issue_category_id: e.target.value})}
                    >
                      <option value="">Select what's wrong...</option>
                      {ISSUE_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Describe the Problem</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-gray-400 h-4 w-4" />
                    <textarea 
                      required
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none resize-none"
                      placeholder="Please details exactly what happened..."
                      value={form.description}
                      onChange={(e) => setForm({...form, description: e.target.value})}
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-3"
                  >
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : <Send className="h-5 w-5" />}
                  {isSubmitting ? "Submitting..." : "Send Problem Report"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 bg-gray-900 rounded-3xl text-white">
              <ShieldCheck className="h-10 w-10 text-red-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">Our Commitment</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your feedback helps us build a more reliable platform. Every report is reviewed by our technical team.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Response within 24 hours
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Confidential tracking
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Real-time notification on resolution
                </li>
              </ul>
            </div>

            <div className="p-8 border border-gray-200 rounded-3xl space-y-4">
              <h4 className="font-bold text-gray-900">Need Immediate Help?</h4>
              <p className="text-gray-500 text-sm">
                If you're unable to access your account or have an urgent payment issue, please reach out directly:
              </p>
              <div className="pt-2">
                <a href="tel:+254700000000" className="flex items-center gap-3 text-red-600 font-bold hover:text-red-700 transition-colors">
                  <Phone className="h-5 w-5" />
                  +254 700 000 000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SupportInfoLayout>
  );
}