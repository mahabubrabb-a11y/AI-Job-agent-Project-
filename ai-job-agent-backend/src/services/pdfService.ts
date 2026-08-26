// src/services/pdfService.ts
import pdfParse from 'pdf-parse-fork';

export const parsePdfText = async (buffer: Buffer): Promise<string> => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error: any) {
    throw new Error('Failed to parse PDF file: ' + error.message);
  }
};