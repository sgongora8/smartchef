import { Recipe, CookingLevel } from '../types';

// This is a mock API that would be replaced with a real AI service in production
export const generateRecipe = async (
  dietaryPreferences: string[],
  cookingLevel: CookingLevel,
  additionalNotes: string
): Promise<Recipe> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Sample recipes based on cooking level
  const recipes: Record<CookingLevel, Recipe[]> = {
    easy: [
      {
        id: '1',
        title: 'Simple Vegetable Stir-Fry',
        description: 'A quick and nutritious vegetable stir-fry perfect for beginners.',
        cookTime: 20,
        servings: 2,
        level: 'easy',
        ingredients: [
          { name: 'Mixed vegetables', amount: '2', unit: 'cups' },
          { name: 'Olive oil', amount: '2', unit: 'tbsp' },
          { name: 'Soy sauce', amount: '1', unit: 'tbsp' },
          { name: 'Garlic', amount: '2', unit: 'cloves' }
        ],
        steps: [
          { step: 1, instruction: 'Heat oil in a large pan over medium heat.' },
          { step: 2, instruction: 'Add minced garlic and cook for 30 seconds until fragrant.' },
          { step: 3, instruction: 'Add mixed vegetables and stir-fry for 5-7 minutes.' },
          { step: 4, instruction: 'Add soy sauce and stir to combine.' },
          { step: 5, instruction: 'Serve immediately.' }
        ],
        dietary: ['vegetarian', 'vegan']
      }
    ],
    intermediate: [
      {
        id: '2',
        title: 'Mushroom Risotto',
        description: 'A creamy Italian rice dish with savory mushrooms.',
        cookTime: 40,
        servings: 4,
        level: 'intermediate',
        ingredients: [
          { name: 'Arborio rice', amount: '1', unit: 'cup' },
          { name: 'Mushrooms', amount: '8', unit: 'oz' },
          { name: 'Vegetable broth', amount: '4', unit: 'cups' },
          { name: 'White wine', amount: '1/2', unit: 'cup' },
          { name: 'Onion', amount: '1', unit: 'medium' },
          { name: 'Garlic', amount: '2', unit: 'cloves' },
          { name: 'Parmesan', amount: '1/2', unit: 'cup' },
          { name: 'Butter', amount: '2', unit: 'tbsp' },
          { name: 'Olive oil', amount: '2', unit: 'tbsp' },
        ],
        steps: [
          { step: 1, instruction: 'Heat broth in a saucepan and keep warm.' },
          { step: 2, instruction: 'In a separate pan, sauté onions and garlic in olive oil until translucent.' },
          { step: 3, instruction: 'Add mushrooms and cook until soft.' },
          { step: 4, instruction: 'Add rice and toast for 2 minutes.' },
          { step: 5, instruction: 'Add wine and stir until absorbed.' },
          { step: 6, instruction: 'Add warm broth 1/2 cup at a time, stirring constantly.' },
          { step: 7, instruction: 'Continue adding broth until rice is creamy and cooked, about 20-25 minutes.' },
          { step: 8, instruction: 'Stir in butter and Parmesan. Season with salt and pepper.' }
        ],
        dietary: ['vegetarian']
      }
    ],
    hard: [
      {
        id: '3',
        title: 'Beef Wellington',
        description: 'A classic British dish of beef tenderloin wrapped in puff pastry.',
        cookTime: 120,
        servings: 4,
        level: 'hard',
        ingredients: [
          { name: 'Beef tenderloin', amount: '2', unit: 'lb' },
          { name: 'Puff pastry', amount: '1', unit: 'sheet' },
          { name: 'Mushrooms', amount: '1', unit: 'lb' },
          { name: 'Prosciutto', amount: '8', unit: 'slices' },
          { name: 'Dijon mustard', amount: '2', unit: 'tbsp' },
          { name: 'Egg', amount: '1', unit: 'large' },
          { name: 'Olive oil', amount: '2', unit: 'tbsp' },
          { name: 'Butter', amount: '2', unit: 'tbsp' },
          { name: 'Thyme', amount: '2', unit: 'sprigs' }
        ],
        steps: [
          { step: 1, instruction: 'Sear the beef tenderloin on all sides. Let cool, then brush with mustard.' },
          { step: 2, instruction: 'Process mushrooms, then sauté with thyme until moisture is gone.' },
          { step: 3, instruction: 'Lay out plastic wrap and arrange prosciutto slices.' },
          { step: 4, instruction: 'Spread mushroom mixture over prosciutto and place beef on top.' },
          { step: 5, instruction: 'Roll into a tight cylinder using the plastic wrap. Refrigerate for 30 minutes.' },
          { step: 6, instruction: 'Roll out puff pastry and unwrap beef from plastic.' },
          { step: 7, instruction: 'Place beef in the middle of pastry and fold pastry around it.' },
          { step: 8, instruction: 'Brush with beaten egg and chill for 15 minutes.' },
          { step: 9, instruction: 'Bake at 425°F for 40-45 minutes until pastry is golden and beef is medium-rare.' },
          { step: 10, instruction: 'Let rest for 10 minutes before slicing.' }
        ],
        dietary: []
      }
    ]
  };

  // Filter recipes based on dietary preferences if any
  let filteredRecipes = recipes[cookingLevel];
  
  if (dietaryPreferences.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      dietaryPreferences.some(pref => recipe.dietary.includes(pref))
    );
  }

  // Return a random recipe or default to first one
  return filteredRecipes.length > 0 
    ? filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)] 
    : recipes[cookingLevel][0];
};

export const getDietaryOptions = (): { id: string; label: string }[] => [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'dairy-free', label: 'Dairy-free' },
  { id: 'nut-free', label: 'Nut-free' },
  { id: 'keto', label: 'Keto' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'low-carb', label: 'Low Carb' }
];