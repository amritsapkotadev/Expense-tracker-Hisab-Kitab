import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, CheckCircle, Shield, Clock, RefreshCw, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-purple-200">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-green-300 font-semibold text-lg mt-1">{email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div>
            <label className="block text-sm font-medium text-white text-center mb-4">
              Enter the 6-digit code
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
                  className="w-12 h-12 text-center text-xl font-semibold bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying || otp.join('').length !== 6}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Verify Email
              </>
            )}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          <p className="text-purple-200 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendOTP}
            disabled={isResending || resendCooldown > 0}
            className="text-white hover:text-purple-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : resendCooldown > 0 ? (
              <>
                <Clock className="w-4 h-4" />
                Resend in {resendCooldown}s
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Resend code
              </>
            )}
          </button>
        </div>

        {/* Back to Signup */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/signup')}
            className="flex items-center justify-center mx-auto text-purple-200 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to signup
          </button>
        </div>

        {/* Security Information */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Secure Verification</p>
              <p className="text-purple-200 text-xs">Your account security is our priority</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Quick Process</p>
              <p className="text-purple-200 text-xs">Code expires in 5 minutes for security</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">Instant Access</p>
              <p className="text-purple-200 text-xs">Get full access immediately after verification</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <h3 className="font-medium text-blue-300 mb-2 flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Need help?
          </h3>
          <ul className="text-blue-200 text-sm space-y-1">
            <li className="flex items-center">
              <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
              Check spam folder if you don't see our email
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
              Ensure you entered the correct email address
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
              Contact support if you continue having issues
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;