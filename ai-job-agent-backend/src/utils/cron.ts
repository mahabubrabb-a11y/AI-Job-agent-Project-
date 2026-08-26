import cron from 'node-cron';
import { Job } from '../models/Job';
import { fetchFromArbeitnow } from '../services/jobService';
import { logger } from './logger';

export const startCronJobs = (): void => {
  // প্রতিদিন রাত ১২টায় (00:00) এই জবটি রান হবে
  cron.schedule('0 0 * * *', async () => {
    logger.info('🔄 Running Daily Job Refresh Cron Job...');
    try {
      const freshJobs = await fetchFromArbeitnow();
      if (freshJobs && freshJobs.length > 0) {
        // পুরোনো লাইভ জবের ক্যাশ মুছে দিয়ে নতুন জবগুলো ক্যাশ করা
        await Job.deleteMany({ source: 'Arbeitnow (Unlimited)' });
        await Job.insertMany(freshJobs, { ordered: false });
        logger.info(`✅ Cron Job Success: ${freshJobs.length} live jobs updated successfully.`);
      }
    } catch (error: any) {
      logger.error('❌ Cron Job Failed:', error.message || error);
    }
  });
};