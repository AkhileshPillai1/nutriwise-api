import { GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { dbClient, DIET_PLANS_TABLE, USERS_TABLE } from "../utils/dynamoDB.js";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { generateDietPlanPrompt } from "../utils/promptGen.js";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { DietPlan } from "../classes/DietPlan.js";
import { GenericResponse } from "../classes/GenericResponse.js";

dotenv.config();

export const getDietPlansByUserId = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming userId is set in middleware

        const result = await dbClient.send(new ScanCommand({
            TableName: DIET_PLANS_TABLE,
            FilterExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": { S: userId },
            },
        }));

        const dietPlans = result.Items.map(item => unmarshall(item));

        res.status(200).json(dietPlans);
    } catch (err) {
        console.error("Error fetching diet plans:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getDietPlanByPlanId = async (req, res) => {
    const planId = req.params.planId;

    try {
        const result = await dbClient.send(new GetItemCommand({
            TableName: DIET_PLANS_TABLE,
            Key: {
                planId: { S: planId },
            },
        }));

        if (!result.Item) {
            return res.status(404).json({ message: "Diet plan not found" });
        }

        const dietPlan = unmarshall(result.Item);

        res.status(200).json(dietPlan);
    } catch (err) {
        console.error("Error fetching diet plan:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createDietPlan = async (req, res) => {

    const { title, activityLevel, goal, dietaryRestrictions, preferredCuisines, meatPreferences } = req.body;

    try {
        //Create an instance of the GoogleGenerativeAI class
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        //Generate prompt and send it to the LLM
        const prompt = generateDietPlanPrompt(activityLevel, goal, dietaryRestrictions.join(", "), preferredCuisines.join(", "), meatPreferences);
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanedText = JSON.parse(text.replace(/^```json|```$/g, "").trim());

        //Form the diet plan object with the response from the LLM and save it to the database
        const dietPlan = new DietPlan(uuidv4(), req.user.userId, title, cleanedText["description"], cleanedText["mealPlan"]);
        console.log
        await dbClient.send(new PutItemCommand({
            TableName: DIET_PLANS_TABLE,
            Item: marshall(dietPlan, { convertClassInstanceToMap: true }),
        }));

        //Send the response back to the client
        const response = new GenericResponse(true, "Diet plan created successfully", dietPlan);
        res.status(201).json(response);

    } catch (err) {
        console.error("Error creating diet plan:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}