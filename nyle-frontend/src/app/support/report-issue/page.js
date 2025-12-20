"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Send,
  Bug,
  Shield,
  Zap,
  Clock,
  FileText,
  Image,
  Paperclip,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  Camera,
  Smartphone,
  Globe,
  TrendingUp,
  Users,
  Bell
} from "lucide-react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";

export default function ReportIssuePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    screenshot: null,
    url: "",
    steps: "",
    device: "",
    browser: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [characterCount, setCharacterCount] = useState(0);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const categories = [
    { id: "bug", label: "Bug Report", icon: Bug, color: "from-red-500 to-orange-500", description: "Something is broken or not working" },
    { id: "security", label: "Security Issue", icon: Shield, color: "from-purple-500 to-pink-500", description: "Vulnerability or privacy concern" },
    { id: "performance", label: "Performance", icon: Zap, color: "from-yellow-500 to-amber-500", description: "Slow loading or lagging" },
    { id: "feature", label: "Feature Request", icon: TrendingUp, color: "from-green-500 to-emerald-500", description: "Suggest new functionality" },
    { id: "ui", label: "UI/UX Issue", icon: Smartphone, color: "from-blue-500 to-cyan-500", description: "Design or usability problem" },
    { id: "other", label: "Other Issue", icon: AlertCircle, color: "from-gray-500 to-gray-700", description: "Something else not listed" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-700", description: "Minor issue, not urgent" },
    { value: "medium", label: "Medium", color: "bg-blue-100 text-blue-700", description: "Important but not critical" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-700", description: "Affects functionality" },
    { value: "critical", label: "Critical", color: "bg-red-100 text-red-700", description: "Blocking, needs immediate attention" },
  ];

  const devices = [
    "Desktop/Laptop",
    "Smartphone",
    "Tablet",
    "Other"
  ];

  const browsers = [
    "Chrome",
    "Firefox",
    "Safari",
    "Edge",
    "Brave",
    "Other"
  ];

  const recentIssues = [
    { id: 1, title: "Payment processing delay", status: "in-progress", date: "2 hours ago" },
    { id: 2, title: "Mobile app crash on login", status: "resolved", date: "1 day ago" },
    { id: 3, title: "Image upload failure", status: "investigating", date: "3 days ago" },
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type.split('/')[0]
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setShowSuccess(true);
    
    // Auto-hide success after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setForm({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        screenshot: null,
        url: "",
        steps: "",
        device: "",
        browser: ""
      });
      setUploadedFiles([]);
      setActiveStep(1);
    }, 5000);
  };

  const handleDescriptionChange = (e) => {
    setForm({ ...form, description: e.target.value });
    setCharacterCount(e.target.value.length);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [form.description]);

  return (
    <SupportInfoLayout
      title="Report an Issue"
      subtitle={
        <div className="flex items-center gap-2">
          <span className="text-blue-100/90">Something not working right? Let us know immediately.</span>
          <Sparkles className="h-4 w-4 text-blue-200" />
        </div>
      }
    >
      <div className="space-y-8">
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-green-100 rounded-full"
                >
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Issue Reported Successfully!</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Ticket ID: <span className="font-mono font-bold">NYLE-{Date.now().toString().slice(-6)}</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Our team will investigate and get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="p-2 hover:bg-green-100 rounded-full transition-colors"
                >
                  <XCircle className="h-5 w-5 text-green-600" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Steps */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
          <div className="relative flex justify-between max-w-3xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="relative z-10">
                <button
                  onClick={() => setActiveStep(step)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    activeStep >= step
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {step}
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-medium whitespace-nowrap">
                  {step === 1 && "Describe Issue"}
                  {step === 2 && "Add Details"}
                  {step === 3 && "Review & Submit"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              <motion.div
                initial={false}
                animate={{ opacity: activeStep >= 1 ? 1 : 0.5 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Issue Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Title *
                      </label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Briefly describe the issue"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Detailed Description *
                        </label>
                        <span className="text-sm text-gray-500">{characterCount}/2000</span>
                      </div>
                      <textarea
                        ref={textareaRef}
                        value={form.description}
                        onChange={handleDescriptionChange}
                        placeholder="Describe the issue in detail. Include what you were doing, what happened, and what you expected to happen."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all min-h-[120px] resize-none"
                        maxLength={2000}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setForm({ ...form, category: cat.id })}
                            className={`relative p-4 rounded-xl border text-left transition-all ${
                              form.category === cat.id
                                ? 'border-blue-500 ring-2 ring-blue-500/20'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${cat.color} mb-2`}>
                              <cat.icon className="h-4 w-4 text-white" />
                            </div>
                            <div className="font-medium text-gray-900 text-sm">{cat.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{cat.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Additional Details */}
              <motion.div
                initial={false}
                animate={{ opacity: activeStep >= 2 ? 1 : 0.5 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Additional Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <div className="space-y-2">
                        {priorityOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setForm({ ...form, priority: option.value })}
                            className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                              form.priority === option.value
                                ? option.color + ' ring-2 ring-offset-1'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Device
                        </label>
                        <select
                          value={form.device}
                          onChange={(e) => setForm({ ...form, device: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        >
                          <option value="">Select device</option>
                          {devices.map(device => (
                            <option key={device} value={device}>{device}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Browser
                        </label>
                        <select
                          value={form.browser}
                          onChange={(e) => setForm({ ...form, browser: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        >
                          <option value="">Select browser</option>
                          {browsers.map(browser => (
                            <option key={browser} value={browser}>{browser}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page URL (if applicable)
                    </label>
                    <input
                      type="url"
                      value={form.url}
                      onChange={(e) => setForm({ ...form, url: e.target.value })}
                      placeholder="https://nyle.com/page-where-issue-occurred"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reproduction Steps
                    </label>
                    <textarea
                      value={form.steps}
                      onChange={(e) => setForm({ ...form, steps: e.target.value })}
                      placeholder="Step 1: Go to...&#10;Step 2: Click on...&#10;Step 3: Observe..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Attachments */}
              <motion.div
                initial={false}
                animate={{ opacity: activeStep >= 3 ? 1 : 0.5 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-purple-600" />
                    Attachments
                  </h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                    />
                    <Paperclip className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Add Screenshots or Files</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Upload screenshots, videos, or documents that help explain the issue
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors"
                    >
                      Choose Files
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                      PNG, JPG, PDF, DOC up to 10MB
                    </p>
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                      <div className="space-y-2">
                        {uploadedFiles.map(file => (
                          <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium text-gray-900 text-sm">{file.name}</div>
                                <div className="text-xs text-gray-500">{file.size}</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(file.id)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <XCircle className="h-5 w-5 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Shield className="h-4 w-4" />
                          Your report is confidential and secure
                        </div>
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Submitting Report...
                          </>
                        ) : isSubmitted ? (
                          <>
                            <CheckCircle className="h-5 w-5" />
                            Report Submitted
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Submit Issue Report
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </form>
          </div>

          {/* Right Column - Info & Recent Issues */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Tips for Better Reports
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span>Include clear screenshots with annotations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span>Describe exact steps to reproduce the issue</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span>Note your browser, device, and OS version</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span>Provide specific error messages if any</span>
                </li>
              </ul>
            </div>

            {/* Recent Issues */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                Your Recent Reports
              </h3>
              <div className="space-y-4">
                {recentIssues.map(issue => (
                  <div key={issue.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900 text-sm truncate">{issue.title}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{issue.date}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Reports →
              </button>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-300" />
                What Happens Next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium">Initial Response</div>
                    <div className="text-sm text-gray-300">Within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Users className="h-4 w-4 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium">Team Assigned</div>
                    <div className="text-sm text-gray-300">Based on issue type</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Shield className="h-4 w-4 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium">Confidential</div>
                    <div className="text-sm text-gray-300">Your report is secure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-white text-lg mb-3">Emergency Issue?</h3>
              <p className="text-red-100 mb-4">
                For critical security issues or service outages, contact us immediately.
              </p>
              <button className="w-full py-3 bg-white text-red-600 font-semibold rounded-xl hover:shadow-lg flex items-center justify-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </SupportInfoLayout>
  );
}