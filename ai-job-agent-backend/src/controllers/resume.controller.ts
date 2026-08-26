import { Request, Response } from 'express';
import { parsePdfText } from '../services/pdfService';
import { parseResumeWithAI } from '../services/aiService';
import { Resume } from '../models/Resume';

export const uploadAndParseResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'Please upload a PDF file' });
      return;
    }

    // ১. আপলোড হওয়া বাফার থেকে আসল টেক্সট এক্সট্রাক্ট
    const parsedText = await parsePdfText(req.file.buffer);

    // ২. AI দিয়ে JSON structured data পার্স
    const parsedData = await parseResumeWithAI(parsedText);

    // ৩. আসল লগইন করা ইউজার আইডি
    const userId = (req as any).user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    // ৪. MongoDB-তে সেভ
    const savedResume = await Resume.create({
      userId,
      fileName: req.file.originalname,
      extractedText: parsedText,
      parsedData,
    });

    res.status(200).json({
      success: true,
      data: savedResume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// 🔄 ইউজারের সব রেজুমে ফেচ করার কন্ট্রোলার
export const getUserResumes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const resumes = await Resume.find({ userId }).select('_id fileName createdAt');

    res.status(200).json({
      success: true,
      data: resumes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

