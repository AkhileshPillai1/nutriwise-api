export const generateDietPlanPrompt = (activityLevel, goal, dietaryRestrictions, preferredCuisines,meatPreferences) => {
  let prompt = `
  You are a professional nutritionist.
  Based on the following user inputs, generate a personalized diet meal options list:
  
  - Activity Level: ${activityLevel}
  - Goal: ${goal} (e.g., weight loss, muscle gain, maintenance)
  ${dietaryRestrictions ? `- Dietary Restrictions: ${dietaryRestrictions} (e.g., vegan, gluten-free, no dairy)` : ''}
  ${preferredCuisines ? `- Preferred Cuisines: ${preferredCuisines} (e.g., Indian, Mediterranean, Italian)` : ''}
  ${meatPreferences ? `- Meat Preferences: ${meatPreferences} (e.g., vegetarian, non-vegetarian, vegetarian(Egg allowed))` : ''}
  
  Instructions for the output:
  1. Start with a short 2-4 sentence description explaining the overall theme or philosophy of the meal options based on the user's inputs.
  2. Then provide multiple different options for each meal. Please include at least 5 options for each meal type (breakfast, lunch, snacks, and dinner). Each option should be a single meal idea that is realistic and easy to prepare. Use the following format:
  3. Give quantity and serving size for each meal option (use Metric measurements). At the end of each meal option, include the estimated calorie count in parentheses.


  Breakfast Options:
  - Option 1: {meal}
  - Option 2: {meal}
  - ...

  Lunch Options:
  - Option 1: {meal}
  - Option 2: {meal}
  - ...

  Snacks Options:
  - Option 1: {meal}
  - Option 2: {meal}
  - ...

  Dinner Options:
  - Option 1: {meal}
  - Option 2: {meal}
  - ...

  3. Ensure the meals align with the user's dietary restrictions and preferred cuisines as much as possible.
  4. Meals should be realistic, tasty, and balanced (adequate proteins, healthy carbs, and fats according to the goal).
  5. Provide at least 5 options for each meal type (more if possible).

  The response format must be JSON. Return only raw JSON that can be directly parsed. Do not include "Option" keyword in each option. The structure should be:

    {
      "description": "A short description of the meal plan philosophy",
      "mealPlan": {
        "breakfast": 
        [// array of strings. Do not include the word "Option" in the array. Just give the meal name.
        "Option 1",
        "Option 2",
        "..."],
        "lunch": ["Option 1", "Option 2", "..."],
        "snacks": ["Option 1", "Option 2", "..."],
        "dinner": ["Option 1", "Option 2", "..."]
      }
    }
  `;

  return prompt;
};
