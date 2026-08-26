import { Router } from 'express';
import { 
  getJobs, 
  getJobById, 
  createJob, 
  matchJobWithResume,
  getMatchedJobs,
  getLiveJobs
} from '../controllers/jobs.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// ==========================================
// 1. PUBLIC ROUTES
// ==========================================

// GET /api/jobs?query=react (Arbeitnow & Cache Job Search)
router.get('/', getJobs);


// GET /api/v1/jobs/live (Arbeitnow & Cache Job Search)
// ⚠️ MUST BE PLACED BEFORE '/:id' ROUTE
router.get('/live', getLiveJobs);

// GET /api/jobs/matched-jobs (AI Matched Jobs List)
// MUST BE PLACED BEFORE '/:id' ROUTE
router.get('/matched-jobs', protect, getMatchedJobs);

// GET /api/jobs/:id (Get Single Job Details)
router.get('/:id', getJobById);


// ==========================================
// 2. PROTECTED ROUTES (Requires Authentication)
// ==========================================

// POST /api/jobs (Create a Job manually)
router.post('/', protect, createJob);

// POST /api/jobs/match (AI Match Single Job with Resume)
router.post('/match', protect, matchJobWithResume);



export default router;