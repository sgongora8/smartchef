const { askOllama } = require('../Utils/ollamaService');


exports.getRecipeNutritionAnswer = async (req, res) => {
  try {
    const { recipe, question } = req.body;
    if (!recipe || !Array.isArray(recipe.ingredients)) {
      return res.status(400).json({ error: 'Invalid recipe payload' });
    }

    //nutritional cheat sheet for common ingredients
    const cheatSheet = [
      'Tomato (1 cup): 32 kcal; fat: 0.4g; sat fat: 0.1g; trans fat: 0g; cholesterol: 0mg; sodium: 10mg; carbs: 7g; fiber: 2.2g; sugars: 4.7g; protein: 1.6g; calcium: 18mg; iron: 0.8mg; potassium: 422mg',
      'Chicken breast (100g): 165 kcal; fat: 3.6g; sat fat: 1g; trans fat: 0g; cholesterol: 85mg; sodium: 74mg; carbs: 0g; fiber: 0g; sugars: 0g; protein: 31g; calcium: 11mg; iron: 0.9mg; potassium: 256mg',
      'Olive oil (1 Tbsp): 120 kcal; fat: 14g; sat fat: 2g; trans fat: 0g; cholesterol: 0mg; sodium: 0mg; carbs: 0g; fiber: 0g; sugars: 0g; protein: 0g; calcium: 0mg; iron: 0mg; potassium: 0mg',
      'Yogurt plain (1 cup): 150 kcal; fat: 8g; sat fat: 5g; trans fat: 0.3g; cholesterol: 31mg; sodium: 115mg; carbs: 11g; fiber: 0g; sugars: 11g; protein: 8g; calcium: 300mg; iron: 0mg; potassium: 380mg',
      'Flour all-purpose (1 cup): 455 kcal; fat: 1.2g; sat fat: 0.2g; trans fat: 0g; cholesterol: 0mg; sodium: 2mg; carbs: 95g; fiber: 3.4g; sugars: 0.3g; protein: 13g; calcium: 15mg; iron: 4.6mg; potassium: 107mg'
    ].join('\n');

   
    const ctx = [];
    ctx.push(`Recipe: ${recipe.name}`);
    if (recipe.description) ctx.push(`Description: ${recipe.description}`);
    ctx.push('Ingredients: ' + recipe.ingredients.join(', '));
    if (Array.isArray(recipe.instructions) && recipe.instructions.length) {
      ctx.push('Instructions: ' + recipe.instructions.map(s => s.replace(/^\d+\.\s*/, '')).join(' | '));
    }

    //final prompt to ollama ai
    const prompt = `
You are a nutrition expert. Use the following cheat sheet of typical values (assume 2 servings):
${cheatSheet}

Context:
${ctx.join('\n')}

The user question is: "${question}"

**Answer with one concise sentence providing the requested total** (e.g. "Total fat: Xg for the recipe (Yg per serving).") **Do NOT include reasoning or other details.**
`.trim();

    const answer = await askOllama(prompt);
    return res.json({ description: recipe.name, answer });

  } catch (err) {
    console.error('AI nutrition error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};


exports.smartRecipeSearch = async (req, res) => {
};
