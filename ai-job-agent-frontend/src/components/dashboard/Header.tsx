'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles, User, LogOut, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { api } from '../../lib/axios'; // আপনার Axios Instance

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    plan?: 'free' | 'pro';
  };
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  
  // 🟢 প্রপার লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    try {
      if (onLogout) onLogout();
      await api.post('/auth/logout');
    } catch (err) {
      console.log('Logout API call complete/skipped');
    } finally {
      // ১. ডাটা ক্লিয়ার
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();

      // ২. মেমোরি ক্লিয়ার করে Sign-in পেজে নিয়ে যাওয়া (ব্যাক বাটন সম্পূর্ণ বন্ধ হবে)
      window.location.href = '/sign-in';
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-72">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs, skills, or applications..."
          className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 rounded-lg outline-none text-gray-900 dark:text-gray-100 transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Subscription Plan Badge */}
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border',
            user?.plan === 'pro'
              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300'
              : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
          )}
        >
          <Sparkles className="w-3 h-3 text-blue-500" />
          <span>{user?.plan === 'pro' ? 'Pro Member' : 'Free Plan'}</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-1.5 right-1.5" />
        </button>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 outline-none">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.slice(0, 2).toUpperCase() || 'DEV'
              )}
            </div>
          </button>

          {/* Quick Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user?.name || 'Developer'}</p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email || 'dev@example.com'}</p>
            </div>
            <Link
              href="/dashboard/resume"
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <User className="w-3.5 h-3.5" /> Profile & Resume
            </Link>
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <Settings className="w-3.5 h-3.5" /> Billing Settings
            </Link>
            
            {/* 🟢 Sign Out Button Update */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left border-t border-gray-100 dark:border-gray-700 mt-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};