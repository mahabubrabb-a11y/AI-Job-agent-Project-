import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';
import { connectDB } from './src/config/db';
import { startCronJobs } from './src/utils/cron';
import { logger } from './src/utils/logger';

const PORT = process.env.PORT || 5000;

// Connect Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    
    // Cron Job চালু করা হলো
    startCronJobs();
    logger.info('⏰ Automated Cron Jobs initialized.');
  });
}).catch((error) => {
  logger.error('Failed to connect to Database:', error);
  process.exit(1);
});



