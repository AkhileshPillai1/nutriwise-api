import IChatMessage from "../models/IChatMessage.js";
import { IChatSession } from "../models/IChatSession.js";

export class ChatSession implements IChatSession {
    sessionId: string;
    userId: string;
    messages: IChatMessage[];

    constructor(sessionId: string, userId: string) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.messages = [];
    }
}