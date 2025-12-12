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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0;">Hisab Kitab</h1>
        </div>
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
          <h2 style="color: #1a1f3a;">Hello ${name}!</h2>
          <p style="font-size: 16px; color: #4a5568;">Your verification code is:</p>
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #7c3aed; letter-spacing: 5px;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #718096;">This code will expire in 10 minutes.</p>
          <p style="font-size: 14px; color: #718096;">If you didn't request this code, please ignore this email.</p>
        </div>
      </div>
    `;

    const text = `Hello ${name}!\n\nYour verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`;

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
