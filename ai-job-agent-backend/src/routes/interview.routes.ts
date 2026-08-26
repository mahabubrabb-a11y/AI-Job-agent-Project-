import { Router } from 'express';
import { generateQuestions, evaluateAnswer } from '../controllers/interview.controller';

const router = Router();

router.post('/generate-questions', generateQuestions);
router.post('/evaluate-answer', evaluateAnswer);

export default router;