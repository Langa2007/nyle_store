import { pool } from "../db/connect.js";
import { sendReviewReceiptEmail, sendReviewSubmittedAdminEmail } from "../services/emailService.js";

const normalizeEmail = (email) => email?.trim().toLowerCase();

// Submit a new review
export const submitReview = async (req, res) => {
  try {
    const { reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts, rating } = req.body;
    const reviewerEmail = normalizeEmail(reviewer_email);

    if (!reviewer_name || !reviewerEmail || !feedback_changes || would_recommend === undefined || !general_thoughts || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const ratingInt = parseInt(rating);
    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      return res.status(400).json({ message: "Invalid rating. Must be between 1 and 5." });
    }

    const existingRatingQ = await pool.query(
      `SELECT rating
       FROM store_reviews
       WHERE LOWER(reviewer_email) = $1
         AND rating IS NOT NULL
       ORDER BY created_at ASC
       LIMIT 1`,
      [reviewerEmail]
    );
    const existingRating = existingRatingQ.rows[0]?.rating ?? null;
    const ratingToStore = existingRating === null ? ratingInt : null;
    const displayRating = existingRating === null ? ratingInt : parseInt(existingRating, 10);

    let savedRating = ratingToStore;
    let insertQ;
    try {
      insertQ = await pool.query(
        `INSERT INTO store_reviews (
          reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts, rating, status
        ) VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id`,
        [reviewer_name.trim(), reviewerEmail, feedback_changes, would_recommend, general_thoughts, savedRating]
      );
    } catch (insertErr) {
      if (ratingToStore === null && insertErr.code === "23502") {
        savedRating = displayRating;
        insertQ = await pool.query(
          `INSERT INTO store_reviews (
            reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts, rating, status
          ) VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id`,
          [reviewer_name.trim(), reviewerEmail, feedback_changes, would_recommend, general_thoughts, savedRating]
        );
      } else {
        throw insertErr;
      }
    }

    const review = {
      id: insertQ.rows[0].id,
      reviewer_name: reviewer_name.trim(),
      reviewer_email: reviewerEmail,
      feedback_changes,
      would_recommend,
      general_thoughts,
      rating: displayRating,
      rating_recorded: ratingToStore !== null
    };

    const adminEmailsQ = await pool.query(
      "SELECT email FROM users WHERE is_admin = true AND email IS NOT NULL"
    );
    const adminEmails = adminEmailsQ.rows.map((admin) => admin.email);

    Promise.allSettled([
      sendReviewSubmittedAdminEmail(review, adminEmails),
      sendReviewReceiptEmail(reviewerEmail, review)
    ]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Review notification ${index} failed:`, result.reason);
        }
      });
    });

    const message = ratingToStore === null
      ? "Review submitted successfully. Thank you for submitting another review. Your original rating for this email has been kept."
      : "Review submitted successfully. Thank you for submitting your review.";

    res.status(201).json({
      success: true,
      message,
      id: review.id,
      rating_recorded: ratingToStore !== null
    });
  } catch (err) {
    console.error("submitReview error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Check whether an email has already submitted a rating
export const getReviewerRatingStatus = async (req, res) => {
  try {
    const reviewerEmail = normalizeEmail(req.query.email);

    if (!reviewerEmail) {
      return res.status(400).json({ message: "Email is required." });
    }

    const q = await pool.query(
      `SELECT rating
       FROM store_reviews
       WHERE LOWER(reviewer_email) = $1
         AND rating IS NOT NULL
       ORDER BY created_at ASC
       LIMIT 1`,
      [reviewerEmail]
    );

    res.json({
      has_rating: q.rows.length > 0,
      rating: q.rows[0]?.rating ?? null
    });
  } catch (err) {
    console.error("getReviewerRatingStatus error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get average rating and total count
export const getReviewStats = async (req, res) => {
  try {
    const q = await pool.query(
      `WITH first_email_ratings AS (
        SELECT DISTINCT ON (LOWER(reviewer_email))
          LOWER(reviewer_email) AS reviewer_email,
          rating
        FROM store_reviews
        WHERE status = 'approved'
          AND rating IS NOT NULL
        ORDER BY LOWER(reviewer_email), created_at ASC
      )
      SELECT ROUND(AVG(rating), 1) as average_rating, COUNT(*) as total_reviews
      FROM first_email_ratings`
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
    let query = `
      SELECT
        sr.*,
        COALESCE(rating_lookup.first_rating, sr.rating) AS display_rating,
        rating_lookup.first_rating_review_id,
        rating_lookup.total_reviews_by_email
      FROM store_reviews sr
      LEFT JOIN LATERAL (
        SELECT
          (
            SELECT first_rating.rating
            FROM store_reviews first_rating
            WHERE LOWER(first_rating.reviewer_email) = LOWER(sr.reviewer_email)
              AND first_rating.rating IS NOT NULL
            ORDER BY first_rating.created_at ASC
            LIMIT 1
          ) AS first_rating,
          (
            SELECT first_rating.id
            FROM store_reviews first_rating
            WHERE LOWER(first_rating.reviewer_email) = LOWER(sr.reviewer_email)
              AND first_rating.rating IS NOT NULL
            ORDER BY first_rating.created_at ASC
            LIMIT 1
          ) AS first_rating_review_id,
          (
            SELECT COUNT(*)::int
            FROM store_reviews same_email
            WHERE LOWER(same_email.reviewer_email) = LOWER(sr.reviewer_email)
          ) AS total_reviews_by_email
      ) rating_lookup ON true
    `;
    let params = [];

    if (status) {
      query += " WHERE sr.status = $1";
      params.push(status);
    }

    query += " ORDER BY sr.created_at DESC";

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
