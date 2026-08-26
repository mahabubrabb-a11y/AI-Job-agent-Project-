'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useAnalysis } from '../../hooks/useAnalysis';
import { Button } from '../../components/ui/button';
import { api } from '../../lib/axios';
import { Header } from '../../components/dashboard/Header';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Zap, 
  Lightbulb, 
  Loader2,
  ExternalLink,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Resume {
  _id: string;
  fileName: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location?: string;
  description?: string;
  sourceUrl?: string;
}

// -------------------------------------------------------------
// Live Jobs Section Component
// -------------------------------------------------------------
interface LiveJobsSectionProps {
  onSelectJobForMatch: (jobId: string) => void;
}

function LiveJobsSection({ onSelectJobForMatch }: LiveJobsSectionProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLiveJobs = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/jobs/live?page=${page}&limit=6&search=${search}`);
        setJobs(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch live jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveJobs();
  }, [page, search]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 mt-8 space-y-6 shadow-xl">
      {/* Feed Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" /> Live Job Feed
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Browse active listings and automatically select them for AI analysis.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search live jobs (e.g. React, Remote)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Job Grid / Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12 text-xs text-slate-400 gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" /> Loading live jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-xs text-slate-500">
          No live jobs found matching your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl flex flex-col justify-between hover:border-indigo-500/50 transition space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-semibold text-sm text-indigo-300 line-clamp-1">{job.title}</h3>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full shrink-0">
                    {job.location || 'Remote'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-slate-500" /> {job.company}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                {job.sourceUrl ? (
                  <a
                    href={job.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition"
                  >
                    Details <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span />
                )}
                <Button
                  onClick={() => onSelectJobForMatch(job._id)}
                  className="bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs px-3 py-1.5 h-auto rounded-lg transition"
                >
                  Match with AI
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs px-3 py-1.5 h-auto rounded-lg disabled:opacity-40"
        >
          <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Previous
        </Button>
        <span className="text-slate-400 font-medium">
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs px-3 py-1.5 h-auto rounded-lg disabled:opacity-40"
        >
          Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Main Dashboard Page
// -------------------------------------------------------------
export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [user, setUser] = useState<{ name: string; email: string; plan?: 'free' | 'pro' } | undefined>();
  
  const { analyzeJob, analysis, loading, error } = useAnalysis();

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [resumesRes, jobsRes, userRes] = await Promise.all([
          api.get('/resume'),
          api.get('/jobs'),
          api.get('/auth/me').catch(() => null)
        ]);

        setResumes(resumesRes.data.data || []);
        setJobs(jobsRes.data.data || []);
        if (userRes?.data?.user) {
          setUser(userRes.data.user);
        }
      } catch (err) {
        console.error('Failed to load dashboard dropdown data', err);
      }
    };

    fetchDropdownData();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.log('Logout API Skipped/Error');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      window.location.href = '/sign-in';
    }
  };

  const handleMatch = () => {
    if (selectedResumeId && selectedJobId) {
      analyzeJob(selectedJobId, selectedResumeId);
    }
  };

  const handleSelectJobFromFeed = (jobId: string) => {
    setSelectedJobId(jobId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* 🟢 Header Component Integration */}
      <Header 
        user={user || { name: 'User', email: 'user@example.com', plan: 'pro' }} 
        onLogout={handleLogout} 
      />

      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Top Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
              <Zap className="w-3.5 h-3.5 text-indigo-400" /> Powered by Multi-Agent Consensus AI
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Job Match <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Analyzer</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Select an uploaded resume and a target job to generate real-time AI match scoring.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Gemini AI Active
            </span>
          </div>
        </header>

        {/* Input & Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel - Selection Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              
              {/* Select Resume */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" /> Select Resume
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                >
                  <option value="">-- Choose Resume --</option>
                  {resumes.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.fileName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Job */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" /> Select Target Job
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                >
                  <option value="">-- Choose Job Position --</option>
                  {jobs.map((j) => (
                    <option key={j._id} value={j._id}>
                      {j.title} {j.company ? `(${j.company})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleMatch}
                disabled={loading || !selectedResumeId || !selectedJobId}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-medium text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing AI Match...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Analyze Match Score
                  </>
                )}
              </Button>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Dynamic Analysis Results */}
          <div className="lg:col-span-7">
            {analysis ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                
                {/* Header Score Box */}
                <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-5 rounded-xl">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Compatibility Score
                    </span>
                    <p className="text-xs text-slate-400 max-w-xs">
                      AI evaluation based on skills alignment and role qualifications.
                    </p>
                  </div>
                  
                  {/* Circular Score */}
                  <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
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
                          (analysis.matchPercentage || 0) >= 70 
                            ? "text-emerald-500" 
                            : (analysis.matchPercentage || 0) >= 50 
                            ? "text-amber-500" 
                            : "text-indigo-500"
                        }
                        strokeDasharray={`${analysis.matchPercentage || 0}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xl font-bold text-white tracking-tight">
                      {analysis.matchPercentage || 0}%
                    </span>
                  </div>
                </div>

                {/* AI Executive Summary */}
                {analysis.analysisSummary && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      AI Executive Summary
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 border border-slate-800/80 rounded-xl">
                      {analysis.analysisSummary}
                    </p>
                  </div>
                )}

                {/* Skills Grid */}
                <div className="space-y-4">
                  {/* Matching Skills */}
                  {analysis.matchingSkills && analysis.matchingSkills.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Matching Skills ({analysis.matchingSkills.length})
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.matchingSkills.map((skill: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Skills */}
                  {analysis.missingSkills && analysis.missingSkills.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Missing / Gap Skills ({analysis.missingSkills.length})
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.missingSkills.map((skill: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendations */}
                {analysis.recommendations && analysis.recommendations.length > 0 && (
                  <div className="border-t border-slate-800 pt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Strategic Action Items
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-400">
                          <ArrowRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            ) : (
              /* Empty Placeholder */
              <div className="h-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[380px]">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-indigo-400 mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-slate-300">Ready for Analysis</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Select a resume and job position from the dropdowns on the left, or pick one from the Live Job Feed below, then click "Analyze Match".
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Live Job Feed Section */}
        <LiveJobsSection onSelectJobForMatch={handleSelectJobFromFeed} />

      </div>
    </div>
  );
}