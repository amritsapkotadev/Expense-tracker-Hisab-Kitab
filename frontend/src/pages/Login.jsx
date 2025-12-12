import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, LogIn, TrendingUp, Sparkles, Shield, Zap, ChevronLeft } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) navigate(from, { replace: true });
  };

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
                Welcome Back to
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Financial Freedom
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-md">
              Track, analyze, and optimize your spending with AI-powered insights.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {[
              {
                Icon: Sparkles,
                title: "Smart Analytics",
                desc: "AI-powered spending insights",
                gradient: "from-cyan-400 to-blue-500",
              },
              {
                Icon: Shield,
                title: "Bank-Level Security",
                desc: "Your data is encrypted & protected",
                gradient: "from-violet-400 to-purple-500",
              },
              {
                Icon: Zap,
                title: "Real-Time Sync",
                desc: "Access anywhere, anytime",
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
        </div>

        {/* RIGHT PANEL - Login Form */}
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
              <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to continue to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
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
                    placeholder="••••••••"
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

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition font-medium"
                >
                  Forgot password?
                </Link>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>

         
        </div>

      </div>
    </div>
  );
};

export default Login;
