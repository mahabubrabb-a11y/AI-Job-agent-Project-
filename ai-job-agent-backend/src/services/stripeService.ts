import { stripe } from '../config/stripe';
import { logger } from '../utils/logger';

export class StripeService {
  /**
   * Pro Plan Subscription-এর জন্য Checkout Session তৈরি করা
   */
  async createCheckoutSession(userId: string, userEmail: string): Promise<string> {
    try {
      const priceId = process.env.STRIPE_PRO_PLAN_PRICE_ID;
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

      if (!priceId) {
        throw new Error('STRIPE_PRO_PLAN_PRICE_ID is not configured in .env');
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        customer_email: userEmail,
        client_reference_id: userId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${clientUrl}/dashboard?payment=success`,
        cancel_url: `${clientUrl}/pricing?payment=cancelled`,
        metadata: {
          userId,
        },
      });

      return session.url || `${clientUrl}/dashboard`;
    } catch (error) {
      logger.error('Error creating Stripe Checkout Session:', error);
      throw new Error('Failed to create subscription checkout session');
    }
  }

  /**
   * কাস্টমার সাবস্ক্রিপশন ম্যানেজ বা ক্যানসেল করার জন্য Stripe Billing Portal URL জেনারেট করা
   */
  async createCustomerPortalSession(stripeCustomerId: string): Promise<string> {
    try {
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `${clientUrl}/dashboard`,
      });

      return portalSession.url;
    } catch (error) {
      logger.error('Error creating Stripe Customer Portal Session:', error);
      throw new Error('Failed to create customer portal session');
    }
  }
}

export const stripeService = new StripeService();