'use client';

import React from 'react';
import { useVoiceInterview } from '../../../hooks/useVoiceInterview';
import { Mic, MicOff, PhoneOff, Sparkles, Volume2, Radio } from 'lucide-react';

export default function InterviewPage() {
  const { isConnected, isMuted, isSpeaking, startSession, stopSession, toggleMute } =
    useVoiceInterview();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Voice Mock Interview</h1>
        <p className="text-sm text-gray-500">Practice live technical & behavioral questions with real-time AI audio feedback.</p>
      </div>

      {/* 🎙️ Voice Call Box */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-xs font-semibold text-gray-500">
            {isConnected ? 'Session Live' : 'Disconnected'}
          </span>
        </div>

        {/* AI Avatar Visualizer */}
        <div className="relative mb-6">
          <div
            className={`w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xl transition-transform duration-300 ${
              isSpeaking ? 'scale-105 ring-8 ring-blue-100 dark:ring-blue-900/40' : ''
            }`}
          >
            <Sparkles className="w-12 h-12" />
          </div>
          {isSpeaking && (
            <span className="absolute -bottom-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Volume2 className="w-3 h-3 animate-bounce" /> AI Speaking
            </span>
          )}
        </div>

        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
          {isConnected ? 'Senior Technical Interviewer' : 'Ready to Start Practice?'}
        </h2>
        <p className="text-xs text-gray-500 max-w-md mb-8">
          {isConnected
            ? 'Answer naturally. The AI will analyze your response, technical clarity, and tone.'
            : 'Click start below to begin a 10-minute AI voice mock interview tailored to your resume.'}
        </p>

        {/* Audio Waveform Graphic */}
        {isConnected && (
          <div className="flex items-center gap-1 h-8 mb-8">
            {[40, 75, 30, 90, 60, 100, 50, 80, 35, 65, 95, 45].map((height, i) => (
              <span
                key={i}
                style={{ height: isSpeaking ? `${height}%` : '20%' }}
                className="w-1.5 bg-blue-500 rounded-full transition-all duration-150"
              />
            ))}
          </div>
        )}

        {/* Control Action Buttons */}
        <div className="flex items-center gap-4">
          {!isConnected ? (
            <button
              onClick={startSession}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Radio className="w-4 h-4" /> Start Interview Session
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                className={`p-3.5 rounded-full border transition-colors ${
                  isMuted
                    ? 'bg-rose-100 border-rose-300 text-rose-600 dark:bg-rose-950 dark:text-rose-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={stopSession}
                className="bg-rose-600 hover:bg-rose-700 text-white p-3.5 rounded-full shadow-md transition-all hover:scale-105"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}