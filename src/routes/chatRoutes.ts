import express from "express";
import { authenticateUser } from "../middleware/verifyHeader.js";
import { getChats, sendMessage } from "../controllers/chatController.js";
// Import neceassary controllers
//import {  } from "../controllers/chatController.js";

const router = express.Router();
router.use(authenticateUser);

// Define the routes for chat api
router.post("/sendMessage", sendMessage);
router.get("/getChats", getChats);

export default router;