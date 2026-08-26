'use client';

import React from 'react';
import { Header } from '../../components/dashboard/Header'; // আপনার প্রজেক্টের হেডার ফাইলের সঠিক পাথ দিন
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // ১. লগআউট হ্যান্ডলার ফাংশন
  const handleLogout = () => {
    // লোকাল স্টোরেজ থেকে টোকেন বা ইউজার ডাটা মুছে ফেলা
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // সাইন-ইন পেজে রিডাইরেক্ট করা
    router.push('/signin');
  };

  // ডামি ইউজার ডাটা (এখানে আপনি আপনার ব্যাকএন্ড বা সেশনের রিয়েল ইউজার ডাটা বসাবেন)
  const currentUser = {
    name: 'Tarin Prosad Ghosh',
    email: 'developer@example.com',
    plan: 'pro' as const,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    
      <Header user={currentUser} onLogout={handleLogout} />

    
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}