 'use client';



import React from 'react';

import Link from 'next/link';

import { Sparkles, ArrowRight } from 'lucide-react';



export const Navbar = () => {

  return (

    <nav className="w-full bg-[#070A12] border-b border-slate-800/80 px-6 py-4 flex items-center justify-between text-slate-100 backdrop-blur-md relative z-30">

     

      {/* Ambient Top Glow */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-12 bg-blue-500/10 blur-xl pointer-events-none" />



      {/* Logo Section */}

      <Link href="/" className="flex items-center gap-2.5 relative z-10 group">

        <div className="p-2 bg-blue-600 rounded-xl text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] group-hover:scale-105 transition-transform">

          <Sparkles className="w-5 h-5" />

        </div>

        <span className="font-extrabold text-lg text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">

          AI JobAgent

        </span>

      </Link>



      {/* Navigation Buttons */}

      <div className="flex items-center gap-5 relative z-10">

        <Link

          href="/sign-in"

          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"

        >

          Sign In

        </Link>

        <Link

          href="/sign-up"

          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] hover:scale-105"

        >

          Get Started <ArrowRight className="w-3.5 h-3.5" />

        </Link>

      </div>

    </nav>

  );

};