'use client';

import React from 'react';

import { 
  Bot, 
  UserCheck, 
  Briefcase, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Compass, 
  HelpCircle 
} from 'lucide-react';

// Flexible Data Type Matching Backend Response
export interface JobAnalysisResult {
  jobTitle?: string;
  companyName?: string;
  matchScore?: number;
  matchPercentage?: number;
  atsScore?: number;
  matchLevel?: 'Strong' | 'Medium' | 'Weak' | string;
  matchingSkills?: string[];
  strengths?: string[];
  missingSkills?: string[];
  summary?: string;
  agentFeedbacks?: {
    recruiter?: string;
    atsBot?: string;
    hiringManager?: string;
  };
  roadmap?: string[];
  interviewQuestions?: string[];
  suggestedCoverLetter?: string;
}

interface AnalysisReportProps {
  data: JobAnalysisResult;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ data }) => {
  // 🔄 Standardize Backend vs UI Field Mappings
  const score = data.matchScore ?? data.matchPercentage ?? 0;
  const matchingSkillsList = data.matchingSkills || data.strengths || [];
  const missingSkillsList = data.missingSkills || [];
  
  // Calculate Match Level dynamically if not provided by backend
  const calculatedMatchLevel = data.matchLevel || (score >= 70 ? 'Strong' : score >= 40 ? 'Medium' : 'Weak');

  const getBadgeStyle = (level: string) => {
    if (level === 'Strong') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
    if (level === 'Medium') return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
    return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 📊 Header Overview Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {data.jobTitle || 'Target Position Match Analysis'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.companyName || 'AI Job Agent Intelligence'}</p>
          <span className={`inline-block mt-2 px-3 py-0.5 text-xs font-semibold rounded-full border ${getBadgeStyle(calculatedMatchLevel)}`}>
            {calculatedMatchLevel} Match
          </span>
        </div>

        <div className="flex gap-6 items-center border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 border-gray-100 dark:border-gray-700 w-full md:w-auto justify-around">
          <div className="text-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Job Match</span>
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{score}%</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider block">ATS Score</span>
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{data.atsScore ?? score}/100</span>
          </div>
        </div>
      </div>

      {/* 🤖 Consensus Analysis / Summary */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" /> AI Executive Summary
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          {data.summary || "Full evaluation completed based on parsed resume metrics and target job requirements."}
        </p>
      </div>

      {/* 🤖 Multi-AI Agent Feedback Cards (Rendered conditionally if data exists) */}
      {data.agentFeedbacks && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" /> Multi-Agent Consensus Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.agentFeedbacks.recruiter && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  <UserCheck className="w-4 h-4" /> Recruiter Perspective
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.agentFeedbacks.recruiter}
                </p>
              </div>
            )}

            {data.agentFeedbacks.atsBot && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <Bot className="w-4 h-4" /> ATS Bot Scanner
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.agentFeedbacks.atsBot}
                </p>
              </div>
            )}

            {data.agentFeedbacks.hiringManager && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                  <Briefcase className="w-4 h-4" /> Hiring Manager
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.agentFeedbacks.hiringManager}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ⚠️ Missing Skills & Strengths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Missing Skills */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-rose-600 dark:text-rose-400 text-sm mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Missing Skills / Gaps
          </h4>
          <div className="flex flex-wrap gap-2">
            {missingSkillsList.length > 0 ? (
              missingSkillsList.map((skill, index) => (
                <span key={index} className="bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs px-2.5 py-1 rounded-md font-medium">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-gray-400">No major skill gaps identified!</p>
            )}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Matching Strengths
          </h4>
          <div className="flex flex-wrap gap-2">
            {matchingSkillsList.length > 0 ? (
              matchingSkillsList.map((skill, index) => (
                <span key={index} className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs px-2.5 py-1 rounded-md font-medium">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-gray-400">No specific matching skills found.</p>
            )}
          </div>
        </div>
      </div>

      {/* 🗺️ Roadmap & Interview Questions */}
      {(data.roadmap?.length || data.interviewQuestions?.length || data.suggestedCoverLetter) && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
          {/* Roadmap */}
          {data.roadmap && data.roadmap.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" /> Personal Action Roadmap
              </h4>
              <ul className="space-y-2">
                {data.roadmap.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-blue-600">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interview Questions */}
          {data.interviewQuestions && data.interviewQuestions.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600" /> Expected Interview Questions
              </h4>
              <div className="space-y-2">
                {data.interviewQuestions.map((q, idx) => (
                  <div key={idx} className="text-xs text-gray-700 dark:text-gray-300 bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/40">
                    ❓ {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Cover Letter */}
          {data.suggestedCoverLetter && (
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Tailored Cover Letter Draft
              </h4>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border text-xs text-gray-600 dark:text-gray-300 font-mono whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                {data.suggestedCoverLetter}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};