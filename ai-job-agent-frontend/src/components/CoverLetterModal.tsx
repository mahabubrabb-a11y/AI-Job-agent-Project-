'use client';

import React, { useState } from 'react';
import { Mail, FileText, Copy, Check, Sparkles, Loader2, X } from 'lucide-react';
import { api } from '../lib/axios';
import { useUserStore } from '../store/useUserStore';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobDescription: string;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({
  isOpen,
  onClose,
  jobDescription,
}) => {
  const [activeTab, setActiveTab] = useState<'coverLetter' | 'coldEmail'>('coverLetter');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    coverLetter: string;
    coldEmail: { subject: string; body: string };
  } | null>(null);

  const skills = useUserStore((state) => state.skills);
  const resumeText = useUserStore((state) => state.resumeText);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await api.post('/cover-letter/generate', {
        jobDescription,
        skills,
        resumeText,
      });

      if (response.data?.success) {
        setResult(response.data.data);
      }
    } catch (err) {
      console.error('Failed to generate cover letter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">AI Cover Letter & Cold Email Generator</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!result && !loading && (
          <div className="py-12 text-center space-y-4">
            <p className="text-slate-300 text-sm">
              Generate a personalized cover letter and cold email based on your CV and the job description.
            </p>
            <button
              onClick={handleGenerate}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white flex items-center gap-2 mx-auto transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Generate Content Now
            </button>
          </div>
        )}

        {loading && (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-300">
              Crafting tailored cover letter & email with Gemini AI...
            </p>
          </div>
        )}

        {result && (
          <div className="mt-4 space-y-4">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('coverLetter')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'coverLetter'
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                <FileText className="w-4 h-4" /> Cover Letter
              </button>
              <button
                onClick={() => setActiveTab('coldEmail')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'coldEmail'
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                <Mail className="w-4 h-4" /> Cold Email
              </button>
            </div>

            {/* Display Area */}
            <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-800/80 max-h-96 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              <button
                onClick={() =>
                  handleCopy(
                    activeTab === 'coverLetter'
                      ? result.coverLetter
                      : `Subject: ${result.coldEmail.subject}\n\n${result.coldEmail.body}`
                  )
                }
                className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 text-xs flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>

              {activeTab === 'coverLetter' ? (
                <div>{result.coverLetter}</div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <span className="text-indigo-400 font-bold">Subject: </span>
                    {result.coldEmail.subject}
                  </div>
                  <hr className="border-slate-800" />
                  <div>{result.coldEmail.body}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};