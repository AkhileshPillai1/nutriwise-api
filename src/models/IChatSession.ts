import IChatMessage from "./IChatMessage.js";

export interface IChatSession {
    sessionId: string;
    userId: string;
    messages: IChatMessage[];
}