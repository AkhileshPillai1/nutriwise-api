import { IDietPlan, IMealPlan } from "../models/IDietPlan.js";

export class DietPlan implements IDietPlan {
  planId: string;
  userId: string;
  title: string;
  description: string;
  mealPlan: IMealPlan;
  createdAt: string;

  constructor(
    planId: string,
    userId: string,
    title: string,
    description: string,
    mealPlan: IMealPlan,
    createdAt: string = new Date().toISOString()
  ) {
    this.planId = planId;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.mealPlan = mealPlan;
    this.createdAt = createdAt;
  }
}