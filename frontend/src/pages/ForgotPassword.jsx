import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  ArrowLeft,
  Send,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

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

  /* --------------------------
      SUCCESS SCREEN
  ----------------------------*/
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#070709]">

        {/* Floating Lights */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-green-500/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full animate-pulse animation-delay-2000"></div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              `linear-gradient(#ffffff 1px, transparent 1px),
               linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-10 relative z-10">

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Check Your Email</h1>
            <p className="text-purple-200 mt-2">A reset link was sent to:</p>
            <p className="text-green-300 font-semibold text-lg mt-1">{email}</p>
          </div>

          {/* Steps */}
          <div className="space-y-5 mb-8">
            {[
              { label: "Check your inbox", desc: "Look for an email from ExpenseTracker", color: "blue" },
              { label: "Click reset link", desc: "Follow the instructions inside", color: "purple" },
              { label: "Create new password", desc: "Set your secure password", color: "green" },
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className={`w-10 h-10 bg-${step.color}-500/20 rounded-lg flex items-center justify-center font-bold text-${step.color}-400`}>
                  {i + 1}
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">{step.label}</p>
                  <p className="text-purple-200 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Help */}
          <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-yellow-200 text-sm font-medium mb-1">Didn’t receive the email?</p>
                <p className="text-yellow-300 text-xs">
                  Check your spam folder or{' '}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-white underline font-semibold hover:text-yellow-200"
                  >
                    try again
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Back */}
          <Link
            to="/login"
            className="w-full flex items-center justify-center py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  /* --------------------------
      MAIN FORM SCREEN
  ----------------------------*/
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#070709]">

      {/* Floating lights */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full animate-pulse animation-delay-2000"></div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            `linear-gradient(#ffffff 1px, transparent 1px),
             linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 relative z-10">

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          <p className="text-purple-200 mt-2">Enter your email to get the reset link.</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-white block text-sm mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 text-white rounded-xl placeholder-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="you@example.com"
              />
            </div>

            {errors.email && (
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] active:scale-[0.97] transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Reset Link
              </>
            )}
          </button>
        </form>

        {/* Back */}
        <div className="text-center mt-8">
          <Link className="text-purple-200 hover:text-white flex items-center justify-center gap-2" to="/login">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>

        {/* INFO CARDS */}
        <div className="mt-10 space-y-4">
          {[
            {
              icon: Shield,
              color: "green",
              title: "Secure & Encrypted",
              desc: "Your email is protected with bank-level security",
            },
            {
              icon: Clock,
              color: "blue",
              title: "Quick Process",
              desc: "Reset links expire in 1 hour",
            },
            {
              icon: Sparkles,
              color: "purple",
              title: "Instant Delivery",
              desc: "Emails are delivered within seconds",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <c.icon className={`w-6 h-6 text-${c.color}-400 flex-shrink-0`} />
              <div className="ml-4">
                <p className="text-white font-medium text-sm">{c.title}</p>
                <p className="text-purple-200 text-xs">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
