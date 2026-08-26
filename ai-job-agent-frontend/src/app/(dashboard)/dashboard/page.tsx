export const dynamic = 'force-dynamic';

'use client';

import { FileDropzone } from '../../../components/resume/FileDropzone';
import { JobMatcher } from '../../../components/resume/JobMatcher';
import { useUserStore } from '../../../store/useUserStore';
import { Sparkles, Check, Zap } from 'lucide-react';

export default function DashboardPage() {
  const skills = useUserStore((state) => state.skills);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <Zap className="w-4 h-4" /> AI ATS Engine
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Job Agent Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Upload your CV and start analyzing live job matches in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Gemini AI Active
            </span>
          </div>
        </header>

        {/* CV Upload Section */}
        <FileDropzone />

        {/* Extracted Skills Section */}
        {skills?.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h2 className="font-semibold text-slate-200 text-sm tracking-wide uppercase">
                  Extracted Skills ({skills.length})
                </h2>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-300 border border-slate-700/60 text-xs px-3 py-1.5 rounded-lg font-medium"
                >
                  <Check className="w-3.5 h-3.5 text-indigo-400" /> {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Job Matcher Component */}
        <JobMatcher />
      </div>
    </div>
  );
}