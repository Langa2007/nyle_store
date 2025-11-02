import db from "../db/connect.js";
import nodemailer from "nodemailer";

// subscribe
export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(
      "INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING",
      [email]
    );

    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Newsletter subscription error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all subscribers
export const getSubscribers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Get subscribers error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// send announcement
export const sendAnnouncement = async (req, res) => {
  const { title, message } = req.body;
  if (!title || !message)
    return res.status(400).json({ message: "Title and message are required" });

  try {
    // save announcement in DB
    await db.query(
      "INSERT INTO announcements (title, message) VALUES ($1, $2)",
      [title, message]
    );

    // fetch all subscribers
    const { rows: subscribers } = await db.query("SELECT email FROM newsletter_subscribers");

    // configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send email to each subscriber
    for (const sub of subscribers) {
      await transporter.sendMail({
        from: `"Nyle Updates" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject: title,
        html: `<h2>${title}</h2><p>${message}</p><br/><p>— Team Nyle</p>`,
      });
    }

    res.status(200).json({ message: "Announcement sent successfully!" });
  } catch (err) {
    console.error("Send announcement error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
