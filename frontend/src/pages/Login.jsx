import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn, Sparkles, Shield, Zap, TrendingUp } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px),
                             linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding & Features */}
        <div className="text-white space-y-8 p-8">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                ExpenseTracker
              </h1>
              <p className="text-purple-200 text-sm">Smart Finance Management</p>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold leading-tight">
              Take Control of Your
              <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                {" "}Finances
              </span>
            </h2>
            <p className="text-xl text-purple-200 leading-relaxed">
              Join thousands who are already managing their expenses smarter, faster, and more efficiently.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6 mt-8">
            <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI-Powered Insights</h3>
                <p className="text-purple-200 text-sm">Smart spending analysis and recommendations</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Bank-Level Security</h3>
                <p className="text-purple-200 text-sm">Your data is encrypted and secure</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Real-time Sync</h3>
                <p className="text-purple-200 text-sm">Access your data anywhere, anytime</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-6 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Only Me</div>
              <div className="text-purple-200 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Rs10000+</div>
              <div className="text-purple-200 text-sm">Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-purple-200 text-sm">Rating( I gave )</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-10">
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-purple-200">Sign in to continue your financial journey</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-300 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                  })}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-300 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="block w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-300 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-purple-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className={`w-5 h-5 transform transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <p className="text-purple-200">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-white font-semibold hover:text-purple-300 transition-colors duration-200 inline-flex items-center gap-1"
              >
                Create one
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>

         
        </div>
      </div>


    </div>
  );
};

export default Login;