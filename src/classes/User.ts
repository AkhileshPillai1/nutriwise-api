import { ActivityLevel, Allergies, DietaryRestrictions, Gender, Goal, MedicalConditions, PreferredCuisines } from "../constants/UserConstants.js";
import { IUser, IUserMedicalInfo, IUserPersonalInfo, IUserPreferences } from "../models/IUser.js";


export class User implements IUser {
    userId: string; // Partition Key
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt: string; // Store dates as ISO strings in DynamoDB
    updatedAt?: string;
    personalInfo?: IUserPersonalInfo; // Optional field for personal information
    preferences?: IUserPreferences; // Optional field for user preferences
    medicalInfo?: IUserMedicalInfo; // Optional field for medical information

    constructor(userId: string, firstName: string, lastName: string = "", email: string, passwordHash: string, createdAt: string, updatedAt?: string,
        personalInfo?: IUserPersonalInfo, preferences?: IUserPreferences, medicalInfo?: IUserMedicalInfo) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.personalInfo = personalInfo ?? new UserPersonalInfo(0, 0, 0, null, null, null);
        this.preferences = preferences ?? new UserPreferences([], [], []);
        this.medicalInfo = medicalInfo ?? new UserMedicalInfo([], false, false);
    }
}

export class UserPersonalInfo implements IUserPersonalInfo {
    age: number;
    height: number; // in cm
    weight: number; // in kg
    gender: Gender;
    activityLevel: ActivityLevel;
    goal: Goal;

    constructor(age: number, height: number, weight: number, gender: Gender, activityLevel: ActivityLevel, goal: Goal) {
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.activityLevel = activityLevel;
        this.goal = goal;
    }
}

export class UserPreferences implements IUserPreferences {
    dietaryRestrictions: DietaryRestrictions;
    preferredCuisines: PreferredCuisines;
    allergies: Allergies;

    constructor(dietaryRestrictions: DietaryRestrictions, preferredCuisines: PreferredCuisines, allergies: Allergies) {
        this.dietaryRestrictions = dietaryRestrictions;
        this.preferredCuisines = preferredCuisines;
        this.allergies = allergies;
    }
}

export class UserMedicalInfo implements IUserMedicalInfo {
    medicalConditions: MedicalConditions;
    smoking: boolean;
    alcohol: boolean;

    constructor(medicalConditions: MedicalConditions, smoking: boolean, alcohol: boolean) {
        this.medicalConditions = medicalConditions;
        this.smoking = smoking;
        this.alcohol = alcohol;
    }
}