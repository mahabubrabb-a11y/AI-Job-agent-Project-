'use client';

import React from 'react';
import Link from 'next/link';
import { Job } from '../../types/job';
import { Building2, MapPin, DollarSign, Clock, Sparkles } from 'lucide-react';

interface JobCardProps {
  job: Job;
  matchLevel?: 'Strong' | 'Medium' | 'Low';
  matchScore?: number;
}

export const JobCard: React.FC<JobCardProps> = ({ job, matchLevel = 'Medium', matchScore = 75 }) => {
  const getBadgeStyle = (level: string) => {
    if (level === 'Strong') return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300';
    if (level === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
              <Building2 className="w-3.5 h-3.5" /> {job.company}
            </p>
          </div>

          {/* AI Match Badge */}
          <div className="flex flex-col items-end">
            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getBadgeStyle(matchLevel)}`}>
              {matchLevel}
            </span>
            <span className="text-[10px] text-gray-400 mt-1 font-mono">{matchScore}% Match</span>
          </div>
        </div>

        {/* Job Metadata */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-300 pt-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" /> {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-gray-400" /> {job.salary}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" /> {job.type}
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 pt-1">
          {job.description}
        </p>
      </div>

      <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <span className="text-[11px] text-gray-400">{job.postedAt}</span>
        
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" /> Analyze Match
        </Link>
      </div>
    </div>
  );
};