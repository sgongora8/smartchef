const Recipe = require('../Models/Recipe');

exports.searchRecipes = async (req, res) => {
  const { ingredients, diet, level, allergies } = req.query;

  try {
    const filter = {};

    if (ingredients) {
      filter.ingredients = {
        $all: ingredients
          .split(',')
          .map(i => i.trim())
          .filter(Boolean)
      };
    }

    if (diet) {
      filter.dietaryInfo = {
        $all: diet
          .split(',')
          .map(d => d.trim())
          .filter(Boolean)
      };
    }

    if (level) {
      const levels = level
        .split(',')
        .map(l => l.trim())
        .filter(Boolean)
        .map(l => new RegExp(`^${l}$`, 'i'));  

      filter.skillLevel = { $in: levels };
    }

    if (allergies) {
      const avoid = allergies
        .split(',')
        .map(a => a.trim())
        .filter(Boolean);

      if (filter.ingredients) {
        filter.ingredients.$nin = avoid;
      } else {
        filter.ingredients = { $nin: avoid };
      }
    }

    //execute query
    const recipes = await Recipe.find(filter).lean();
    return res.status(200).json(recipes);
  } catch (err) {
    console.error('Error searching recipes:', err);
    return res.status(500).json({ error: 'Search failed' });
  }
};
