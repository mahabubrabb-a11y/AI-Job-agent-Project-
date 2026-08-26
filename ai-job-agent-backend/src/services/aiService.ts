// src/services/aiService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Safe JSON Parsing Helper
const cleanAndParseJSON = (text: string) => {
  try {
    let cleaned = text.trim();

    // Markdown block রিমুভ করা
    cleaned = cleaned
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = JSON.parse(cleaned);
    }

    return JSON.parse(cleaned);
  } catch (err) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw err;
  }
};

export const parseResumeWithAI = async (text: string) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const prompt = `You are an expert resume parser. Extract structured data from this text into JSON format with keys: "skills" (array of strings), "experience" (array of objects with role, company, duration), and "education" (array of objects with degree, institution, year).
    Resume Text: ${text}`;

    const result = await model.generateContent(prompt);
    return cleanAndParseJSON(result.response.text());
  } catch (error: any) {
    console.error('Gemini Parsing Error:', error?.message || error);
    return { skills: [], experience: [], education: [] };
  }
};

export const calculateJobMatchWithAI = async (resumeData: object, jobDescription: string) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const prompt = `
      You are an expert ATS matching engine. Compare candidate resume data against the job description.

      Candidate Resume Data:
      ${JSON.stringify(resumeData)}

      Job Description:
      ${jobDescription}

      Respond strictly with a JSON object containing these exact keys:
      {
        "matchPercentage": 85,
        "matchingSkills": ["React", "Node.js"],
        "missingSkills": ["Docker", "AWS"],
        "analysisSummary": "Detailed summary here",
        "recommendations": ["Recommendation 1"]
      }
    `;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    return cleanAndParseJSON(rawText);
  } catch (error: any) {
    console.error('Job Matching AI Error:', error?.message || error);
    
    // ৪২৯ (কোটা লিমিট) বা অন্য কোনো এরর আসলে অ্যাপ যাতে ক্র্যাশ না করে
    const isQuotaError = error?.status === 429 || error?.message?.includes('429');
    
    return {
      matchPercentage: 0,
      matchingSkills: [],
      missingSkills: [],
      analysisSummary: isQuotaError
        ? 'API daily limit reached (20 requests/day). Please create a new free API key.'
        : 'Unable to process request at this moment.',
      recommendations: ['Check your Gemini API quota or switch your API key in .env file.'],
    };
  }
};