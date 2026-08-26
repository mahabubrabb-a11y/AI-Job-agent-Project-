'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Building2, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { api } from '../lib/axios';

export interface Job {
  _id?: string;
  id?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url?: string;
  applyUrl?: string;  // <--- Backend schema match
  sourceUrl?: string; // <--- Backend schema match
  postedAt?: string;
}

interface LiveJobsSectionProps {
  onSelectJobForMatch: (jobDescription: string) => void;
}

// HTML tags মুছে ফেলার হেলপার ফাংশন
const stripHtml = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const LiveJobsSection: React.FC<LiveJobsSectionProps> = ({ onSelectJobForMatch }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/jobs/live?page=1&limit=10');
      const jobsData = res.data.data || res.data.jobs || res.data || [];
      setJobs(jobsData);
    } catch (err: unknown) {
      console.error('Failed to fetch live jobs:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Unable to load live jobs.');
      } else {
        setError('Failed to load jobs from server.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveJobs();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-semibold text-slate-100">Live Available Jobs</h3>
        </div>
        <button
          onClick={fetchLiveJobs}
          disabled={loading}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all cursor-pointer"
          title="Refresh Jobs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-40 bg-slate-950/60 rounded-xl animate-pulse border border-slate-800/50" />
          ))}
        </div>
      ) : error ? (
        <div className="text-xs text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
          {error}
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-xs text-slate-400">No live jobs found at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job, index) => {
            const cleanDescription = stripHtml(job.description);
            // url, applyUrl অথবা sourceUrl যেকোনো একটি থাকলে সেটা লিঙ্ক হিসেবে কাজ করবে
            const targetLink = job.url || job.applyUrl || job.sourceUrl;

            return (
              <div
                key={job._id || job.id || index}
                className="bg-slate-950 border border-slate-800/80 hover:border-indigo-500/40 p-4 rounded-xl flex flex-col justify-between gap-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-slate-100 line-clamp-1">{job.title}</h4>
                    {targetLink && (
                      <a
                        href={targetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-indigo-400 transition-colors shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    {job.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {job.company}
                      </span>
                    )}
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cleanDescription}
                  </p>
                </div>

                {/* Action Buttons Section */}
                <div className="space-y-2 pt-2 border-t border-slate-900">
                  <button
                    onClick={() => onSelectJobForMatch(cleanDescription)}
                    className="w-full py-2 bg-slate-900 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Analyze Match with Resume
                  </button>

                  {targetLink ? (
                    <a
                      href={targetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 text-center block"
                    >
                      <ExternalLink className="w-3.5 h-3.5 inline" />
                      Apply on Official Site
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 bg-slate-800 text-slate-500 rounded-lg text-xs font-medium text-center cursor-not-allowed"
                    >
                      Link Unavailable
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};