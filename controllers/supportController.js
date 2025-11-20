// controllers/supportController.js
import { pool } from "../db/connect.js";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/support/contact
export const createSupportMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!email || !message)
      return res.status(400).json({ message: "Email and message are required" });

    const q = await pool.query(
      `INSERT INTO support_messages (name, email, subject, message)
       VALUES ($1,$2,$3,$4) RETURNING id, created_at`,
      [name || null, email, subject || null, message]
    );

    // Notify admin via Resend (best-effort)
    try {
      await resend.emails.send({
        from: "onboarding@nyle.dev",
        to: process.env.GMAIL_USER,
        subject: `New support message: ${subject || "No subject"}`,
        html: `<p><strong>From:</strong> ${name || "Anonymous"} &lt;${email}&gt;</p>
               <p><strong>Message:</strong></p><p>${message}</p>`,
      });
    } catch (e) {
      console.error("Failed to send admin notification via Resend:", e);
    }

    res
      .status(201)
      .json({ message: "Support message received", id: q.rows[0].id });
  } catch (err) {
    console.error("createSupportMessage error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listSupportMessages = async (req, res) => {
  // admin only
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const pageSize = Math.min(Number(req.query.pageSize) || 25, 200);

    const offset = (page - 1) * pageSize;
    const q = await pool.query(
      `SELECT * FROM support_messages ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [pageSize, offset]
    );

    const totalQ = await pool.query(`SELECT COUNT(*) FROM support_messages`);
    res.json({
      items: q.rows,
      total: Number(totalQ.rows[0].count),
      page,
      pageSize,
    });
  } catch (err) {
    console.error("listSupportMessages error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSupportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query(
      `UPDATE support_messages SET status=$1, updated_at=now() WHERE id=$2`,
      [status || "open", id]
    );
    res.json({ message: "Updated" });
  } catch (err) {
    console.error("updateSupportStatus error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
