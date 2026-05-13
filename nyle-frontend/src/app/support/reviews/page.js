"use client";

import React, { useState } from "react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";
import { toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";

export default function ReviewsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reviewer_name: "",
    reviewer_email: "",
    feedback_changes: "",
    would_recommend: true,
    general_thoughts: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRecommendChange = (value) => {
    setFormData((prev) => ({ ...prev, would_recommend: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com'}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you for your feedback! Your review has been submitted.", {
          icon: <FaCheckCircle className="text-green-500" />
        });
        setFormData({
          reviewer_name: "",
          reviewer_email: "",
          feedback_changes: "",
          would_recommend: true,
          general_thoughts: "",
        });
      } else {
        toast.error(data.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("An error occurred while submitting your review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SupportInfoLayout
      title="Leave a Review"
      subtitle="We value your feedback. Help us improve Nyle Store by sharing your thoughts."
      category="Feedback"
    >
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="reviewer_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="reviewer_name"
                  name="reviewer_name"
                  required
                  value={formData.reviewer_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors bg-gray-50"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="reviewer_email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="reviewer_email"
                  name="reviewer_email"
                  required
                  value={formData.reviewer_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors bg-gray-50"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="feedback_changes" className="block text-sm font-medium text-gray-700">What should we change, add, or remove?</label>
              <textarea
                id="feedback_changes"
                name="feedback_changes"
                required
                rows={4}
                value={formData.feedback_changes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors bg-gray-50 resize-y"
                placeholder="Share your specific suggestions for improvement..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">Would you recommend Nyle Store to friends or family?</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleRecommendChange(true)}
                  className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-colors ${
                    formData.would_recommend 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Yes, I would
                </button>
                <button
                  type="button"
                  onClick={() => handleRecommendChange(false)}
                  className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-colors ${
                    !formData.would_recommend 
                    ? 'border-red-600 bg-red-50 text-red-700' 
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  No, I would not
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="general_thoughts" className="block text-sm font-medium text-gray-700">General thoughts on your experience</label>
              <textarea
                id="general_thoughts"
                name="general_thoughts"
                required
                rows={4}
                value={formData.general_thoughts}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors bg-gray-50 resize-y"
                placeholder="Tell us about your overall experience using Nyle Store..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition-colors ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Submitting Review...' : 'Submit Feedback'}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </SupportInfoLayout>
  );
}
