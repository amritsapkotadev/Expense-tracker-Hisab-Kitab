import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  Sparkles,
  DollarSign,
  PieChart,
  Wallet,
  Globe,
  Lock,
  ChevronRight,
} from "lucide-react";



export default function Welcome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27] text-white">

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-[550px] h-[550px] bg-fuchsia-500/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[110px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="fixed inset-0 -z-10 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0E27]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-40 rounded-2xl scale-110 group-hover:scale-125 transition"></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-2xl relative group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Hisab Kitab</h1>
              <p className="text-cyan-400/80 text-xs font-medium">Track • Save • Grow</p>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl text-cyan-200 hover:text-white hover:bg-white/5 transition font-medium border border-transparent hover:border-white/10"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="group relative px-6 py-2.5 rounded-xl font-semibold text-white overflow-hidden
              bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
              hover:shadow-xl hover:brightness-110 transition-all duration-300"
            >
              <span className="relative flex items-center gap-2">
                Get Started
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-cyan-500/20 backdrop-blur-sm mb-8 group hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-200 font-medium">AI-Powered Financial Intelligence</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
              Master Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-pulse">
              Money Flow
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            The most intelligent expense tracker with <span className="text-cyan-400 font-semibold">real-time insights</span>,
            <span className="text-violet-400 font-semibold"> predictive analytics</span>, and
            <span className="text-fuchsia-400 font-semibold"> military-grade security</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            
            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl font-bold text-lg
              bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-cyan-400/50
              backdrop-blur-sm transition-all duration-300 min-w-[240px] text-center
              hover:shadow-xl hover:shadow-white/10"
            >
              Watch Demo
            </Link>
          </div>
          
          <div className="mt-20">
            
          </div>
          
        </div>

        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 border border-cyan-500/20 backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances smarter with Hisab Kitab.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-xl text-white
            bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
            hover:shadow-2xl hover:brightness-110 transition-all duration-300"
          >
            Start Your Journey
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 bg-[#0A0E27]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Hisab Kitab. Built with ❤️ for better financial futures.
          </p>
        </div>
      </footer>
    </div>
  );
}