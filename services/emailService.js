// services/emailService.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a 6-digit verification code to vendor email
 * @param {string} toEmail
 * @param {string} code
 */
export async function sendVerificationCodeEmail(toEmail, code) {
  const html = `
<h2>Verify your Nyle vendor account</h2>
<p>Your verification code is: <strong>${code}</strong></p>
<p>This code expires in 24 hours.</p>
<p>If you didn't sign up, ignore this message.</p>
  `;

  try {
    const resp = await resend.emails.send({
      from: "Nyle Store <onboarding@resend.dev>",
      to: toEmail,
      subject: "Your Nyle Vendor Verification Code",
      html,
    });
    console.log(" Verification email sent, id:", resp.id);
    return true;
  } catch (err) {
    console.error(" Resend email error:", err);
    return false;
  }
}
