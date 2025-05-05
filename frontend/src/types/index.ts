// frontend/src/types/index.ts

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
  _id?: string;           
  name: string;
  description?: string;
  cookingTime?: number;
  cuisineType?: string;
  dietaryInfo?: string[];
  skillLevel?: string;
  ingredients: string[];
  imageUrl?: string;
  instructions?: string;
}

export interface RecipeFormData {
  dietaryPreferences: DietaryPreference[];
  cookingLevel: CookingLevel;
  additionalNotes: string;
}
