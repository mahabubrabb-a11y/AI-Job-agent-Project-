import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware';
import { 
  uploadAndParseResume, 
  getUserResumes 
} from '../controllers/resume.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// 💡 সিরিয়াল ঠিক করা হয়েছে: আগে protect, তারপর upload.single('file')
router.post('/upload', protect, upload.single('file'), uploadAndParseResume);
router.get('/', protect, getUserResumes);

export default router;