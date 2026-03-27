// controllers/vendorAuthController.js
import crypto from "crypto";
import { pool } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const VERIF_DURATION_HOURS = Number(process.env.VERIF_DURATION_HOURS || 24);
const MAGIC_LINK_MINUTES = Number(process.env.MAGIC_LINK_DURATION_MINUTES || 20);
const LOGIN_OTP_MINUTES = Number(process.env.LOGIN_OTP_DURATION_MINUTES || 10);

async function sendVerificationCodeEmail(toEmail, code) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: "Your Nyle vendor verification code",
      html: `
        <h2>Verify your Nyle vendor account</h2>
        <p>Your 6-digit verification code:</p>
        <h1 style="font-size: 32px; letter-spacing: 8px;">${code}</h1>
        <p>This code expires in ${VERIF_DURATION_HOURS} hour(s).</p>
      `
    });

    console.log("Verification code sent successfully via Resend");
  } catch (err) {
    console.error("Error sending verification email via Resend:", err);
  }
}

async function sendLoginOtpEmail(toEmail, code) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: "Your Nyle vendor login code",
      html: `
        <h2>Vendor login verification</h2>
        <p>Your one-time login code:</p>
        <h1 style="font-size: 32px; letter-spacing: 8px;">${code}</h1>
        <p>This code expires in ${LOGIN_OTP_MINUTES} minute(s).</p>
        <p>If you did not attempt to sign in, please reset your password immediately.</p>
      `
    });
    console.log("Login OTP sent successfully via Resend");
    return true;
  } catch (err) {
    console.error("Error sending login OTP via Resend:", err);
    return false;
  }
}

async function sendMagicLoginLink(toEmail, magicToken) {
  try {
    const loginUrl = `${process.env.FRONTEND_URL || "https://nyle-luxe.vercel.app"}/vendor/magic-login?token=${encodeURIComponent(magicToken)}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: "Your Nyle instant login link",
      html: `
        <h2>Your Nyle login link</h2>
        <p>This link is valid for ${MAGIC_LINK_MINUTES} minutes.</p>
        <p><a href="${loginUrl}">${loginUrl}</a></p>
      `
    });
  } catch (err) {
    console.error("Error sending magic login link via Resend:", err);
  }
}

// ------------------ Signup ------------------
export const vendorSignup = async (req, res) => {
  try {
    const {
      legal_name, company_name, contact_person,
      email, phone, address, country,
      business_type, password
    } = req.body;

    if (!legal_name || !company_name || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await pool.query("SELECT id FROM vendors WHERE email=$1", [normalizedEmail]);
    if (existing.rows.length)
      return res.status(400).json({ message: "Vendor already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const insert = await pool.query(
      `INSERT INTO vendors (
        legal_name, company_name, contact_person, email, phone, address, 
        country, business_type, password, status, is_verified
      )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'pending', false)
       RETURNING id, email`,
      [
        legal_name, company_name, contact_person,
        normalizedEmail, phone, address, country, business_type, hashed,
      ]
    );

    const vendorId = insert.rows[0].id;

    // Generate 6-digit verification code
    const code = String(100000 + Math.floor(Math.random() * 900000));
    const expires = new Date(Date.now() + VERIF_DURATION_HOURS * 3600 * 1000);

    await pool.query(
      `UPDATE vendors SET verification_token=$1, verification_expires=$2 WHERE id=$3`,
      [code, expires, vendorId]
    );

    // Send via Resend
    await sendVerificationCodeEmail(normalizedEmail, code);

    return res.status(201).json({
      message: "Signup successful. Check your email for a verification code.",
      vendorId,
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      return res.status(400).json({ message: "Email and code are required" });

    const q = await pool.query(
      "SELECT id, verification_expires FROM vendors WHERE email=$1 AND verification_token=$2",
      [email, code]
    );

    if (!q.rows.length)
      return res.status(400).json({ message: "Invalid code or email" });

    const vendor = q.rows[0];

    if (new Date() > vendor.verification_expires)
      return res.status(400).json({ message: "Code expired" });

    // Mark verified
    await pool.query(
      "UPDATE vendors SET is_verified=true, verification_token=NULL, verification_expires=NULL WHERE id=$1",
      [vendor.id]
    );

    // Issue magic login token
    const magicToken = jwt.sign(
      { vendor_id: vendor.id, purpose: "magic" },
      process.env.JWT_SECRET,
      { expiresIn: `${MAGIC_LINK_MINUTES}m` }
    );

    await sendMagicLoginLink(email, magicToken);

    return res.json({
      message: "Code verified. A login link has been sent to your email."
    });

  } catch (err) {
    console.error("verifyToken error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Vendor Login ------------------
export const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const normalizedEmail = email.trim().toLowerCase();
    const q = await pool.query(
      "SELECT id, password, is_verified, status, company_name, legal_name, contact_person FROM vendors WHERE email=$1",
      [normalizedEmail]
    );

    if (!q.rows.length)
      return res.status(400).json({ message: "Vendor not found" });

    const vendor = q.rows[0];

    // Must verify email first
    if (!vendor.is_verified)
      return res.status(403).json({ message: "Email not verified" });

    // Must wait for admin approval
    if (vendor.status !== "approved")
      return res.status(403).json({ message: "Account awaiting admin approval" });

    const match = await bcrypt.compare(password, vendor.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect password" });

    const code = String(100000 + Math.floor(Math.random() * 900000));
    const expires = new Date(Date.now() + LOGIN_OTP_MINUTES * 60 * 1000);

    await pool.query(
      "UPDATE vendors SET login_otp=$1, login_otp_expires=$2 WHERE id=$3",
      [code, expires, vendor.id]
    );

    const emailSent = await sendLoginOtpEmail(normalizedEmail, code);
    if (!emailSent) {
      return res.status(500).json({ message: "Unable to send login code. Please try again." });
    }

    return res.json({
      message: "Login code sent to your email.",
      otpRequired: true,
      email: normalizedEmail
    });

  } catch (err) {
    console.error("vendorLogin error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const verifyLoginOtp = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      return res.status(400).json({ message: "Email and code are required" });

    const normalizedEmail = email.trim().toLowerCase();
    const q = await pool.query(
      `SELECT id, status, is_verified, company_name, legal_name, contact_person, login_otp_expires
       FROM vendors WHERE email=$1 AND login_otp=$2`,
      [normalizedEmail, code]
    );

    if (!q.rows.length)
      return res.status(400).json({ message: "Invalid code or email" });

    const vendor = q.rows[0];

    if (!vendor.is_verified)
      return res.status(403).json({ message: "Email not verified" });

    if (vendor.status !== "approved")
      return res.status(403).json({ message: "Account awaiting admin approval" });

    if (vendor.login_otp_expires && new Date() > vendor.login_otp_expires) {
      await pool.query(
        "UPDATE vendors SET login_otp=NULL, login_otp_expires=NULL WHERE id=$1",
        [vendor.id]
      );
      return res.status(400).json({ message: "Code expired" });
    }

    await pool.query(
      "UPDATE vendors SET login_otp=NULL, login_otp_expires=NULL WHERE id=$1",
      [vendor.id]
    );

    const token = jwt.sign(
      { vendor_id: vendor.id, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.json({
      message: "Login successful",
      token,
      vendor: {
        id: vendor.id,
        status: vendor.status,
        company_name: vendor.company_name,
        legal_name: vendor.legal_name,
        contact_person: vendor.contact_person
      }
    });
  } catch (err) {
    console.error("verifyLoginOtp error:", err);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};

// ------------------ Resend Login OTP ------------------
export const resendLoginOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const normalizedEmail = email.trim().toLowerCase();
    const q = await pool.query(
      "SELECT id, is_verified, status FROM vendors WHERE email=$1",
      [normalizedEmail]
    );

    if (!q.rows.length)
      return res.status(400).json({ message: "Vendor not found" });

    const vendor = q.rows[0];

    if (!vendor.is_verified)
      return res.status(403).json({ message: "Email not verified" });

    if (vendor.status !== "approved")
      return res.status(403).json({ message: "Account awaiting admin approval" });

    const code = String(100000 + Math.floor(Math.random() * 900000));
    const expires = new Date(Date.now() + LOGIN_OTP_MINUTES * 60 * 1000);

    await pool.query(
      "UPDATE vendors SET login_otp=$1, login_otp_expires=$2 WHERE id=$3",
      [code, expires, vendor.id]
    );

    const emailSent = await sendLoginOtpEmail(normalizedEmail, code);
    if (!emailSent) {
      return res.status(500).json({ message: "Unable to send login code. Please try again." });
    }

    return res.json({ message: "Login code resent successfully." });
  } catch (err) {
    console.error("resendLoginOtp error:", err);
    res.status(500).json({ message: "Server error while resending login code" });
  }
};

// ------------------ Magic Login ------------------
export const magicLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (payload.purpose !== "magic")
      return res.status(400).json({ message: "Invalid token type" });

    const q = await pool.query(
      "SELECT id, status, is_verified, company_name, legal_name, contact_person FROM vendors WHERE id=$1",
      [payload.vendor_id]
    );

    if (!q.rows.length)
      return res.status(400).json({ message: "Vendor not found" });

    const v = q.rows[0];

    if (v.status !== "approved")
      return res.status(403).json({ message: "Account is awaiting admin approval." });

    const authToken = jwt.sign(
      { vendor_id: v.id, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.json({
      token: authToken,
      vendor: {
        id: v.id,
        status: v.status,
        company_name: v.company_name,
        legal_name: v.legal_name,
        contact_person: v.contact_person
      }
    });

  } catch (err) {
    console.error("magicLogin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Resend Code ------------------
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const q = await pool.query("SELECT id FROM vendors WHERE email=$1", [email]);
    if (!q.rows.length)
      return res.status(400).json({ message: "Vendor not found" });

    const vendorId = q.rows[0].id;

    const code = String(100000 + Math.floor(Math.random() * 900000));
    const expires = new Date(Date.now() + VERIF_DURATION_HOURS * 3600 * 1000);

    await pool.query(
      `UPDATE vendors SET verification_token=$1, verification_expires=$2 WHERE id=$3`,
      [code, expires, vendorId]
    );

    await sendVerificationCodeEmail(email, code);

    return res.json({ message: "Verification code resent successfully." });

  } catch (err) {
    res.status(500).json({ message: "Server error while resending code" });
  }
};

export const verifySession = async (req, res) => {
  try {
    const vendorId = req.user.vendor_id;

    const q = await pool.query(
      "SELECT id, legal_name, company_name, contact_person, email, status, is_verified, business_type FROM vendors WHERE id=$1",
      [vendorId]
    );

    if (!q.rows.length) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const vendor = q.rows[0];
    return res.json({ vendor });
  } catch (err) {
    console.error("verifySession error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
