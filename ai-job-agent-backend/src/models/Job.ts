import mongoose, { Schema, model, Document } from 'mongoose';

// 1. Unified Interface Definition
export interface IJob extends Document {
  jobId: string;
  title: string;
  company: string;
  logo?: string;
  location?: string;
  source?: string;
  applyUrl?: string;
  sourceUrl?: string;
  url?: string;
  category?: string;
  tags?: string[];
  requirements?: string[];
  description?: string;
  postedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Combined Schema Definition
const jobSchema = new Schema<IJob>(
  {
    jobId: { 
      type: String, 
      required: true, 
      unique: true, 
      default: () => new mongoose.Types.ObjectId().toString() 
    },
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    company: { 
      type: String, 
      required: true, 
      trim: true 
    },
    logo: { 
      type: String, 
      default: '' 
    },
    location: { 
      type: String, 
      default: 'Remote', 
      trim: true 
    },
    source: { 
      type: String, 
      default: 'Arbeitnow' 
    },
    applyUrl: { 
      type: String, 
      trim: true 
    },
    sourceUrl: { 
      type: String, 
      trim: true 
    },
    url: { 
      type: String, 
      trim: true 
    },
    category: { 
      type: String, 
      default: 'tech', 
      trim: true 
    },
    tags: { 
      type: [String], 
      default: [] 
    },
    requirements: { 
      type: [String], 
      default: [] 
    },
    description: { 
      type: String, 
      default: '' 
    },
    postedAt: { 
      type: Date, 
      default: Date.now 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      expires: '48h' // 48 ঘণ্টা পর ক্যাশ ডাটা অটো-রিফ্রেশ হবে
    }
  },
  {
    timestamps: true
  }
);

// 3. Dual Export (Default & Named Export)
const Job = model<IJob>('Job', jobSchema);

export { Job };
export default Job;