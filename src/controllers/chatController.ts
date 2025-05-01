import { getGeminiResponse } from '../utils/gemini.js';
import { getChatHistory, addMessage } from '../utils/chatMemory.js';

export const sendMessage = async (req, res) => {

    const userId = req.user.userId;
    const { message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'userId and message are required' });
    }

    // Save user message
    addMessage(userId, 'user', message);

    // Get updated history
    const history = getChatHistory(userId);

    try {
        console.log('History:', history);
        const geminiResponse = await getGeminiResponse(history);

        // Save assistant reply
        addMessage(userId, 'model', geminiResponse);

        res.json({ response: geminiResponse });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
};