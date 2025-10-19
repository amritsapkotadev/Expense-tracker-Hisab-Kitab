import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp, Shield, Zap, BarChart3, Smartphone, Users, Check, Star, Target } from 'lucide-react';

const Welcome = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "AI-powered insights into your spending patterns"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is encrypted and secure"
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Access your data anywhere, anytime"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Works perfectly on all your devices"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "$10M+", label: "Managed" },
    { number: "4.9★", label: "Rating" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-300 rounded-full opacity-40 animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-30 animate-bounce animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Hisab Kitab</h1>
              <p className="text-purple-200 text-sm">Smart Finance</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Join 50,000+ smart savers</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Take Control of Your
              <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent block">
                Financial Future
              </span>
            </h1>

            <p className="text-xl text-purple-200 leading-relaxed">
              Transform how you manage money with AI-powered insights, beautiful dashboards, and effortless expense tracking. Start your journey towards financial freedom today.
            </p>

            {/* Key Benefits */}
            <div className="space-y-3">
              {[
                "AI-powered spending categorization",
                "Real-time budget tracking",
                "Custom financial reports",
                "Multi-device synchronization"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-purple-200">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/login"
                className="group border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Sign In to Account
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-purple-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-purple-200 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-1 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Loved by Thousands</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Freelance Designer",
                text: "Hisab Kitab helped me save 40% more by identifying unnecessary subscriptions I didn't even remember having!"
              },
              {
                name: "Mike Rodriguez",
                role: "Small Business Owner",
                text: "The AI insights transformed how I manage business expenses. We've cut costs by 25% in just 3 months."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 rounded-2xl p-6 border border-white/10">
                <p className="text-purple-200 italic mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-purple-300 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <Target className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Finances?</h2>
          <p className="text-purple-200 text-lg mb-6">
            Join thousands of users who have already taken control of their financial future.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Journey Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Hisab Kitab</h1>
                <p className="text-purple-200 text-sm">Smart Finance Management</p>
              </div>
            </div>
            <div className="text-purple-300 text-sm">
              © 2024 Hisab Kitab. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;