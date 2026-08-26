import { Request, Response } from 'express';
import { Resume } from '../models/Resume'; 
import { calculateJobMatchWithAI } from '../services/aiService';
import { logger } from '../utils/logger';
import { Job, IJob } from '../models/Job';
import { calculateMatchScore } from '../utils/matchingEngine';
import { getOrFetchJobs } from '../services/jobService';

// Express Request-এ user প্রপার্টি টাইপ করার জন্য Interface
interface AuthenticatedRequest extends Request {
  user?: {
    skills?: string[];
    [key: string]: any;
  };
}

// @desc    Get all cached jobs with pagination and search
// @route   GET /api/v1/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const search = (req.query.search as string) || '';

    const skip = (page - 1) * limit;

    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const totalJobs = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: jobs.length,
      pagination: {
        totalJobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
      },
      data: jobs,
    });
  } catch (error) {
    logger.error('Error in getJobs controller:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single job by ID
// @route   GET /api/v1/jobs/:id
// @access  Public
export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return;
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    logger.error('Error in getJobById controller:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create/Cache a new job post
// @route   POST /api/v1/jobs
// @access  Private
export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, company, location, description, requirements, sourceUrl } = req.body;

    const newJob = await Job.create({
      title,
      company,
      location,
      description,
      requirements,
      sourceUrl,
      postedAt: new Date(),
    });

    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    logger.error('Error in createJob controller:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Match Resume with a Job using Gemini AI
// @route   POST /api/v1/jobs/match
// @access  Private
export const matchJobWithResume = async (req: any, res: Response): Promise<void> => {
  try {
    const { resumeId, jobId, jobDescription } = req.body || {};
    const userId = req.user?._id || req.user?.id;

    let resume;

    // ১. যদি resumeId পাঠানো হয়, তবে সেটা দিয়ে খুঁজবে
    // আর যদি না পাঠানো হয়, ইউজারের লেটেস্ট আপলোড করা সিভি অটোমেটিক বের করবে
    if (resumeId) {
      resume = await Resume.findById(resumeId);
    } else if (userId) {
      resume = await Resume.findOne({ userId }).sort({ createdAt: -1 });
    }

    if (!resume) {
      res.status(404).json({ 
        success: false, 
        message: 'No resume found. Please upload a resume first.' 
      });
      return;
    }

    let finalJobDescription = jobDescription;

    // ২. যদি jobId পাঠানো হয় তবে ডাটাবেজ থেকে Job Description নেওয়া
    if (jobId) {
      const job = await Job.findById(jobId);
      if (job) {
        finalJobDescription = `${job.title} at ${job.company}\nDescription: ${job.description}\nRequirements: ${job.requirements?.join(', ')}`;
      }
    }

    if (!finalJobDescription) {
      res.status(400).json({ 
        success: false, 
        message: 'Job description is required to perform matching' 
      });
      return;
    }

    // ৩. Gemini AI দিয়ে Match Score বের করা
    const matchAnalysis = await calculateJobMatchWithAI(
      resume.parsedData || {}, 
      finalJobDescription
    );

    res.status(200).json({
      success: true,
      data: matchAnalysis,
    });
  } catch (error) {
    logger.error('Error in matchJobWithResume controller:', error);
    res.status(500).json({ success: false, message: 'Server Error during AI matching' });
  }
};

// @desc    Get Matched Jobs based on user skills
// @route   GET /api/v1/jobs/matched
// @access  Private
export const getMatchedJobs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Authenticated user থাকলে req.user.skills থেকে আসবে, অন্যথায় Default Skills
    const userSkills: string[] = req.user?.skills || ['JavaScript', 'React', 'Node.js', 'MongoDB'];

    // MongoDB থেকে সর্বশেষ ২০টি জব ফেচ করা
    const jobs: IJob[] = await Job.find().sort({ postedAt: -1 }).limit(20);

    const jobsWithScore = jobs.map((job) => {
      const matchScore = calculateMatchScore(
        userSkills,
        job.requirements || [],
        job.description
      );

      return {
        ...job.toObject(),
        matchScore,
      };
    });

    // Score অনুযায়ী সর্ট করা (Highest Match First)
    jobsWithScore.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      count: jobsWithScore.length,
      data: jobsWithScore,
    });
  } catch (error: any) {
    logger.error('Error in getMatchedJobs controller:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error',
    });
  }
};

// @desc    Get Live Jobs with Pagination & Filtering
// @route   GET /api/v1/jobs/live
// @access  Public
export const getLiveJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string) || (req.query.query as string) || '';

    // ১. সার্ভিস থেকে আগে ডাটা ফেচ/ক্যাশ নিশ্চিত করা
    await getOrFetchJobs(search);

    // ২. ফিল্টারিং লজিক তৈরি
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // ৩. ডাটাবেজ থেকে পেজিনেশন সহ ফেচ করা
    const totalJobs = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: jobs.length,
      pagination: {
        totalJobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        hasNextPage: page * limit < totalJobs,
        hasPrevPage: page > 1
      },
      data: jobs
    });
  } catch (error: any) {
    logger.error('Error in getLiveJobs controller:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message || 'Server Error'
    });
  }
};



