import { pool } from "../db/connect.js";
import { sendReviewReceiptEmail, sendReviewSubmittedAdminEmail } from "../services/emailService.js";

// Submit a new review
export const submitReview = async (req, res) => {
  try {
    const { reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts, rating } = req.body;
    const reviewerEmail = reviewer_email?.trim().toLowerCase();

    if (!reviewer_name || !reviewerEmail || !feedback_changes || would_recommend === undefined || !general_thoughts || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const ratingInt = parseInt(rating);
    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      return res.status(400).json({ message: "Invalid rating. Must be between 1 and 5." });
    }

    const insertQ = await pool.query(
      `INSERT INTO store_reviews (
        reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts, rating, status
      ) VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id`,
      [reviewer_name.trim(), reviewerEmail, feedback_changes, would_recommend, general_thoughts, ratingInt]
    );

    const review = {
      id: insertQ.rows[0].id,
      reviewer_name: reviewer_name.trim(),
      reviewer_email: reviewerEmail,
      feedback_changes,
      would_recommend,
      general_thoughts,
      rating: ratingInt
    };

    Promise.allSettled([
      sendReviewSubmittedAdminEmail(review),
      sendReviewReceiptEmail(reviewerEmail, review)
    ]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Review notification ${index} failed:`, result.reason);
        }
      });
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully. Thank you for submitting your review.",
      id: review.id
    });
  } catch (err) {
    console.error("submitReview error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get average rating and total count
export const getReviewStats = async (req, res) => {
  try {
    const q = await pool.query(
      "SELECT ROUND(AVG(rating), 1) as average_rating, COUNT(*) as total_reviews FROM store_reviews WHERE status = 'approved'"
    );
    
    // Fallback if no approved reviews yet
    const stats = q.rows[0];
    res.json({
      average_rating: stats.average_rating || 0,
      total_reviews: parseInt(stats.total_reviews) || 0
    });
  } catch (err) {
    console.error("getReviewStats error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: List all reviews
export const listReviews = async (req, res) => {
  try {
    const { status } = req.query;
    let query = "SELECT * FROM store_reviews";
    let params = [];

    if (status) {
      query += " WHERE status = $1";
      params.push(status);
    }

    query += " ORDER BY created_at DESC";

    const q = await pool.query(query, params);
    res.json(q.rows);
  } catch (err) {
    console.error("listReviews error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: Update review status
export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const updateQ = await pool.query(
      "UPDATE store_reviews SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id",
      [status, id]
    );

    if (updateQ.rowCount === 0) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.json({ success: true, message: "Review status updated successfully." });
  } catch (err) {
    console.error("updateReviewStatus error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
