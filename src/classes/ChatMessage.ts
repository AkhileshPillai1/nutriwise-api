export class ChatMessage {
    userId: string;
    role: "user" | "model";
    content: string;
    timestamp: string;
    constructor(userId: string, role: "user" | "model", content: string) {
        this.userId = userId;
        this.role = role;
        this.content = content;
        this.timestamp = Date.now().toString();
    }
}