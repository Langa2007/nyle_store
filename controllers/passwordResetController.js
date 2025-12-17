// controllers/passwordResetController.js
import pool from "../db/connect.js";
import crypto from "crypto";
import { Resend } from 'resend';
import bcrypt from "bcryptjs";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: Generate secure reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex'); // 64-character token
};

// Helper: Hash token for database storage
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Helper: Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ 1. FORGOT PASSWORD REQUEST (for BOTH users and vendors)
export const forgotPassword = async (req, res) => {
  try {
    const { email, user_type = 'user' } = req.body; // Default to 'user'
    
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
        message: "If an account exists with this email, you will receive a password reset link shortly." 
      });
    }
    
    const user = userCheck.rows[0];
    
    // Delete any existing reset tokens for this user/vendor
    await pool.query(
      `DELETE FROM password_reset_tokens 
       WHERE user_id = $1 AND user_type = $2`,
      [user.id, user_type]
    );
    
    // Generate secure reset token
    const resetToken = generateResetToken();
    const hashedToken = hashToken(resetToken);
    const expiresAt = Date.now() + 3600000; // 1 hour from now
    
    // Store hashed token in database
    await pool.query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at, user_type) 
       VALUES ($1, $2, $3, $4)`,
      [user.id, hashedToken, expiresAt, user_type]
    );
    
    // Construct reset URL
    const baseUrl = process.env.FRONTEND_URL || 'https://nyle-luxe.vercel.app';
    const resetPath = user_type === 'vendor' ? '/vendor/reset-password' : '/auth/reset-password';
    const resetUrl = `${baseUrl}${resetPath}?token=${resetToken}`;
    
    // Send email via Resend
    try {
      const subject = user_type === 'vendor' 
        ? 'Reset Your Nyle Store Vendor Password'
        : 'Reset Your Nyle Store Account Password';
      
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
                .button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                .warning { color: #dc2626; font-size: 14px; margin-top: 20px; padding: 10px; background: #fef2f2; border-radius: 5px; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">NYLE STORE</div>
                  <div style="color: white; opacity: 0.9;">${portalName}</div>
                </div>
                <div class="content">
                  <h2>Password Reset Request</h2>
                  <p>Hello <strong>${user.name}</strong>,</p>
                  <p>We received a request to reset your password for your Nyle Store ${user_type === 'vendor' ? 'vendor' : 'customer'} account.</p>
                  <p>Click the button below to reset your password:</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" class="button">Reset Password</a>
                  </div>
                  
                  <p>Or copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 5px; font-size: 14px;">
                    ${resetUrl}
                  </p>
                  
                  <div class="warning">
                    ⚠️ <strong>Important:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
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
        text: `Password Reset for Nyle Store ${user_type === 'vendor' ? 'Vendor' : 'Customer'} Account\n\nHello ${user.name},\n\nTo reset your password, click on this link: ${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nNyle Store Team`
      });
      
      console.log(`✅ Password reset email sent to ${user_type}:`, email);
      
    } catch (emailError) {
      console.error('❌ Resend email error:', emailError);
      return res.status(500).json({ 
        error: "Failed to send reset email. Please try again later." 
      });
    }
    
    res.status(200).json({ 
      message: "If an account exists with this email, you will receive a password reset link shortly." 
    });
    
  } catch (err) {
    console.error("❌ Forgot password error:", err.message);
    res.status(500).json({ 
      error: "An error occurred while processing your request" 
    });
  }
};

// ✅ 2. VALIDATE RESET TOKEN (for BOTH users and vendors)
export const validateResetToken = async (req, res) => {
  try {
    const { token, user_type = 'user' } = req.query;
    
    if (!token) {
      return res.status(400).json({ 
        error: "Reset token is required" 
      });
    }
    
    const hashedToken = hashToken(token);
    const currentTime = Date.now();
    
    // Find token and check expiration
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
         AND prt.user_type = $3`,
      [hashedToken, currentTime, user_type]
    );
    
    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ 
        error: "Invalid or expired reset token" 
      });
    }
    
    res.status(200).json({ 
      valid: true,
      email: tokenResult.rows[0].email,
      name: tokenResult.rows[0].name,
      user_type: tokenResult.rows[0].user_type
    });
    
  } catch (err) {
    console.error("❌ Validate token error:", err.message);
    res.status(500).json({ 
      error: "Failed to validate reset token" 
    });
  }
};

// ✅ 3. RESET PASSWORD (for BOTH users and vendors)
export const resetPassword = async (req, res) => {
  const connection = await pool.connect();
  
  try {
    const { token, newPassword, user_type = 'user' } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ 
        error: "Token and new password are required" 
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
    
    const hashedToken = hashToken(token);
    const currentTime = Date.now();
    
    // Find valid token
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
                <h2>Password Reset Confirmation</h2>
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
        console.warn('⚠️ Password reset confirmation email failed:', emailError);
      }
    }
    
    res.status(200).json({ 
      success: true,
      message: "Password reset successful. You can now login with your new password.",
      user_type: tokenUserType
    });
    
  } catch (err) {
    await connection.query('ROLLBACK');
    console.error("❌ Reset password error:", err.message);
    res.status(500).json({ 
      error: "Failed to reset password" 
    });
  } finally {
    connection.release();
  }
};

// ✅ 4. PASSWORD RESET PAGE RENDERER (for BOTH users and vendors)
export const renderResetPage = async (req, res) => {
  try {
    const { token, user_type = 'user' } = req.query;
    
    if (!token) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invalid Reset Link - Nyle Store</title>
          </head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc2626;">Invalid Reset Link</h1>
            <p>The password reset link is invalid or missing.</p>
            <p><a href="/${user_type === 'vendor' ? 'vendor/login' : 'auth/login'}" style="color: #2563eb; text-decoration: none;">Return to Login</a></p>
          </body>
        </html>
      `);
    }
    
    // Validate token
    const hashedToken = hashToken(token);
    const currentTime = Date.now();
    
    const tokenResult = await pool.query(
      `SELECT prt.*, 
              CASE 
                WHEN prt.user_type = 'vendor' THEN v.legal_name
                ELSE u.name
              END as name
       FROM password_reset_tokens prt
       LEFT JOIN vendors v ON prt.user_type = 'vendor' AND prt.user_id = v.id
       LEFT JOIN users u ON prt.user_type = 'user' AND prt.user_id = u.id
       WHERE prt.token = $1 AND prt.expires_at > $2 AND prt.user_type = $3`,
      [hashedToken, currentTime, user_type]
    );
    
    if (tokenResult.rows.length === 0) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Expired Reset Link - Nyle Store</title>
          </head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #d97706;">Link Expired</h1>
            <p>This password reset link has expired.</p>
            <p><a href="/${user_type === 'vendor' ? 'vendor/forgot-password' : 'auth/forgot-password'}" style="color: #2563eb; text-decoration: none;">Request a new reset link</a></p>
          </body>
        </html>
      `);
    }
    
    const userType = tokenResult.rows[0].user_type;
    const portalName = userType === 'vendor' ? 'Vendor Portal' : 'Customer Account';
    
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reset Password - Nyle Store</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
            .container { background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; margin: -30px -30px 30px -30px; }
            .logo { font-size: 24px; font-weight: bold; }
            input[type="password"] { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #d1d5db; border-radius: 5px; }
            button { background: #2563eb; color: white; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%; }
            button:hover { background: #1d4ed8; }
            .error { color: #dc2626; font-size: 14px; margin-top: 5px; }
            .success { color: #059669; }
            .password-rules { font-size: 12px; color: #6b7280; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">NYLE STORE</div>
              <div>${portalName} - Reset Password</div>
            </div>
            
            <h2>Set New Password</h2>
            <p>Hello <strong>${tokenResult.rows[0].name}</strong>,</p>
            <p>Please enter your new password below.</p>
            
            <form id="resetForm">
              <input type="hidden" id="token" value="${token}">
              <input type="hidden" id="user_type" value="${userType}">
              
              <label for="newPassword">New Password</label>
              <input type="password" id="newPassword" required placeholder="Enter new password">
              <div class="password-rules">
                Must be at least 8 characters with letters, numbers, and one special character (@$!%*?&)
              </div>
              
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" required placeholder="Confirm new password">
              
              <div id="errorMessage" class="error"></div>
              <div id="successMessage" class="success"></div>
              
              <button type="submit">Reset Password</button>
            </form>
            
            <script>
              document.getElementById('resetForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const token = document.getElementById('token').value;
                const user_type = document.getElementById('user_type').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const errorElement = document.getElementById('errorMessage');
                const successElement = document.getElementById('successMessage');
                
                errorElement.textContent = '';
                successElement.textContent = '';
                
                if (newPassword !== confirmPassword) {
                  errorElement.textContent = 'Passwords do not match';
                  return;
                }
                
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(newPassword)) {
                  errorElement.textContent = 'Password must be at least 8 characters, contain letters, numbers, and one special character (@$!%*??&)';
                  return;
                }
                
                try {
                  const endpoint = user_type === 'vendor' 
                    ? '/api/vendor/auth/reset-password' 
                    : '/api/auth/reset-password';
                  
                  const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, newPassword, user_type })
                  });
                  
                  const data = await response.json();
                  
                  if (response.ok) {
                    successElement.textContent = data.message + ' Redirecting to login...';
                    setTimeout(() => {
                      window.location.href = user_type === 'vendor' ? '/vendor/login' : '/auth/login';
                    }, 3000);
                  } else {
                    errorElement.textContent = data.error || 'Failed to reset password';
                  }
                } catch (err) {
                  errorElement.textContent = 'Network error. Please try again.';
                }
              });
            </script>
          </div>
        </body>
      </html>
    `);
    
  } catch (err) {
    console.error("❌ Render reset page error:", err.message);
    res.status(500).send("Internal server error");
  }
};