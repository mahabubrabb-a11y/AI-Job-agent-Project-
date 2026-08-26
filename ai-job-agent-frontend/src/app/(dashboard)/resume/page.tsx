'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
 import { useUserStore } from '../../../store/useUserStore';

export default function ResumePage() {
  const { resumeText, setResumeText } = useUserStore();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setTimeout(() => {
      setResumeText(
        `Parsed content for: ${file.name}\n\nSkills: React, Node.js, TypeScript, Next.js, Express.js\nExperience: Junior Developer with MERN stack expertise.`
      );
      setUploading(false);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Resume Management</h1>
        <p className="text-xs text-gray-500">Upload your PDF/DOCX resume for AI skill extraction and ATS matching.</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center bg-white dark:bg-gray-800 space-y-3">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {uploading ? 'Processing PDF...' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-gray-400">PDF, DOCX up to 10MB</p>
        </div>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors"
        >
          Select Resume File
        </label>
      </div>

      {resumeText && (
        <div className="bg-white dark:bg-gray-800 border rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <CheckCircle className="w-4 h-4" /> Extracted Resume Content
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={8}
            className="w-full text-xs p-3 bg-gray-50 dark:bg-gray-900 border rounded-xl outline-none font-mono"
          />
        </div>
      )}
    </div>
  );
}