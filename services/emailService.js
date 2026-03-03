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

/**
 * Send partner application confirmation email
 * @param {string} toEmail 
 * @param {object} applicationData 
 */
export async function sendPartnerApplicationEmail(toEmail, applicationData) {
  const { organizationName, fullName, partnershipTier } = applicationData;
  const subject = `Partnership Application Received - ${organizationName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e1e8ed; border-radius: 8px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2563eb, #0891b2); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to Nyle Partnerships</h1>
      </div>
      <div style="padding: 30px; background: white;">
        <h2 style="color: #1e293b; margin-top: 0;">Application Received! 🎉</h2>
        <p>Dear <strong>${fullName}</strong>,</p>
        <p>Thank you for your interest in partnering with Nyle. We have successfully received the application for <strong>${organizationName}</strong> for the <strong>${partnershipTier ? partnershipTier.charAt(0).toUpperCase() + partnershipTier.slice(1) : 'Standard'}</strong> partnership tier.</p>
        
        <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #edf2f7;">
          <h3 style="margin-top: 0; font-size: 16px; color: #475569;">What happens next?</h3>
          <ul style="padding-left: 20px; margin-bottom: 0;">
            <li style="margin-bottom: 10px;"><strong>Review Period:</strong> Our partnerships team will review your application within 3-5 business days.</li>
            <li style="margin-bottom: 10px;"><strong>Initial Contact:</strong> We'll reach out to schedule an introductory call to discuss your partnership goals.</li>
            <li style="margin-bottom: 10px;"><strong>Due Diligence:</strong> We'll verify your information and conduct a background check.</li>
            <li><strong>Onboarding:</strong> Once approved, we'll begin the technical and operational integration process.</li>
          </ul>
        </div>
        
        <p>If you have any urgent questions, feel free to reply to this email or contact our partnership team at <a href="mailto:partners@nyle.co.ke" style="color: #2563eb; text-decoration: none;">partners@nyle.co.ke</a>.</p>
        
        <p style="margin-bottom: 0;">Best regards,</p>
        <p style="margin-top: 5px; font-weight: bold; color: #1e293b;">The Nyle Partnerships Team</p>
      </div>
      <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} Nyle Store. All rights reserved.</p>
        <p style="margin: 5px 0 0;">Nairobi, Kenya</p>
      </div>
    </div>
  `;

  try {
    const resp = await resend.emails.send({
      from: "Nyle Partnerships <partnerships@resend.dev>",
      to: toEmail,
      subject,
      html,
    });
    console.log(" Partner application email sent, id:", resp.id);
    return true;
  } catch (err) {
    console.error(" Partner email error:", err);
    return false;
  }
}
