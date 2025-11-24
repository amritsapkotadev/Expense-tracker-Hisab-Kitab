// -----------------------------------------------------------------------------------
//     WELCOME PAGE — PREMIUM AQUA + VIOLET THEME (Glassmorphism + Neon Accents)
// -----------------------------------------------------------------------------------

import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, BarChart3, Shield, Zap, Sparkles } from "lucide-react";

const features = [
  {
    Icon: BarChart3,
    title: "AI Insights",
    desc: "Instant expense analysis for smart decision-making",
  },
  {
    Icon: Shield,
    title: "Secure Vault",
    desc: "End-to-end encryption keeps your data safe",
  },
  {
    Icon: Zap,
    title: "Realtime Sync",
    desc: "Effortless multi-device synchronization",
  },
];

const Welcome = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0f29] via-[#121d3f] to-[#1f0f4a] text-white">

      {/* Floating Neon Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/40 blur-[140px] animate-pulse"></div>
        <div className="absolute top-20 right-0 w-80 h-80 bg-violet-600/40 blur-[140px] animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-fuchsia-500/30 blur-[140px] animate-pulse animation-delay-3000"></div>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl">Hisab Kitab</h1>
            <p className="text-cyan-200 text-sm">Track • Save • Grow</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/login" className="text-cyan-200 hover:text-white transition font-medium">
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-fuchsia-600 rounded-xl font-semibold shadow-xl shadow-cyan-500/30 hover:scale-105 transition"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center z-10">

        {/* LEFT CONTENT */}
        <section>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Your Money, <br />
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              Under Control
            </span>
          </h1>

          <p className="mt-6 text-lg text-cyan-200 max-w-xl">
            A powerful, secure, and beautifully modern finance tracker that helps you
            understand your spending and improve your financial habits.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-7 py-3 rounded-xl font-semibold shadow-xl hover:scale-105 transition-all"
            >
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-white/20 px-7 py-3 rounded-xl text-white hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:bg-white/20 transition duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-xl flex items-center justify-center">
                    <f.Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-sm text-cyan-200">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT SIDE — Stats Card */}
        <aside className="hidden lg:flex justify-center">
          <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-3xl border border-white/20 shadow-2xl w-full max-w-md">

            <p className="text-cyan-200 text-sm mb-4">
              Trusted by users worldwide for clarity & financial empowerment.
            </p>

            <div className="grid grid-cols-2 gap-5">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                <p className="text-3xl font-extrabold">4.9★</p>
                <p className="text-sm text-cyan-200">User Rating</p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                <p className="text-3xl font-extrabold">₹25k+</p>
                <p className="text-sm text-cyan-200">Tracked</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-fuchsia-300" />
              <p className="text-cyan-200 text-sm">
                Experience finance tracking like never before.
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-cyan-300 relative z-10">
        © {new Date().getFullYear()} Hisab Kitab — Designed with 💙 + 💜
      </footer>
    </div>
  );
};

export default Welcome;
