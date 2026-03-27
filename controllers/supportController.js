// controllers/supportController.js
import { pool } from "../db/connect.js";
import { sendSupportReceiptEmail, sendSupportResolutionEmail } from "../services/emailService.js";

const ISSUE_CATEGORIES = {
  1: "Website Bug",
  2: "Payment Issue",
  3: "Vendor Problem",
  4: "Delivery Delay",
  5: "Account Access",
  6: "Other"
};


export const createSupportMessage = async (req, res) => {
  try {
    const {
      reporter_name,
      reporter_email,
      reporter_phone,
      description,
      issue_category_id,
      url
    } = req.body;

    const email = reporter_email?.toLowerCase();
    const catId = parseInt(issue_category_id);

    if (!email || !description || !catId) {
      return res.status(400).json({ message: "Email, description, and issue category are required." });
    }

    const issueTitle = ISSUE_CATEGORIES[catId] || "General Inquiry";

    // 1. Rate Limiting Check (3 per hour) - Extra safety besides middleware
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const countQ = await pool.query(
      "SELECT COUNT(*) FROM reported_issues WHERE reporter_email = $1 AND created_at > $2",
      [email, hourAgo]
    );
    if (parseInt(countQ.rows[0].count) >= 3) {
      return res.status(429).json({
        message: "Submission limit exceeded (3 per hour). Please call support for immediate assistance if urgent."
      });
    }

    // 2. Duplicate Check (Open issue of same category for same email)
    const duplicateQ = await pool.query(
      "SELECT id FROM reported_issues WHERE reporter_email = $1 AND issue_category_id = $2 AND status = 'open'",
      [email, catId]
    );
    if (duplicateQ.rows.length > 0) {
      return res.status(409).json({
        message: `You already have an open report for "${issueTitle}". Please wait for resolution before submitting another of the same type.`
      });
    }

    // 3. Create Issue
    const insertQ = await pool.query(
      `INSERT INTO reported_issues (
        reporter_name, reporter_email, reporter_phone, 
        issue_category_id, issue_title, description, 
        url, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'open') RETURNING id`,
      [reporter_name, email, reporter_phone, catId, issueTitle, description, url]
    );

    const issueId = insertQ.rows[0].id;

    // 4. Send Confirmation Email
    await sendSupportReceiptEmail(email, {
      name: reporter_name,
      title: issueTitle,
      description
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully. A confirmation email has been sent.",
      id: issueId
    });

  } catch (err) {
    console.error("submitComplaint error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Handle admin resolving an issue
 */
export const updateSupportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution_message } = req.body;

    // Fetch complaint data first
    const issueQ = await pool.query("SELECT * FROM reported_issues WHERE id = $1", [id]);
    if (issueQ.rows.length === 0) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const issue = issueQ.rows[0];

    // Update status to resolved
    await pool.query(
      "UPDATE reported_issues SET status = 'resolved', resolution_message = $1, updated_at = NOW() WHERE id = $2",
      [resolution_message, id]
    );

    // Send resolution email
    await sendSupportResolutionEmail(issue.reporter_email, {
      name: issue.reporter_name,
      title: issue.issue_title,
      resolutionMessage: resolution_message
    });

    res.json({ success: true, message: "Issue marked as resolved and user notified." });

  } catch (err) {
    console.error("resolveComplaint error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listSupportMessages = async (req, res) => {
  try {
    const { status, category } = req.query;
    let query = "SELECT * FROM reported_issues";
    let params = [];
    let conditions = [];

    if (status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }
    if (category) {
      conditions.push(`issue_category_id = $${params.length + 1}`);
      params.push(category);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const q = await pool.query(query, params);
    res.json(q.rows);
  } catch (err) {
    console.error("listComplaints error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
