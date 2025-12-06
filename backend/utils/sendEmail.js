const nodemailer = require('nodemailer');
const { google } = require('googleapis');

/**
 * Create OAuth2 client for Gmail API
 */
const createOAuth2Client = () => {
  const OAuth2 = google.auth.OAuth2;
  
  // If OAuth credentials are provided, use them
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN) {
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });

    return oauth2Client;
  }
  
  return null;
};

/**
 * Create and return a reusable transporter object
 */
const createTransporter = async () => {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️  Email credentials not configured');
      return null;
    }

    // Try OAuth2 first (works on Render)
    const oauth2Client = createOAuth2Client();
    if (oauth2Client) {
      try {
        const accessToken = await oauth2Client.getAccessToken();
        
        return nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: accessToken.token
          }
        });
      } catch (oauthError) {
        console.log('⚠️  OAuth2 failed, falling back to app password');
      }
    }

    // Fallback to app password (may not work on Render due to SMTP blocking)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // 
      secure: true,  
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      }
    });

    return transporter;
  } catch (error) {
    console.error('❌ Error creating email transporter:', error);
    return null;
  }
};

/**
 * Send OTP verification email
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} otp - OTP code
 * @returns {Promise}
 */
const sendOTPEmail = async (email, name, otp) => {
  try {
    const transporter = await createTransporter();

    if (!transporter) {
      console.log('📧 OTP for', email, 'is:', otp);
      return { success: true, messageId: 'no-email-configured' };
    }

    const mailOptions = {
      from: `"Hisab Kitab" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email - Hisab Kitab',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #22d3ee, #7c3aed); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px;">Hisab Kitab</h1>
            <p style="color: #fff; font-size: 16px; margin-top: 10px;">Verify Your Email Address</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Hello ${name} 👋</h2>
            <p>Use the following OTP code to verify your email:</p>
            <div style="background: linear-gradient(135deg, #22d3ee, #7c3aed); color: #fff; font-size: 32px; font-weight: bold; letter-spacing: 8px; border-radius: 8px; padding: 20px; text-align: center;">
              ${otp}
            </div>
            <p style="margin-top: 15px; color: #666;">This code will expire in 15 minutes.</p>
            <p style="color: #666;">If you didn't sign up for Hisab Kitab, you can safely ignore this email.</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent successfully to', email);
    return result;
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
 * @returns {Promise}
 */
const sendPasswordResetEmail = async (email, name, resetToken) => {
  try {
    const transporter = await createTransporter();

    if (!transporter) {
      console.log('📧 Password Reset OTP for', email, 'is:', resetToken);
      return { success: true, messageId: 'no-email-configured' };
    }

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"Hisab Kitab" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset - Hisab Kitab',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #7c3aed, #d946ef); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Hisab Kitab</h1>
            <p style="color: #fff; font-size: 16px; margin-top: 10px;">Password Reset Request</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Hello ${name},</h2>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #7c3aed, #d946ef); color: #fff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reset Password</a>
            </div>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p><a href="${resetUrl}" style="color: #7c3aed;">${resetUrl}</a></p>
            <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Hisab Kitab. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully to', email);
    return result;
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    console.log('📧 Password Reset OTP for', email, 'is:', resetToken);
    throw error;
  }
};

/**
 * Send CSV report email with attachment
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {Buffer|string} csv - CSV content buffer or string
 * @param {string} filename - Attachment filename
 * @returns {Promise}
 */
const sendCSVReportEmail = async (email, name, csv, filename = 'expenses.csv') => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Expense CSV Report',
      text: `Hi ${name},\n\nPlease find attached your expense report CSV.\n\nRegards,\nExpense Tracker Team`,
      attachments: [
        {
          filename,
          content: csv,
          contentType: 'text/csv'
        }
      ]
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ CSV report email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending CSV report email:', error);
    throw error;
  }
};

module.exports = {
  sendOTPEmail,
  sendPasswordResetEmail,
  sendCSVReportEmail
};
