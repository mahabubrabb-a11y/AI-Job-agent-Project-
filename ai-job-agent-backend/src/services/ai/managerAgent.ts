import { openai } from '../../config/openai';
import { MANAGER_AGENT_PROMPT } from '../../utils/prompts';

export const runManagerAgent = async (
  resumeText: string,
  jobDescription: string
): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: MANAGER_AGENT_PROMPT },
      {
        role: 'user',
        content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`,
      },
    ],
  });

  return response.choices[0].message.content || 'No evaluation generated.';
};
