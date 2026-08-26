import { Router } from 'express';
import { generateCoverLetter } from '../controllers/coverLetter.controller';

const router = Router();

router.post('/generate', generateCoverLetter);

export default router;