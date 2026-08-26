import React from 'react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-center space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Simple, Transparent Pricing</h1>
      <p className="text-xs text-gray-500">Choose the plan that fits your job preparation needs.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="p-6 bg-white dark:bg-gray-800 border rounded-2xl space-y-4">
          <h2 className="font-bold text-lg">Starter</h2>
          <p className="text-xs text-gray-400">For developers starting their job hunt.</p>
          <p className="text-3xl font-extrabold">$0</p>
          <Link href="/sign-up" className="block text-center bg-gray-100 dark:bg-gray-700 text-xs font-bold py-2 rounded-xl">
            Get Started Free
          </Link>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-2xl space-y-4">
          <h2 className="font-bold text-lg">Pro Agent</h2>
          <p className="text-xs text-gray-400">For developers serious about landing a job fast.</p>
          <p className="text-3xl font-extrabold">$19 <span className="text-xs text-gray-400">/mo</span></p>
          <Link href="/sign-up" className="block text-center bg-blue-600 text-white text-xs font-bold py-2 rounded-xl">
            Start 7-Day Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}