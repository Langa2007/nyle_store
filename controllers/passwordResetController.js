// controllers/passwordResetController.js
import pool from "../db/connect.js";
import crypto from "crypto";
import { Resend } from 'resend';
import bcrypt from "bcryptjs";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: Generate 6-digit verification code
const generateVerificationCode = () => {
  return String(100000 + Math.floor(Math.random() * 900000)); // 6-digit code
};

// Helper: Hash code for database storage
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Helper: Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//  1. FORGOT PASSWORD REQUEST - SEND VERIFICATION CODE
export const forgotPassword = async (req, res) => {
  try {
    const { email, user_type = 'user' } = req.body;
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ 
        error: "Valid email address is required" 
      });
    }

    // Validate user_type
    if (!['user', 'vendor'].includes(user_type)) {
      return res.status(400).json({ 
        error: "Invalid user type. Must be 'user' or 'vendor'" 
      });
    }

    // Determine which table to query based on user_type
    const tableName = user_type === 'vendor' ? 'vendors' : 'users';
    const nameColumn = user_type === 'vendor' ? 'legal_name' : 'name';

    // Check if user/vendor exists
    const userCheck = await pool.query(
      `SELECT id, email, ${nameColumn} as name FROM ${tableName} WHERE email = $1`,
      [email]
    );
    
    // Security: always return success even if email doesn't exist
    if (userCheck.rows.length === 0) {
      return res.status(200).json({ 
        success: true,
        message: "If an account exists with this email, you will receive a verification code shortly.",
        code_sent: true
      });
    }
    
    const user = userCheck.rows[0];
    
    // Delete any existing reset tokens for this user/vendor
    await pool.query(
      `DELETE FROM password_reset_tokens 
       WHERE user_id = $1 AND user_type = $2`,
      [user.id, user_type]
    );
    
    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode();
    const hashedCode = hashToken(verificationCode);
    const expiresAt = Date.now() + 900000; // 15 minutes from now
    
    // Store hashed code in database
    await pool.query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at, user_type) 
       VALUES ($1, $2, $3, $4)`,
      [user.id, hashedCode, expiresAt, user_type]
    );
    
    // Send email with verification code via Resend
    try {
      const subject = user_type === 'vendor' 
        ? 'Your Nyle Store Vendor Password Reset Code'
        : 'Your Nyle Store Account Password Reset Code';
      
      const portalName = user_type === 'vendor' ? 'Vendor Portal' : 'Customer Account';
      
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Nyle Store <onboarding@resend.dev>',
        to: [email],
        subject: subject,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .logo { color: white; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .verification-code { 
                  display: inline-block; 
                  background: #2563eb; 
                  color: white; 
                  padding: 15px 30px; 
                  font-size: 32px; 
                  font-weight: bold; 
                  letter-spacing: 8px; 
                  border-radius: 8px; 
                  margin: 20px 0; 
                  text-align: center;
                }
                .warning { color: #dc2626; font-size: 14px; margin-top: 20px; padding: 10px; background: #fef2f2; border-radius: 5px; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
                .instructions { background: #e0f2fe; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #0ea5e9; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">NYLE STORE</div>
                  <div style="color: white; opacity: 0.9;">${portalName}</div>
                </div>
                <div class="content">
                  <h2>Password Reset Verification Code</h2>
                  <p>Hello <strong>${user.name}</strong>,</p>
                  <p>We received a request to reset your password for your Nyle Store ${user_type === 'vendor' ? 'vendor' : 'customer'} account.</p>
                  <p>Use this verification code to reset your password:</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <div class="verification-code">${verificationCode}</div>
                  </div>
                  
                  <div class="instructions">
                    <p><strong>How to use this code:</strong></p>
                    <ol>
                      <li>Go to the password reset page</li>
                      <li>Enter your email address</li>
                      <li>Enter the 6-digit code above</li>
                      <li>Create your new password</li>
                    </ol>
                  </div>
                  
                  <div class="warning">
                     <strong>Important:</strong> 
                    <ul>
                      <li>This code will expire in 15 minutes</li>
                      <li>Do not share this code with anyone</li>
                      <li>If you didn't request a password reset, please ignore this email</li>
                    </ul>
                  </div>
                  
                  <div class="footer">
                    <p>If you have any questions, contact our ${user_type === 'vendor' ? 'vendor' : 'customer'} support at support@nyle.co.ke</p>
                    <p>&copy; ${new Date().getFullYear()} Nyle Store. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `Password Reset Verification for Nyle Store ${user_type === 'vendor' ? 'Vendor' : 'Customer'} Account\n\nHello ${user.name},\n\nYour password reset verification code is: ${verificationCode}\n\nThis code expires in 15 minutes.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nNyle Store Team`
      });
      
      console.log(` Password reset verification code sent to ${user_type}:`, email);
      
    } catch (emailError) {
      console.error(' Resend email error:', emailError);
      return res.status(500).json({ 
        error: "Failed to send verification code. Please try again later." 
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: "Verification code sent to your email.",
      code_sent: true,
      expires_in: "15 minutes"
    });
    
  } catch (err) {
    console.error(" Forgot password error:", err.message);
    res.status(500).json({ 
      error: "An error occurred while processing your request" 
    });
  }
};

//  2. VERIFY RESET CODE
export const verifyResetCode = async (req, res) => {
  try {
    const { email, code, user_type = 'user' } = req.body;
    
    if (!email || !code) {
      return res.status(400).json({ 
        error: "Email and verification code are required" 
      });
    }
    
    if (!['user', 'vendor'].includes(user_type)) {
      return res.status(400).json({ 
        error: "Invalid user type" 
      });
    }
    
    // Hash the provided code
    const hashedCode = hashToken(code);
    const currentTime = Date.now();
    
    // Find valid token
    const tokenResult = await pool.query(
      `SELECT prt.*, 
              CASE 
                WHEN prt.user_type = 'vendor' THEN v.email
                ELSE u.email
              END as email,
              CASE 
                WHEN prt.user_type = 'vendor' THEN v.legal_name
                ELSE u.name
              END as name
       FROM password_reset_tokens prt
       LEFT JOIN vendors v ON prt.user_type = 'vendor' AND prt.user_id = v.id
       LEFT JOIN users u ON prt.user_type = 'user' AND prt.user_id = u.id
       WHERE prt.token = $1 
         AND prt.expires_at > $2
         AND prt.user_type = $3
         AND (
           (prt.user_type = 'vendor' AND v.email = $4)
           OR (prt.user_type = 'user' AND u.email = $5)
         )`,
      [hashedCode, currentTime, user_type, email, email]
    );
    
    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ 
        error: "Invalid or expired verification code" 
      });
    }
    
    const token = tokenResult.rows[0];
    
    // Generate a one-time reset token for the next step
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = hashToken(resetToken);
    
    // Update the token to mark it as verified
    await pool.query(
      `UPDATE password_reset_tokens 
       SET token = $1, expires_at = $2
       WHERE id = $3`,
      [hashedResetToken, Date.now() + 600000, token.id] // 10 minutes for reset
    );
    
    res.status(200).json({ 
      success: true,
      message: "Verification code accepted. You can now reset your password.",
      reset_token: resetToken,
      user_type: user_type,
      expires_in: "10 minutes"
    });
    
  } catch (err) {
    console.error(" Verify reset code error:", err.message);
    res.status(500).json({ 
      error: "Failed to verify code" 
    });
  }
};

//  3. RESET PASSWORD WITH TOKEN (after code verification)
export const resetPassword = async (req, res) => {
  const connection = await pool.connect();
  
  try {
    const { reset_token, newPassword, user_type = 'user' } = req.body;
    
    if (!reset_token || !newPassword) {
      return res.status(400).json({ 
        error: "Reset token and new password are required" 
      });
    }
    
    // Validate password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters, contain letters, numbers, and one special character (@$!%*?&)"
      });
    }
    
    await connection.query('BEGIN');
    
    const hashedToken = hashToken(reset_token);
    const currentTime = Date.now();
    
    // Find valid reset token (must be within 10 minutes)
    const tokenResult = await connection.query(
      `SELECT prt.* 
       FROM password_reset_tokens prt
       WHERE prt.token = $1 
         AND prt.expires_at > $2
         AND prt.user_type = $3`,
      [hashedToken, currentTime, user_type]
    );
    
    if (tokenResult.rows.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(400).json({ 
        error: "Invalid or expired reset token" 
      });
    }
    
    const { user_id, user_type: tokenUserType } = tokenResult.rows[0];
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password in correct table
    const tableName = tokenUserType === 'vendor' ? 'vendors' : 'users';
    await connection.query(
      `UPDATE ${tableName} SET password = $1, updated_at = NOW() WHERE id = $2`,
      [hashedPassword, user_id]
    );
    
    // Delete used token
    await connection.query(
      `DELETE FROM password_reset_tokens WHERE user_id = $1 AND user_type = $2`,
      [user_id, tokenUserType]
    );
    
    // Invalidate all existing sessions/tokens
    const sessionTable = tokenUserType === 'vendor' ? 'vendor_sessions' : 'user_sessions';
    await connection.query(
      `DELETE FROM ${sessionTable} WHERE ${tokenUserType}_id = $1`,
      [user_id]
    );
    
    await connection.query('COMMIT');
    
    // Get user details for confirmation email
    const userResult = await connection.query(
      `SELECT email, 
              CASE 
                WHEN $2 = 'vendor' THEN legal_name
                ELSE name
              END as name
       FROM ${tableName} WHERE id = $1`,
      [user_id, tokenUserType]
    );
    
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      
      // Send confirmation email
      try {
        const subject = tokenUserType === 'vendor' 
          ? 'Your Nyle Store Vendor Password Has Been Reset'
          : 'Your Nyle Store Account Password Has Been Reset';
        
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Nyle Store <onboarding@resend.dev>',
          to: [user.email],
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0;">NYLE STORE</h1>
                <p style="opacity: 0.9; margin: 5px 0 0 0;">${tokenUserType === 'vendor' ? 'Vendor Portal' : 'Customer Account'}</p>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2>Password Reset Successful</h2>
                <p>Hello <strong>${user.name}</strong>,</p>
                <p>Your Nyle Store ${tokenUserType === 'vendor' ? 'vendor' : 'customer'} account password has been successfully reset.</p>
                
                <div style="background: #e0f2fe; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <p><strong>Security Notice:</strong></p>
                  <ul style="margin: 10px 0;">
                    <li>Password changed on: ${new Date().toLocaleString()}</li>
                    <li>All existing sessions have been terminated</li>
                    <li>If you didn't make this change, please contact support immediately</li>
                  </ul>
                </div>
                
                <p>You can now <a href="${process.env.FRONTEND_URL || 'https://nyle-luxe.vercel.app'}/${tokenUserType === 'vendor' ? 'vendor/login' : 'auth/login'}" style="color: #2563eb;">login to your account</a> with your new password.</p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                  <p>Need help? Contact ${tokenUserType === 'vendor' ? 'vendor' : 'customer'} support at support@nyle.co.ke</p>
                  <p>&copy; ${new Date().getFullYear()} Nyle Store</p>
                </div>
              </div>
            </div>
          `
        });
      } catch (emailError) {
        console.warn(' Password reset confirmation email failed:', emailError);
      }
    }
    
    res.status(200).json({ 
      success: true,
      message: "Password reset successful. You can now login with your new password.",
      user_type: tokenUserType
    });
    
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error(" Reset password error:", err.message);
    res.status(500).json({ 
      error: "Failed to reset password" 
    });
  } finally {
    connection.release();
  }
};

//  4. RESEND VERIFICATION CODE
export const resendResetCode = async (req, res) => {
  try {
    const { email, user_type = 'user' } = req.body;
    
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ 
        error: "Valid email address is required" 
      });
    }

    // Determine which table to query based on user_type
    const tableName = user_type === 'vendor' ? 'vendors' : 'users';
    const nameColumn = user_type === 'vendor' ? 'legal_name' : 'name';

    // Check if user/vendor exists
    const userCheck = await pool.query(
      `SELECT id, email, ${nameColumn} as name FROM ${tableName} WHERE email = $1`,
      [email]
    );
    
    if (userCheck.rows.length === 0) {
      return res.status(200).json({ 
        success: true,
        message: "If an account exists with this email, you will receive a new verification code shortly."
      });
    }
    
    const user = userCheck.rows[0];
    
    // Delete existing token
    await pool.query(
      `DELETE FROM password_reset_tokens 
       WHERE user_id = $1 AND user_type = $2`,
      [user.id, user_type]
    );
    
    // Generate new 6-digit verification code
    const verificationCode = generateVerificationCode();
    const hashedCode = hashToken(verificationCode);
    const expiresAt = Date.now() + 900000; // 15 minutes from now
    
    // Store hashed code in database
    await pool.query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at, user_type) 
       VALUES ($1, $2, $3, $4)`,
      [user.id, hashedCode, expiresAt, user_type]
    );
    
    // Send email with new verification code
    try {
      const subject = user_type === 'vendor' 
        ? 'New Password Reset Code - Nyle Store Vendor'
        : 'New Password Reset Code - Nyle Store';
      
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Nyle Store <onboarding@resend.dev>',
        to: [email],
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">NYLE STORE</h1>
              <p style="opacity: 0.9; margin: 5px 0 0 0;">${user_type === 'vendor' ? 'Vendor Portal' : 'Customer Account'}</p>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2>New Password Reset Code</h2>
              <p>Hello <strong>${user.name}</strong>,</p>
              <p>Here is your new password reset verification code:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; background: #2563eb; color: white; padding: 15px 30px; font-size: 32px; font-weight: bold; letter-spacing: 8px; border-radius: 8px;">
                  ${verificationCode}
                </div>
              </div>
              
              <p style="color: #dc2626; font-weight: bold;">
                 This code will expire in 15 minutes
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p>If you didn't request this, please ignore this email.</p>
              </div>
            </div>
          </div>
        `
      });
      
    } catch (emailError) {
      console.error(' Resend code email error:', emailError);
      return res.status(500).json({ 
        error: "Failed to send new verification code" 
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: "New verification code sent to your email.",
      expires_in: "15 minutes"
    });
    
  } catch (err) {
    console.error(" Resend reset code error:", err.message);
    res.status(500).json({ 
      error: "Failed to resend verification code" 
    });
  }
};

