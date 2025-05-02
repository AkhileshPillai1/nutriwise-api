import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a DynamoDB client
const dbClient = new DynamoDBClient({
  region: process.env.AWS_REGION, // Dynamically use the region from .env file
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

const USERS_TABLE = "Users";
const DIET_PLANS_TABLE = "DietPlans";
const CHAT_SESSIONS_TABLE = "ChatSession";

export { dbClient, USERS_TABLE, DIET_PLANS_TABLE, CHAT_SESSIONS_TABLE };
