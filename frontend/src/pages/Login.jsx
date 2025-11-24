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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#070709]">

      {/* Soft floating lights */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-3xl rounded-full animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full animate-pulse animation-delay-4000 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Faint Grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            `linear-gradient(#ffffff 1px, transparent 1px),
             linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">

        {/* LEFT SIDE */}
        <div className="text-white px-6 py-10 space-y-10">

          {/* Branding */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                ExpenseTracker
              </h1>
              <p className="text-purple-300/80 text-sm">Smart Finance Management</p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="space-y-4">
            <h2 className="text-5xl font-extrabold leading-snug">
              Manage Your Money,
              <span className="block bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Smarter & Faster
              </span>
            </h2>
            <p className="text-lg text-purple-200/90 max-w-md leading-relaxed">
              Track expenses effortlessly with real-time analytics & AI-powered insights.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-5">

            {[
              {
                icon: Sparkles,
                color: "green",
                title: "AI Insights",
                desc: "Personalized spending intel."
              },
              {
                icon: Shield,
                color: "blue",
                title: "Bank-Level Security",
                desc: "We protect your financial data."
              },
              {
                icon: Zap,
                color: "purple",
                title: "Instant Sync",
                desc: "Access from any device instantly."
              }
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md hover:bg-white/20 transition-all"
              >
                <div className={`w-10 h-10 bg-${f.color}-500/20 rounded-lg flex items-center justify-center`}>
                  <f.icon className={`w-5 h-5 text-${f.color}-400`} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">{f.title}</h3>
                  <p className="text-purple-200 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}

          </div>

        </div>

        {/* RIGHT SIDE — LOGIN FORM */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <LogIn className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-purple-200 mt-1">Sign in to continue</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="you@example.com"
                />
              </div>

              {errors.email && (
                <p className="text-red-400 mt-1 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />
                <input
                  {...register("password", { required: "Password is required" })}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 mt-1 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="text-right">
              <Link className="text-sm text-purple-300 hover:text-white" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full py-4 font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-[1.02] active:scale-[0.97] transition-all flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 border-t border-white/20 pt-6">
            <p className="text-purple-200">
              No account?{" "}
              <Link className="text-white font-semibold hover:text-purple-300 inline-flex items-center gap-1" to="/signup">
                Create one <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
