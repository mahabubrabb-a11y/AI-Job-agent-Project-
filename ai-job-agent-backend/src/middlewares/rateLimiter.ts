import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { redis } from '../config/redis';
import { User } from '../models/User';

export const analyzeRateLimiter = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // Pro users have unlimited access
    if (user.plan === 'pro' && user.subscriptionStatus === 'active') {
      next();
      return;
    }

    // Free tier logic: Max 3 requests per 24 hours
    const today = new Date().toISOString().split('T')[0];
    const redisKey = `rate-limit:${userId}:${today}`;

    const currentUsage = await redis.get(redisKey);
    const usageCount = currentUsage ? parseInt(currentUsage, 10) : 0;

    if (usageCount >= 3) {
      res.status(429).json({
        success: false,
        message: 'Daily analysis limit reached. Upgrade to Pro for unlimited access!',
      });
      return;
    }

    // Increment count and set expiration to 24 hours (86400 seconds)
    await redis.incr(redisKey);
    if (usageCount === 0) {
      await redis.expire(redisKey, 86400);
    }

    next();
  } catch (error) {
    // Redis ফেল করলেও মূল সার্ভার যাতে বন্ধ না হয়, সেটির জন্য fallback
    console.error('Rate Limiter Error:', error);
    next();
  }
};