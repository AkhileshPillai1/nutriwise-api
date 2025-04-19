import { Request, Response } from "express";
import { GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { dbClient, USERS_TABLE } from '../utils/dynamoDB.js';
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../utils/jwt.js";
import { User } from "../classes/User.js";
import { toDynamoDBItem } from "../utils/helpers.js";


export const register = async (req: Request, res: Response): Promise<any> => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await dbClient.send(new ScanCommand({
      TableName: USERS_TABLE,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
    }));

    if (existingUser.Items.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const createdAt = new Date().toISOString();

    const user = new User(userId, firstName, lastName, email, hashedPassword, createdAt, createdAt);

    await dbClient.send(new PutItemCommand({
      TableName: USERS_TABLE,
      Item: toDynamoDBItem(user),
    }));

    const token = generateToken(userId);
    res.status(201).json({ token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const result = await dbClient.send(new ScanCommand({
      TableName: USERS_TABLE,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
    }));

    const user = result.Items.length>0 ? result.Items[0] : null;

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash.S!);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.userId.S!);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
