import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

// 1. Props interface definition
interface ResumeMatcherProps {
  resumeId: string;
}

// 2. API Response structure interface (আপনার ব্যাকএন্ডের সাথে মিলিয়ে পরিবর্তন করতে পারেন)
interface MatchResultData {
  score?: number;
  matchScore?: number;
  strengths?: string[];
  weaknesses?: string[];
  missingSkills?: string[];
  feedback?: string;
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  data: MatchResultData;
}

const ResumeMatcher: React.FC<ResumeMatcherProps> = ({ resumeId }) => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [matchResult, setMatchResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMatch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<ApiResponse>(
        'http://localhost:5000/api/v1/jobs/match',
        {
          jobDescription,
          resumeId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // দরকার হলে টোকেন পাস করুন: Authorization: `Bearer ${token}`
          }
        }
      );

      setMatchResult(response.data);
    } catch (error) {
      console.error('Matching failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', marginTop: '20px', borderRadius: '5px' }}>
      <h3>🤖 AI Resume Matcher</h3>
      <form onSubmit={handleMatch}>
        <textarea
          rows={5}
          cols={50}
          placeholder="Paste Job Description here..."
          value={jobDescription}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <br />
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          {loading ? 'Matching with AI...' : 'Check Match Score'}
        </button>
      </form>

      {/* রেজাল্ট দেখানোর পার্ট */}
      {matchResult && (
        <div style={{ marginTop: '15px', background: '#f0f8ff', padding: '15px', borderRadius: '5px' }}>
          <h4>Match Result:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(matchResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeMatcher;