export interface User {
    userId: string; // Partition Key
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt: string; // Store dates as ISO strings in DynamoDB
    updatedAt?: string;
    personalInfo?: UserPersonalInfo; // Optional field for personal information
  }
  
export interface UserPersonalInfo{
    userId: string; // Foreign key to the user
    age: number;
    height: number; // in cm
    weight: number; // in kg
}