import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import IChatMessage from "../models/IChatMessage.js";
import { dbClient, CHAT_SESSIONS_TABLE } from "./dynamoDB.js";
import { IChatSession } from "../models/IChatSession.js";
import { v4 as uuidv4 } from "uuid";
import { ChatSession } from "../classes/ChatSession.js";
import { marshall } from "@aws-sdk/util-dynamodb";

export async function getChatHistory(sessionId: string): Promise<IChatMessage[]> {
  try {
    const cmd = new GetCommand({
      TableName: CHAT_SESSIONS_TABLE,
      Key: {
        sessionId
      }
    });

    const res = await dbClient.send(cmd);
    return res.Item.messages as IChatMessage[] || [];

  }
  catch (error) {
    console.error("Error fetching chat history:", error);
    throw new Error("Could not fetch chat history");
  }
}

export async function addMessage(message: IChatMessage, sessionId: string): Promise<void> {
  try {

    const getCmd = new GetCommand({
      TableName: CHAT_SESSIONS_TABLE,
      Key: {
        sessionId
      }
    });
    const res = await dbClient.send(getCmd);
    const chatSession: IChatSession = res.Item as IChatSession;
    if (!chatSession.messages || chatSession.messages.length === 0) {
      chatSession.messages = [message];
    }
    else {
      chatSession.messages.push(message);
    }

    const putCmd = new PutCommand({
      TableName: CHAT_SESSIONS_TABLE,
      Item: JSON.parse(JSON.stringify(chatSession)),
    });
    await dbClient.send(putCmd);
  }
  catch (error) {
    console.error("Error adding message:", error);
    throw new Error("Could not add message");
  }
}

export async function createNewSession(userId: string) {
  try {
    const chatSession: IChatSession = new ChatSession(uuidv4(), userId);

    const putCmd = new PutCommand({
      TableName: CHAT_SESSIONS_TABLE,
      Item: chatSession,
    });

    await dbClient.send(putCmd);
    return chatSession.sessionId;
  }
  catch (error) {
    console.error("Error creating new session:", error);
    throw new Error("Could not create new session");
  }
}
