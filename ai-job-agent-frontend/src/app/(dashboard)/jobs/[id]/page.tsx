'use client';

import React, { useState, useEffect, use } from 'react';
import { AnalysisReport } from '../../../../components/jobs/AnalysisReport';
import { JobAnalysisResult } from '../../../../types/analysis';
import { api } from '../../../../lib/axios';
import { Loader2 } from 'lucide-react';

export default function SingleJobPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15-এর প্রমিজ প্যারামিটার হ্যান্ডেল করার জন্য React.use() ব্যবহার করা হলো
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [report, setReport] = useState<JobAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await api.get(`/analyze/${id}`);
        setReport(response.data.data);
      } catch (err) {
        console.error('Failed to load analysis report:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm text-gray-500">Generating Multi-Agent Report...</p>
      </div>
    );
  }

  return report ? (
    <div className="p-6">
      <AnalysisReport data={report} />
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500">No report found.</div>
  );
}