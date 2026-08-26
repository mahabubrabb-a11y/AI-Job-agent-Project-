export interface AgentFeedback {
  recruiter: string;
  atsBot: string;
  hiringManager: string;
}

export interface JobAnalysisResult {
  id: string;
  jobTitle: string;
  companyName: string;
  matchPercentage: number;
  atsScore: number;
  matchLevel: 'Strong' | 'Medium' | 'Low';
  missingSkills: string[];
  strengths: string[];
  roadmap: string[];
  interviewQuestions: string[];
  agentFeedbacks: AgentFeedback;
  suggestedCoverLetter?: string;
  
  analysisSummary: string;
  matchingSkills: string[];
  
  recommendations: string[];
}