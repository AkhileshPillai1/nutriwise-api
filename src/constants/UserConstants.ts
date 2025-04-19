export const GENDER = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other",
} as const;

export const ACTIVITY_LEVEL = {
    SEDENTARY: "sedentary",
    LIGHT: "light",
    MODERATE: "moderate",
    ACTIVE: "active",
    VERY_ACTIVE: "very active",
} as const;

export const GOAL = {
    LOSE_WEIGHT: "lose weight",
    MAINTAIN_WEIGHT: "maintain weight",
    GAIN_WEIGHT: "gain weight",
    BUILD_MUSCLE: "build muscle",
} as const;

export const DIETARY_RESTRICTIONS = {
    VEGETARIAN: "vegetarian",
    VEGAN: "vegan",
    GLUTEN_FREE: "gluten-free",
    KETO: "keto",
    PALEO: "paleo",
} as const;

export const PREFERRED_CUISINES = {
    INDIAN: "Indian",
    ITALIAN: "Italian",
    THAI: "Thai",
    CHINESE: "Chinese",
    MEXICAN: "Mexican",
} as const;

export const ALLERGIES = {
    PEANUTS: "peanuts",
    SHELLFISH: "shellfish",
    DAIRY: "dairy",
    GLUTEN: "gluten",
    SOY: "soy",
} as const;

export const MEDICAL_CONDITIONS = {
    DIABETES: "diabetes",
    HIGH_BLOOD_PRESSURE: "high blood pressure",
    HIGH_CHOLESTEROL: "high cholesterol",
    HEART_DISEASE: "heart disease",
    ASTHMA: "asthma",
} as const;

// The types are derived from the constants above
// To ensure strict type safety, we export the constants as types as well
export type Gender = typeof GENDER[keyof typeof GENDER] | null;
export type ActivityLevel = typeof ACTIVITY_LEVEL[keyof typeof ACTIVITY_LEVEL] | null;
export type Goal = typeof GOAL[keyof typeof GOAL] | null;
export type DietaryRestrictions = typeof DIETARY_RESTRICTIONS[keyof typeof DIETARY_RESTRICTIONS][];
export type PreferredCuisines = typeof PREFERRED_CUISINES[keyof typeof PREFERRED_CUISINES][];
export type Allergies = (typeof ALLERGIES[keyof typeof ALLERGIES] | string)[];//User can input custom allergies as well
export type MedicalConditions = typeof MEDICAL_CONDITIONS[keyof typeof MEDICAL_CONDITIONS][];