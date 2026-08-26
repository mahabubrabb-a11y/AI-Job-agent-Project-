import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { runAtsAgent } from '../services/ai/atsAgent';
import { runRecruiterAgent } from '../services/ai/recruiterAgent';
import { runManagerAgent } from '../services/ai/managerAgent';
import { JobAnalysis } from '../models/JobAnalysis';

export const analyzeResumeAndJob = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { resumeText, jobDescription, jobTitle, companyName } = req.body;
    const userId = req.user?.id;

    if (!resumeText || !jobDescription) {
      res.status(400).json({
        success: false,
        message: 'Both resumeText and jobDescription are required',
      });
      return;
    }

    // Parallel execution of multi-agents
    const [atsResult, recruiterFeedback, managerEvaluation] = await Promise.all([
      runAtsAgent(resumeText, jobDescription),
      runRecruiterAgent(resumeText, jobDescription),
      runManagerAgent(resumeText, jobDescription),
    ]);

    // Save report to database
    const newAnalysis = await JobAnalysis.create({
      userId,
      jobTitle: jobTitle || 'Target Role',
      companyName: companyName || 'Target Company',
      jobDescription,
      resumeText,
      atsReport: atsResult,
      recruiterFeedback,
      managerEvaluation,
    });

    res.status(201).json({
      success: true,
      data: newAnalysis,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Fetch all analyses for the logged-in user
export const getUserAnalyses = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const analyses = await JobAnalysis.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};