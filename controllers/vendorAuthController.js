// controllers/vendorAuthController.js
import crypto from "crypto";
import { pool } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const VERIF_DURATION_HOURS = Number(process.env.VERIF_DURATION_HOURS || 24);
const MAGIC_LINK_MINUTES = Number(process.env.MAGIC_LINK_DURATION_MINUTES || 20);

const resend = new Resend(process.env.RESEND_API_KEY);

// ------------------ Helpers: mailer ------------------
async function sendVerificationCodeEmail(toEmail, code) {
  const html = `
<h2>Verify your Nyle vendor account</h2>
<p>Your verification code is: <strong>${code}</strong></p>
<p>This code expires in ${VERIF_DURATION_HOURS} hour(s).</p>
<p>If you didn't sign up, ignore this message.</p>
  `;
  try {
    const resp = await resend.emails.send({
      from: "Nyle Store <onboarding@resend.dev>",
      to: toEmail,
      subject: "Your Nyle vendor verification code",
      html,
    });
    console.log("Verification code sent successfully, id:", resp.id);
  } catch (err) {
    console.error("Error sending verification email:", err);
  }
}

async function sendMagicLoginLink(toEmail, magicToken) {
  const loginUrl = `${process.env.FRONTEND_URL || "https://nyle-luxe.vercel.app"}/vendor/magic-login?token=${encodeURIComponent(magicToken)}`;
  const html = `
<h2>Your Nyle login link</h2>
<p>Click the link below to log in. The link is valid for ${MAGIC_LINK_MINUTES} minutes.</p>
<p><a href="${loginUrl}">${loginUrl}</a></p>
<p>If you did not request this, ignore this email.</p>
  `;
  try {
    const resp = await resend.emails.send({
      from: "Nyle Store <onboarding@resend.dev>",
      to: toEmail,
      subject: "Nyle: Your login link",
      html,
    });
    console.log("Magic login email sent, id:", resp.id);
  } catch (err) {
    console.error("Error sending magic login link:", err);
  }
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

    const existing = await pool.query("SELECT id FROM vendors WHERE email=$1", [email]);
    if (existing.rows.length) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

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

    const code = String(100000 + Math.floor(Math.random() * 900000));
    const expires = new Date(Date.now() + VERIF_DURATION_HOURS * 3600 * 1000);

    await pool.query(
      `UPDATE vendors SET verification_token=$1, verification_expires=$2 WHERE id=$3`,
      [code, expires, vendorId]
    );

    // Send verification code via Resend.dev
    await sendVerificationCodeEmail(email, code);

    return res.status(201).json({
      message: "Signup successful. Check your email for a verification code.",
      vendorId,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// ------------------ Resend verification code ------------------
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const q = await pool.query("SELECT id FROM vendors WHERE email = $1", [email]);
    if (q.rows.length === 0) return res.status(400).json({ message: "Vendor not found" });

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
    console.error("Resend code error:", err);
    res.status(500).json({ message: "Server error while resending code." });
  }
};
