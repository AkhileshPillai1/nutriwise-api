import { IDietPlan } from "../models/IDietPlan.js";

export class DietPlan implements IDietPlan {
  planId: string;
  userId: string;
  title: string;
  description: string;
  mealPlan: string;

  constructor(
    planId: string,
    userId: string,
    title: string,
    description: string,
    mealPlan: string
  ) {
    this.planId = planId;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.mealPlan = mealPlan;
  }
}