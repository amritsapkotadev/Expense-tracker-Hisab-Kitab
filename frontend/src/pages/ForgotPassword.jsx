import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const email = watch('email', '');

  const onSubmit = async (data) => {
    const result = await forgotPassword(data.email);
    
    if (result.success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Check Your Email</h1>
            <p className="text-secondary-600">
              We've sent a password reset link to
            </p>
            <p className="text-primary-600 font-medium">{email}</p>
          </div>

          {/* Instructions */}
          <div className="card">
            <div className="card-content">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-600 text-sm font-medium">1</span>
                  </div>
                  <p className="text-secondary-700">
                    Check your email inbox for a password reset link
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-600 text-sm font-medium">2</span>
                  </div>
                  <p className="text-secondary-700">
                    Click the link to reset your password
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-600 text-sm font-medium">3</span>
                  </div>
                  <p className="text-secondary-700">
                    Create a new password and sign in
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-secondary-200">
                <p className="text-sm text-secondary-600 text-center">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    try again
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="flex items-center justify-center mx-auto text-secondary-600 hover:text-secondary-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Forgot Password?</h1>
          <p className="text-secondary-600">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <div className="card-content">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    type="email"
                    id="email"
                    className="input pl-10"
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-lg w-full"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner w-5 h-5 mr-2" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Reset Link
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="flex items-center justify-center mx-auto text-secondary-600 hover:text-secondary-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Need help?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Make sure you enter the email address you used to sign up</li>
            <li>• Check your spam folder if you don't receive the email</li>
            <li>• The reset link expires in 1 hour</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
