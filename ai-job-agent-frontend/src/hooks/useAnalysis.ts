'use client';

import { useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { JobAnalysisResult } from '../types/analysis';

interface UseAnalysisReturn {
  analyzeJob: (jobId: string, resumeId: string) => Promise<JobAnalysisResult | null>;
  analysis: JobAnalysisResult | null;
  loading: boolean;
  error: string | null;
  resetAnalysis: () => void;
}

export const useAnalysis = (): UseAnalysisReturn => {
  const [analysis, setAnalysis] = useState<JobAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeJob = useCallback(
    async (jobId: string, resumeId: string): Promise<JobAnalysisResult | null> => {
      setLoading(true);
      setError(null);

      try {
        // Correct Endpoint: /jobs/match
        // Correct Payload: { jobId, resumeId }
        const response = await api.post(`/jobs/match`, {
          jobId,
          resumeId,
        });

        const result: JobAnalysisResult = response.data.data;
        setAnalysis(result);
        return result;
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || 'Job match analysis request failed.';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    analyzeJob,
    analysis,
    loading,
    error,
    resetAnalysis,
  };
};