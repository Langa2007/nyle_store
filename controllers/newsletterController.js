import db from "../db/connect.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Subscribe to Newsletter ---
export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // Strict email domain validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format. Please provide a valid email with a proper domain (e.g., user@example.com)."
    });
  }

  try {
    // Attempt to create table (optimized)
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (tableErr) {
      console.error("Table creation error (ignoring if exists):", tableErr.message);
    }

    const result = await db.query(
      "INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING",
      [email]
    );

    res.status(200).json({
      success: true,
      message: "Subscribed successfully!",
      alreadySubscribed: result.rowCount === 0
    });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
      hint: "Check if newsletter_subscribers table exists or has correct permissions"
    });
  }
};

// --- Get All Subscribers ---
export const getSubscribers = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Get subscribers error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// --- Send Announcement (Admin Only) ---
export const sendAnnouncement = async (req, res) => {
  const { title, message } = req.body;
  if (!title || !message)
    return res.status(400).json({ message: "Title and message are required" });

  try {
    // Ensure announcements & logs tables exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        admin_id INT,
        action TEXT,
        target TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Save the announcement
    await db.query("INSERT INTO announcements (title, message) VALUES ($1, $2)", [
      title,
      message,
    ]);

    // Log the admin activity
    await db.query(
      "INSERT INTO activity_logs (admin_id, action, target) VALUES ($1, $2, $3)",
      [req.admin?.id || null, "Sent Newsletter", "newsletter"]
    );

    // Fetch all subscribers
    const { rows: subscribers } = await db.query(
      "SELECT email FROM newsletter_subscribers"
    );

    console.log(`📧 Newsletter send: found ${subscribers.length} subscriber(s)`);

    if (subscribers.length === 0)
      return res.status(200).json({ message: "No subscribers to send to.", sent: 0, failed: 0 });

    // Track results per email
    const results = { sent: 0, failed: 0, errors: [] };
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const sub of subscribers) {
      try {
        // Throttling to stay within Resend's free tier (2 req/sec)
        await sleep(500);

        const { data, error } = await resend.emails.send({
          from: "Nyle Store <onboarding@resend.dev>",
          to: sub.email,
          subject: title,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
              <h1 style="color: #1d4ed8; margin-bottom: 12px;">${title}</h1>
              <div style="color: #374151; font-size: 15px; line-height: 1.6;">${message}</div>
              <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
              <p style="font-size: 0.85rem; color: #9ca3af;">— Team Nyle Store &middot; You're receiving this because you subscribed at nyle-luxe.vercel.app</p>
            </div>
          `,
        });

        if (error) {
          console.error(`❌ Resend Error for ${sub.email}:`, error);
          results.failed++;
          results.errors.push({ email: sub.email, error: error.message });
        } else {
          console.log(`✅ Email sent to ${sub.email}:`, data.id);
          results.sent++;
        }
      } catch (err) {
        console.error(`❌ Network/SDK Error for ${sub.email}:`, err.message);
        results.failed++;
        results.errors.push({ email: sub.email, error: err.message });
      }
    }

    console.log(`📊 Newsletter result: ${results.sent} sent, ${results.failed} failed`);

    if (results.sent === 0 && results.failed > 0) {
      return res.status(500).json({
        message: `All emails failed to send. Error: ${results.errors[0]?.error || "Unknown"}`,
        ...results,
      });
    }

    res.status(200).json({
      message: results.failed > 0
        ? `Sent to ${results.sent} subscriber(s), ${results.failed} failed.`
        : `Newsletter sent to all ${results.sent} subscriber(s)!`,
      ...results,
    });
  } catch (err) {
    console.error("Send announcement error:", err.message, err);
    res.status(500).json({ message: "Internal server error", details: err.message });
  }
};
