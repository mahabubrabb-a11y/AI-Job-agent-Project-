import { Schema, model, Document, Types } from 'mongoose';

export interface IJobAnalysis extends Document {
  userId: Types.ObjectId;
  jobTitle?: string;
  companyName?: string;
  jobDescription: string;
  resumeText: string;
  atsReport: {
    atsScore: number;
    missingKeywords: string[];
    formattingIssues: string[];
    matchedSkills: string[];
  };
  recruiterFeedback: string;
  managerEvaluation: string;
  createdAt: Date;
}

const jobAnalysisSchema = new Schema<IJobAnalysis>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jobTitle: { type: String, default: 'Software Engineer' },
    companyName: { type: String, default: 'Target Company' },
    jobDescription: { type: String, required: true },
    resumeText: { type: String, required: true },
    atsReport: {
      atsScore: { type: Number, default: 0 },
      missingKeywords: [{ type: String }],
      formattingIssues: [{ type: String }],
      matchedSkills: [{ type: String }],
    },
    recruiterFeedback: { type: String, required: true },
    managerEvaluation: { type: String, required: true },
  },
  { timestamps: true }
);

export const JobAnalysis = model<IJobAnalysis>('JobAnalysis', jobAnalysisSchema);