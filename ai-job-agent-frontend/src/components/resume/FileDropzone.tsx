'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { api } from '../../lib/axios';
import { useUserStore } from '../../store/useUserStore';

export const FileDropzone = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const setResumeText = useUserStore((state) => state.setResumeText);
  const setSkills = useUserStore((state) => state.setSkills);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const formData = new FormData();
   
    formData.append('file', file);

    try {
      const res = await api.post('/resume/upload', formData);

      
      const savedData = res.data?.data;
      const extractedText = savedData?.extractedText;
      const skills = savedData?.parsedData?.skills || [];

      if (setSkills) setSkills(skills);
      if (setResumeText) setResumeText(extractedText);
      
      console.log('Upload Successful!', savedData);
    } catch (err: any) {
      console.error('Status:', err.response?.status);
      console.error('Error Data:', err.response?.data);
      console.error('Message:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center bg-slate-900/60 hover:bg-slate-900 hover:border-indigo-500/50 transition-all duration-200">
        <input
          type="file"
          accept=".pdf"
          id="resume-input"
          className="hidden"
          onChange={handleFileUpload}
        />
        <label htmlFor="resume-input" className="cursor-pointer flex flex-col items-center justify-center space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-3 py-2">
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
              <p className="text-sm font-medium text-slate-300">Parsing skills with AI...</p>
              <p className="text-xs text-slate-500">Please wait a few seconds</p>
            </div>
          ) : fileName ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                {fileName}
              </p>
              <p className="text-xs text-slate-400">
                AI will parse your skills & experience automatically
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3 py-2">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-1">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  <span className="text-indigo-400 hover:underline">Click to upload</span> your Resume (PDF)
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  AI will parse your skills & experience automatically
                </p>
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};