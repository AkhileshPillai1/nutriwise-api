export interface IDietPlan {
    planId: string;
    userId: string; // Foreign key to the user
    title: string;
    description: string;
    mealPlan: string;
  }
  