import { Request, Response } from "express";
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dbClient, USERS_TABLE } from '../utils/dynamoDB.js';
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../utils/jwt.js";


export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const existingUser = await dbClient.send(new GetItemCommand({
      TableName: USERS_TABLE,
      Key: {
        email: { S: email },
      },
    }));

    if (existingUser.Item) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const createdAt = new Date().toISOString();

    await dbClient.send(new PutItemCommand({
      TableName: USERS_TABLE,
      Item: {
        userId: { S: userId },
        email: { S: email },
        passwordHash: { S: hashedPassword },
        createdAt: { S: createdAt },
      },
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
    const result = await dbClient.send(new GetItemCommand({
      TableName: USERS_TABLE,
      Key: {
        email: { S: email },
      },
    }));

    const user = result.Item;

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
