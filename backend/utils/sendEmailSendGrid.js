const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}


const sendOTPEmail = async (email, name, otp) => {
  try {
    if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_FROM) {
      console.log('📧 OTP for', email, 'is:', otp);
      return { success: true, message: 'Email config missing - OTP logged to console' };
    }

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM, // Must be a verified sender in SendGrid
      subject: 'Verify Your Email - Hisab Kitab',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #22d3ee, #7c3aed); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px;">Hisab Kitab</h1>
            <p style="color: #fff; font-size: 16px; margin-top: 10px;">Verify Your Email Address</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Hello ${name} 👋</h2>
            <p style="font-size: 16px; color: #333;">
              Thank you for signing up! Please use the OTP below to verify your email address:
            </p>
            <div style="background: #fff; border: 2px dashed #22d3ee; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #7c3aed; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
            </div>
            <p style="font-size: 14px; color: #666;">
              This OTP will expire in 15 minutes. If you didn't request this, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Hisab Kitab. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log('✅ OTP email sent successfully to', email);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    console.log('📧 OTP for', email, 'is:', otp);
    return { success: false, message: error.message };
  }
};

/**
 * Send password reset OTP email via SendGrid
 * @param {string} email - Recipient email
 * @param {string} otp - OTP code
 * @returns {Promise}
 */
const sendPasswordResetEmail = async (email, otp) => {
  try {
    if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_FROM) {
      console.log('📧 Password Reset OTP for', email, 'is:', otp);
      return { success: true, message: 'Email config missing - OTP logged to console' };
    }

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Password Reset - Hisab Kitab',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #7c3aed, #d946ef); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px;">Hisab Kitab</h1>
            <p style="color: #fff; font-size: 16px; margin-top: 10px;">Password Reset Request</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Password Reset 🔐</h2>
            <p style="font-size: 16px; color: #333;">
              We received a request to reset your password. Use the OTP below to proceed:
            </p>
            <div style="background: #fff; border: 2px dashed #7c3aed; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #d946ef; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
            </div>
            <p style="font-size: 14px; color: #666;">
              This OTP will expire in 15 minutes. If you didn't request this, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Hisab Kitab. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log('✅ Password reset email sent successfully to', email);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    console.log('📧 Password Reset OTP for', email, 'is:', otp);
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendOTPEmail,
  sendPasswordResetEmail,
};
