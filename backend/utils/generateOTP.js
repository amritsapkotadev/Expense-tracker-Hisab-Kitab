/**
 * Generate a random OTP (One Time Password)
 * @param {number} length - Length of the OTP (default: 6)
 * @returns {string} - Generated OTP
 */
const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  
  return otp;
};

/**
 * Generate a random token for password reset
 * @param {number} length - Length of the token (default: 32)
 * @returns {string} - Generated token
 */
const generateResetToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  
  return token;
};

module.exports = {
  generateOTP,
  generateResetToken
};
