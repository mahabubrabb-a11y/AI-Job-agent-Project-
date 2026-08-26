'use client';

import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#070A12] border-t border-slate-800/80 py-6 text-center text-xs relative overflow-hidden z-20">
      
      {/* Background Soft Ambient Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-10 bg-blue-500/10 blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center relative z-10">
        <p className="text-slate-400 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(96,165,250,0.15)]">
          © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">AI JobAgent</span>. Powered by Multi-Agent AI System.
        </p>
      </div>
    </footer>
  );
};