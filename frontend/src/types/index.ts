// Define types for recipe data and form inputs

export type CookingLevel = 'easy' | 'intermediate' | 'hard';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  step: number;
  instruction: string;
}

export interface DietaryPreference {
  id: string;
  label: string;
  selected: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: number;
  servings: number;
  level: CookingLevel;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  dietary: string[];
  imageUrl?: string;
}

export interface RecipeFormData {
  dietaryPreferences: DietaryPreference[];
  cookingLevel: CookingLevel;
  additionalNotes: string;
}