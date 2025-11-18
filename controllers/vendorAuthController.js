// controllers/vendorAuthController.js
import crypto from "crypto";
import nodemailer from "nodemailer";
import { pool } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const VERIF_DURATION_HOURS = Number(process.env.VERIF_DURATION_HOURS || 24);
const MAGIC_LINK_MINUTES = Number(process.env.MAGIC_LINK_DURATION_MINUTES || 20);

// ------------------ Helpers: mailer ------------------
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

async function sendVerificationCodeEmail(toEmail, code) {
  const transporter = createTransporter();
  const html = `
    <h2>Verify your Nyle vendor account</h2>
    <p>Your verification code is: <strong>${code}</strong></p>
    <p>This code expires in ${VERIF_DURATION_HOURS} hour(s).</p>
    <p>If you didn't sign up, ignore this message.</p>
  `;
  try {
  await transporter.sendMail({
    from: `"Nyle Store" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "Your Nyle vendor verification code",
    html,
  });
  console.log("Verification code sent succesfully")
  } catch (err) {
    console.error("Error sending verification email:", err);
}}

async function sendMagicLoginLink(toEmail, magicToken) {
  const transporter = createTransporter();
  const loginUrl = `${process.env.FRONTEND_URL || "https://nyle-luxe.vercel.app"}/vendor/magic-login?token=${encodeURIComponent(magicToken)}`;
  const html = `
    <h2>Your Nyle login link</h2>
    <p>Click the link below to log in. The link is valid for ${MAGIC_LINK_MINUTES} minutes.</p>
    <p><a href="${loginUrl}">${loginUrl}</a></p>
    <p>If you did not request this, ignore this email.</p>
  `;
  await transporter.sendMail({
    from: `"Nyle Store" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "Nyle: Your login link",
    html,
  });
}

// ------------------ Signup ------------------
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

    // Generate numeric verification code (6 digits)
    const code = String(100000 + Math.floor(Math.random() * 900000)); // 6-digit
    const expires = new Date(Date.now() + VERIF_DURATION_HOURS * 3600 * 1000);

    await pool.query(
      `UPDATE vendors SET verification_token=$1, verification_expires=$2 WHERE id=$3`,
      [code, expires, vendorId]
    );

    // Send verification code via email (best effort)
    try {
      await sendVerificationCodeEmail(email, code);
    } catch (e) {
      console.error("Failed to send verification code:", e);
      // don't fail signup because of email issues — still return success
    }

    return res.status(201).json({
      message: "Signup successful. Check your email for a verification code.",
      vendorId,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// ------------------ Verify token (code) ------------------
export const verifyToken = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Email and code are required" });

    const q = await pool.query(
      "SELECT id, verification_expires, status FROM vendors WHERE email = $1 AND verification_token = $2",
      [email, code]
    );

    if (q.rows.length === 0) return res.status(400).json({ message: "Invalid code or email" });

    const vendor = q.rows[0];
    if (new Date() > new Date(vendor.verification_expires)) {
      return res.status(400).json({ message: "Code expired" });
    }

    // Mark verified and clear token
    await pool.query(
      "UPDATE vendors SET is_verified = true, verification_token = null, verification_expires = null WHERE id = $1",
      [vendor.id]
    );

    // After verifying, create a short-lived magic token (JWT) and send login link
    const magicPayload = { vendor_id: vendor.id, purpose: "magic" };
    const magicToken = jwt.sign(magicPayload, process.env.JWT_SECRET, { expiresIn: `${MAGIC_LINK_MINUTES}m` });

    // send magic login link email (best-effort)
    const vendorEmailQuery = await pool.query("SELECT email FROM vendors WHERE id = $1", [vendor.id]);
    const vendorEmail = vendorEmailQuery.rows[0]?.email;
    if (vendorEmail) {
      try {
        await sendMagicLoginLink(vendorEmail, magicToken);
      } catch (e) {
        console.error("Failed to send magic login link:", e);
      }
    }

    return res.json({ message: "Code verified. A login link has been sent to your email." });
  } catch (err) {
    console.error("verifyToken error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Magic-login exchange ------------------
export const magicLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    // Verify magic token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired magic token" });
    }

    if (payload.purpose !== "magic") {
      return res.status(400).json({ message: "Invalid token purpose" });
    }

    // Confirm vendor exists
    const q = await pool.query("SELECT id, status, is_verified FROM vendors WHERE id = $1", [payload.vendor_id]);
    if (q.rows.length === 0) return res.status(400).json({ message: "Vendor not found" });

    const v = q.rows[0];
    // Optionally enforce admin approval before exchanging magic token to session:
    if (v.status !== "approved") {
      // Still allow short access? here we choose to deny if not approved
      return res.status(403).json({ message: "Account is awaiting admin approval." });
    }

    // Issue regular auth JWT (12h)
    const authToken = jwt.sign({ vendor_id: v.id, role: "vendor" }, process.env.JWT_SECRET, { expiresIn: "12h" });

    return res.json({ token: authToken, vendor: { id: v.id, status: v.status } });
  } catch (err) {
    console.error("magicLogin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Vendor login (email/password) ------------------
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

// ------------------ Resend verification code ------------------
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const q = await pool.query("SELECT id FROM vendors WHERE email = $1", [email]);
    if (q.rows.length === 0) {
      return res.status(400).json({ message: "Vendor not found" });
    }

    const vendorId = q.rows[0].id;
    const code = String(100000 + Math.floor(Math.random() * 900000)); // new 6-digit code
    const expires = new Date(Date.now() + VERIF_DURATION_HOURS * 3600 * 1000);

    await pool.query(
      `UPDATE vendors SET verification_token=$1, verification_expires=$2 WHERE id=$3`,
      [code, expires, vendorId]
    );

    try {
      await sendVerificationCodeEmail(email, code);
    } catch (e) {
      console.error("Failed to resend verification code:", e);
    }

    return res.json({ message: "Verification code resent successfully." });
  } catch (err) {
    console.error("Resend code error:", err);
    res.status(500).json({ message: "Server error while resending code." });
  }
};
