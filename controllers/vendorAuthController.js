// controllers/vendorAuthController.js
import crypto from "crypto";
import nodemailer from "nodemailer";
import { pool } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const VERIF_DURATION_HOURS = 24;

// --- Helper: send verification email ---
async function sendVerificationEmail(toEmail, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const verifyUrl = `${
    process.env.FRONTEND_URL || "http://localhost:3000"
  }/vendor/verify-email?token=${token}`;

  const info = await transporter.sendMail({
    from: `"Nyle Store" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "Verify your Nyle vendor account",
    html: `
      <h2>Welcome to Nyle Store </h2>
      <p>Please click the link below to verify your email. The link is valid for ${VERIF_DURATION_HOURS} hours.</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
    `,
  });

  return info;
}

// --- Vendor Signup (with email verification) ---
export const vendorSignup = async (req, res) => {
  try {
    const {
      legal_name,
      company_name,
      contact_person,
      email,
      phone,
      address,
      country,
      business_type,
      password,
    } = req.body;

    if (!legal_name || !company_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if vendor exists
    const existing = await pool.query("SELECT id FROM vendors WHERE email=$1", [email]);
    if (existing.rows.length) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert vendor (pending + unverified)
    const insert = await pool.query(
      `INSERT INTO vendors (
        legal_name, company_name, contact_person, email, phone, address, 
        country, business_type, password, status, is_verified
      )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'pending', false)
       RETURNING id, email`,
      [
        legal_name,
        company_name,
        contact_person,
        email,
        phone,
        address,
        country,
        business_type,
        hashed,
      ]
    );

    const vendorId = insert.rows[0].id;

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + VERIF_DURATION_HOURS * 3600 * 1000);

    await pool.query(
      `UPDATE vendors SET verification_token=$1, verification_expires=$2 WHERE id=$3`,
      [token, expires, vendorId]
    );

    // Send verification email
    try {
      await sendVerificationEmail(email, token);
    } catch (e) {
      console.error("❌ Failed to send verification email:", e);
    }

    res.status(201).json({
      message: "Signup successful. Check your email to verify account.",
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// --- Verify Email ---
export const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token || req.body.token;
    if (!token) return res.status(400).json({ message: "Token required" });

    const q = await pool.query(
      "SELECT id, verification_expires FROM vendors WHERE verification_token = $1",
      [token]
    );
    if (q.rows.length === 0) return res.status(400).json({ message: "Invalid token" });

    const vendor = q.rows[0];
    if (new Date() > new Date(vendor.verification_expires)) {
      return res.status(400).json({ message: "Token expired" });
    }

    await pool.query(
      "UPDATE vendors SET is_verified = true, verification_token = null, verification_expires = null WHERE id = $1",
      [vendor.id]
    );

    res.json({ message: "Email verified. Await admin approval." });
  } catch (err) {
    console.error("Verify email error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- Vendor Login (requires verified + approved) ---
export const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const q = await pool.query("SELECT * FROM vendors WHERE email = $1", [email]);
    if (q.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const v = q.rows[0];

    if (!v.is_verified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    if (v.status !== "approved") {
      return res.status(403).json({ message: "Your account is awaiting admin approval." });
    }

    const ok = await bcrypt.compare(password, v.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { vendor_id: v.id, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      token,
      vendor: { id: v.id, company_name: v.company_name, status: v.status },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
