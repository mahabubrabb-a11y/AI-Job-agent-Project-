import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  fileUrl?: string;
  extractedText: string;
  parsedData?: {
    skills?: string[];
    experience?: any[];
    education?: any[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
    },
    extractedText: {
      type: String,
      required: true,
    },
    parsedData: {
      skills: [{ type: String }],
      experience: [{ type: Schema.Types.Mixed }],
      education: [{ type: Schema.Types.Mixed }],
    },
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model<IResume>('Resume', ResumeSchema);