'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { Bot, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 overflow-hidden font-sans relative selection:bg-blue-600 selection:text-white">
      
      {/* ================= BACKGROUND GLOW LIGHT EFFECTS ================= */}
      {/* 1. Main Text Backdrop Soft Radial Glow  */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-purple-600/30 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* 2. Top Secondary Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[250px] bg-blue-500/10 blur-[100px] pointer-events-none z-0" />

      {/* 3. Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Navbar Component */}
      <div className="relative z-10 border-b border-slate-800/80 backdrop-blur-md">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-6 py-16 text-center space-y-8 flex flex-col items-center justify-center">
        
        {/* Glow Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-blue-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" /> Powered by Multi-Agent Consensus AI
        </div>

        {/* Heading with Glowing Gradient Text */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white max-w-3xl leading-tight tracking-tight">
          Land Your Next Software Role with{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(96,165,250,0.4)]">
            AI Career Automation
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-slate-400 max-w-xl font-normal leading-relaxed">
          Upload your resume, match skills with target jobs, get multi-agent feedback, and practice real-time AI voice mock interviews.
        </p>

        {/* CTA Button with Glow */}
        <div className="flex gap-4 pt-2">
          <Link
            href="/dashboard"
            className="group relative bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-7 py-3.5 rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.5)] flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(37,99,235,0.7)]"
          >
            Launch Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 w-full text-left">
          
          {/* Card 1 */}
          <div className="group bg-slate-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Multi-Agent Feedback</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Get instant insights from Recruiter, ATS, and Hiring Manager agents.</p>
          </div>

          {/* Card 2 */}
          <div className="group bg-slate-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">ATS Gap Analysis</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Identify missing keywords and technology gaps before applying.</p>
          </div>

          {/* Card 3 */}
          <div className="group bg-slate-900/50 backdrop-blur-md p-5 rounded-2xl border border-slate-800 hover:border-purple-500/40 shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">AI Voice Interview</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Practice mock interviews live with an AI audio system.</p>
          </div>

        </div>
      </main>

      {/* Footer Component */}
      <div className="relative z-10 border-t border-slate-800/60 backdrop-blur-md">
        <Footer />
      </div>

    </div>
  );
}