// routes/vendorRoutes.js
import express from "express";
import { pool } from "../db/connect.js";
import nodemailer from "nodemailer";

const router = express.Router();

// --- Helper: send status email ---
async function sendVendorStatusEmail(email, status) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  let subject, html;

  if (status === "approved") {
    subject = "Your Nyle Store Vendor Account Has Been Approved 🎉";
    html = `
      <h2>Congratulations!</h2>
      <p>Your vendor account has been approved. You can now log in to your Nyle Store vendor dashboard and start listing products.</p>
      <p><a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/vendor/login">Login Here</a></p>
    `;
  } else {
    subject = "Nyle Store Vendor Application Update";
    html = `
      <h2>Application Review Complete</h2>
      <p>We regret to inform you that your vendor application was not approved at this time.</p>
      <p>If you believe this was an error, you may contact our support team for further assistance.</p>
    `;
  }

  await transporter.sendMail({
    from: `"Nyle Store" <${process.env.GMAIL_USER}>`,
    to: email,
    subject,
    html,
  });
}

// --- Get all pending vendors (admin only) ---
router.get("/pending", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, legal_name, company_name, email, status, is_verified FROM vendors WHERE status = 'pending'"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch pending vendors error:", err);
    res.status(500).json({ message: "Error fetching pending vendors" });
  }
});

// --- Approve vendor ---
router.put("/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;

    const q = await pool.query("UPDATE vendors SET status = 'approved' WHERE id = $1 RETURNING email", [id]);
    const vendorEmail = q.rows[0]?.email;

    if (vendorEmail) await sendVendorStatusEmail(vendorEmail, "approved");

    res.json({ message: "Vendor approved and email sent" });
  } catch (err) {
    console.error("Approve vendor error:", err);
    res.status(500).json({ message: "Error approving vendor" });
  }
});

// --- Reject vendor ---
router.put("/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;

    const q = await pool.query("UPDATE vendors SET status = 'rejected' WHERE id = $1 RETURNING email", [id]);
    const vendorEmail = q.rows[0]?.email;

    if (vendorEmail) await sendVendorStatusEmail(vendorEmail, "rejected");

    res.json({ message: "Vendor rejected and email sent" });
  } catch (err) {
    console.error("Reject vendor error:", err);
    res.status(500).json({ message: "Error rejecting vendor" });
  }
});

export default router;
