import { ActivityLevel, Allergies, DietaryRestrictions, Gender, Goal, MedicalConditions, PreferredCuisines } from "../constants/UserConstants.js";

export interface IUser {
    userId: string; // Partition Key
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt: string; // Store dates as ISO strings in DynamoDB
    updatedAt?: string;
    personalInfo?: IUserPersonalInfo; // Optional field for personal information
  }
  
export interface IUserPersonalInfo {
    age: number;
    height: number; // in cm
    weight: number; // in kg
    gender: Gender;
    activityLevel: ActivityLevel;
    goal: Goal;
}

export interface IUserPreferences {
  dietaryRestrictions: DietaryRestrictions; // e.g., ["vegetarian", "gluten-free"]
  preferredCuisines: PreferredCuisines; // e.g., ["Indian", "Italian", "Thai"]
  allergies: Allergies; // e.g., ["peanuts", "shellfish"]
}

export interface IUserMedicalInfo {
  medicalConditions: MedicalConditions; // e.g., ["diabetes", "high blood pressure"]
  smoking: boolean;
  alcohol: boolean;
}
