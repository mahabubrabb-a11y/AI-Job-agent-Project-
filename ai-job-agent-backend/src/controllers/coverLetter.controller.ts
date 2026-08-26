import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API ইনিশিয়ালাইজেশন
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateCoverLetter = async (req: Request, res: Response) => {
  try {
    const { jobDescription, skills, resumeText } = req.body;

    // জব ডেসক্রিপশন না থাকলে এরর থ্রো করবে
    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required',
      });
    }

    // Gemini Model সিলেক্ট করা (gemini-3.6-flash আপডেট করা হয়েছে)
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    // প্রম্পট তৈরি করা
    const prompt = `
      You are an expert career consultant and professional resume writer.
      
      Candidate Skills: ${skills ? skills.join(', ') : 'Not provided'}
      Candidate Resume Content: ${resumeText || 'Not provided'}
      Target Job Description: ${jobDescription}

      Based on the candidate's profile and target job description, generate two distinct professional outputs:
      1. A formal, compelling Cover Letter tailored specifically to this job.
      2. A concise, high-converting Cold Email / LinkedIn outreach message tailored for HR or a Hiring Manager, including a catchy Subject Line.

      CRITICAL FORMAT REQUIREMENT:
      Return ONLY a valid JSON object strictly adhering to the following structure with no markdown backticks or additional text:
      {
        "coverLetter": "The complete cover letter text here with proper line breaks...",
        "coldEmail": {
          "subject": "Catchy Subject Line Here",
          "body": "The concise email body text here..."
        }
      }
    `;

    // Gemini থেকে রেসপন্স জেনারেট করা
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // JSON পার্সিংয়ের জন্য ক্লিনিং (Markdown ব্যাকটিক রিমুভ)
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    // সফল রেসপন্স
    return res.status(200).json({
      success: true,
      message: 'Cover letter and cold email generated successfully',
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating cover letter:', error);
    
    // ফেইল রেসপন্স
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate cover letter',
    });
  }
};