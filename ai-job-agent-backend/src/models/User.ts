import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  // Subscription Fields
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan: 'free' | 'pro';
  subscriptionStatus: 'active' | 'inactive' | 'canceled';
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    
    // Stripe & Subscription
    stripeCustomerId: { type: String, default: null },
    stripeSubscriptionId: { type: String, default: null },
    plan: { type: String, enum: ['free', 'pro'], default: 'free' },
    subscriptionStatus: { 
      type: String, 
      enum: ['active', 'inactive', 'canceled'], 
      default: 'inactive' 
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);