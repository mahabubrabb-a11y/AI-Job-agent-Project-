'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, X, Send, Award, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { api } from '../lib/axios';
import { useUserStore } from '../store/useUserStore';

interface Question {
  id: number;
  question: string;
  category: string;
}

interface Evaluation {
  score: number;
  feedback: string;
  improvement: string;
  sampleAnswer: string;
}

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobDescription: string;
}

export const InterviewModal: React.FC<InterviewModalProps> = ({
  isOpen,
  onClose,
  jobDescription,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const skills = useUserStore((state) => state.skills);
  const resumeText = useUserStore((state) => state.resumeText);

  if (!isOpen) return null;

  // ১. প্রশ্ন জেনারেট করা
  const handleStartInterview = async () => {
    setLoadingQuestions(true);
    try {
      const response = await api.post('/interview/generate-questions', {
        jobDescription,
        skills,
        resumeText,
      });

      if (response.data?.success) {
        setQuestions(response.data.data);
        setCurrentIndex(0);
        setEvaluation(null);
      }
    } catch (err) {
      console.error('Failed to generate interview questions:', err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // ২. উত্তর মূল্যায়ন করা
  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;

    setEvaluating(true);
    try {
      const response = await api.post('/interview/evaluate-answer', {
        question: questions[currentIndex].question,
        userAnswer,
        jobDescription,
      });

      if (response.data?.success) {
        setEvaluation(response.data.data);
      }
    } catch (err) {
      console.error('Failed to evaluate answer:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setEvaluation(null);
    setUserAnswer('');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">AI Mock Interview Practice</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Start State */}
        {questions.length === 0 && !loadingQuestions && (
          <div className="py-12 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-indigo-400 mx-auto opacity-80" />
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Ready to practice? Gemini AI will generate 5 tailored technical & behavioral questions based on this Job Description and your profile.
            </p>
            <button
              onClick={handleStartInterview}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white flex items-center gap-2 mx-auto transition-all"
            >
              <Sparkles className="w-4 h-4" /> Start Interview Session
            </button>
          </div>
        )}

        {/* Loading Questions State */}
        {loadingQuestions && (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-300">Generating tailored interview questions...</p>
          </div>
        )}

        {/* Question & Practice State */}
        {questions.length > 0 && (
          <div className="mt-4 space-y-4">
            {/* Progress & Category */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800/50">
                Question {currentIndex + 1} of {questions.length} ({questions[currentIndex]?.category})
              </span>
            </div>

            {/* Question Display */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200 text-base font-medium">
              {questions[currentIndex]?.question}
            </div>

            {/* Answer Input Area (if evaluation not done yet) */}
            {!evaluation && (
              <div className="space-y-3">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your response here... (Be as detailed as possible)"
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
                <button
                  onClick={handleSubmitAnswer}
                  disabled={evaluating || !userAnswer.trim()}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all"
                >
                  {evaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Evaluating Answer...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Answer for Feedback
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Evaluation Result Area */}
            {evaluation && (
              <div className="space-y-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800 max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-white">AI Evaluation Score:</span>
                  </div>
                  <span className="text-lg font-black text-amber-400">{evaluation.score} / 10</span>
                </div>

                <div className="space-y-2 text-xs leading-relaxed">
                  <div>
                    <span className="text-indigo-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Feedback:
                    </span>
                    <p className="text-slate-300 mt-1">{evaluation.feedback}</p>
                  </div>

                  <div>
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Key Improvement:
                    </span>
                    <p className="text-slate-300 mt-1">{evaluation.improvement}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-emerald-400 font-semibold">Ideal Sample Answer:</span>
                    <p className="text-slate-400 mt-1 italic">{evaluation.sampleAnswer}</p>
                  </div>
                </div>

                {/* Navigation Button */}
                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 font-medium text-xs text-white transition-all"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-medium text-xs text-white transition-all"
                  >
                    Finish Interview Practice
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};