export interface IDietPlan {
  planId: string;
  userId: string; // Foreign key to the user
  title: string;
  description: string;
  mealPlan: IMealPlan;
  createdAt: string; // Store dates as ISO strings in DynamoDB
}

export interface IMealPlan {
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
}
