// ------------------------------------------------------------
// SIGNUP PAGE — Premium Gradient / Glassmorphism UI (Full Code)
// ------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { isValidEmail, validatePassword } from '../utils/helpers';

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
  X,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });
  const [isHovered, setIsHovered] = useState(false);

  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  // Handle password strength indicators
  useEffect(() => {
    if (password) {
      const s = validatePassword(password);
      setPasswordStrength(s);
    } else {
      setPasswordStrength({ score: 0, feedback: [] });
    }
  }, [password]);

  // Submit form
  const onSubmit = async (data) => {
    if (!isValidEmail(data.email)) {
      setError('email', { message: 'Please enter a valid email address' });
      return;
    }

    if (!passwordStrength.isValid) {
      setError('password', {
        message: 'Password does not meet the requirements',
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        message: 'Passwords do not match',
      });
      return;
    }

    const result = await signup({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      navigate('/verify-otp', {
        state: {
          email: data.email,
          name: data.name,
        },
      });
    }
  };

  // Color + labels for password strength
  const getStrengthText = (score) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Medium';
    return 'Strong';
  };

  const requirements = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', ok: /[a-z]/.test(password) },
    { label: 'One number', ok: /[0-9]/.test(password) },
    { label: 'One special character', ok: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Animated background lights */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-3000"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* ----------------------------- LEFT SIDE — BRANDING ----------------------------- */}
        <div className="text-white p-6 lg:p-10 space-y-10">

          {/* Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ExpenseTracker</h1>
              <p className="text-purple-200 text-sm">Track. Save. Grow.</p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-5xl font-bold leading-tight">
              Join Thousands
              <span className="block bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Taking Control
              </span>
            </h2>
            <p className="text-purple-200 text-xl mt-4">
              Unlock powerful tools that help you save smarter and spend wisely.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-5">
            <FeatureItem
              icon={<Sparkles className="w-5 h-5 text-green-400" />}
              title="Smart Budgeting"
              desc="AI-powered insights to optimize your spending patterns"
            />
            <FeatureItem
              icon={<Shield className="w-5 h-5 text-blue-400" />}
              title="Secure & Private"
              desc="Bank-level encryption keeps your data safe"
            />
            <FeatureItem
              icon={<Zap className="w-5 h-5 text-purple-400" />}
              title="Real-time Analytics"
              desc="Instant stats & breakdowns of your finances"
            />
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl max-w-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                JS
              </div>
              <p className="text-purple-300 text-sm">Jamie Smith</p>
            </div>
            <p className="text-purple-100 italic">
              "ExpenseTracker helped me save ₹40,000 in 3 months. Life changing!"
            </p>
          </div>
        </div>

        {/* ------------------------------- RIGHT SIDE — FORM ------------------------------- */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 lg:p-10">

          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4">
              <User className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-purple-200">Start managing your finances better</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Name */}
            <InputField
              label="Full Name"
              icon={<User className="h-5 w-5 text-purple-300" />}
              register={register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Enter a valid name' },
              })}
              placeholder="Enter your name"
              errors={errors.name}
            />

            {/* Email */}
            <InputField
              label="Email Address"
              icon={<Mail className="h-5 w-5 text-purple-300" />}
              register={register('email', { required: 'Email is required' })}
              placeholder="Enter your email"
              errors={errors.email}
            />

            {/* Password */}
            <PasswordField
              label="Password"
              show={showPassword}
              setShow={() => setShowPassword(!showPassword)}
              register={register('password', {
                required: 'Password is required',
              })}
              placeholder="Create a strong password"
              errors={errors.password}
            />

            {/* Password Strength */}
            {password && (
              <PasswordStrength strength={passwordStrength} requirements={requirements} />
            )}

            {/* Confirm Password */}
            <PasswordField
              label="Confirm Password"
              show={showConfirmPassword}
              setShow={() => setShowConfirmPassword(!showConfirmPassword)}
              register={register('confirmPassword', {
                required: 'Please confirm your password',
              })}
              placeholder="Confirm your password"
              errors={errors.confirmPassword}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 font-semibold text-white py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 transition-all"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight
                    className={`w-5 h-5 transition-transform ${
                      isHovered ? 'translate-x-1' : ''
                    }`}
                  />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <p className="text-purple-200">
              Already have an account?{' '}
              <Link className="text-white font-semibold hover:text-purple-300" to="/login">
                Sign in →
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-start gap-3">
              <Shield className="text-green-400 w-5 h-5 mt-1" />
              <p className="text-purple-200 text-sm">
                Your data is protected with bank-level encryption. We never store your password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --------------------------- SMALL SUB COMPONENTS --------------------------- */

/* Feature item */
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-xl p-4 border border-white/20 rounded-xl">
    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-purple-200 text-sm">{desc}</p>
    </div>
  </div>
);

/* Input fields */
const InputField = ({ label, icon, register, placeholder, errors }) => (
  <div>
    <label className="block text-sm font-medium text-white mb-2">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...register}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
      />
    </div>

    {errors && (
      <p className="mt-2 text-sm text-red-400 flex items-center">
        <X className="w-4 h-4 mr-1" /> {errors.message}
      </p>
    )}
  </div>
);

/* Password field */
const PasswordField = ({ label, show, setShow, register, placeholder, errors }) => (
  <div>
    <label className="block text-sm font-medium text-white mb-2">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-purple-300" />
      </div>
      <input
        {...register}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
      />
      <button
        type="button"
        onClick={setShow}
        className="absolute inset-y-0 right-0 pr-3 text-purple-300 hover:text-purple-400"
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>

    {errors && (
      <p className="mt-2 text-sm text-red-400 flex items-center">
        <X className="w-4 h-4 mr-1" /> {errors.message}
      </p>
    )}
  </div>
);

/* Password Strength Indicator */
const PasswordStrength = ({ strength, requirements }) => (
  <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">

    {/* Strength Bar */}
    <div className="flex items-center justify-between mb-3">
      <span className="text-white text-sm font-medium">Password Strength</span>

      <span
        className={`text-sm font-semibold ${
          strength.score <= 2
            ? 'text-red-400'
            : strength.score <= 3
            ? 'text-yellow-400'
            : 'text-green-400'
        }`}
      >
        {strength.score <= 2
          ? 'Weak'
          : strength.score <= 3
          ? 'Medium'
          : 'Strong'}
      </span>
    </div>

    <div className="w-full bg-white/20 h-2 rounded-full">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${
          strength.score <= 2
            ? 'bg-red-500'
            : strength.score <= 3
            ? 'bg-yellow-500'
            : 'bg-green-500'
        }`}
        style={{ width: `${(strength.score / 5) * 100}%` }}
      />
    </div>

    {/* Requirements */}
    <div className="mt-3 space-y-2">
      {requirements.map((r, i) => (
        <div key={i} className="flex items-center space-x-2">
          {r.ok ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <X className="w-4 h-4 text-red-400" />
          )}
          <span
            className={`text-sm ${
              r.ok ? 'text-green-400' : 'text-purple-200'
            }`}
          >
            {r.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Signup;
