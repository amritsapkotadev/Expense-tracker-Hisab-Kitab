import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { validatePassword } from '../utils/helpers';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword, isLoading } = useAuth();

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const password = watch('password', '');

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  // Check password strength when password changes
  useEffect(() => {
    if (password) {
      const strength = validatePassword(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, feedback: [] });
    }
  }, [password]);

  const onSubmit = async (data) => {
    // Validate password strength
    if (!passwordStrength.isValid) {
      setError('password', { message: 'Password does not meet requirements' });
      return;
    }

    // Confirm password match
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    const result = await resetPassword({
      token,
      password: data.password,
    });

    if (result.success) {
      navigate('/login', { 
        state: { 
          message: 'Password reset successfully. Please sign in with your new password.' 
        } 
      });
    }
  };

  const getPasswordStrengthColor = (score) => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (score) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Medium';
    return 'Strong';
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Reset Password</h1>
          <p className="text-secondary-600">
            Enter your new password below
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <div className="card-content">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label htmlFor="password" className="label">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="input pl-10 pr-10"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )}
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-secondary-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-secondary-600">
                        {getPasswordStrengthText(passwordStrength.score)}
                      </span>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="mt-2 text-sm text-secondary-600">
                        {passwordStrength.feedback.map((feedback, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-secondary-400 rounded-full mr-2" />
                            {feedback}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="label">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className="input pl-10 pr-10"
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="form-error">{errors.confirmPassword.message}</p>
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
                    Resetting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Reset Password
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

        {/* Password Requirements */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Password Requirements</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• At least 6 characters long</li>
            <li>• Contains at least one lowercase letter</li>
            <li>• Contains at least one uppercase letter</li>
            <li>• Contains at least one number</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
