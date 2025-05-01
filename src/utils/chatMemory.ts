type Message = {
    role: 'user' | 'model';
    content: string;
};

const SYSTEM_MESSAGE = {
    role: 'user',
    content: 'Your name is Nutribot. You are a helpful and knowledgeable nutrition expert. Give advice based on current nutrition science. Keep explanations clear and practical.'
} as const;

const memoryStore: Record<string, Message[]> = {};

export function getChatHistory(userId: string): Message[] {
    const history = memoryStore[userId] || [];
    return [SYSTEM_MESSAGE, ...history];
}

export function addMessage(userId: string, role: 'user' | 'model', content: string): void {
    if (!memoryStore[userId]) {
        memoryStore[userId] = [];
    }
    memoryStore[userId].push({ role, content });
}
