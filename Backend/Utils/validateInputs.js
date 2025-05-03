exports.validateRecipe = (recipe) => {
    const { name, instructions, ingredients } = recipe;
  
    if (!name || typeof name !== 'string') return 'Invalid or missing recipe name';
    if (!instructions || typeof instructions !== 'string') return 'Invalid or missing instructions';
    if (!Array.isArray(ingredients) || ingredients.length === 0) return 'Ingredients must be a non-empty array';
  
    return null;
  };
  