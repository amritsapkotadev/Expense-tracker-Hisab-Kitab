const nodemailer = require('nodemailer');

/**
 * Create and return a reusable transporter object using Gmail
 */
const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error);
      } else {
        console.log('✅ Email transporter ready');
      }
    });

    return transporter;
  } catch (error) {
    console.error('❌ Error creating email transporter:', error);
    throw error;
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
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email - Expense Tracker',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px;">Expense Tracker</h1>
            <p style="color: #fff; font-size: 16px; margin-top: 10px;">Verify Your Email Address</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Hello ${name} 👋</h2>
            <p>Use the following OTP code to verify your email:</p>
            <div style="background: #667eea; color: #fff; font-size: 24px; font-weight: bold; letter-spacing: 3px; border-radius: 8px; padding: 15px; text-align: center;">
              ${otp}
            </div>
            <p style="margin-top: 10px;">This code will expire in 5 minutes.</p>
            <p>If you didn’t sign up for Expense Tracker, you can safely ignore this email.</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
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
    const transporter = createTransporter();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password - Expense Tracker',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Expense Tracker</h1>
            <p style="color: #fff; font-size: 16px; margin-top: 10px;">Password Reset Request</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Hello ${name},</h2>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${resetUrl}" style="background: #667eea; color: #fff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reset Password</a>
            </div>
            <p>If the button doesn’t work, copy and paste this link into your browser:</p>
            <p><a href="${resetUrl}" style="color: #667eea;">${resetUrl}</a></p>
            <p>This link will expire in 1 hour. If you didn’t request this, please ignore this email.</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};

module.exports = {
  sendOTPEmail,
  sendPasswordResetEmail
};
