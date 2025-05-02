export default interface ChatMessage {
    role: "user" | "model";
    content: string;
    timestamp: string;
  }