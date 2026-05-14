"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle, XCircle, Search, MessageSquare, Loader2, Star } from "lucide-react";

interface Review {
  id: number | string;
  reviewer_name: string;
  reviewer_email: string;
  rating: number;
  feedback_changes: string;
  general_thoughts: string;
  would_recommend: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nyle-store.onrender.com";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/reviews/admin/list`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      } else {
        toast.error("Failed to load reviews");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number | string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/admin/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        toast.success(`Review ${status}`);
        setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  const filteredReviews = reviews.filter((r: Review) => {
    const matchesSearch = r.reviewer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.reviewer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Store Reviews</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage customer feedback and reviews</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No reviews found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReviews.map((review: Review) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={review.id}
                className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700/50"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{review.reviewer_name}</h3>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={`${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.reviewer_email}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(review.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      review.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' :
                      review.status === 'rejected' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' :
                      'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20'
                    }`}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What should be changed, added, or removed?</h4>
                    <p className="text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800 text-sm">{review.feedback_changes}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">General Thoughts</h4>
                    <p className="text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800 text-sm">{review.general_thoughts}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Would recommend to friends/family?</span>
                    {review.would_recommend ? (
                      <span className="text-green-600 dark:text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Yes</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" /> No</span>
                    )}
                  </div>
                </div>

                {review.status === 'pending' && (
                  <div className="mt-6 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleStatusUpdate(review.id, 'approved')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(review.id, 'rejected')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
