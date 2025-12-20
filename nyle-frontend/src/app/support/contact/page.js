"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  Sparkles,
  MapPin,
  Users,
  Zap,
  ChevronDown,
  X
} from "lucide-react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";

export default function ContactPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    subject: "", 
    message: "", 
    priority: "normal" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeContactMethod, setActiveContactMethod] = useState("form");
  const [typingText, setTypingText] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef(null);

  const messages = [
    "We're here to help!",
    "How can we assist you today?",
    "Your success is our priority.",
    "Let's solve this together!"
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const text = messages[currentMessageIndex];
    const interval = setInterval(() => {
      setTypingText(text.substring(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setTypingText("");
        }, 1000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [currentMessageIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    
    setTimeout(() => {
      setForm({ name: "", email: "", subject: "", message: "", priority: "normal" });
    }, 2000);
  };

  const contactMethods = [
    { 
      id: "form", 
      title: "Send Message", 
      icon: MessageSquare, 
      color: "from-blue-500 to-cyan-500",
      description: "Get a response within 2 hours"
    },
    { 
      id: "email", 
      title: "Email Us", 
      icon: Mail, 
      color: "from-purple-500 to-pink-500",
      description: "support@nyle.com",
      action: "mailto:support@nyle.com"
    },
    { 
      id: "phone", 
      title: "Call Us", 
      icon: Phone, 
      color: "from-green-500 to-emerald-500",
      description: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    { 
      id: "chat", 
      title: "Live Chat", 
      icon: Users, 
      color: "from-orange-500 to-red-500",
      description: "Available 24/7",
      action: "#chat"
    },
  ];

  const priorityOptions = [
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-700" },
    { value: "normal", label: "Normal", color: "bg-blue-100 text-blue-700" },
    { value: "high", label: "High", color: "bg-yellow-100 text-yellow-700" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-700" },
  ];

  const teamMembers = [
    { name: "Sarah Chen", role: "Support Lead", avatar: "👩‍💼", response: "< 1 hour" },
    { name: "Marcus Johnson", role: "Technical Expert", avatar: "👨‍💻", response: "< 2 hours" },
    { name: "Alex Rivera", role: "Account Specialist", avatar: "👨‍💼", response: "< 3 hours" },
  ];

  return (
    <SupportInfoLayout
      title="Get in Touch"
      subtitle={
        <div className="flex items-center gap-2">
          <span className="text-blue-100/90">{typingText}</span>
          <span className="animate-pulse">|</span>
        </div>
      }
    >
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ y: 0, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ 
                y: window.innerHeight,
                x: Math.random() * 200 - 100,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-2xl p-6 border border-blue-100"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Multiple Ways to Connect
              </h2>
              <p className="text-gray-600">
                Choose the method that works best for you
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Method Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods.map((method) => (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => method.action ? window.open(method.action, '_blank') : setActiveContactMethod(method.id)}
              className={`bg-white rounded-xl p-4 border-2 ${
                activeContactMethod === method.id 
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'border-gray-200 hover:border-blue-300'
              } transition-all duration-300`}
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${method.color} mb-3`}>
                <method.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
              <p className="text-sm text-gray-600">{method.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200"
              >
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-4 bg-green-100 rounded-full mb-4"
                >
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  Our team will get back to you within 2 hours. We've also sent a confirmation to your email.
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Send Another Message
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    View Ticket
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Send us a message
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Response time: 2 hours</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Your Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                            placeholder="John Doe"
                            required
                          />
                          {form.name && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute right-3 top-3"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Priority Level
                        </label>
                        <div className="flex gap-2">
                          {priorityOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setForm({ ...form, priority: option.value })}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                form.priority === option.value 
                                  ? option.color + ' ring-2 ring-offset-1' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Your Message *
                      </label>
                      <div className="relative">
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all min-h-[180px] resize-none"
                          placeholder="Describe your issue or question in detail..."
                          required
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                          {form.message.length}/2000
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                          <Sparkles className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            )}

            {/* Support Team */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Meet Your Support Team
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{member.avatar}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Zap className="h-3 w-3" />
                      Avg. response: {member.response}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Help */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-3">Need Help Now?</h3>
              <p className="text-blue-100 mb-4">
                Our live chat team is available 24/7 for immediate assistance.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                Start Live Chat
              </motion.button>
            </motion.div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Response Time</h4>
                    <p className="text-sm text-gray-600">We aim to respond within 2 hours</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Business Hours:</span>
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Global Support</h4>
                    <p className="text-sm text-gray-600">Teams across 3 continents</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Americas:</span>
                    <span className="font-medium">EST 9AM-9PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">EMEA:</span>
                    <span className="font-medium">GMT 8AM-8PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">APAC:</span>
                    <span className="font-medium">SGT 10AM-10PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">Common Questions</h4>
              <div className="space-y-3">
                {["How do I reset my password?", "Where is my order?", "Can I upgrade my plan?", "How do I request a refund?"].map((q, i) => (
                  <button
                    key={i}
                    className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between group"
                  >
                    <span className="text-sm text-gray-700">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SupportInfoLayout>
  );
}