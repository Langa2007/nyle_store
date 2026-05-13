import { pool } from "../db/connect.js";

// Submit a new review
export const submitReview = async (req, res) => {
  try {
    const { reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts } = req.body;

    if (!reviewer_name || !reviewer_email || !feedback_changes || would_recommend === undefined || !general_thoughts) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const insertQ = await pool.query(
      `INSERT INTO store_reviews (
        reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts, status
      ) VALUES ($1, $2, $3, $4, $5, 'pending') RETURNING id`,
      [reviewer_name, reviewer_email, feedback_changes, would_recommend, general_thoughts]
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      id: insertQ.rows[0].id
    });
  } catch (err) {
    console.error("submitReview error:", err);
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
