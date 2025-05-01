import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function getGeminiResponse(history: { role: 'user' | 'model' | 'system' ; content: string }[]) {
  const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

  const chat = model.startChat({
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.content }]
    }))
  });

  const userPrompt = history[history.length - 1].content;

  const result = await chat.sendMessage(userPrompt);
  const response = await result.response;
  return response.text();
}
