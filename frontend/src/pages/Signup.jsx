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
  UserPlus,
  TrendingUp,
  Sparkles,
  Shield,
  Zap,
  Check,
  X,
  ChevronLeft,
} from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });

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

  // Password requirements
  const requirements = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', ok: /[a-z]/.test(password) },
    { label: 'One number', ok: /[0-9]/.test(password) },
    { label: 'One special character', ok: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden bg-gradient-to-br from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27]">

      {/* Animated Background Mesh */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-violet-500/15 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 -z-10 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">

        {/* LEFT PANEL - Branding & Features */}
        <div className="hidden lg:block text-white space-y-10 p-8">
          
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400 to-violet-500 opacity-50 rounded-2xl scale-110"></div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-2xl relative">
                <TrendingUp className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Hisab Kitab
              </h1>
              <p className="text-xs text-cyan-400/80 font-medium">Financial Intelligence Platform</p>
            </div>
          </Link>

          {/* Main Headline */}
          <div className="space-y-4">
            <h2 className="text-5xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Join Thousands
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Taking Control
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-md">
              Start your journey to financial freedom with AI-powered expense tracking.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {[
              {
                Icon: Sparkles,
                title: "Smart Budgeting",
                desc: "AI insights optimize your spending",
                gradient: "from-cyan-400 to-blue-500",
              },
              {
                Icon: Shield,
                title: "Secure & Private",
                desc: "Bank-level encryption protection",
                gradient: "from-violet-400 to-purple-500",
              },
              {
                Icon: Zap,
                title: "Real-Time Analytics",
                desc: "Instant financial insights",
                gradient: "from-fuchsia-400 to-pink-500",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                JS
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Jamie Smith</p>
                <p className="text-cyan-400 text-xs">Premium User</p>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "Hisab Kitab helped me save ₹40,000 in just 3 months. Absolutely life-changing!"
            </p>
          </div>
        </div>

        {/* RIGHT PANEL - Signup Form */}
        <div className="w-full max-w-md mx-auto">
          
          {/* Back to home - mobile only */}
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition mb-6 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Form Card */}
          <div className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Hisab Kitab
              </h1>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
              <p className="text-gray-400">Start managing your finances better</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Enter a valid name' },
                    })}
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl
                    placeholder-gray-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl
                    placeholder-gray-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl
                    placeholder-gray-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white">Password Strength</span>
                    <span
                      className={`text-sm font-bold ${
                        passwordStrength.score <= 2
                          ? 'text-rose-400'
                          : passwordStrength.score <= 3
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {passwordStrength.score <= 2
                        ? 'Weak'
                        : passwordStrength.score <= 3
                        ? 'Medium'
                        : 'Strong'}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        passwordStrength.score <= 2
                          ? 'bg-rose-500'
                          : passwordStrength.score <= 3
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <div className="mt-3 space-y-2">
                    {requirements.map((r, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {r.ok ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-gray-500" />
                        )}
                        <span className={`text-xs ${r.ok ? 'text-emerald-400' : 'text-gray-400'}`}>
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl
                    placeholder-gray-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-rose-400 rounded-full"></span>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold text-white
                bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
                hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Your data is encrypted & never shared</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
