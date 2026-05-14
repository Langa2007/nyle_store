"use client";

import React, { useState, useEffect } from "react";
import SupportInfoLayout from "@/components/support/SupportInfoLayout";
import { toast } from "sonner";
import { FaCheckCircle, FaStar, FaRegStar } from "react-icons/fa";

export default function ReviewsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [ratingStatus, setRatingStatus] = useState({ checkedEmail: "", hasRating: false, rating: null, loading: false });
  const [stats, setStats] = useState({ average_rating: 0, total_reviews: 0 });
  const [formData, setFormData] = useState({
    reviewer_name: "",
    reviewer_email: "",
    feedback_changes: "",
    would_recommend: true,
    general_thoughts: "",
    rating: 5,
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reviews/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "reviewer_email") {
      setRatingStatus({ checkedEmail: "", hasRating: false, rating: null, loading: false });
    }
  };

  const handleRecommendChange = (value) => {
    setFormData((prev) => ({ ...prev, would_recommend: value }));
  };

  const handleRatingChange = (value) => {
    if (ratingStatus.hasRating) return;
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const checkRatingStatus = async () => {
    const email = formData.reviewer_email.trim().toLowerCase();
    if (!email) return;

    setRatingStatus((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(`${API_URL}/api/reviews/rating-status?email=${encodeURIComponent(email)}`);
      if (!response.ok) return;

      const data = await response.json();
      setRatingStatus({
        checkedEmail: email,
        hasRating: Boolean(data.has_rating),
        rating: data.rating,
        loading: false
      });

      if (data.has_rating && data.rating) {
        setFormData((prev) => ({ ...prev, rating: Number(data.rating) }));
      }
    } catch (error) {
      console.error("Failed to check rating status:", error);
      setRatingStatus({ checkedEmail: "", hasRating: false, rating: null, loading: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmittedMessage("");

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const message = data.message || "Review submitted successfully. Thank you for submitting your review.";
        setSubmittedMessage(message);
        toast.success(message, {
          icon: <FaCheckCircle className="text-green-500" />
        });
        setFormData({
          reviewer_name: "",
          reviewer_email: "",
          feedback_changes: "",
          would_recommend: true,
          general_thoughts: "",
          rating: 5,
        });
        setRatingStatus({ checkedEmail: "", hasRating: false, rating: null, loading: false });
        // Optionally refresh stats, though the new review is likely 'pending'
        fetchStats();
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
        {/* Rating Stats Display */}
        <div className="mb-8 bg-blue-600 rounded-2xl p-8 text-white shadow-lg text-center">
          <h3 className="text-xl font-bold mb-2">Our Community Rating</h3>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar 
                  key={star} 
                  className={`w-8 h-8 ${star <= Math.round(stats.average_rating) ? 'text-yellow-400' : 'text-blue-400'}`} 
                />
              ))}
            </div>
            <div className="text-4xl font-extrabold mb-1">{stats.average_rating} / 5</div>
            <p className="text-blue-100 text-sm">Based on {stats.total_reviews} verified reviews</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {submittedMessage && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
              <FaCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <p className="text-sm font-medium">{submittedMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 5-Star Rating Selector */}
            <div className="space-y-2 text-center pb-4 border-b border-gray-50">
              <label className="block text-lg font-bold text-gray-900 mb-2">How would you rate us?</label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    disabled={ratingStatus.hasRating}
                    className={`p-1 transition-transform focus:outline-none ${
                      ratingStatus.hasRating ? 'cursor-not-allowed opacity-80' : 'hover:scale-110'
                    }`}
                  >
                    {star <= formData.rating ? (
                      <FaStar className="w-10 h-10 text-yellow-400" />
                    ) : (
                      <FaRegStar className="w-10 h-10 text-gray-300 hover:text-yellow-200" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium">
                {ratingStatus.loading && "Checking rating history..."}
                {!ratingStatus.loading && ratingStatus.hasRating && `This email has already rated us ${ratingStatus.rating} / 5. You can still submit another review.`}
                {!ratingStatus.loading && !ratingStatus.hasRating && formData.rating === 1 && "Poor"}
                {!ratingStatus.loading && !ratingStatus.hasRating && formData.rating === 2 && "Fair"}
                {!ratingStatus.loading && !ratingStatus.hasRating && formData.rating === 3 && "Good"}
                {!ratingStatus.loading && !ratingStatus.hasRating && formData.rating === 4 && "Very Good"}
                {!ratingStatus.loading && !ratingStatus.hasRating && formData.rating === 5 && "Excellent"}
              </p>
            </div>

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
                  placeholder="your name"
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
                  onBlur={checkRatingStatus}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors bg-gray-50"
                  placeholder="youremail@example.com"
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
