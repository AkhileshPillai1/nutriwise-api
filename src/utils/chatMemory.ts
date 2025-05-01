import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import IChatMessage from "../models/IChatMessage.js";
import { dbClient, CHAT_MESSAGES_TABLE } from "./dynamoDB.js";

export async function getChatHistory(userId: string): Promise<IChatMessage[]> {

    //code to store chat history in a database
    const cmd = new QueryCommand({
        TableName: CHAT_MESSAGES_TABLE,
        KeyConditionExpression: "userId = :uid",
        ExpressionAttributeValues: {
          ":uid": userId
        },
        ScanIndexForward: true // chronological order
      });
    
      const res = await dbClient.send(cmd);
      return res.Items as IChatMessage[];
}

export async function addMessage(message: IChatMessage): Promise<void> {
    const cmd = new PutCommand({
        TableName: CHAT_MESSAGES_TABLE,
        Item: message,
      });
    
      await dbClient.send(cmd);
}
