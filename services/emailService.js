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

/**
 * Send product status update email to vendor
 * @param {string} toEmail
 * @param {object} product
 * @param {string} status 'approved' | 'rejected' | 'submitted'
 * @param {string} reason (optional)
 */
export async function sendProductStatusEmail(toEmail, product, status, reason = null) {
  let subject, html;
  const dashboardUrl = process.env.FRONTEND_URL || "https://nyle-luxe.vercel.app";

  switch (status) {
    case 'approved':
      subject = `Your Product "${product.name}" Has Been Approved`;
      html = `
        <h2>Product Approved! 🎉</h2>
        <p>Great news! Your product <strong>${product.name}</strong> has been approved and is now live on the Nyle Store.</p>
        <p>You can view it on your dashboard.</p>
        <p><a href="${dashboardUrl}/vendor/dashboard" style="background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Go to Dashboard</a></p>
      `;
      break;
    case 'rejected':
      subject = `Action Required: Product "${product.name}" Needs Changes`;
      html = `
        <h2>Product Submission Update</h2>
        <p>Thank you for submitting <strong>${product.name}</strong>.</p>
        <p>Unfortunately, it was not approved for the following reason:</p>
        <blockquote style="background:#f9f9f9;border-left:4px solid #f44336;padding:10px;margin:20px 0;">
          ${reason || 'Does not meet our listing guidelines.'}
        </blockquote>
        <p>Please edit your product to address these issues and resubmit.</p>
        <p><a href="${dashboardUrl}/vendor/dashboard" style="background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Edit Product</a></p>
      `;
      break;
    case 'submitted':
      subject = `Product "${product.name}" Submitted for Review`;
      html = `
        <h2>Submission Received</h2>
        <p>We have received your request to publish <strong>${product.name}</strong>.</p>
        <p>Our team will review it shortly and verify it meets our quality standards.</p>
      `;
      break;
    default:
      return false;
  }

  try {
    const resp = await resend.emails.send({
      from: "Nyle Store <notifications@resend.dev>",
      to: toEmail,
      subject,
      html,
    });
    console.log(` Product ${status} email sent to ${toEmail}, id:`, resp.id);
    return true;
  } catch (err) {
    console.error(` Resend ${status} email error:`, err);
    return false;
  }
}
