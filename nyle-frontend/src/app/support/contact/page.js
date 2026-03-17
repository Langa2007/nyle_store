"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  MessageSquare, 
  Phone, 
  Mail, 
  CheckCircle, 
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  User,
  HelpCircle,
  Clock
} from "lucide-react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";
import { toast } from "sonner";
import { MessageCircle as WhatsAppIcon } from "lucide-react";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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

const baseurl = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

export default function ContactPage() {
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
        toast.success("Problem reported successfully!");
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

  const contactMethods = [
    { 
      id: "phone", 
      title: "WhatsApp Support", 
      icon: WhatsAppIcon, 
      color: "from-green-500 to-emerald-500",
      description: "0704521408",
      action: "https://wa.me/254704521408"
    },
    { 
      id: "call", 
      title: "Call Support", 
      icon: Phone, 
      color: "from-blue-500 to-cyan-500",
      description: "+254 704521408",
      action: "tel:+254704521408"
    },
    { 
      id: "email", 
      title: "Email Support", 
      icon: Mail, 
      color: "from-indigo-500 to-purple-500",
      description: "support@nyle.store",
      action: "mailto:support@nyle.store"
    }
  ];

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
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/30"
          >
            Report Another Issue
          </button>
        </motion.div>
      </SupportInfoLayout>
    );
  }

  return (
    <SupportInfoLayout 
      title="Contact Nyle Support" 
      subtitle="Report bugs, payment issues, or get technical assistance directly"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Contact Method Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method) => (
            <motion.button
              key={method.id}
              whileHover={{ y: -5 }}
              onClick={() => method.action ? window.open(method.action, '_blank') : null}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all text-left"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${method.color} mb-4`}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
              <p className="text-sm text-gray-500">{method.description}</p>
            </motion.button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-50"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Problem Reporting</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                  <Clock className="h-3 w-3" />
                  Response in ~2h
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
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
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
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
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input 
                      type="tel" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none"
                      placeholder="+254 704 521 408"
                      value={form.reporter_phone}
                      onChange={(e) => setForm({...form, reporter_phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Issue Category</label>
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
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Problem Details</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-gray-400 h-4 w-4" />
                    <textarea 
                      required
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none resize-none"
                      placeholder="Please describe what happened..."
                      value={form.description}
                      onChange={(e) => setForm({...form, description: e.target.value})}
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-3"
                  >
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
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
            <div className="p-8 bg-gray-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="h-20 w-20" />
              </div>
              <ShieldCheck className="h-10 w-10 text-red-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">Direct Wire to Admin</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your report goes directly to our administrative oversight team. We prioritize technical issues and payment disputes.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Real-time Dashboard Alert
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Email Confirmation Sent
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Resolved Status Notification
                </li>
              </ul>
            </div>

            <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl">
              <h4 className="font-bold text-gray-900 mb-2 underline decoration-red-500 decoration-2">Emergency?</h4>
              <p className="text-gray-500 text-sm mb-6">
                For security breaches or critical system downtime, please call our emergency line immediately.
              </p>
              <div className="space-y-3">
                <a href="tel:+254704521408" className="flex items-center justify-center gap-3 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors">
                  <Phone className="h-5 w-5" />
                  Call Emergency Support
                </a>
                <a 
                  href="https://wa.me/254704521408" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-3 py-3 bg-green-50 text-green-600 font-bold rounded-xl hover:bg-green-100 transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingWhatsApp />
    </SupportInfoLayout>
  );
}