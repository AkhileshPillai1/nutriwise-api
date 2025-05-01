export default interface ChatMessage {
    userId: string;
    role: "user" | "model";
    content: string;
    timestamp: string;
  }