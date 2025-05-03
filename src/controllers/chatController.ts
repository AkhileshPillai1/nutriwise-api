import { getGeminiResponse } from '../utils/gemini.js';
import { getChatHistory, addMessage, createNewSession } from '../utils/chatService.js';
import { ChatMessage } from '../classes/ChatMessage.js';

export const sendMessage = async (req, res) => {

    const userId = req.user.userId;
    let { sessionId, message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'userId and message are required' });
    }

    if (!sessionId) {
        //create a new sessionId if not provided
        sessionId = await createNewSession(userId);
    }

    // Save user message
    await addMessage(new ChatMessage('user', message), sessionId);

    // Get updated history
    const history = await getChatHistory(sessionId);

    try {
        const geminiResponse = await getGeminiResponse(history);

        // Save assistant reply
        await addMessage(new ChatMessage('model', geminiResponse), sessionId);

        res.json({ response: geminiResponse, sessionId });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
};

export const getChats = async (req, res) => {
    const sessionId = req.query.sessionId;
    const history = await getChatHistory(sessionId);
    res.json(history);
}