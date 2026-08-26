'use client';

import React, { useState } from 'react';
import { 
  Check, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free Starter',
      description: 'Essential tools to start optimizing your job applications.',
      price: { monthly: 0, yearly: 0 },
      features: [
        '3 CV Uploads & Parsings',
        'Basic Job Match Analysis',
        'Standard Resume Templates',
        'Community Support'
      ],
      current: true,
      buttonText: 'Current Plan',
      buttonVariant: 'outline'
    },
    {
      name: 'Pro Career',
      description: 'Best for active job hunters looking to pass ATS filters fast.',
      price: { monthly: 19, yearly: 15 },
      popular: true,
      features: [
        'Unlimited CV Uploads & Analysis',
        'Multi-Agent Review (Recruiter + ATS + Hiring Mgr)',
        '30 Mins AI Voice Mock Interview / Month',
        'ATS Keyword Gap Identification',
        'Tailored Cover Letter Generator',
        'Priority Customer Support'
      ],
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'primary'
    },
    {
      name: 'Enterprise / Unlimited',
      description: 'Complete career acceleration package with unlimited voice interviews.',
      price: { monthly: 49, yearly: 39 },
      features: [
        'Everything in Pro',
        'Unlimited AI Voice Mock Interviews',
        '1-on-1 Portfolio & GitHub Review AI',
        'Direct Application Tracking Dashboard',
        'Dedicated Career Coach Agent'
      ],
      buttonText: 'Go Unlimited',
      buttonVariant: 'secondary'
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Flexible Pricing for Your Career Growth
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Supercharge your interview prep and CV optimization with AI multi-agent insights.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors relative"
          >
            <div className={`w-4 h-4 bg-blue-600 rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs font-semibold ${billingCycle === 'yearly' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
            Yearly Billing <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold ml-1">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow ${
              plan.popular 
                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" /> Most Popular
              </span>
            )}

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 min-h-[32px]">{plan.description}</p>

              {/* Price Display */}
              <div className="my-6">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400"> / month</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-700 mb-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <button
              disabled={plan.current}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                plan.current
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : plan.buttonVariant === 'primary'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:scale-[1.02]'
                  : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90'
              }`}
            >
              {plan.buttonText}
              {!plan.current && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        ))}
      </div>

      {/* Credit & Payment Status Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">Payment Methods & Credits</h4>
            <p className="text-xs text-gray-500">You currently have <strong>3 AI Resume Analyses</strong> remaining this month.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Secure Stripe Checkout
          </span>
        </div>
      </div>
    </div>
  );
}