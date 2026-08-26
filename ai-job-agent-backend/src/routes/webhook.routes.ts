import { Router, raw } from 'express';
import { handleStripeWebhook } from '../controllers/webhook.controller';

const router = Router();

// Stripe Webhook needs the raw raw body for signature verification
router.post('/stripe', raw({ type: 'application/json' }), handleStripeWebhook);

export default router;