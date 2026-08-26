'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '../../../lib/axios';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });

      // 🔑 LocalStorage-
      const token = res.data.token || res.data.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      // 🚀 Dashboard-
      router.push('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#070A12] text-slate-100 overflow-hidden px-4 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ================= BACKGROUND GLOW LIGHT EFFECTS ================= */}
      {/* 1. Main Glow behind Login Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-purple-600/25 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 2. Top Secondary Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[200px] bg-blue-500/10 blur-[100px] pointer-events-none z-0" />

      {/* 3. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Header Logo */}
      <Link href="/" className="relative z-10 flex items-center gap-2.5 mb-8 group">
        <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] group-hover:scale-105 transition-transform">
          <Sparkles className="w-6 h-6" />
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
          AI JobAgent
        </span>
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/90 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        
        {/* Internal Glow Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to access your AI Career Dashboard
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}