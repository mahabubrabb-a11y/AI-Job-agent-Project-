'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, ArrowUpRight, Code, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface ProfileCardProps {
  user: {
    name: string;
    title?: string;
    email: string;
    skills?: string[];
    resumeParsed?: boolean;
    lastUpdated?: string;
  };
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const defaultSkills = user.skills?.length
    ? user.skills
    : ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Express', 'MongoDB'];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Top Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{user.name}</h2>
              <ShieldCheck className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{user.title || 'Junior Software Developer'}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{user.email}</p>
          </div>
        </div>

        <Link href="/dashboard/resume">
          <Button size="sm" variant="outline" className="text-xs gap-1">
            Edit Profile <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Resume Parsing Status */}
      <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700/80 rounded-xl p-3.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-blue-600" />
          <div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user.resumeParsed ? 'ATS Resume Sync Active' : 'No Resume Uploaded'}
            </span>
            <p className="text-[10px] text-gray-400">
              {user.lastUpdated ? `Last updated: ${user.lastUpdated}` : 'Upload to start Multi-Agent analysis'}
            </p>
          </div>
        </div>
        {user.resumeParsed && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md">
            <CheckCircle2 className="w-3 h-3" /> Parsed
          </span>
        )}
      </div>

      {/* Extracted Skills */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
          <Code className="w-3.5 h-3.5 text-blue-500" /> Key Skills & Frameworks
        </div>
        <div className="flex flex-wrap gap-1.5">
          {defaultSkills.map((skill, index) => (
            <span
              key={index}
              className="text-[11px] font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 px-2.5 py-0.5 rounded-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};