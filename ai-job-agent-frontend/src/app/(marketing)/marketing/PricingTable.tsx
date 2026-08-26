'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../../../../src/components/ui/button';

export const PricingTable = () => {
  return (
    <section className="py-12 max-w-5xl mx-auto px-6">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
        <p className="text-xs text-gray-500">Choose the right plan to accelerate your developer job search.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Plan */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Free Starter</h3>
              <p className="text-xs text-gray-500 mt-1">Essential tools for testing your resume fit.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">$0</span>
              <span className="text-xs text-gray-400">/ forever</span>
            </div>
            <ul className="text-xs space-y-2.5 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> 3 AI Resume Parsing Credits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> Standard Job Match Score
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> 1 AI Voice Mock Interview (5 mins)
              </li>
            </ul>
          </div>
          <Link href="/sign-up">
            <Button variant="outline" className="w-full">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl p-6 space-y-6 flex flex-col justify-between shadow-lg relative">
          <div className="absolute -top-3.5 right-6 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3" /> MOST POPULAR
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Pro Developer</h3>
              <p className="text-xs text-gray-500 mt-1">Full AI power to land software roles faster.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">$19</span>
              <span className="text-xs text-gray-400">/ month</span>
            </div>
            <ul className="text-xs space-y-2.5 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> Unlimited Resume Uploads & ATS Optimization
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> Multi-Agent Consensus Feedback (Recruiter, ATS, Manager)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> Unlimited Live AI Voice Mock Interviews
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> Tailored Skill Gap Learning Roadmap
              </li>
            </ul>
          </div>
          <Link href="/sign-up">
            <Button variant="primary" className="w-full">
              Upgrade to Pro
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};