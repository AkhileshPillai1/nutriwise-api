export class ChatMessage {
    role: "user" | "model";
    content: string;
    timestamp: string;
    constructor(role: "user" | "model", content: string) {
        this.role = role;
        this.content = content;
        this.timestamp = Date.now().toString();
    }
}