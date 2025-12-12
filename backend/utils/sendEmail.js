const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Base email sending function using SendGrid API
 */
const sendEmail = async ({ to, subject, text, html, attachments }) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('⚠️  SendGrid API key not configured');
      return { success: false, error: 'SendGrid not configured' };
    }

    const msg = {
      to,
      from: process.env.EMAIL_USER || 'amritsapkota.dev@gmail.com', // Must be verified in SendGrid
      subject,
      text,
      html,
      attachments,
    };

    const result = await sgMail.send(msg);
    console.log('✅ Email sent:', result[0].statusCode);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Error sending email:', error.response ? error.response.body : error);
    throw error;
  }
};

/**
 * Send OTP verification email
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} otp - OTP code
 */
const sendOTPEmail = async (email, name, otp) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0A0E27; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background: linear-gradient(135deg, #1A1F3A 0%, #0A0E27 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
                
                <!-- Header with gradient -->
                <tr>
                  <td style="padding: 0;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #22d3ee 0%, #7c3aed 50%, #d946ef 100%); padding: 40px 30px;">
                      <tr>
                        <td align="center">
                          <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 20px; backdrop-filter: blur(10px); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                            <span style="font-size: 40px;">📊</span>
                          </div>
                          <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">Hisab Kitab</h1>
                          <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 500;">Financial Intelligence Platform</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Main content -->
                <tr>
                  <td style="padding: 50px 40px;">
                    <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome, ${name}! 👋</h2>
                    <p style="margin: 0 0 32px 0; color: rgba(255, 255, 255, 0.7); font-size: 16px; line-height: 1.6;">Thank you for signing up! To complete your registration and secure your account, please verify your email address with the code below:</p>
                    
                    <!-- OTP Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                      <tr>
                        <td align="center" style="padding: 40px 30px; background: linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%); border: 2px solid rgba(124, 58, 237, 0.3); border-radius: 16px; backdrop-filter: blur(10px);">
                          <p style="margin: 0 0 16px 0; color: rgba(255, 255, 255, 0.6); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                          <div style="font-size: 48px; font-weight: 800; color: #22d3ee; letter-spacing: 12px; font-family: 'Courier New', monospace; text-shadow: 0 0 20px rgba(34, 211, 238, 0.5);">${otp}</div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Info boxes -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 24px 0;">
                      <tr>
                        <td style="padding: 20px; background: rgba(124, 58, 237, 0.1); border-left: 4px solid #7c3aed; border-radius: 8px;">
                          <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; line-height: 1.5;">
                            <strong style="color: #22d3ee;">⏱️ Valid for 10 minutes</strong><br>
                            This code will expire shortly for your security.
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                      <tr>
                        <td style="padding: 20px; background: rgba(217, 70, 239, 0.1); border-left: 4px solid #d946ef; border-radius: 8px;">
                          <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; line-height: 1.5;">
                            <strong style="color: #d946ef;">📬 Check spam folder</strong><br>
                            If you don't see our emails, please check your spam/junk folder.
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 32px 0 0 0; color: rgba(255, 255, 255, 0.5); font-size: 14px; line-height: 1.6;">If you didn't create an account with Hisab Kitab, you can safely ignore this email.</p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background: rgba(255, 255, 255, 0.02); border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0 0 12px 0; color: rgba(255, 255, 255, 0.4); font-size: 12px; text-align: center; line-height: 1.5;">
                      This is an automated message from Hisab Kitab<br>
                      © 2025 Hisab Kitab. All rights reserved.
                    </p>
                    <p style="margin: 0; text-align: center;">
                      <a href="#" style="color: #22d3ee; text-decoration: none; font-size: 12px; margin: 0 8px;">Privacy Policy</a>
                      <span style="color: rgba(255, 255, 255, 0.3);">•</span>
                      <a href="#" style="color: #22d3ee; text-decoration: none; font-size: 12px; margin: 0 8px;">Terms of Service</a>
                      <span style="color: rgba(255, 255, 255, 0.3);">•</span>
                      <a href="#" style="color: #22d3ee; text-decoration: none; font-size: 12px; margin: 0 8px;">Support</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const text = `Hello ${name}!\n\nThank you for signing up for Hisab Kitab!\n\nYour verification code is: ${otp}\n\nThis code will expire in 10 minutes for your security.\n\n📬 TIP: If you don't see this email, please check your spam/junk folder.\n\nIf you didn't create an account with Hisab Kitab, you can safely ignore this email.\n\nBest regards,\nThe Hisab Kitab Team`;

    return await sendEmail({
      to: email,
      subject: 'Verify Your Email - Hisab Kitab',
      text,
      html,
    });
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    console.log('📧 OTP for', email, 'is:', otp);
    throw error;
  }
};

/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} resetToken - Password reset token
 */
const sendPasswordResetEmail = async (email, name, resetToken) => {
  try {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0;">Hisab Kitab</h1>
        </div>
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
          <h2 style="color: #1a1f3a;">Hello ${name}!</h2>
          <p style="font-size: 16px; color: #4a5568;">You requested to reset your password.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="font-size: 14px; color: #718096;">This link will expire in 1 hour.</p>
          <p style="font-size: 14px; color: #718096;">If you didn't request this, please ignore this email.</p>
          <p style="font-size: 12px; color: #a0aec0; margin-top: 20px;">Or copy this link: ${resetUrl}</p>
        </div>
      </div>
    `;

    const text = `Hello ${name}!\n\nYou requested to reset your password.\n\nClick this link to reset your password: ${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.`;

    return await sendEmail({
      to: email,
      subject: 'Password Reset - Hisab Kitab',
      text,
      html,
    });
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};

/**
 * Send CSV report email with attachment
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} csv - CSV data as string
 * @param {string} filename - CSV filename (optional)
 */
const sendCSVReportEmail = async (email, name, csv, filename = 'expenses.csv') => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0;">Hisab Kitab</h1>
        </div>
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
          <h2 style="color: #1a1f3a;">Hello ${name}!</h2>
          <p style="font-size: 16px; color: #4a5568;">Your expense report is ready!</p>
          <p style="font-size: 14px; color: #718096;">Please find your expense CSV report attached to this email.</p>
        </div>
      </div>
    `;

    const text = `Hello ${name}!\n\nYour expense report is ready! Please find your expense CSV report attached to this email.`;

    return await sendEmail({
      to: email,
      subject: 'Your Expense CSV Report - Hisab Kitab',
      text,
      html,
      attachments: [
        {
          content: Buffer.from(csv).toString('base64'),
          filename,
          type: 'text/csv',
          disposition: 'attachment',
        },
      ],
    });
  } catch (error) {
    console.error('❌ Error sending CSV report email:', error);
    throw error;
  }
};

module.exports = {
  sendOTPEmail,
  sendPasswordResetEmail,
  sendCSVReportEmail,
};
