import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// ১. প্রশ্ন জেনারেট করার এন্ডপয়েন্ট
export const generateQuestions = async (req: Request, res: Response) => {
  try {
    const { jobDescription, skills, resumeText } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required',
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `
      You are an expert technical interviewer for software engineering roles.
      Candidate Skills: ${skills ? skills.join(', ') : 'Not provided'}
      Candidate Resume: ${resumeText || 'Not provided'}
      Job Description: ${jobDescription}

      Generate 5 tailored technical and behavioral interview questions based on the candidate's profile and target job description.

      CRITICAL FORMAT REQUIREMENT:
      Return ONLY a valid JSON array of objects strictly adhering to the following structure with no markdown backticks or extra text:
      [
        {
          "id": 1,
          "question": "Question text here...",
          "category": "Technical" // or "Behavioral" / "System Design"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const questions = JSON.parse(cleanedText);

    return res.status(200).json({
      success: true,
      message: 'Questions generated successfully',
      data: questions,
    });
  } catch (error: any) {
    console.error('Error generating questions:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate questions',
    });
  }
};

// ২. ব্যবহারকারীর উত্তর ইভালুয়েট (Evaluate) করার এন্ডপয়েন্ট
export const evaluateAnswer = async (req: Request, res: Response) => {
  try {
    const { question, userAnswer, jobDescription } = req.body;

    if (!question || !userAnswer) {
      return res.status(400).json({
        success: false,
        message: 'Question and answer are required',
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `
      You are an interviewer evaluating a candidate's response.
      Job Context: ${jobDescription || 'Software Engineer'}
      Question: ${question}
      Candidate Answer: ${userAnswer}

      Evaluate the candidate's answer and give detailed feedback.

      CRITICAL FORMAT REQUIREMENT:
      Return ONLY a valid JSON object strictly adhering to the following structure with no markdown backticks:
      {
        "score": 8, // Score out of 10 (integer)
        "feedback": "Concise feedback on what was good...",
        "improvement": "Specific tip to make the answer stronger...",
        "sampleAnswer": "A ideal model answer for reference..."
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const evaluation = JSON.parse(cleanedText);

    return res.status(200).json({
      success: true,
      message: 'Evaluation completed',
      data: evaluation,
    });
  } catch (error: any) {
    console.error('Error evaluating answer:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to evaluate answer',
    });
  }
};