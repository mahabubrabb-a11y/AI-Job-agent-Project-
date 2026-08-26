import { Router } from 'express';
import { analyzeResumeAndJob, getUserAnalyses } from '../controllers/analyze.controller';
import { protect } from '../middlewares/auth.middleware';
import { analyzeRateLimiter } from '../middlewares/rateLimiter';
const router = Router();

// Trigger Multi-Agent AI Analysis
router.post('/', protect,analyzeRateLimiter, analyzeResumeAndJob);

// Fetch saved reports history for logged-in user
router.get('/history', protect, getUserAnalyses);

export default router;