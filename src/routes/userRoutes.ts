import express from "express";
import { getUserDetails, updateUserDetails } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/verifyHeader.js";

const router = express.Router();
router.use(authenticateUser);

router.get("/getUserDetails", getUserDetails);
router.post("/updateUserDetails", updateUserDetails);

export default router;
