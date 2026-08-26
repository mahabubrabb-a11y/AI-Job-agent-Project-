import { openai } from '../../config/openai';
import { logger } from '../../utils/logger';

export interface CompanyContext {
  companyName: string;
  cultureAndValues?: string;
  keyProjects?: string;
}

export class RAGService {
  /**
   * কোম্পানির ওয়েবসাইটের জন্য সিমুলেটেড কনটেক্সট এক্সট্র্যাক্টর
   */
  async fetchCompanyContext(companyName: string): Promise<CompanyContext> {
    try {
      logger.info(`Fetching context/scraping insights for: ${companyName}`);
      
      // বাস্তব প্রজেক্টে এখানে Puppeteer বা Cheerio দিয়ে ওয়েব স্ক্র্যাপিং বা সার্চ API ব্যবহার করা যেতে পারে
      return {
        companyName,
        cultureAndValues: `${companyName} focuses on innovation, fast-paced technical growth, scalability, and user-centric software design.`,
        keyProjects: `High-throughput cloud architecture, AI integration, and robust full-stack applications.`,
      };
    } catch (error) {
      logger.warn(`Could not fetch extra company context for ${companyName}:`, error);
      return { companyName };
    }
  }

  /**
   * RAG কনটেক্সট এবং Resume ব্যবহার করে Tailored Cover Letter তৈরি করা
   */
  async generateCoverLetter(
    resumeText: string,
    jobTitle: string,
    jobDescription: string,
    companyName: string
  ): Promise<string> {
    try {
      // ১. কোম্পানির অতিরিক্ত তথ্য এক্সট্র্যাক্ট করা
      const companyInfo = await this.fetchCompanyContext(companyName);

      // ২. OpenAI Prompt তৈরি
      const prompt = `
You are an expert Executive Career Coach and Resume Specialist.
Generate a high-converting, professional, and personalized Cover Letter using the provided candidate resume, job description, and company context.

### Company Context:
- Company Name: ${companyInfo.companyName}
- Core Focus & Values: ${companyInfo.cultureAndValues}

### Target Job:
- Title: ${jobTitle}
- Description: ${jobDescription}

### Candidate Resume Details:
${resumeText}

### Output Requirements:
1. Professional greeting addressed to the Hiring Manager at ${companyName}.
2. Strong opening paragraph stating enthusiasm for the ${jobTitle} role.
3. Mid-paragraph matching 2-3 specific achievements/skills from the resume directly with the job requirements.
4. Align candidate's background with company values (${companyInfo.cultureAndValues}).
5. Clear, professional call-to-action closing statement.
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });

      return response.choices[0].message.content || 'Failed to generate Cover Letter.';
    } catch (error) {
      logger.error('Error generating cover letter in RAGService:', error);
      throw new Error('Cover letter generation failed');
    }
  }
}

export const ragService = new RAGService();