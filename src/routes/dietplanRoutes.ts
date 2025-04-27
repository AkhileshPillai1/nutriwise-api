import express from "express";
import { getDietPlanByPlanId, getDietPlansByUserId, createDietPlan } from "../controllers/dietplanController.js";
import { authenticateUser } from "../middleware/verifyHeader.js";

const router = express.Router();
router.use(authenticateUser);

router.get("/getDietPlansByUserId", getDietPlansByUserId);
router.get("/getDietPlan/:planId", getDietPlanByPlanId);
router.post("/createDietPlan", createDietPlan);

export default router;
