import { getGeminiResponse } from '../utils/gemini.js';
import { getChatHistory, addMessage } from '../utils/chatMemory.js';
import { ChatMessage } from '../classes/ChatMessage.js';

export const sendMessage = async (req, res) => {

    const userId = req.user.userId;
    const { message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'userId and message are required' });
    }

    // Save user message
    await addMessage(new ChatMessage(userId, 'user', message));

    // Get updated history
    const history = await getChatHistory(userId);

    try {
        const geminiResponse = await getGeminiResponse(history);

        // Save assistant reply
        await addMessage(new ChatMessage(userId, 'model', geminiResponse));

        res.json({ response: geminiResponse });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
};