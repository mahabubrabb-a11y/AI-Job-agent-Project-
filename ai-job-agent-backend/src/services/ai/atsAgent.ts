import { openai } from '../../config/openai';
import { ATS_AGENT_PROMPT } from '../../utils/prompts';

export const runAtsAgent = async (resumeText: string, jobDescription: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: ATS_AGENT_PROMPT },
      {
        role: 'user',
        content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content || '{}');
};