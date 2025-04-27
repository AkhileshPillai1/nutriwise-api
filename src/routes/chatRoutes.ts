import express from "express";
import { authenticateUser } from "../middleware/verifyHeader.js";
// Import neceassary controllers
//import {  } from "../controllers/chatController.js";

const router = express.Router();
router.use(authenticateUser);

// Define the routes for chat api
// router.post("/send", sendMessage);

export default router;