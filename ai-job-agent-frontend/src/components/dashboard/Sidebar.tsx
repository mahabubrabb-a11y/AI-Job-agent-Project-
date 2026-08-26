'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Briefcase, Mic, CreditCard, Sparkles } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Resume', href: '/resume', icon: FileText },
  { name: 'Job Feed', href: '/jobs', icon: Briefcase },
  { name: 'Mock Interview', href: '/interview', icon: Mic },
  { name: 'Billing', href: '/billing', icon: CreditCard },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#070A12] border-r border-slate-800/80 min-h-screen p-4 flex flex-col justify-between hidden md:flex text-slate-100 selection:bg-blue-600 selection:text-white relative z-20 overflow-hidden">
      
      {/* ================= BACKGROUND SOFT GLOW LIGHTS ================= */}
      {/* 1. Top Logo Glow Light */}
      <div className="absolute -top-10 -left-10 w-44 h-44 bg-blue-600/15 blur-[60px] rounded-full pointer-events-none z-0" />
      
      {/* 2. Middle Navigation Glow Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 blur-[70px] rounded-full pointer-events-none z-0" />
      
      {/* 3. Bottom Card Glow Light */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/15 blur-[60px] rounded-full pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="space-y-6 relative z-10">
        
        {/* Logo with Soft Light Backdrop */}
        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-900/40 transition-colors">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
            AI JobAgent
          </span>
        </Link>

        {/* Navigation Links with Text & Hover Glow */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600/20 border border-blue-500/40 text-blue-300 shadow-[0_0_20px_rgba(37,99,235,0.25)] backdrop-blur-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]'
                }`}
              >
                {/* Active Indicator Light Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-400 rounded-r-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                )}

                <Icon 
                  className={`w-4 h-4 transition-colors ${
                    isActive 
                      ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]' 
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`} 
                />
                
                <span className={isActive ? 'drop-shadow-[0_0_10px_rgba(147,197,253,0.3)]' : ''}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Upgrade / Plan Card with Radial Glow */}
      <div className="relative z-10 p-4 bg-slate-900/60 backdrop-blur-lg rounded-xl border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.12)] overflow-hidden">
        {/* Internal Soft Glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
          </span>
          <p className="text-xs font-bold text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Junior Developer Plan
          </p>
        </div>
        
        <p className="text-[11px] text-blue-400 font-medium tracking-wide">
          3 Analyses Remaining
        </p>
      </div>
    </aside>
  );
};