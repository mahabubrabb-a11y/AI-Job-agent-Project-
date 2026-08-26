// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  subscriptionStatus?: 'active' | 'canceled' | 'inactive';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

// Resume & Job Analysis Types
export interface AtsReport {
  atsScore: number;
  missingKeywords: string[];
  formattingIssues: string[];
  matchedSkills: string[];
}

export interface JobAnalysis {
  _id: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  resumeText: string;
  atsReport: AtsReport;
  recruiterFeedback: string;
  managerEvaluation: string;
  createdAt: string;
}

export interface AnalyzePayload {
  resumeText: string;
  jobDescription: string;
  jobTitle?: string;
  companyName?: string;
}

export interface AnalysisResponse {
  success: boolean;
  data: JobAnalysis;
}

export interface HistoryResponse {
  success: boolean;
  data: JobAnalysis[];
}