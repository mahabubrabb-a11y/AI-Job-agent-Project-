import { openai } from '../../config/openai';
import { RECRUITER_AGENT_PROMPT } from '../../utils/prompts';

export const runRecruiterAgent = async (
  resumeText: string,
  jobDescription: string
): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: RECRUITER_AGENT_PROMPT },
      {
        role: 'user',
        content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`,
      },
    ],
  });

  return response.choices[0].message.content || 'No feedback generated.';
};