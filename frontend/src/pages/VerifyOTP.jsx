import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const { verifyOTP } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { email, name } = location.state || {};

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    const nextInput = document.getElementById(`otp-${nextIndex}`);
    if (nextInput) nextInput.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      return;
    }

    setIsVerifying(true);
    const result = await verifyOTP({
      email,
      otp: otpString,
    });
    setIsVerifying(false);

    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    setIsResending(true);
    try {
      // You would call a resend OTP API here
      // For now, we'll just show a success message
      setTimeout(() => {
        setIsResending(false);
        setResendCooldown(60); // 60 seconds cooldown
      }, 1000);
    } catch (error) {
      setIsResending(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Verify Your Email</h1>
          <p className="text-secondary-600">
            We've sent a 6-digit code to
          </p>
          <p className="text-primary-600 font-medium">{email}</p>
        </div>

        {/* Form */}
        <div className="card">
          <div className="card-content">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Fields */}
              <div>
                <label className="label text-center block mb-4">
                  Enter verification code
                </label>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center text-xl font-semibold border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isVerifying || otp.join('').length !== 6}
                className="btn btn-primary btn-lg w-full"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner w-5 h-5 mr-2" />
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Verify Email
                  </div>
                )}
              </button>
            </form>

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              <p className="text-secondary-600 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOTP}
                disabled={isResending || resendCooldown > 0}
                className="text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  'Sending...'
                ) : resendCooldown > 0 ? (
                  `Resend in ${resendCooldown}s`
                ) : (
                  'Resend code'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Back to Signup */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/signup')}
            className="flex items-center justify-center mx-auto text-secondary-600 hover:text-secondary-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to signup
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Need help?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check your spam folder if you don't see the email</li>
            <li>• Make sure you entered the correct email address</li>
            <li>• The code expires in 5 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
