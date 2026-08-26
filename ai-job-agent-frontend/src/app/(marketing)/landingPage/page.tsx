'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Bot, ShieldCheck, ArrowRight, Code2, Cpu, LineChart } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { PricingTable } from '../../(marketing)/marketing/PricingTable';

export default function MarketingLandingPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Career Assistant for Developers
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          Automate Your Developer Job Search with <span className="text-blue-600">Multi-Agent AI</span>
        </h1>

        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Upload your resume, match skills against real software engineering jobs, get feedback from virtual hiring managers, and master voice mock interviews.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <Link href="/sign-up">
            <Button size="lg" className="shadow-md">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </Link>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-xl w-fit">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Multi-Agent System</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Simulates a full recruitment committee: ATS Parser, Tech Recruiter, and Senior Engineering Manager.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
          <div className="p-2.5 bg-purple-50 dark:bg-purple-950/50 text-purple-600 rounded-xl w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Voice Mock Interview</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Practice real-time technical questions with interactive voice responses and instant answer evaluation.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 rounded-xl w-fit">
            <LineChart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Skill Gap Roadmap</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Get an actionable learning roadmap targeting missing frameworks and concepts for your target role.
          </p>
        </div>
      </section>

      {/* Pricing Component Embedded */}
      <PricingTable />
    </div>
  );
}