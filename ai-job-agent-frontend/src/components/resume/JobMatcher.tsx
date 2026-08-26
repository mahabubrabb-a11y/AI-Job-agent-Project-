'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, CheckCircle2, AlertCircle, Lightbulb, Loader2, 
  ArrowRight, HelpCircle 
} from 'lucide-react';
import axios from 'axios';
import { api } from '../../lib/axios';
import { CoverLetterModal } from '../CoverLetterModal';
import { InterviewModal } from '../InterviewModal';
import { LiveJobsSection } from '../LiveJobsSection';

interface MatchResult {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  analysisSummary: string;
  recommendations: string[];
}

const stripHtml = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const JobMatcher: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/jobs/match', { jobDescription });
      setResult(res.data.data);
    } catch (err: unknown) {
      console.error('Matching Error:', err);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || 'Failed to match job description. Make sure you uploaded a resume.'
        );
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectJobForMatch = (desc: string) => {
    setJobDescription(stripHtml(desc));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return null;

  const matchScore = result?.matchPercentage ?? 0;

  return (
    <div className="w-full space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-base font-semibold text-slate-100">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2>AI Job Description Matcher</h2>
        </div>
        
        <p className="text-xs text-slate-400">
          Paste the target Job Description below to evaluate your resume match score in real-time.
        </p>

        <textarea
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste Job Description / Requirements here..."
          className="w-full p-4 text-xs md:text-sm border border-slate-800 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-none"
        />

        {error && (
          <div className="text-xs text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleMatch}
          disabled={loading || !jobDescription.trim()}
          className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium text-xs md:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing Fit...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze Match
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Compatibility Evaluation
              </span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl">
                {result.analysisSummary}
              </p>
            </div>

            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={
                    matchScore >= 70
                      ? 'text-emerald-500'
                      : matchScore >= 50
                      ? 'text-amber-500'
                      : 'text-indigo-500'
                  }
                  strokeDasharray={`${matchScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-2xl font-bold text-white tracking-tight">
                {matchScore}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Matching Skills ({result.matchingSkills?.length || 0})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.matchingSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <AlertCircle className="w-4 h-4" />
                Missing / Recommended Skills ({result.missingSkills?.length || 0})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.missingSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {result.recommendations?.length > 0 && (
            <div className="pt-5 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Lightbulb className="w-4 h-4 text-indigo-400" />
                AI Recommendations
              </div>
              <ul className="space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => setIsInterviewModalOpen(true)}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs md:text-sm rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              Practice AI Mock Interview
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs md:text-sm rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Generate Cover Letter & Cold Email
            </button>
          </div>

          <CoverLetterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            jobDescription={jobDescription}
          />

          <InterviewModal
            isOpen={isInterviewModalOpen}
            onClose={() => setIsInterviewModalOpen(false)}
            jobDescription={jobDescription}
          />
        </div>
      )}

      <LiveJobsSection onSelectJobForMatch={handleSelectJobForMatch} />
    </div>
  );
};