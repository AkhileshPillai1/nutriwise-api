import { GenericResponse } from "../classes/GenericResponse.js";
import { User } from "../classes/User.js";
import { IUser } from "../models/IUser.js";
import { dbClient, USERS_TABLE } from "../utils/dynamoDB.js";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export const getUserDetails = async (req, res): Promise<any> => {
    try {
        const userId = req.user.userId;
        const cmd = new GetCommand({
            TableName: USERS_TABLE,
            Key: {
                userId
            }
        });
        const response = await dbClient.send(cmd);
        const userDetails = response.Item;
        if (userDetails) {
            delete userDetails.passwordHash;
        }
        res.json(new GenericResponse(true, "", userDetails));

    } catch (err) {
        console.error("Error fetching user details:", err);
        res.status(500).json(new GenericResponse(false, "Internal server error"));
    }
};

export const updateUserDetails = async (req, res): Promise<any> => {
    try {
        const userId = req.user.userId;
        const user = req.body;
        await dbClient.send(new PutCommand({
            TableName: USERS_TABLE,
            Item: {
                userId,
                ...user
            }
        }));
        res.json(new GenericResponse(true, "User details updated successfully"));
    }
    catch (err) {
        res.status(500).json(new GenericResponse(false, "Internal server error"));
    }
}